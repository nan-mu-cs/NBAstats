# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('NBAindex', '0003_auto_20150819_0941'),
    ]

    operations = [
        migrations.RenameField(
            model_name='playerdata',
            old_name='playid',
            new_name='playerid',
        ),
        migrations.RenameField(
            model_name='playerprofile',
            old_name='playid',
            new_name='playerid',
        ),
    ]
