from django.shortcuts import render
from django.contrib.auth import authenticate, login,logout
from django.http import HttpResponse,HttpResponseRedirect
from NBAindex.models import playerdata,playerprofile,gameid,teamprofile
from NBAindex.form import UserCreationForm,UserProfileForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
import string
import json
import requests
import datetime
import re
import NBAindex.ShootingJsonData as sjd

def index(request):
    bychar = {}
    for alp in string.uppercase:
        length = len(playerprofile.objects.filter(display_last_comma_first__startswith=alp))
        part = length/3
        a = {}
        a['part1'] = list(playerprofile.objects.filter(display_last_comma_first__startswith=alp).values("playerid","display_last_comma_first","team_abbr"))[0:part]
        a['part2'] = list(playerprofile.objects.filter(display_last_comma_first__startswith=alp).values("playerid","display_last_comma_first","team_abbr"))[part+1:2*part]
        a['part3'] = list(playerprofile.objects.filter(display_last_comma_first__startswith=alp).values("playerid","display_last_comma_first","team_abbr"))[2*part:length]
        bychar[alp] = a
    #data = playerprofile.objects.values("playerid","display_last_comma_first","team_abbr")
    context = {
        'bychar': bychar,
        'range':range(3)
    }
    #return HttpResponse(json.dumps(bychar,sort_keys=True),content_type="application/json")
    return render(request, 'NBAindex/playerindex.html',{})

def index_initialize(requset):
    bychar = {}
    for alp in string.uppercase:
        resultlist = list(playerprofile.objects.filter(display_last_comma_first__startswith=alp)
                          .values("playerid","display_last_comma_first","team_abbr"));
        length = len(resultlist);
        if(length == 0):
            continue
            '''
        part = length/3 +1
        a = {}
        a['part1'] = resultlist[0:part]
        a['part2'] = resultlist[part:2*part]
        a['part3'] = resultlist[2*part:length]'''
        bychar[alp] = resultlist
    return HttpResponse(json.dumps(bychar,sort_keys=True),content_type="application/json")

def index_search(request):
    bychar = {}
    for alp in string.uppercase:
        resultlist = list(playerprofile.objects.filter(display_last_comma_first__icontains=request.GET['searchname'],
                                                       display_last_comma_first__startswith=alp)
                          .values("playerid","display_last_comma_first","team_abbr"));
        length = len(resultlist);
        if(length == 0):
            continue
        part = length/3 +1
        a = {}
        a['part1'] = resultlist[0:part]
        a['part2'] = resultlist[part:2*part]
        a['part3'] = resultlist[2*part:length]
        bychar[alp] = a
    return HttpResponse(json.dumps(bychar,sort_keys=True),content_type="application/json")

def CountAge(str):
    now = datetime.datetime.now()
    birthtime = datetime.datetime.strptime(str,"%Y-%m-%dT%H:%M:%S")
    firstdayofnow = datetime.datetime(now.year,1,1)
    nowdays = (now - firstdayofnow).days
    firstdayofbirth = datetime.datetime(birthtime.year,1,1)
    daysofbirth = (birthtime - firstdayofbirth).days
    age = now.year - birthtime.year
    if(nowdays>=daysofbirth):
        day = nowdays - daysofbirth
    else:
        age = age - 1
        startdayofyear = datetime.datetime(now.year-1,1,1)
        day = (now - startdayofyear).days
        day = day - daysofbirth
    return age,day

