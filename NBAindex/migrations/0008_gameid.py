# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('NBAindex', '0007_userprofile'),
    ]

    operations = [
        migrations.CreateModel(
            name='gameid',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('gameid', models.CharField(max_length=12)),
                ('date', models.CharField(max_length=9)),
                ('year', models.IntegerField()),
                ('month', models.IntegerField()),
                ('day', models.IntegerField()),
                ('hometeamid', models.CharField(max_length=12)),
                ('visitorteamid', models.CharField(max_length=12)),
            ],
            options={
                'db_table': 'gameid',
            },
        ),
    ]
