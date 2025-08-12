from django.urls import path
from .views import (
    BookingListCreateView,
    BookingRetrieveUpdateDestroyView,
    FacilitatorBookingListView,
    facilitator_dashboard,
    
)

urlpatterns = [
    path('', BookingListCreateView.as_view(), name='booking-list-create'),
    path('<int:pk>/', BookingRetrieveUpdateDestroyView.as_view(), name='booking-detail'),
    path('facilitator/', FacilitatorBookingListView.as_view(), name='facilitator-bookings'),
    path('facilitator/dashboard/', facilitator_dashboard, name='facilitator-dashboard'),
]
