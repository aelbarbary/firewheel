# Generated by Django 2.0 on 2018-03-25 06:38

import datetime
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=2000)),
                ('pic_url', models.CharField(max_length=200)),
                ('cost', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('website', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=20)),
                ('profile_pic_url', models.CharField(max_length=2000)),
                ('tags', models.CharField(max_length=2000)),
                ('address_line', models.CharField(max_length=200)),
                ('state', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('zip', models.CharField(max_length=5)),
                ('date_created', models.DateField(blank=True, default=datetime.datetime.now, max_length=8)),
                ('status', models.CharField(default='ACTIVE', max_length=10)),
            ],
        ),
        migrations.DeleteModel(
            name='School',
        ),
        migrations.AddField(
            model_name='offer',
            name='provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='offers', to='api.Provider'),
        ),
    ]
