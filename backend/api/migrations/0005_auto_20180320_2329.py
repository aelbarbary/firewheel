# Generated by Django 2.0 on 2018-03-20 23:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20180320_0004'),
    ]

    operations = [
        migrations.AlterField(
            model_name='class',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='school', to='api.School'),
        ),
        migrations.AlterField(
            model_name='class',
            name='status',
            field=models.CharField(default='ACTIVE', max_length=10),
        ),
    ]
