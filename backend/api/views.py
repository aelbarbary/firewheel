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

class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all().order_by('name')
    serializer_class = SchoolSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all().order_by('first_name')
    serializer_class = TeacherSerializer

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all().order_by('name')
    serializer_class = ClassSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all().order_by('name')
    serializer_class = SubjectSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('first_name')
    serializer_class = StudentSerializer

class TeacherClassSubjectViewSet(viewsets.ModelViewSet):
    queryset = TeacherClassSubject.objects.all().order_by('teacher')
    serializer_class = TeacherClassSubjectSerializer

class CheckinViewSet(viewsets.ModelViewSet):
    queryset = Checkin.objects.all().order_by('student_id')
    serializer_class = CheckinSerializer
