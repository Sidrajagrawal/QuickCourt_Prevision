from django.utils.timezone import now
from django.db.models import Sum, Avg, Count
from datetime import timedelta
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Booking
from .serializers import BookingSerializer
from venues.models import Venue

class BookingListCreateView(generics.ListCreateAPIView):
    """
    List all bookings for the authenticated user or create a new booking.
    """
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        venue_id = self.request.data.get('venue')
        venue = get_object_or_404(Venue, id=venue_id)
        serializer.save(user=self.request.user, venue=venue)

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            venue_id = request.data.get('venue')
            if not venue_id:
                return Response({'detail': 'Venue ID is required'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                venue = Venue.objects.get(id=venue_id)
            except Venue.DoesNotExist:
                return Response({'detail': 'Venue not found'}, status=status.HTTP_404_NOT_FOUND)

            existing_booking = Booking.objects.filter(
                venue=venue,
                date=request.data.get('date'),
                time=request.data.get('time'),
                payment_status__in=['pending', 'completed']
            ).first()

            if existing_booking:
                return Response({'detail': 'This time slot is already booked'}, status=status.HTTP_400_BAD_REQUEST)

            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            payment_status = request.data.get('payment_status', 'pending')
            if payment_status == 'pending':
                message = 'Booking created successfully. Complete your payment to confirm.'
            else:
                message = 'Booking created successfully'

            return Response({
                'message': message,
                'booking': serializer.data,
                'payment_required': payment_status == 'pending'
            }, status=status.HTTP_201_CREATED, headers=headers)

        except Exception as e:
            return Response({'detail': f'Booking failed: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)


class BookingRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        booking = self.get_object()
        if booking.payment_status == 'completed':
            return Response({'detail': 'Cannot modify completed bookings'}, status=status.HTTP_400_BAD_REQUEST)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        booking = self.get_object()
        if booking.payment_status == 'completed':
            return Response({'detail': 'Cannot cancel completed bookings'}, status=status.HTTP_400_BAD_REQUEST)
        return super().destroy(request, *args, **kwargs)


class FacilitatorBookingListView(generics.ListAPIView):
    """
    List all bookings for venues owned by the facilitator (authenticated user).
    """
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        venues = Venue.objects.filter(owner=self.request.user)
        return Booking.objects.filter(venue__in=venues).order_by('-created_at')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def facilitator_dashboard(request):
    """
    Returns:
    {
      "stats": {
        "totalEarnings": float,
        "totalOrders": int,
        "avgEarning": float,
        "growthRate": float | null
      },
      "chart": {
        "labels": [ "YYYY-MM-DD", ... ],
        "earnings": [float, ...],
        "orders": [int, ...]
      },
      "graphData": [ { "date": "YYYY-MM-DD", "earnings": float, "orders": int }, ... ]
    }
    """
    # 1) get venues owned by this facilitator
    venues = Venue.objects.filter(owner=request.user)

    # 2) completed bookings for those venues
    bookings = Booking.objects.filter(venue__in=venues, payment_status='completed')

    # 3) group by booking date (created_at date) - aggregated totals per date
    date_data = (
        bookings
        .values('created_at__date')
        .annotate(total_earnings=Sum('total_price'), total_orders=Count('id'))
        .order_by('created_at__date')
    )

    labels = []
    earnings_list = []
    orders_list = []
    graph_data = []

    for entry in date_data:
        date_obj = entry.get('created_at__date')
        date_str = date_obj.strftime("%Y-%m-%d") if date_obj is not None else ""
        total_earnings = float(entry.get('total_earnings') or 0.0)
        total_orders = int(entry.get('total_orders') or 0)

        labels.append(date_str)
        earnings_list.append(total_earnings)
        orders_list.append(total_orders)
        graph_data.append({
            "date": date_str,
            "earnings": total_earnings,
            "orders": total_orders
        })

    # overall stats using all completed bookings
    total_earnings_all = float(bookings.aggregate(total=Sum('total_price'))['total'] or 0.0)
    total_orders_all = int(bookings.count())
    avg_earning = float(bookings.aggregate(avg=Avg('total_price'))['avg'] or 0.0)

    # growth rate: compare first aggregated date vs last aggregated date.
    # If not enough data, growthRate = None
    growth_rate = None
    if len(earnings_list) >= 2:
        first = earnings_list[0]
        last = earnings_list[-1]
        if first != 0:
            growth_rate = round(((last - first) / first) * 100, 2)
        else:
            # cannot compute percent growth from zero; set None so frontend can display N/A
            growth_rate = None

    response = {
        "stats": {
            "totalEarnings": round(total_earnings_all, 2),
            "totalOrders": total_orders_all,
            "avgEarning": round(avg_earning, 2),
            "growthRate": growth_rate
        },
        "chart": {
            "labels": labels,
            "earnings": earnings_list,
            "orders": orders_list
        },
        "graphData": graph_data
    }

    return Response(response)

