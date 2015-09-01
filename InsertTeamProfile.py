import goldsberry
import pandas as pd
import sqlite3
def getteamprofile(filter_season):
    gameids = goldsberry.GameIDs()
    gameids = pd.DataFrame(gameids)
    teamids = gameids['HOME_TEAM_ID'].ix[gameids['SEASON']
            ==filter_season].drop_duplicates()
    teamids_full = pd.DataFrame() # Create empty Data Frame
    for i in teamids.values:
            team = goldsberry.team.team_info(i)
            teamids_full = pd.concat([teamids_full,
                    pd.DataFrame(team.info())])
    return teamids_full

def InsertTeamProfile():
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()
    para = 'insert into teamprofile values(?,?,?,?,?,\
                                           ?,?,?,?,?)'
    team = getteamprofile('2014')
    for i in range(0,len(team)):
        fillset = [team['TEAM_ID'][i:i+1][0],team['TEAM_NAME'][i:i+1][0],team['MAX_YEAR'][i:i+1][0],
                team['MIN_YEAR'][i:i+1][0],team['PCT'][i:i+1][0],team['TEAM_ABBREVIATION'][i:i+1][0],
                team['TEAM_CITY'][i:i+1][0],team['TEAM_CODE'][i:i+1][0],team['TEAM_CONFERENCE'][i:i+1][0],
                team['TEAM_DIVISION'][i:i+1][0]]
        cur.execute(para,fillset)
    conn.commit()
    cur.close()
    conn.close()

if __name__=='__main__':
    InsertTeamProfile()

