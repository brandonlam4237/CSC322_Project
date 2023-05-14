from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    """
    Account Manager to create different users
    """

    def create_user(self, username, email, first_name, last_name, password=None):
        """
        Creates a general UserAccount
        """
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

    def create_employee(self, username, email, first_name, last_name, password=None):
        """
        Creates an Employee UserAccount
        """
        user = self.create_user(username=username, email=email,
                                first_name=first_name, last_name=last_name, password=password)

        user.is_employee = True
        user.save(using=self._db)

        return user

    def create_customer(self, username, email, first_name, last_name, password=None):
        """
        Creates a Customer UserAccount
        """
        user = self.create_user(username=username, email=email,
                                first_name=first_name, last_name=last_name, password=password)

        user.is_customer = True
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, first_name, last_name, password=None):
        """
        Creates an Owner UserAccount
        """
        user = self.create_user(username=username, email=email,
                                first_name=first_name, last_name=last_name, password=password)

        user.is_active = True
        user.is_staff = True
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
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    date_created = models.DateTimeField(auto_now_add=True)

    # User Type Fields
    is_customer = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    # Shop Related Fields
    blacklisted = models.BooleanField(default=False)
    balance = models.DecimalField(default=0.00, max_digits=13, decimal_places=2)
    has_discount = models.BooleanField(default=False)

    # Account Activation Fields
    is_active = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)
    is_protested = models.BooleanField(default=False)
    application_memo = models.TextField(default="")

    # Employee Related Fields
    # Positive Number means promotion. Negative Number means demotion.
    position_tier = models.SmallIntegerField(default=0)

    # Warnings and Compliments
    warnings = models.SmallIntegerField(default=0)
    compliments = models.SmallIntegerField(default=0)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    REQUIRED_FIELDS = [
        'email',
        'first_name',
        'last_name',
    ]

    @property
    def user_type(self):
        """
        Returns User Type
        """
        if self.is_customer:
            return "Customer"
        if self.is_employee:
            return "Employee"
        return "Owner"

    @property
    def full_name(self):
        """
        Returns the user's full name
        """
        return f"{self.first_name} {self.last_name}"

    def __str__(self) -> str:
        return f"[Username: {self.username}, Email: {self.email}]"
