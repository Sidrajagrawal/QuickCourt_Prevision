from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Venue
from .serializers import VenueSerializer


class VenueListCreateView(ListCreateAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

    def get_permissions(self):
        """
        Allow anyone to view (GET), require authentication to create (POST).
        """
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        # Show all venues to everyone
        if self.request.user.is_authenticated and self.request.user.role == "FACILITY":
            # Facility owners see only their venues when creating/updating
            return Venue.objects.filter(owner=self.request.user)
        return super().get_queryset()

    def perform_create(self, serializer):
        # Attach logged-in user as owner when creating
        serializer.save(owner=self.request.user)


class VenueRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

    def get_permissions(self):
        """
        Allow anyone to retrieve (GET), require authentication to update/delete.
        """
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
