import logging
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import default_token_generator

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .serializers import (
    UserRegisterSerializer,
    LoginSerializer,
    PasswordResetRequestSerializer,
    SetNewPasswordSerializer,
    LogoutUserSerializer,
    VerifyOTPSerializer,
)
from .utils import EmailUtil
from .models import User

logger = logging.getLogger(__name__)


class RegisterUserView(GenericAPIView):
    """
    Registers a new user, generates OTP, avatar and sends OTP via email.
    """
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        try:
            user.generate_avatar()
        except Exception as exc:
            logger.exception("Avatar generation failed", exc_info=exc)

        try:
            EmailUtil.send_otp_email(user)
        except Exception as exc:
            logger.exception("OTP email failed", exc_info=exc)
            return Response(
                {
                    "data": {"email": user.email},
                    "message": "User created, but we couldn't send OTP. Please contact support."
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "data": {
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": user.role,
                    "avatar": user.avatar,
                    "is_verified": user.is_verified,
                },
                "message": "User created successfully. An OTP has been sent to your email for verification.",
            },
            status=status.HTTP_201_CREATED,
        )


class VerifyOTPView(GenericAPIView):
    """
    Verify email via OTP (email + otp).
    """
    serializer_class = VerifyOTPSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # mark verified & clear otp
        user.is_verified = True
        user.clear_otp()
        user.save(update_fields=['is_verified', 'otp_code', 'otp_created_at'])

        return Response({"message": "Account verified successfully."}, status=status.HTTP_200_OK)


class LoginUserView(GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class TestAuthenticationView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
            "avatar": user.avatar,
        }, status=status.HTTP_200_OK)


class AvatarView(GenericAPIView):
    """
    Return the avatar URL for the authenticated user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({"avatar": user.avatar}, status=status.HTTP_200_OK)


class PasswordResetRequestView(GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()  # triggers the password reset email
        return Response({'message': "A link has been sent to your email to reset your password."}, status=status.HTTP_200_OK)


class PasswordResetConfirm(GenericAPIView):
    """
    Validates the uid/token pair sent to the user.
    """
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid_int = int(smart_str(urlsafe_base64_decode(uidb64)))
            user = User.objects.get(id=uid_int)

            if not default_token_generator.check_token(user, token):
                raise ValueError("Invalid or expired token")

            return Response(
                {
                    "success": True,
                    "message": "Token is valid.",
                    "uidb64": uidb64,
                    "token": token,
                },
                status=status.HTTP_200_OK,
            )

        except (DjangoUnicodeDecodeError, ValueError, User.DoesNotExist):
            return Response(
                {"message": "Invalid or expired token."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class SetNewPassword(GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes = [AllowAny]

    def patch(self, request):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()  # actually resets the password
        return Response(
            {"message": "Password has been reset successfully."},
            status=status.HTTP_200_OK,
        )


class LogoutUserView(GenericAPIView):
    serializer_class = LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
