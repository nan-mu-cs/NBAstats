# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='playerdata',
            fields=[
                ('playid', models.IntegerField(serialize=False, primary_key=True)),
                ('display_last_comma_first', models.CharField(max_length=128)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='playerprofile',
            fields=[
                ('playid', models.IntegerField(serialize=False, primary_key=True)),
                ('display_last_comma_first', models.CharField(max_length=128)),
                ('rosterstatus', models.IntegerField()),
                ('from_year', models.IntegerField()),
                ('to_year', models.IntegerField()),
                ('playercode', models.CharField(max_length=128)),
                ('team_id', models.BigIntegerField()),
                ('team_city', models.CharField(max_length=128)),
                ('team_name', models.CharField(max_length=128)),
                ('team_abbr', models.CharField(max_length=128)),
                ('team_code', models.CharField(max_length=80)),
            ],
            options={
                'db_table': 'playerinfo',
            },
        ),
    ]
