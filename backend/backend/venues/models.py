from django.db import models
from django.conf import settings
from accounts.models import User

class Location(models.Model):
    line1 = models.CharField(max_length=255)
    line2 = models.CharField(max_length=255, blank=True, null=True)
    landmark = models.CharField(max_length=255, blank=True, null=True)
    pincode = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True, null=True) # <-- Added state field

    def __str__(self):
        return f"{self.line1}, {self.city}"

class Venue(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="venues")
    name = models.CharField(max_length=255)
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2)
    operational_hours = models.CharField(max_length=255)
    sports = models.JSONField(default=list)  # Store as list of strings
    amenities = models.JSONField(default=list)  # Store as list of strings
    photos_links = models.JSONField(default=list, blank=True)
    video_link = models.URLField(blank=True, null=True)
    description = models.TextField()
    location = models.OneToOneField("Location", on_delete=models.CASCADE)

    def __str__(self):
        return self.name
