# venues/serializers.py
from rest_framework import serializers
from .models import Venue, Location, User

class LocationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Location model.
    Handles the nested location data from the frontend form.
    """
    class Meta:
        model = Location
        fields = ['line1', 'line2', 'landmark', 'pincode', 'city', 'state']

class VenueSerializer(serializers.ModelSerializer):
    """
    Serializer for the Venue model.
    It includes a nested LocationSerializer to handle location data.
    """
    location = LocationSerializer()
    
    # We explicitly define these fields to ensure they are handled correctly.
    sports = serializers.ListField(child=serializers.CharField(max_length=100))
    amenities = serializers.ListField(child=serializers.CharField(max_length=100))

    class Meta:
        model = Venue
        fields = [
            'id', 'owner', 'name', 'price_per_hour', 'operational_hours', 
            'sports', 'amenities', 'photos_links', 'video_link', 'description', 
            'location'
        ]
        read_only_fields = ['owner']

    def create(self, validated_data):
        # Extract nested location data from the validated data
        location_data = validated_data.pop('location')
        
        # Create the Location instance first
        location_instance = Location.objects.create(**location_data)
        
        # Then create the Venue instance with the associated Location
        venue_instance = Venue.objects.create(location=location_instance, **validated_data)
        
        return venue_instance

    def update(self, instance, validated_data):
        """
        Custom update method to handle nested writable fields.
        This manually updates the nested Location object.
        """
        location_data = validated_data.pop('location', None)

        # Update the nested location instance if data is provided
        if location_data:
            location_serializer = self.fields['location']
            location_instance = instance.location
            location_serializer.update(location_instance, location_data)

        # Update the Venue instance with the remaining data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance
