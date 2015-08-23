__author__ = 'andyyang'

import requests
import sqlite3

def population(url):
    response = requests.get(url)
    data = response.json()['resultSets'][0]['rowSet']
    player_info_para = 'http://stats.nba.com/stats/commonplayerinfo?LeagueID=00&PlayerID=%s&SeasonType=Regular+Season'
    #http://stats.nba.com/feeds/RotoWirePlayers-583598/203112.json
    player_news_para = 'http://stats.nba.com/feeds/RotoWirePlayers-583598/%s.json'
    #http://stats.nba.com/stats/playerprofilev2?GraphStat=PTS&LeagueID=00&MeasureType=Base&PerMode=PerGame&PlayerID=203112&SeasonType=Regular+Season&SeasonType=Playoffs
    # or http://stats.nba.com/stats/playercareerstats?LeagueID=00&PerMode=PerGame&PlayerID=203112
    player_career_stat_para = 'http://stats.nba.com/stats/playercareerstats?LeagueID=00&PerMode=PerGame&PlayerID=%s'
    shooting_log_pata = 'http://stats.nba.com/stats/shotchartdetail?Period=0&VsConference=&LeagueID=00'\
                    '&LastNGames=0&TeamID=0&Position=&Location=&Outcome=&ContextMeasure=FGA&DateFrom=&'\
                    'StartPeriod=&DateTo=&OpponentTeamID=0&ContextFilter=&RangeType=&Season=2014-15&A'\
                    'headBehind=&PlayerID=%s&EndRange=&VsDivision=&PointDiff=&RookieYear=&GameSegment=&'\
                    'Month=0&ClutchTime=&StartRange=&EndPeriod=&SeasonType=Regular+Season&SeasonSegment=&GameID='
    player_img_pata = 'http://stats.nba.com/media/players/230x185/%s.png'

    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()
    para1 = 'insert into playerprofile values(?,?,?,?,?,?,?,?,?,?,?)'
    para2 = 'insert into playerdata values(?,?,?,?,?,?,?)'
    for ele in data:
        fillset=[ele[1],ele[2],ele[3],ele[4],ele[5],ele[6],ele[7],ele[8],ele[9],ele[10],ele[0]]
        cur.execute(para1,fillset)

        player_info_url = player_info_para%ele[0]
        player_news_url = player_news_para%ele[0]
        player_career_stat_url = player_career_stat_para%ele[0]
        shooting_log_url = shooting_log_pata%ele[0]
        player_img_url = player_img_pata%ele[0]
        '''playerdata.objects.get_or_create(
                                  playerid = ele[0],
                                  display_last_comma_first = ele[1],
                                  player_info_url = player_info_url,
                                  player_news_url = player_news_url,
                                  player_career_stat_url = player_career_stat_url,
                                  shooting_log_url = shooting_log_url,
                                  player_img_url = player_img_url)
        '''
        fillset = [ele[0],ele[1],player_img_url,player_info_url,player_news_url,shooting_log_url,
                   player_career_stat_url]
        cur.execute(para2,fillset)
        conn.commit()
    cur.close()
    conn.close()
if __name__ == '__main__':
    population('http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=1'\
                '&LeagueID=00&Season=2015-16')

