/**
 * Created by andyyang on 15/9/2.
 */
var visitorteamid,hometeamid,nextmsec,startr;
var player = new Array();
var playernum = new Array();
var playdata;
function showTime(time){
    time = parseInt(time);
    minute = time/60;
    minute = parseInt(minute);
    sec = time - minute*60;
    minute = minute.toString()
    if(minute.length == 1)
        minute = '0' + minute;
    sec = sec.toString()
    if(sec.length == 1)
    sec = '0' + sec;
    return minute + ':' + sec;
}

function drawCourt(chart,data){
    visitorteamid = data['visitor']['teamid'];
            hometeamid = data['home']['teamid'];
            nextmsec = data['moments'][0][2]*10;
            startr = data['moments'][0][5][0][4];
            /*clock on the top*/
            timeleft = chart.append('text').attr('x',430).attr('y',15)
                .text('CLOCK: '+showTime(data['moments'][0][2])).attr('class','playeroncourt');
            /*color rect reperesent two team on the bottom*/
            chart.append('rect').attr('x',420).attr('width',10).attr('y',480).attr('height',10).attr('fill','red');
            chart.append('text').attr('x',440).attr('y',490).text(data['home']['abbreviation']);
            chart.append('rect').attr('x',475).attr('width',10).attr('y',480).attr('height',10).attr('fill','blue');
            chart.append('text').attr('x',495).attr('y',490).text(data['visitor']['abbreviation']);
            /*draw the start postion and player number*/
            for(i = 0;i<data['moments'][0][5].length;i++){
                /*add player and ball*/
                player[i] = chart.append('circle').attr('cx',data['moments'][0][5][i][2]*10)
                                 .attr('cy',data['moments'][0][5][i][3]*10)
                                 .attr('class','playeroncourt');
                /*set ball radius and color*/
                if(data['moments'][0][5][i][0] == -1)
                    player[i] = player[i].attr('fill','yellow').attr('r',5);
                /*set home player color, radius and number*/
                else if(data['moments'][0][5][i][0] == hometeamid) {
                    player[i] = player[i].attr('fill', 'red').attr('r', 12);
                    num = $.grep(data['home']['players'],function(item){
                        return item['playerid'] == data['moments'][0][5][i][1]})[0]['jersey'];
                    playernum[i] = chart.append('text').text(num)
                                    .attr('x',data['moments'][0][5][i][2]*10)
                                    .attr('y',data['moments'][0][5][i][3]*10)
                                    .attr("text-anchor", "middle")
                                    .attr('alignment-baseline','central')
                                    .attr('fill','white')
                                    .attr('class','playeroncourt');
                }
                /*set visitor player color, radius and number*/
                else{
                    player[i] = player[i].attr('fill','blue').attr('r',12);
                    num = $.grep(data['visitor']['players'],function(item){
                        return item['playerid'] == data['moments'][0][5][i][1]})[0]['jersey'];
                    playernum[i] = chart.append('text').text(num)
                                    .attr('x',data['moments'][0][5][i][2]*10)
                                    .attr('y',data['moments'][0][5][i][3]*10)
                                    .attr("text-anchor", "middle")
                                    .attr('alignment-baseline','central')
                                    .attr('fill','white')
                                    .attr('class','playeroncourt');
                }

            }

}
function drawEvent(data){
     var dur;
            /*move player,ball and change clock*/
            for(i = 1;i<data['moments'].length;i++){
                dur = nextmsec - data['moments'][i][2]*10;
                nextmsec = data['moments'][i][2]*10;
                dur = dur * 100;
                for(j = 0;j<data['moments'][i][5].length;j++){
                    player[j] = player[j].transition().duration(dur)
                                         .attr('cx',data['moments'][i][5][j][2]*10)
                                         .attr('cy',data['moments'][i][5][j][3]*10);
                    if(j!=0)
                        playernum[j] = playernum[j].transition().duration(dur)
                                               .attr('x',data['moments'][i][5][j][2]*10)
                                               .attr('y',data['moments'][i][5][j][3]*10);
                    if(j == 0)
                        player[j] = player[j].attr('r',data['moments'][i][5][j][4]*5/startr);
                }
                timeleft = timeleft.transition().duration(dur).text('CLOCK: '+showTime(data['moments'][i][2]));
            }
}
$(document).ready(
    function(){
        var gameid = $('.gameid').text();
        var eventnum = $('.eventnum').text();
        $('.gameid').hide();
        $('.eventnum').hide();
        $.getJSON('replaypage/getdata',{gameid:gameid,eventnum:eventnum},function(data){
            playdata = data;
            drawCourt(chart,data);
            drawEvent(data);
        })
        var chart = d3.select('.testsvg');
        $('.run').click(
            function(){
                $('.playeroncourt').remove();
                drawCourt(chart,playdata);
                drawEvent(playdata);
            }
        )
    }
);