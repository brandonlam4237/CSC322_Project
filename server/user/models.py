from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    """
    Account Manager to create different users
    """

    def create_user(self, data: dict, password=None):
        # User Data
        username = data['username']
        email = data['email']
        first_name = data['first_name']
        last_name = data['last_name']
        password = data['password']

        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email).lower()

        user = self.model(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_employee(self, data: dict, password=None):
        user = self.create_user(data, password)

        user.is_employee = True
        user.save(using=self._db)

        return user
    
    def create_customer(self, data: dict, password=None):
        user = self.create_user(data, password)

        user.is_employee = True
        user.save(using=self._db)

        return user

    def create_superuser(self, data: dict, password=None):
        user = self.create_user(data, password)

        user.is_active = True
        user.is_superuser = True

        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """
    User Model - attributes can be found in ER Diagram
    """

    # User Detail Fields
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=False)

    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)

    # User Type Fields
    is_customer = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    # Shop Related Fields
    blacklisted = models.BooleanField(default=False)
    balance = models.IntegerField(default=0)

    # TODO: Implement Shopping Cart
    # shopping_cart = models.ForeignKey()

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    REQUIRED_FIELDS = [
        'email',
        'first_name',
        'last_name',
    ]

    def __str__(self) -> str:
        return f"[Username: {self.username}, Email: {self.email}]"
