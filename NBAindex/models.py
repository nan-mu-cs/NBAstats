from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class player(models.Model):
    playerid = models.IntegerField(primary_key=True)
    display_last_comma_first = models.CharField(max_length=128)
    class Meta:
        abstract = True

class playerprofile(player):
    #playid = models.IntegerField(primary_key=True)
    #display_last_comma_first = models.CharField(max_length=128)
    rosterstatus = models.IntegerField()
    from_year = models.IntegerField()
    to_year = models.IntegerField()
    playercode = models.CharField(max_length=128)
    team_id = models.BigIntegerField()
    team_city = models.CharField(max_length= 128)
    team_name = models.CharField(max_length= 128)
    team_abbr = models.CharField(max_length= 128)
    team_code = models.CharField(max_length= 80)
    def __unicode__(self):
        return self.display_last_comma_first
    class Meta:
        db_table = 'playerprofile'
        ordering = ['display_last_comma_first']

class playerdata(player):
    #http://stats.nba.com/stats/commonplayerinfo?LeagueID=00&PlayerID=203112&SeasonType=Regular+Season
    player_info_url = models.CharField(max_length= 256)
    #http://stats.nba.com/feeds/RotoWirePlayers-583598/203112.json
    player_news_url = models.CharField(max_length= 256)
    #http://stats.nba.com/stats/playerprofilev2?GraphStat=PTS&LeagueID=00&MeasureType=Base&PerMode=PerGame&PlayerID=203112&SeasonType=Regular+Season&SeasonType=Playoffs
    # or http://stats.nba.com/stats/playercareerstats?LeagueID=00&PerMode=PerGame&PlayerID=203112
    player_career_stat_url = models.CharField(max_length= 512)
    #http://stats.nba.com/stats/shotchartdetail?Period=0&VsConference=&LeagueID=00&LastNGames=0&TeamID=0&Position=&Location=&Outcome=&ContextMeasure=FGA&DateFrom=&StartPeriod=&DateTo=&OpponentTeamID=0&ContextFilter=&RangeType=&Season=2014-15&AheadBehind=&PlayerID=201935&EndRange=&VsDivision=&PointDiff=&RookieYear=&GameSegment=&Month=0&ClutchTime=&StartRange=&EndPeriod=&SeasonType=Regular+Season&SeasonSegment=&GameID=
    shooting_log = models.CharField(max_length= 512)
    #http://stats.nba.com/media/players/230x185/202322.png
    player_img_url = models.CharField(max_length= 256)
    def __unicode__(self):
        return self.display_last_comma_first
    class Meta:
        db_table = 'playerdata'

class gameid(models.Model):
    gameid = models.CharField(max_length=12,primary_key=True)
    date = models.CharField(max_length=9)
    year = models.IntegerField()
    month = models.IntegerField()
    day = models.IntegerField()
    hometeamid = models.CharField(max_length=12)
    visitorteamid = models.CharField(max_length=12)
    def __unicode__(self):
        return self.gameid
    class Meta:
        db_table = 'gameid'

class teamprofile(models.Model):
    teamid = models.CharField(max_length=12,primary_key=True)
    name = models.CharField(max_length=20)
    maxyear = models.IntegerField()
    minyear = models.IntegerField()
    pct = models.FloatField()
    teamabbrev = models.CharField(max_length=10)
    city = models.CharField(max_length=30)
    teamcode = models.CharField(max_length=10)
    conference = models.CharField(max_length=10)
    division = models.CharField(max_length=20)
    def __unicode__(self):
        return self.name
    class Meta:
        db_table = 'teamprofile'

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    email = models.EmailField(blank=True)

    def __unicode__(self):
        return self.user.username

