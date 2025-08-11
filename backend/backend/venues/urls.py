from django.urls import path
from . import views

urlpatterns = [
    path('', views.VenueListCreateView.as_view(), name='venue-list-create'),
    path('<int:pk>/', views.VenueRetrieveUpdateDeleteView.as_view(), name='venue-detail'),
]
