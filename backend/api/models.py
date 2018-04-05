from django.db import models
from datetime import date, datetime
import uuid

# Create your models here.
# class School(models.Model):
#     name = models.CharField(max_length=2000)
#     address_line = models.CharField(max_length=200)
#     state = models.CharField(max_length=200)
#     city = models.CharField(max_length=200)
#     zip = models.IntegerField(default=0)
#     date_created = models.DateField(max_length=8, blank=True, default = datetime.now)
#     status = models.CharField(max_length=10, default = 'ACTIVE')
#     def __str__(self):
#         return 'Name: ' + self.name
#
# class Class(models.Model):
#     school = models.ForeignKey(School, related_name='classes', on_delete=models.CASCADE)
#     name = models.CharField(max_length=2000)
#     date_created = models.DateField(max_length=8, blank=True, default = datetime.now)
#     status = models.CharField(max_length=10, default = 'ACTIVE')
#     def __str__(self):
#         return '%s' % ( self.name)
#
# class Subject(models.Model):
#     name = models.CharField(max_length=100)
#     description = models.CharField(max_length=2000)
#     status = models.CharField(max_length=10)
#     date_created = models.DateField(max_length=8, blank=True, default = datetime.now)
#     def __str__(self):
#         return 'Name: ' + self.name
#
# class Teacher(models.Model):
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     status = models.CharField(max_length=10)
#     date_created = models.DateField(max_length=8, blank=True, default = datetime.now)
#     def __str__(self):
#         return '%s %s ' % ( self.first_name , self.last_name )
#
# class TeacherClassSubject(models.Model):
#     teacher = models.ForeignKey(Teacher, related_name='teacher_teacher_class_subject', on_delete=models.CASCADE)
#     teacher_class = models.ForeignKey(Class, related_name='class_teacher_class_subject', on_delete=models.CASCADE)
#     subject = models.ForeignKey(Subject, related_name='subject_teacher_class_subject', on_delete=models.CASCADE)
#
# class Student(models.Model):
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     birth_date = models.DateField(max_length=8, blank=True, default = datetime.now)
#     gender = models.CharField(max_length=1)
#     email =  models.CharField(max_length=100)
#     phone = models.CharField(max_length=10)
#     parent_1_email = models.CharField(max_length=100)
#     parent_1_phone = models.CharField(max_length=10)
#     parent_2_email = models.CharField(max_length=100)
#     parent_2_phone = models.CharField(max_length=10)
#     student_class = models.ForeignKey(Class, related_name='class_students', on_delete=models.CASCADE, default=-1)
#     status = models.CharField(max_length=10)
#     date_created = models.DateField(max_length=8, blank=True, default = datetime.now)
#     def __str__(self):
#         return '%s %s ' % ( self.first_name , self.last_name )
#
# class Checkin(models.Model):
#     student = models.ForeignKey(Student, related_name='student_checkins', on_delete=models.CASCADE)
#     date_time = models.DateField(max_length=8, blank=True, default = datetime.now)

class Provider(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    website = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    picture = models.CharField(max_length=2000)
    tags = models.CharField(max_length=2000)
    address_line = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    zip = models.CharField(max_length=5)
    date_created = models.DateField(max_length=8, blank=True, default = datetime.now)
    status = models.CharField(max_length=10, default = 'ACTIVE')
    def __str__(self):
        return 'Name: %s %s' % ( self.first_name, self.last_name )

class Offer(models.Model):
    title = models.CharField(max_length=2000)
    picture = models.CharField(max_length=200)
    cost = models.IntegerField(default = 0)
    provider = models.ForeignKey(Provider, related_name='offers', on_delete=models.CASCADE)
    def __str__(self):
        return 'Name: ' + self.title
