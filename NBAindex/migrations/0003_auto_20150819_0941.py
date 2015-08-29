# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('NBAindex', '0002_auto_20150819_0940'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='playerprofile',
            table='playerprofile',
        ),
    ]
