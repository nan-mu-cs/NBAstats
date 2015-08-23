/**
 * Created by andyyang on 15/8/21.
 */
function upandown(id){
    var num = $('#'+id+' .statrow').children().length;
    num--;
    $('#'+id+' .statrow > :gt(3)').hide();
    $('#'+id+' .total').show();
    if(num<4)
        {
            $('#'+id+' .up').attr('disabled',true);
            $('#'+id+' .down').attr('disabled',true);
        }
        else $('#'+id+' .up').attr('disabled',true);
}

function uptriggered(id){
    $('#'+id+' .statrow > :gt(3)').hide();
    $('#'+id+' .total').show();
    $('#'+id+' .up').attr('disabled',true);
    var num = $('#'+id+' .statrow').children().length;
    num--;
    if(num>4)
        $('#'+id+' .down').attr('disabled',false);
}

function downtriggered(id){
    $('#'+id+' .statrow > ').show();
    $('#'+id+' .down').attr('disabled',true);
    var num = $('#'+id+' .statrow').children().length;
    num--;
    if(num>4)
        $('#'+id+' .up').attr('disabled',false);
}

function arc(inr,outr,start,end){
    return d3.svg.arc().innerRadius(inr).outerRadius(outr).startAngle(start).endAngle(end);
}

function drawcourt(chart) {
    var pi = Math.PI;
    /*外框*/
    chart.append('rect').attr('x', 0).attr('y', 0).attr('width', 500)
        .attr('height', 470).attr('stroke-width', 3).attr('stroke', 'black').attr('fill', 'White');
    /*中圈小圆*/
    chart.append('path').attr('d', arc(20, 23, -pi / 2, pi / 2)).attr('transform', 'translate(250,470)');
    /*中圈大圆*/
    chart.append('path').attr('d', arc(60, 63, -pi / 2, pi / 2)).attr('transform', 'translate(250,470)');
    /*3分线直线*/
    chart.append('line').attr('x1', 30).attr('y1', 0).attr('x2', 30).attr('y2', 150)
        .attr('stroke-width', 3).attr('stroke', 'black');
    chart.append('line').attr('x1', 470).attr('y1', 0).attr('x2', 470).attr('y2', 150)
        .attr('stroke-width', 3).attr('stroke', 'black');
    /*3分顶弧*/
    chart.append('path').attr('d', arc(236, 239, pi * 22 / 180 + pi / 2, 158 * pi / 180 + pi / 2)).attr('transform', 'translate(250,60)');

    chart.append('rect').attr('x', 170).attr('y', 0).attr('width', 160)
        .attr('height', 190).attr('stroke-width', 3).attr('stroke', 'black').attr('fill', 'White');
    chart.append('rect').attr('x', 190).attr('y', 0).attr('width', 120)
        .attr('height', 190).attr('stroke-width', 3).attr('stroke', 'black').attr('fill', 'White');

    chart.append('path').attr('d', arc(58, 61, pi / 2, 3 * pi / 2)).attr('transform', 'translate(250,190)');
    chart.append('path').attr('stroke-dasharray', '10').attr('d', arc(58, 61, -pi / 2, pi / 2))
                        .attr('transform', 'translate(250,190)');

    chart.append('line').attr('x1', 220).attr('y1', 40).attr('x2', 280).attr('y2', 40)
        .attr('stroke-width', 4).attr('stroke', 'black');
    chart.append('circle').attr('cx',250).attr('cy',48.3).attr('r',8.3)
                            .attr('stroke-width', 2).attr('stroke', 'black').attr('fill', 'White');

    chart.append('line').attr('x1', 210).attr('y1', 40).attr('x2', 210).attr('y2', 52.5)
        .attr('stroke-width', 3).attr('stroke', 'black');
    chart.append('line').attr('x1', 290).attr('y1', 40).attr('x2', 290).attr('y2', 52.5)
        .attr('stroke-width', 3).attr('stroke', 'black');

    chart.append('path').attr('d', arc(39, 42, pi / 2, 3 * pi / 2)).attr('transform', 'translate(250,52.5)');

}
$(document).ready(
    function(){
        var url = window.location.href;
        var playerid = url.match('playerpage/([0-9]+)')[1]

        //$.get('/NBAindex/playerpagestatics',{playerid:playerid});
        /*设置下拉菜单的宽度*/
        var width = $(".nav .playerstat").width();
        $(".nav .playerstat ul").width(width);

        /*news up down */
        var numofnews = $('#playernews .panel-body').children().length;
        var numofnewsShown = 5 < numofnews ? 5:numofnews;
        $('#playernews .panel-body .newsele:gt(4)').hide();
        if(numofnewsShown<5)
        {
            $("#newsupbtn").attr('disabled',true);
            $("#newsdownbtn").attr('disabled',true);
        }
        else $("#newsupbtn").attr('disabled',true);
        $("#newsupbtn").click(
            function(){
                $('#playernews .panel-body .newsele:gt(4)').hide();
                if(numofnews>5)
                    $("#newsdownbtn").attr('disabled',false);
                $("#newsupbtn").attr('disabled',true);
            }
        );
        $('#newsdownbtn').click(
            function(){
                numofnewsShown = numofnewsShown+5 < numofnews ? numofnewsShown+5:numofnews;
                if(numofnewsShown>=numofnews)
                    $("#newsdownbtn").attr('disabled',true);
                if(numofnewsShown>5)
                    $("#newsupbtn").attr('disabled',false);
                $('#playernews .panel-body .newsele:lt('+numofnewsShown+')').show();
            }
        )
        upandown('playerstatregular');
        upandown('statrank_regular');
        upandown('playerstatpost');
        upandown('statrank_post');
        upandown('playerstatallstar');
        $('#playerstatregular .up').click(function(){uptriggered('playerstatregular')});
        $('#playerstatpost .up').click(function(){uptriggered('playerstatpost')});
        $('#playerstatpost .down').click(function(){downtriggered('playerstatpost')});
        $('#playerstatregular .down').click(function(){downtriggered('playerstatregular')});
        $('#playerstatallstar .up').click(function(){uptriggered('playerstatallstar')});
        $('#playerstatallstar .down').click(function(){downtriggered('playerstatallstar')});
        $('#statrank_regular .up').click(function(){uptriggered('statrank_regular')});
        $('#statrank_regular .down').click(function(){downtriggered('statrank_regular')});
        $('#statrank_post .up').click(function(){uptriggered('statrank_post')});
        $('#statrank_post .down').click(function(){downtriggered('statrank_post')});


        shotChartUrl = 'http://stats.nba.com/stats/shotchartdetail?Period=0'+
                '&VsConference=&LeagueID=00&LastNGames=0&TeamID=0&'+
                'Position=&Location=&Outcome=&ContextMeasure=FGA&'+
                'DateFrom=&StartPeriod=&DateTo=&OpponentTeamID=0'+
                '&ContextFilter=&RangeType=&Season=2014-15&AheadBehind='+
                '&PlayerID=2594&EndRange=&VsDivision=&PointDiff=&RookieYear'+
                '=&GameSegment=&Month=0&ClutchTime=&StartRange=&EndPeriod='+
                '&SeasonType=Regular+Season&SeasonSegment=&GameID=';
        //var dataset = [
          //  [0, 0], [600, 600], [250, 50], [100, 33], [330, 95],
            //[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
            //];
        var dataset = [[0,0]]
        var width = 600;
        var height = 600;
        var chart = d3.select(".chart").attr("width",width).attr("height",height);
        drawcourt(chart);
        $.getJSON('/NBAindex/shootingdiagram',{playerid:playerid},function(d){
            var data = d;
            var dd = d3.json(data);
            chart.selectAll("circle").data(data).enter().append("circle")
            .attr("cx",function(d){return d[17]})
            .attr("cy",function(d){return d[18]})
            .attr('fill',function(d){
                    if(d[10] == "Made Shot") return 'red';
                    else return 'blue';
                })
            .attr("r",3).attr('transform','translate(250,52.5)');
        })
        var y = d3.scale.linear().range([height,0]).domain([-100,500]);
        var x = d3.scale.linear().range([width,0]).domain([-300,300]);
        chart.selectAll("circle").data(dataset).enter().append("circle")
            .attr("cx",function(d){return d[0]})
            .attr("cy",function(d){return d[1]}).attr("r",5);

    }
);

