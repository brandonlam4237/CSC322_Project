from datetime import date
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.apps import apps
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response


from .serializers import CustomerSerializer, UserSerializer
from .serializers import CartItemsSerializer, BuildSerializer
from .serializers import OrderSerializer

User = get_user_model()
Product = apps.get_model('items', 'Product')
ComputerPart = apps.get_model('items', 'ComputerPart')
CustomBuild = apps.get_model('items', 'CustomBuild')
Cart = apps.get_model('items', 'Cart')
CartItem = apps.get_model('items', 'CartItem')
Order = apps.get_model('items', 'Order')
CustomBuild = apps.get_model('items', 'CustomBuild')
Protest = apps.get_model('user', 'Protest')


"""
User Detail Views
"""


class UserList(APIView):
    """
    An API View class for retrieving UserAccount list.

    Permissions
    -----------
        User must be an owner type

    Methods
    -------
    get(request)
        Handles a GET request to retrieve all users that aren't owners
    """

    def get(self, request, format=None):
        """
        Handles a GET request to retrieve all users that aren't owners
        """
        try:
            user = request.user

            if not user.is_superuser:
                return Response(
                    {'error': 'User doesn\'t have the proper '
                     'permissions for accessing customer data'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Only get users that aren't owners
            users = User.objects.order_by(
                '-date_created').filter(is_superuser=False)
            users = UserSerializer(users, many=True)

            return Response(
                {'users': users.data},
                status=status.HTTP_200_OK
            )

        except AttributeError:
            return Response(
                {'error': 'Something went wrong when retrieving customer data'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CustomerList(APIView):
    """
    An API View class for retrieving Customer UserAccount list.

    Permissions
    -----------
        User must be an owner/Employee type

    Methods
    -------
    get(request)
        Handles a GET request to retrieve all Customers that aren't owners

        Optional Request Params:
            activated? : boolean
    """

    def get(self, request, format=None):
        """
        Handles a GET request to retrieve all Customers that aren't owners

        Optional Request Params:
            activated? : boolean
        """
        user = request.user

        activated = request.query_params.get('activated')

        if not (user.is_employee or user.is_superuser):
            return Response(
                {'error': 'User doesn\'t have the proper permissions for accessing customer data'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # No 'activated' parameter
        if not activated:
            customers = User.objects.order_by(
                '-date_created').filter(is_customer=True)
            customers = CustomerSerializer(customers, many=True)
            return Response(
                {'customers': customers.data},
                status=status.HTTP_200_OK
            )

        # Check if 'activated' parameter is available
        if activated == "true":
            customers = User.objects.order_by(
                '-date_created').filter(is_customer=True, is_active=True)
            customers = CustomerSerializer(customers, many=True)

            return Response(
                {'customers': customers.data},
                status=status.HTTP_200_OK
            )

        if activated == "false":
            customers = User.objects.order_by(
                '-date_created').filter(is_customer=True, is_active=False)
            customers = CustomerSerializer(customers, many=True)

            return Response(
                {'customers': customers.data},
                status=status.HTTP_200_OK
            )

        return Response(
            {'error': 'The \'activated\' parameter can only be true, false, or empty'},
            status=status.HTTP_400_BAD_REQUEST
        )


class CustomerDetail(APIView):
    """
    An API View class for retrieving Customer UserAccount detail.

    Permissions
    -----------
        User must be an owner/Employee type

    Methods
    -------
    get(request)
        Handles a GET request to retrieve Customer detail
    """

    def get(self, request, id, format=None):
        """
        Handles a GET request to retrieve Customer detail
        """
        try:
            user = request.user

            if not (user.is_employee or user.is_superuser):
                return Response(
                    {'error': 'User doesn\'t have the proper permissions for accessing customer data'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            customer = User.objects.get(id=id)

            if customer.is_employee:
                return Response(
                    {'error': 'User is not a customer'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            customer = CustomerSerializer(customer, many=False)
            return Response(
                {'customer': customer.data},
                status=status.HTTP_200_OK
            )

        except ObjectDoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )


"""
Modify User Views
"""


class AddBalance(APIView):
    """
    An API View class for adding balance.

    Permissions
    -----------
        User must be a Customer type

    Methods
    -------
    patch(request)
        Handles a PATCH request to update Customer balance
    """

    def validate_credit_card(self, card_number: str) -> bool:
        """This function validates a credit card number."""
        try:
            # 1. Change datatype to list[int]
            card_number = [int(num) for num in card_number]

            # 2. Remove the last digit:
            check_digit = card_number.pop(-1)

            # 3. Reverse the remaining digits:
            card_number.reverse()

            # 4. Double digits at even indices
            card_number = [num * 2 if idx % 2 == 0
                           else num for idx, num in enumerate(card_number)]

            # 5. Subtract 9 at even indices if digit is over 9
            # (or you can add the digits)
            card_number = [num - 9 if idx % 2 == 0 and num > 9
                           else num for idx, num in enumerate(card_number)]

            # 6. Add the checkDigit back to the list:
            card_number.append(check_digit)

            # 7. Sum all digits:
            check_sum = sum(card_number)

            # 8. If checkSum is divisible by 10, it is valid.
            return check_sum % 10 == 0
        except Exception:
            return False

    def validate_exp_date(self, exp_date: str) -> bool:
        """This function validates a credit card expiration date."""
        try:
            if len(exp_date) != 6:
                return False

            if int(exp_date[:2]) > 12:
                return False

            int(exp_date[2:])

            return True
        except Exception:
            return False

    def validate_balance(self, balance: float) -> bool:
        """This function validates the balance input."""
        if balance <= 0 or balance > 15000:
            return False
        return True

    def is_expired(self, exp_date: str) -> bool:
        """This function checks if the card is expired."""
        exp_month = int(exp_date[:2])
        exp_year = int(exp_date[2:])

        today = date.today()
        exp_date = date(year=exp_year, month=exp_month, day=1)

        return today > exp_date

    def patch(self, request):
        """Handles a PATCH request to update Customer balance"""
        user = request.user

        if not user.is_customer:
            return Response(
                {'error': 'User must be a customer to use this endpoint'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        credit_card_num = request.data.get('card_number')
        exp_date = request.data.get('exp_date')
        balance = request.data.get('balance')

        balance = round(balance, 2)

        if not credit_card_num:
            return Response(
                {'error': 'Please provide credit card number'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not exp_date:
            return Response(
                {'error': 'Please provide expiration date'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not balance:
            return Response(
                {'error': 'Please provide balance to add'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not self.validate_credit_card(credit_card_num):
            return Response(
                {'error': 'Invalid credit card'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not self.validate_exp_date(exp_date):
            return Response(
                {'error': 'Invalid expiration date'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if self.is_expired(exp_date):
            return Response(
                {'error': 'Credit card is expired'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not self.validate_balance(balance):
            return Response(
                {'error': 'Balance must be over 0 and less than or equal to 15000'},
                status=status.HTTP_400_BAD_REQUEST
            )

        User.objects.filter(id=user.id).update(balance=user.balance+balance)
        return Response(
            {'success': 'User balance has been updated'},
            status=status.HTTP_200_OK
        )


class BlacklistedUserList(APIView):
    """
    An API View class for retrieving blacklisted UserAccounts.

    Permissions
    -----------
        User must be an owner type

    Methods
    -------
    get(request)
        Handles a GET request to retrieve blacklisted UserAccounts detail
    """

    def get(self, request, format=None):
        """
        Handles a GET request to retrieve blacklisted UserAccounts detail
        """
        try:
            user = request.user

            if not user.is_superuser:
                return Response(
                    {'error': 'User doesn\'t have the proper permissions for accessing customer data'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            blacklisted_users = User.objects.order_by(
                '-date_created').filter(blacklisted=True)
            blacklisted_users = UserSerializer(blacklisted_users, many=True)

            return Response(
                {'blacklist': blacklisted_users.data},
                status=status.HTTP_200_OK
            )

        except AttributeError:
            return Response(
                {'error': 'Something went wrong when retrieving customer data'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class BlacklistUser(APIView):
    """
    An API View class for retrieving blacklisted UserAccounts.

    Permissions
    -----------
        User must be an owner type

    Methods
    -------
    patch(request)
        Handles a PATCH request to blacklist a user based on user_id
    """

    def patch(self, request, id, format=None):
        """
        Handles a PATCH request to blacklist a user based on user_id
        """
        user = request.user

        if not user.is_superuser:
            return Response(
                {'error': 'User doesn\'t have the proper permissions'
                    ' for accessing customer data'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user_to_blacklist = get_object_or_404(User, id=id)

        if user_to_blacklist.is_superuser:
            return Response(
                {'error': 'Cannot blacklist superusers'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if user_to_blacklist.blacklisted:
            return Response(
                {'error': 'User is already blacklisted'},
                status=status.HTTP_400_BAD_REQUEST
            )

        User.objects.filter(id=user_to_blacklist.id).update(blacklisted=True)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ActivateUser(APIView):
    """
    An API View class for activating Employee/Customer UserAccounts.

    Permissions
    -----------
        User must be an owner/Employee type

    Methods
    -------
    patch(request)
        Handles a PATCH request to activate a user
    """

    def patch(self, request, id, format=None):
        """
        Handles a PATCH request to activate a user
        """
        user = request.user

        if user.is_customer:
            return Response(
                {'detail': 'Customers do not have permission for this endpoint'},
                status=status.HTTP_403_FORBIDDEN
            )

        user_to_activate = get_object_or_404(User, id=id)

        if user_to_activate.is_employee and not user.is_superuser:
            return Response(
                {'error': 'User doesn\'t have the proper permissions to activate users'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        memo = request.data.get('memo')
        if not memo:
            return Response(
                {'error': 'Invalid memo'},
                status=status.HTTP_400_BAD_REQUEST
            )

        memo = str(memo)

        User.objects.filter(id=user_to_activate.id).update(
            is_active=True, application_memo=memo)
        return Response(status=status.HTTP_204_NO_CONTENT)


class RejectUser(APIView):
    """
    An API View class for activating Employee/Customer UserAccounts

    Permissions
    -----------
        User must be an owner/Employee type

    Methods
    -------
    patch(request)
        Handles a PATCH request to reject a user
    """

    def patch(self, request, user_id, format=None):
        """
        Handles a PATCH request to activate a user
        """
        user = request.user

        if user.is_customer:
            return Response(
                {'detail': 'Customers do not have permission for this endpoint'},
                status=status.HTTP_403_FORBIDDEN
            )

        user_to_reject = get_object_or_404(User, id=user_id)

        if user_to_reject.is_employee and not user.is_superuser:
            return Response(
                {'error': 'User doesn\'t have the proper permissions to activate reject users'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        memo = request.data.get('memo')
        if not memo:
            return Response(
                {'error': 'Invalid memo'},
                status=status.HTTP_400_BAD_REQUEST
            )

        memo = str(memo)

        User.objects.filter(id=user_to_reject.id).update(
            rejected=True, application_memo=memo)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProtestRejection(APIView):
    """
    An API View class for activating Employee/Customer UserAccounts

    Permissions
    -----------
        User must be an Customer/Employee type

    Methods
    -------
    post(request)
        Handles a POST request to activate a user
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        """
        Handles a POST request to activate a user
        """
        username = request.data.get('username')

        if not username:
            return Response(
                {'detail': 'Must provide a username'},
                status=status.HTTP_400_BAD_REQUEST
            )

        protestor = get_object_or_404(User, username=username)

        if not protestor.rejected:
            return Response(
                {'detail': 'You must be a rejected applicant to send a protest'},
                status=status.HTTP_403_FORBIDDEN
            )

        if protestor.protested:
            return Response(
                {'detail': 'You can only protest once'}
            )

        Protest.objects.create(protestor=protestor)
        User.objects.filter(username=username).update(protested=True)
        return Response(status=status.HTTP_201_CREATED)


"""
Shopping Cart Views
"""


class CustomerCart(APIView):
    """
    Endpoint to get a customer shopping cart
    """

    def get(self, request):
        """
        Handles a GET request to get customer cart
        """
        user = request.user

        if user.user_type != "Customer":
            return Response(
                {'error': 'Only customers can access their own cart'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        shopping_cart = Cart.objects.get(customer=user)
        cart_items = CartItem.objects.filter(cart=shopping_cart).all()
        cart_items = CartItemsSerializer(cart_items, many=True)

        total_price = shopping_cart.total_price
        num_items = shopping_cart.num_items

        return Response(
            {
                'items': cart_items.data,
                'total_price': total_price,
                'num_items': num_items
            },
            status=status.HTTP_200_OK
        )


class ManageCart(APIView):
    """
    An API View class for managing user cart.

    Permissions
    -----------
        User must be Customer type

    Methods
    -------
    post(request)
        Handles a POST request to add items to cart

    patch(request)
        Handles a PATCH request to edit quantity of items in cart
    """

    def post(self, request, id):
        """
        Handles a POST request to add item to customer cart
        """
        user = request.user

        if user.user_type != "Customer":
            return Response(
                {'error': 'Only customers can access their own cart'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        product = get_object_or_404(Product, id=id)
        shopping_cart = user.cart

        cart_item, _ = CartItem.objects.get_or_create(
            cart=shopping_cart, product=product)
        if cart_item.quantity < 10:
            cart_item.quantity += 1
            cart_item.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(
                {'error': 'You can only have 10 of this item'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def patch(self, request, id):
        """
        Handles a PATCH request to change quantity of an item in a cart or delete it
        """
        user = request.user

        if user.user_type != "Customer":
            return Response(
                {'error': 'Only customers can access their own cart'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            quantity = request.data.get('quantity')
            if quantity is None:
                return Response(
                    {'error': 'Please enter the quantity amount'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            quantity = int(quantity)
            if quantity < 0 or quantity > 10:
                return Response(
                    {'error': 'Quantity can only be between 0 and 10'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except ValueError:
            return Response(
                {'error': 'Quantity is invalid'},
                status=status.HTTP_400_BAD_REQUEST
            )

        product = get_object_or_404(Product, id=id)
        shopping_cart = user.cart

        try:
            cart_item = CartItem.objects.get(
                cart=shopping_cart, product=product)
            if quantity == 0:
                cart_item.delete()
            else:
                cart_item.quantity = quantity
                cart_item.save()
        except ObjectDoesNotExist:
            return Response(
                {'error': 'Object to patch doesn\'t exist'},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            status=status.HTTP_205_RESET_CONTENT
        )


"""
Order Views
"""


class ManageOrders(APIView):
    """
    An API View class for Managing User Orders

    Permissions
    -----------
        User must be Customer type

    Methods
    -------
    get(request)
        Handles a GET request to retrieve user orders

    post(request)
        Handles a POST request to submit a user order
    """

    def get(self, request):
        """
        Handles a GET request to retrieve user orders
        """
        user = request.user

        if user.user_type != "Customer":
            return Response(
                {'error': 'Only customers can submit orders'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        orders = Order.objects.filter(customer=user)
        serializer = OrderSerializer(orders, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request):
        """
        Handles a POST request to submit a user order
        """
        user = request.user

        if user.user_type != "Customer":
            return Response(
                {'error': 'Only customers can submit orders'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if user.cart.num_items == 0:
            return Response(
                {'error': 'Customer cannot have an empty cart'},
                status=status.HTTP_400_BAD_REQUEST
            )

        address = request.data.get('address')
        if not address:
            return Response(
                {'error': 'Address must be provided'},
                status=status.HTTP_400_BAD_REQUEST
            )

        cart = user.cart

        if cart.total_price > user.balance:
            user.warnings += 1
            user.save()
            return Response(
                {'error': 'Insufficient balance'},
                status=status.HTTP_403_FORBIDDEN
            )

        user.balance -= cart.total_price if not user.has_discount else round(
            cart.total_price * 0.9, 2)
        user.save()

        cart_items = cart.cart_items.all()
        new_order = Order(customer=user, address=address,
                          total_price=cart.total_price)
        new_order.save()
        for item in cart_items:
            new_order.items.add(item)
        new_order.save()
        cart.cart_items.clear()

        return Response(status=status.HTTP_201_CREATED)


class CheckoutBuild(APIView):
    """
    Endpoint to order a custom build
    """

    def post(self, request, id):
        """
        Handles a POST request for checking out a build
        """
        user = request.user

        if user.user_type != "Customer":
            return Response(
                {'error': 'Only customers can submit orders'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        address = request.data.get('address')
        if not address:
            return Response(
                {'error': 'Address must be provided'},
                status=status.HTTP_400_BAD_REQUEST
            )

        build = get_object_or_404(CustomBuild, id=id)
        cart_item, _ = CartItem.objects.get_or_create(
            product=build, quantity=1)
        total_price = build.total_price

        if total_price > user.balance:
            user.warnings += 1
            user.save()
            return Response(
                {'error': 'Insufficient balance'},
                status=status.HTTP_403_FORBIDDEN
            )

        user.balance -= total_price if not user.has_discount else round(
            total_price * 0.9, 2)
        user.save()

        new_order = Order(customer=user, address=address,
                          total_price=total_price)
        new_order.save()
        new_order.items.add(cart_item)
        new_order.save()

        return Response(status=status.HTTP_201_CREATED)


"""
Builds Views
"""


class GetLatestBuild(APIView):
    """
    Endpoint to get the latest build the user made
    """

    def get(self, request):
        """
        Handles a GET request for retrieving user's latest build
        """
        try:
            user = request.user
            latest_build = CustomBuild.objects.filter(builder=user).latest()
            serializer = BuildSerializer(latest_build)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        except ObjectDoesNotExist:
            return Response(
                {}, status=status.HTTP_200_OK
            )


class MakeBuildVisible(APIView):
    """
    Endpoint to make a build visible
    """

    def patch(self, request, id):
        """
        Handles PATCH request for making a build visible
        """
        user = request.user
        build = get_object_or_404(CustomBuild, id=id)

        if build.builder != user:
            return Response(
                {'error': 'Only the original builder can change this setting'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        build.visible = True
        build.save()
        return Response(
            {'success': 'Build has been made visible'},
            status=status.HTTP_200_OK
        )
