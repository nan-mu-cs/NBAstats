# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('NBAindex', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='playerdata',
            name='player_carerr_stat_url',
            field=models.CharField(default='', max_length=512),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='playerdata',
            name='player_img_url',
            field=models.CharField(default='', max_length=256),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='playerdata',
            name='player_info_url',
            field=models.CharField(default='', max_length=256),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='playerdata',
            name='player_news_url',
            field=models.CharField(default='', max_length=256),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='playerdata',
            name='shooting_log',
            field=models.CharField(default='', max_length=512),
            preserve_default=False,
        ),
        migrations.AlterModelTable(
            name='playerdata',
            table='playerdata',
        ),
    ]
