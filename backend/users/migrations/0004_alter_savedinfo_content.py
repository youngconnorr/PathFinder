# Generated by Django 5.0.4 on 2024-04-25 04:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_savedinfo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='savedinfo',
            name='content',
            field=models.JSONField(),
        ),
    ]
