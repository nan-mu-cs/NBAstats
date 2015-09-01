# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('NBAindex', '0009_auto_20150901_0908'),
    ]

    operations = [
        migrations.CreateModel(
            name='teamprofile',
            fields=[
                ('teamid', models.CharField(max_length=12, serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=20)),
                ('maxyear', models.IntegerField()),
                ('minyear', models.IntegerField()),
                ('pct', models.FloatField()),
                ('teamabbrev', models.CharField(max_length=10)),
                ('city', models.CharField(max_length=30)),
                ('teamcode', models.CharField(max_length=10)),
                ('conference', models.CharField(max_length=10)),
                ('division', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'teamprofile',
            },
        ),
    ]