def player_index(request,playerid):
    result = list(playerdata.objects.filter(playerid=playerid).values("player_img_url","player_info_url",
                                                                      "player_news_url","player_career_stat_url"))
    info_url = result[0]['player_info_url']
    img_url = result[0]['player_img_url']
    news_url = result[0]['player_news_url']
    stat_url = result[0]['player_career_stat_url']

    response = requests.get(news_url)
    try:
        news = response.json()['PlayerRotowires']
    except:
        news = {}
    playerinfo = {}
    response = requests.get(info_url)
    try:
        commonplayerinfo = response.json()['resultSets'][0]['rowSet'][0]
        birthtime = commonplayerinfo[6]
        age,day = CountAge(birthtime)
        pt = re.search(u'([0-9]*)\-([0-9]*)',commonplayerinfo[10])
        feet = int(pt.group(1))
        inch = int(pt.group(2))
        height = feet*30.48 + inch*2.54
        playerinfo = {
            'team_img_url':'http://stats.nba.com/media/img/teams/logos/%s_logo.svg'%commonplayerinfo[18],
            'name':commonplayerinfo[3],
            'day':day,
            'age':age,
            'school':commonplayerinfo[7],
            'country':commonplayerinfo[8],
            'state':commonplayerinfo[9],
            'height':height,
            'weight':float(commonplayerinfo[11])*0.4532,
            'number':commonplayerinfo[13],
            'position':commonplayerinfo[14],
            'team_name':commonplayerinfo[17],
            'team_city':commonplayerinfo[20],
            'from_year':commonplayerinfo[21],
            'to_year':commonplayerinfo[22],
        }
    except:
        playerinfo={'team_img_url':'','name':'','day':'','age':'','school':'','country':'',
                    'state':'','height':'','weight':'','number':'','position':'','team_name':'',
                    'team_city':'','from_year':'','to_year':'','pts':'','reb':'','ast':'','pie':'',}
    try:
        playerheadlinestatus = response.json()['resultSets'][1]['rowSet'][0]
        playerinfo['pts'] = playerheadlinestatus[3]
        playerinfo['reb'] = playerheadlinestatus[5]
        playerinfo['ast'] = playerheadlinestatus[4]
        playerinfo['pie'] = playerheadlinestatus[6]*100
    except:
        playerinfo['pts'] = ''
        playerinfo['reb'] = ''
        playerinfo['ast'] = ''
        playerinfo['pie'] = ''
    try:
        response = requests.get(stat_url)
        regular =list(response.json()['resultSets'][0]['rowSet'])[::-1]
        regulartotal = response.json()['resultSets'][1]['rowSet']
        post = list(response.json()['resultSets'][2]['rowSet'])[::-1]
        posttotal = response.json()['resultSets'][3]['rowSet']
        rank_regular = list(response.json()['resultSets'][8]['rowSet'])[::-1]
        rank_post = list(response.json()['resultSets'][9]['rowSet'])[::-1]
        allstar = list(response.json()['resultSets'][4]['rowSet'])[::-1]
        allstartotal = response.json()['resultSets'][5]['rowSet']
        stat = {
            'regular':regular,
            'regulartotal':regulartotal,
            'post':post,
            'posttotal':posttotal,
            'rank_regular':rank_regular,
            'rank_post':rank_post,
            'allstar':allstar,
            'allstartotal':allstartotal,
        }
    except:
        stat = {}

    context = {
        'img_url':img_url,
        'playerinfo':playerinfo,
        'news':news,
        'stat':stat,
    }
    return render(request, 'NBAindex/playerpage.html',context)

def shootingdiagram(request):
    playerid = request.GET['playerid']
    shot_url = playerdata.objects.filter(playerid = playerid).values("shooting_log")[0]['shooting_log']
    gamelog_url = 'http://stats.nba.com/stats/playergamelog?LeagueID=00&PlayerID=%s'\
                  '&Season=2014-15&SeasonType=Regular+Season'%playerid
    return HttpResponse(sjd.ShootingJsonData(shooturl=shot_url,gameurl=gamelog_url),content_type="application/json")

def player_gamelog(request):
    playerid = request.GET['playerid']
    gamelog_url = 'http://stats.nba.com/stats/playergamelog?LeagueID=00&PlayerID=%s'\
                  '&Season=2014-15&SeasonType=Regular+Season'%playerid
    return HttpResponse(json.dumps(sjd.GameId(gamelog_url)),content_type="application/json")

def aboutme(request):
    return render(request,'NBAindex/about.html',{})

def register(request):
    registered = False
    if request.method == 'POST':
        user_form = UserCreationForm(request.POST)
        #user_form = UserCreationForm(request.POST)
        user_profile = UserProfileForm(data=request.POST)
        if user_form.is_valid() and user_profile.is_valid():
            user = user_form.save()
            profile = user_profile.save(commit=False)
            profile.user = user
            profile.save()
            registered = True
            user = authenticate(username=request.POST['username'],password=request.POST['password1'])
            login(request,user)
        else: print user_form.errors,user_profile.errors
    else:
        user_form = UserCreationForm()
        user_profile = UserProfileForm()
    return render(request,'NBAindex/register.html',{
        'user_form':user_form,
        'user_profile':user_profile,
        'registered':registered,
    })

def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username,password=password)
        if user:
            login(request,user)
            return HttpResponseRedirect('/')
        else:
            print "Invalid:{0},{1}".format(username,password)
            return HttpResponse("Can't login")
    else:
        return render(request,'NBAindex/login.html',{})

@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/')

def score_index(request):
    return  render(request,'NBAindex/scoreindex.html',{})

def score_datesearch(request):
    datestr = request.GET['date']
    pattern = re.compile(r'(\d+)-(\d+)-(\d+)')
    date = re.findall(pattern,datestr)[0]
    year = date[0]
    month = date[1]
    day = date[2]
    resultset = gameid.objects.filter(year=year,month=month,day=day).values("gameid")
    dateset = []
    for id in resultset:
        item = gameinfo(id['gameid'])
        dateset.append(item)
    return HttpResponse(json.dumps(dateset),content_type="application/json")

