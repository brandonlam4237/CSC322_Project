from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    """
    Account Manager to create different users
    """
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email).lower()

        user = self.model(
            username=username,
            email=email
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_staff(self, username, email, password=None):
        user = self.create_user(username, email, password)

        user.is_realtor = True
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(username, email, password)

        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """
    User Model - attributes can be found in ER Diagram
    """

    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=False)

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    blacklisted = models.BooleanField(default=False)

    balance = models.IntegerField(default=0)

    # TODO: Implement Shopping Cart

    object = UserAccountManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    REQUIRED_FIELDS = [
        'email',
        'first_name',
        'last_name',
    ]

    def __str__(self) -> str:
        return f"[Username: {self.username}, Email: {self.email}]"
