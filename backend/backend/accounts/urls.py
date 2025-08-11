from django.urls import path
from .views import (
    RegisterUserView, VerifyOTPView, LoginUserView, TestAuthenticationView,
    PasswordResetRequestView, PasswordResetConfirm, SetNewPassword, LogoutUserView,
    AvatarView
)   

urlpatterns = [
    path('auth/register/', RegisterUserView.as_view(), name='register'),
    path('auth/verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),  # new OTP verify
    path('auth/login/', LoginUserView.as_view(), name='login'),
    path('auth/logout/', LogoutUserView.as_view(), name='logout'),
    path('auth/me/', TestAuthenticationView.as_view(), name='auth-check'),  # profile/me
    path('auth/avatar/', AvatarView.as_view(), name='avatar'),

    path('auth/password-reset/request/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('auth/password-reset/confirm/<str:uidb64>/<str:token>/', PasswordResetConfirm.as_view(), name='password-reset-confirm'),
    path('auth/password-reset/setnewpassword/', SetNewPassword.as_view(), name='password-reset-setnewpassword'),
]
