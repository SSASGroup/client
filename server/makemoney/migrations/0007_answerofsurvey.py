# Generated by Django 2.2.1 on 2019-06-13 14:08

import django.contrib.postgres.fields
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('makemoney', '0006_auto_20190613_2042'),
    ]

    operations = [
        migrations.CreateModel(
            name='answerOfsurvey',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('numOfQuestions', models.IntegerField()),
                ('idOfSurvey', models.IntegerField()),
                ('questions', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.jsonb.JSONField(default=dict), size=None)),
                ('nameOfUser', models.CharField(max_length=100)),
                ('idOfReleaser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='makemoney.Users')),
            ],
        ),
    ]