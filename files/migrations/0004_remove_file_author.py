# Generated by Django 3.2.5 on 2021-08-04 11:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0003_file_author'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='author',
        ),
    ]
