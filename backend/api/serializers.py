from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from api.models import *

class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api:user-detail")
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups', 'password')

    def create(self, validated_data):
            user = User.objects.create_user(validated_data['username'], validated_data['email'],
                 validated_data['password'])
            return user

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class OfferSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api:offer-detail")
    # provider = ProviderSerializer(read_only=False)
    provider_id = serializers.IntegerField(source='provider.id')
    class Meta:
        model = Offer
        fields = ('url', 'provider_id', 'title', 'picture', 'cost')

    def create(self, validated_data):
            print(validated_data)
            new_offer = Offer.objects.create(title=validated_data['title'],
                                             picture=validated_data['picture'],
                                             cost=validated_data['cost'],
                                             provider_id=validated_data['provider']['id'])
            return new_offer

    def update(self, instance, validated_data):
            print(validated_data)
            instance.title = validated_data['title']
            instance.picture=validated_data['picture']
            instance.cost=validated_data['cost']
            instance.provider_id=validated_data['provider']['id']
            instance.save()
            return instance

class ProviderSerializer(serializers.HyperlinkedModelSerializer):
    # url = serializers.HyperlinkedIdentityField(view_name="api:provider-detail")
    offers = OfferSerializer(many=True, read_only=True)
    class Meta:
        model = Provider
        fields = ('first_name'
                        , 'last_name'
                        , 'website'
                        , 'email'
                        , 'phone'
                        , 'picture'
                        , 'tags'
                        , 'address_line'
                        , 'state'
                        , 'city'
                        , 'zip'
                        ,'offers'
                        )
