# Generated by Django 5.0.4 on 2024-06-13 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_savedinfo_month'),
    ]

    operations = [
        migrations.AddField(
            model_name='savedinfo',
            name='country',
            field=models.CharField(default='Canada', max_length=50),
        ),
    ]
