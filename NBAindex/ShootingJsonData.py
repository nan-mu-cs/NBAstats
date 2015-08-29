__author__ = 'andyyang'
import re
import pandas as pd
import requests

def mapValue(game_id,x,i):
    try:
        return game_id[x][i]
    except:
        return ''
def GetGameLog(gameurl):
    response = requests.get(gameurl)
    gamelog = response.json()['resultSets'][0]['rowSet']
    gameheader = response.json()['resultSets'][0]['headers']
    return gamelog

def ShootingJsonData(shooturl,gameurl):
    response = requests.get(shooturl)
    shootlog = response.json()['resultSets'][0]['rowSet']
    shootheader = response.json()['resultSets'][0]['headers']
    gamelog = GetGameLog(gameurl)
    game_id = {}
    pattern = re.compile(r'(\w+)\s(\d+),\s(\d+)')
    for log in gamelog:
        try:
            search = re.findall(pattern,log[3])[0]
            month = search[0]
            day = search[1]
            year = search[2]
            game_id[log[2]] = [month,day,year,log[4]]
        except:
            game_id[log[2]] = ['','','','']
    df = pd.DataFrame(shootlog,columns=shootheader)
    df['month'] = df['GAME_ID'].map(lambda x: mapValue(game_id,x,0))
    df['day'] = df['GAME_ID'].map(lambda x: mapValue(game_id,x,1))
    df['year'] = df['GAME_ID'].map(lambda x: mapValue(game_id,x,2))
    df['matchup'] = df['GAME_ID'].map(lambda x: mapValue(game_id,x,3))
    return df.to_json(orient='records')

def GameId(gameurl):
    gamelog = GetGameLog(gameurl)
    game_info = []
    pattern = re.compile(r'(\w+)\s(\d+),\s(\d+)')
    for log in gamelog:
        try:
            search = re.findall(pattern,log[3])[0]
            month = search[0]
            day = search[1]
            year = search[2]
            ele = {}
            ele = {
                'game_id':log[2],
                'month':month,
                'day':day,
                'year':year,
                'match':log[4],
            }
            game_info.append(ele)
        except:
            ele = {}
    return game_info
