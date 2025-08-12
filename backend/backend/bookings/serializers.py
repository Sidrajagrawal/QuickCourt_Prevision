# bookings/serializers.py

from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    """
    Serializer for the Booking model.
    """
    user = serializers.ReadOnlyField(source='user.email')
    venue_name = serializers.ReadOnlyField(source='venue.name')

    class Meta:
        model = Booking
        fields = ['id', 'user', 'venue', 'venue_name', 'sport', 'date', 'time', 'duration', 'courts', 'total_price', 'payment_status', 'created_at']

