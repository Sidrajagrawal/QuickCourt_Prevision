from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.response import Response
from .models import Venue
from .serializers import VenueSerializer

class VenueListCreateView(ListCreateAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that the view requires.
        """
        if self.request.method == 'GET':
            # Allow any user (authenticated or not) to list venues
            return [AllowAny()]
        # For POST requests, authentication is required
        return [IsAuthenticated()]

    def get_queryset(self):
        # Return venues owned by the facility user if authenticated, otherwise all venues.
        if self.request.user.is_authenticated and self.request.user.role == "FACILITY":
            return Venue.objects.filter(owner=self.request.user)
        return super().get_queryset()

    def perform_create(self, serializer):
        # This will only be reached if the user is authenticated due to get_permissions
        serializer.save(owner=self.request.user)


class VenueRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    
    # Corrected permissions: Allow any user to retrieve a venue, but require
    # authentication for updates (PUT, PATCH) and deletion (DELETE).
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]