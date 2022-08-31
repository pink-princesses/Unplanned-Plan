from django.contrib.auth.models import AbstractBaseUser,  BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

class UserManager(BaseUserManager):

  def _create_user(self, email, name, is_staff, is_superuser, alert, **extra_fields):
    if not email:
        raise ValueError('Users must have an email address')
    email = self.normalize_email(email)
    user = self.model(
        email=email,
        name=name,
        nickname=name,
        is_staff=is_staff, 
        is_superuser=is_superuser,
        alert=alert,
        **extra_fields
    )
    user.save(using=self._db)
    return user

  def create_user(self, email, name, **extra_fields):
    return self._create_user(email, name, False, False, False, **extra_fields)

  def create_superuser(self, email, name, **extra_fields):
    user=self._create_user(email, name, True, True, False, **extra_fields)
    user.save(using=self._db)
    return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=254, unique=True)
    name = models.CharField(max_length=254)
    nickname = models.CharField(max_length=254)
    alert = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_absolute_url(self):
        return "/users/%i/" % (self.pk)