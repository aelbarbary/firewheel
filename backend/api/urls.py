from django.conf.urls import include, url
from django.conf.urls.static import static
from django.conf import settings
from registration.backends.simple.views import RegistrationView
from django.contrib.auth.decorators import login_required
from rest_framework import routers
from api import views

app_name = 'api'

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'schools', views.SchoolViewSet)
router.register(r'teachers', views.TeacherViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'classes', views.ClassViewSet)
router.register(r'subjects', views.SubjectViewSet)
router.register(r'teacher_class_subject', views.TeacherClassSubjectViewSet)
router.register(r'checkins', views.CheckinViewSet)
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
