from django.conf.urls import include, url
from django.conf.urls.static import static
from django.conf import settings
from registration.backends.simple.views import RegistrationView
from django.contrib.auth.decorators import login_required
from rest_framework import routers
from api import views
from rest_framework.authtoken import views as auth_view

app_name = 'api'

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'providers', views.ProviderViewSet)
router.register(r'offers', views.OfferViewSet)
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-token-auth/', auth_view.obtain_auth_token),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
