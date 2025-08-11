from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.urls import reverse

class EmailUtil:
    @staticmethod
    def send_otp_email(user):
        # generate otp on user and send it
        otp = user.generate_otp()
        subject = "QuickCourt — Your OTP Code"
        message = f"""
Hi {user.full_name},

Your QuickCourt verification OTP is: {otp}

This code will expire in 5 minutes.

If you didn't request this, please ignore.

Cheers,
QuickCourt Team
"""
        send_mail(
            subject=subject,
            message=message,
            from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', settings.EMAIL_HOST_USER),
            recipient_list=[user.email],
            fail_silently=False,
        )

def send_normal_email(data):
    print("Sending email with data:", data)
    email = EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', settings.EMAIL_HOST_USER),
        to=[data['to_email']],
    )
    email.send(fail_silently=False)
