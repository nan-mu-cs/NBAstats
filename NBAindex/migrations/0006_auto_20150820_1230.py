# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('NBAindex', '0005_auto_20150820_0140'),
    ]

    operations = [
        migrations.RenameField(
            model_name='playerdata',
            old_name='player_carerr_stat_url',
            new_name='player_career_stat_url',
        ),
    ]
