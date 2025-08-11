# venues/serializers.py
from rest_framework import serializers
from .models import Venue, Location
import cloudinary.uploader

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"

class VenueSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    sports = serializers.ListField(child=serializers.CharField(), required=False)
    amenities = serializers.ListField(child=serializers.CharField(), required=False)
    photos_files = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    video_file = serializers.FileField(write_only=True, required=False)

    class Meta:
        model = Venue
        fields = [
            "id", "name", "price_per_hour", "operational_hours", "sports", "amenities",
            "photos_links", "video_link", "description", "location",
            "photos_files", "video_file"
        ]
        read_only_fields = ["photos_links", "video_link"]

    def create(self, validated_data):
        location_data = validated_data.pop("location", {})
        photos_files = validated_data.pop("photos_files", [])
        video_file = validated_data.pop("video_file", None)

        # Ensure no duplicate owner key
        validated_data.pop("owner", None)

        # Save location
        location = Location.objects.create(**location_data)

        # Create venue with logged-in user
        venue = Venue.objects.create(
            location=location,
            owner=self.context["request"].user,
            **validated_data
        )

        # Upload photos to Cloudinary
        photo_urls = []
        for photo in photos_files:
            upload_result = cloudinary.uploader.upload(photo, folder="venue_photos")
            photo_urls.append(upload_result["secure_url"])
        venue.photos_links = photo_urls

        # Upload video to Cloudinary
        if video_file:
            upload_result = cloudinary.uploader.upload(video_file, folder="venue_videos", resource_type="video")
            venue.video_link = upload_result["secure_url"]

        venue.save()
        return venue
