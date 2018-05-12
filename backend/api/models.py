from django.db import models
from datetime import date, datetime
import uuid

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
    name = models.CharField(max_length=2000)
    description = models.CharField(max_length=8000)
    picture = models.CharField(max_length=200)
    price = models.IntegerField(default = 0)
    provider = models.ForeignKey(Provider, related_name='offers', on_delete=models.CASCADE)
    def __str__(self):
        return 'Name: ' + self.name
