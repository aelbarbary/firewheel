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

class ClassSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api:class-detail")
    school_id = serializers.IntegerField(source='school.id')
    class Meta:
        model = Class
        fields = ('url', 'name', 'school_id')

    def create(self, validated_data):
            print(validated_data)
            new_class = Class.objects.create(name=validated_data['name'],
                                    school_id=validated_data['school']['id'])
            return new_class

class SchoolSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api:school-detail")
    classes = ClassSerializer(many=True)
    class Meta:
        model = School
        fields = ('url','name', 'address_line', 'state', 'city', 'zip', 'classes')

    def create(self, validated_data):
            classes_data = validated_data.pop('classes')
            school = School(name= validated_data['name'],
                            address_line=validated_data['address_line'],
                            state=validated_data['state'],
                            city=validated_data['city'],
                            zip=validated_data['zip'])
            school.save()
            for class_data in classes_data:
                print(class_data)
                Class.objects.create(school=school, **class_data)
            return school

class TeacherSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api:teacher-detail")
    class Meta:
        model = Teacher
        fields = ('url', 'first_name', 'last_name')

class StudentSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api:student-detail")
    class_id = serializers.IntegerField(source='student_class.id')
    class Meta:
        model = Student
        fields = ('url', 'first_name', 'last_name', 'class_id')
    def create(self, validated_data):
            print(validated_data)
            student = Student(first_name= validated_data['first_name'],
                            last_name=validated_data['last_name'],
                            student_class_id=validated_data['student_class']['id'],
                            )
            student.save()
            return student

class SubjectSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api:subject-detail")
    class Meta:
        model = Subject
        fields = ('url', 'name')

class TeacherClassSubjectSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api:teacher-class-subject-detail")
    class Meta:
        model = TeacherClassSubject
        fields = ('url', 'teacher_id')


class CheckinSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api:checkin-detail")
    student_id = serializers.IntegerField(source='student.id')
    class Meta:
        model = Checkin
        fields = ('url', 'student_id', 'date_time')

    def create(self, validated_data):
            print(validated_data)
            checkin = Checkin(student_id= validated_data['student']['id'],
                            date_time=validated_data['date_time'],
                            )
            checkin.save()
            return checkin
