# Generated by Django 2.0 on 2018-03-20 23:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20180320_2344'),
    ]

    operations = [
        migrations.RenameField(
            model_name='class',
            old_name='school',
            new_name='class_school',
        ),
    ]
