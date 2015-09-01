# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('NBAindex', '0008_gameid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gameid',
            name='id',
        ),
        migrations.AlterField(
            model_name='gameid',
            name='gameid',
            field=models.CharField(max_length=12, serialize=False, primary_key=True),
        ),
    ]
