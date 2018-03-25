from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.serializers import *
from api.models import *

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.all().order_by('first_name')
    serializer_class = ProviderSerializer

class OfferViewSet(viewsets.ModelViewSet):
    queryset = Offer.objects.all().order_by('title')
    serializer_class = OfferSerializer
