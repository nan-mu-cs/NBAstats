"""untitled URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from NBAindex import views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$',views.index,name="index"),
    url(r'^player/',views.player_index,name='player'),
    url(r'NBAindex/index_initialize/',views.player_index_initialize,name="player_index_initialize"),
    url(r'NBAindex/index_search/',views.index_search,name="index_search"),
    url(r'playerpage/(?P<playerid>\d+)/$',views.playerpage_index,name="playerpage_index"),
    url(r'NBAindex/shootingdiagram/',views.shootingdiagram,name="shootingdiagram"),
    url(r'NBAindex/playergamelog/',views.player_gamelog,name="playergamelog"),
    url(r'^about/',views.aboutme,name="aboutme"),
    url(r'NBAindex/register/$',views.register,name="register"),
    url(r'NBAindex/login/',views.user_login,name="login"),
    url(r'NBAindex/logout',views.user_logout,name="logout"),
    url(r'^score/',views.score_index,name="score"),
    url(r'NBAindex/scoredatesearch',views.score_datesearch,name="score_datesearch"),
    url(r'scorepage/(?P<game_id>\d+)/$',views.scorepage_index,name="scorepage_index"),
    url(r'replaypage/getdata',views.replaypage_getdata),
    url(r'NBAindex/replaypage',views.replaypage_index,name="replaypage_index"),
]


