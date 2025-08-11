from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from datetime import timedelta
from rest_framework_simplejwt.tokens import RefreshToken
import secrets
from django.utils.translation import gettext_lazy as _

from accounts.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    class Roles(models.TextChoices):
        USER = "USER", _("User")
        FACILITY = "FACILITY", _("Facility")
        ADMIN = "ADMIN", _("Admin")

    email = models.EmailField(max_length=255, unique=True, verbose_name=_('Email Address'))
    first_name = models.CharField(max_length=100, verbose_name=_('First Name'))
    last_name = models.CharField(max_length=100, verbose_name=_('Last Name'))

    # Role
    role = models.CharField(max_length=20, choices=Roles.choices, default=Roles.USER)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    # OTP verification fields
    otp_code = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)

    # Avatar (store generated avatar URL)
    avatar = models.URLField(blank=True, null=True)

    # Email verification link fields (no longer used for OTP flow, keep if needed)
    verification_token = models.CharField(max_length=100, blank=True, null=True)
    token_created_at = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    # JWT tokens include role
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        # include role in token payload so frontend can route accordingly
        refresh['role'] = self.role
        refresh['email'] = self.email
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    # OTP generation & validation
    def generate_otp(self):
        """Generate a 6-digit OTP and store timestamp."""
        # Ensure 6-digit, non-leading-zero
        self.otp_code = str(secrets.randbelow(900000) + 100000)
        self.otp_created_at = timezone.now()
        self.save(update_fields=['otp_code', 'otp_created_at'])
        return self.otp_code

    def is_otp_valid(self, otp, expiry_minutes: int = 5):
        """Return True if OTP matches and is inside expiry window."""
        if not self.otp_code or not self.otp_created_at:
            return False
        if self.otp_code != str(otp):
            return False
        return timezone.now() < self.otp_created_at + timedelta(minutes=expiry_minutes)

    def clear_otp(self):
        self.otp_code = None
        self.otp_created_at = None
        self.save(update_fields=['otp_code', 'otp_created_at'])

    # Avatar generation (DiceBear identicon as example)
    def generate_avatar(self):
        """Generate & store an avatar URL using DiceBear (or any avatar service)."""
        seed = f"{self.first_name}_{self.last_name}_{self.id or secrets.token_hex(4)}"
        avatar_url = f"https://api.dicebear.com/7.x/identicon/svg?seed={seed}"
        self.avatar = avatar_url
        self.save(update_fields=['avatar'])
        return self.avatar

    # helpers
    def is_user(self):
        return self.role == self.Roles.USER

    def is_owner(self):
        return self.role == self.Roles.FACILITY

    def is_admin(self):
        return self.role == self.Roles.ADMIN
