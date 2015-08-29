# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('NBAindex', '0004_auto_20150819_1002'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='playerprofile',
            options={'ordering': ['display_last_comma_first']},
        ),
    ]