def scorepage_index(request,game_id):
    game_info = gameinfo(game_id)
    url = 'http://stats.nba.com/stats/boxscoretraditionalv2?EndPeriod=10&EndRange=28800&'\
            'GameID=%s&RangeType=0&StartPeriod=1&StartRange=0'%game_id
    response = requests.get(url)
    homeplayerstat = []
    visitorplayerstat = []
    playerstat = response.json()['resultSets'][0]['rowSet']
    hometeamstat = response.json()['resultSets'][1]['rowSet'][1]
    visitorteamstat = response.json()['resultSets'][1]['rowSet'][0]
    for item in playerstat:
        if item[1] == game_info['hometeamid']:
            homeplayerstat.append(item)
        else:
            visitorplayerstat.append(item)
    eventurl = 'http://stats.nba.com/stats/playbyplayv2?EndPeriod=10&GameID=%s&StartPeriod=1'%game_id
    response = requests.get(eventurl)
    eventset = response.json()['resultSets'][0]['rowSet']
    event = []
    score = '0-0'
    for item in eventset:
        if item[7]!= None or item[9] != None:
            if item[10] :
                score = item[10]
            itemdict = {
                'eventnum':item[1],
                'period':item[4],
                'clock':item[6],
                'score':score,
                'homedescrip':item[7],
                'visitordescrip':item[9],
            }
            event.append(itemdict)
    print event
    context = {
        'homeplayerstat':homeplayerstat,
        'hometeamstat':hometeamstat,
        'visitorplayerstat':visitorplayerstat,
        'visitorteamstat':visitorteamstat,
        'gameinfo':game_info,
        'hometeamimg':'http://stats.nba.com/media/img/teams/logos/%s_logo.svg'%game_info['hometeamname'],
        'visitorteamimg':'http://stats.nba.com/media/img/teams/logos/%s_logo.svg'%game_info['visitorteamname'],
        'event':event,
    }
    print context
    return render(request,'NBAindex/scorepage.html',context)
def gameinfo(id):
    url = 'http://stats.nba.com/stats/boxscoresummaryv2?GameID='
    try:
        gameurl = url + id
        response = requests.get(gameurl)
        summary = response.json()['resultSets'][0]['rowSet'][0]
        date = summary[0]
        pattern = re.compile(r'([-0-9]+)')
        date = re.findall(pattern,date)[0]
        game_id = summary[2]
        status = summary[4]
        hometeamid = summary[6]
        visitorteamid = summary[7]
        period = summary[9]
        otherstas = response.json()['resultSets'][1]['rowSet']
        hometeamname = teamprofile.objects.filter(teamid = hometeamid).values("teamabbrev")[0]['teamabbrev']
        visitorteamname = teamprofile.objects.filter(teamid = visitorteamid).values("teamabbrev")[0]['teamabbrev']
        linescore = response.json()['resultSets'][5]['rowSet']
        homeqtr = linescore[0][8:22]
        visitorqtr = linescore[1][8:22]
        homepts = linescore[0][22]
        visitorpts = linescore[1][22]
        item = {
            'date':date,
            'game_id':game_id,
            'status':status,
            'hometeamid':hometeamid,
            'visitorteamid':visitorteamid,
            'period':period,
            'hometeamname':hometeamname,
            'visitorteamname':visitorteamname,
            'homeqtr':homeqtr,
            'visitorqtr':visitorqtr,
            'homepts':homepts,
            'visitorpts':visitorpts,
        }
    except:
        item = {
            'game_id':'','status':'','hometeamid':'','visitorteamid':'',
            'period':'','hometeamname':'','visitorteamname':'',
            'homeqtr':'','visitorqtr':'','homepts':'','visitorpts':'',
        }
    return item

def test(request):
    return render(request, 'NBAindex/replaypage.html',{})

def testdata(request):
    dateset = open('event.json')
    data  = dateset.read()
    return HttpResponse(data,content_type="application/json")

def replaypage_index(request):
    game_id = request.GET['gameid']
    eventnum = request.GET['eventnum']
    url = 'http://stats.nba.com/stats/locations_getmoments/?eventid=%s&gameid=%s'%(eventnum,game_id)
    response = requests.get(url)
    return render(request,'NBAindex/replaypage.html',{'gameid':game_id,'eventnum':eventnum})

def replaypage_getdata(request):
    game_id = request.GET['gameid']
    eventnum = request.GET['eventnum']
    url = 'http://stats.nba.com/stats/locations_getmoments/?eventid=%s&gameid=%s'%(eventnum,game_id)
    response = requests.get(url)
    return HttpResponse(json.dumps(response.json()),content_type="application/json")
