/**
 * Created by andyyang on 15/8/21.
 */
var menudata;
var shootdata;
var chart;
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
    chart.append('circle').attr('cx',3).attr('cy',480).attr('r',3).attr('fill','red');
    chart.append('text').attr('x',7).attr('y',485).text('Made Shot');
    chart.append('circle').attr('cx',105).attr('cy',480).attr('r',3).attr('fill','blue');
    chart.append('text').attr('x',109).attr('y',485).text('Miss Shot');
}

function menuChange(targetset){
    var year = new Set();
    var month = new Set();
    var day = new Set();
    var match = new Array();
    var data = menudata;
    if(targetset['year']!='')
        data = $.grep(data,function(item){return item['year'] == targetset['year']});
    if(targetset['month']!='')
        data = $.grep(data,function(item){return item['month'] == targetset['month']});
    if(targetset['day']!='')
        data = $.grep(data,function(item){return item['day'] == targetset['day']});
    if(targetset['match']!='')
        data = $.grep(data,function(item){return item['game_id'] == targetset['match']});
    for(i = 0;i<data.length;i++){
        year.add(data[i]['year']);
        month.add(data[i]['month']);
        day.add(data[i]['day']);
        match[i] = {'gameid':data[i]['game_id'],'match':data[i]['match']}
    }
    $('.shootselect .year').children().hide();
    $('.shootselect .month').children().hide();
    $('.shootselect .day').children().hide();
    $('.shootselect .match').children().hide();
    $('.shootselect .all').show();
    for( item of year)
    {
        $('.shootselect .year .' + item).show();
    }
    for( item of month){
        $('.shootselect .month .'+item).show();
    }
    for( item of day){
        $('.shootselect .day .'+item).show();
    }
    for( item of match){
        $('.shootselect .match .'+item['gameid']).show();
    }
}
function drawpoints(chart,shootdata){
     chart.selectAll("circle").data(shootdata).enter().append("circle")
            .attr('class','point')
            .attr("cx",function(d){return d['LOC_X']})
            .attr("cy",function(d){return d['LOC_Y']})
            .attr('fill',function(d){
                    if(d['EVENT_TYPE'] == "Made Shot") return 'red';
                    else return 'blue';
                })
            .attr("r",3).attr('transform','translate(250,52.5)');
}
function Redrawshootingplot(targetset){
    var data = shootdata;
    if(targetset['year']!='')
        data = $.grep(data,function(item){return item['year'] == targetset['year']});
    if(targetset['month']!='')
        data = $.grep(data,function(item){return item['month'] == targetset['month']});
    if(targetset['day']!='')
        data = $.grep(data,function(item){return item['day'] == targetset['day']});
    if(targetset['match']!='')
        data = $.grep(data,function(item){return item['GAME_ID'] == targetset['match']});
    $('.point').remove();
    drawpoints(chart,data);
}
//$.grep(data,function(item){return item.year == '2014'})
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

        var dataset = [[0,0]]
        var width = 600;
        var height = 600;
        chart = d3.select(".chart").attr("width",width).attr("height",height);
        drawcourt(chart);
        $.getJSON('/NBAindex/playergamelog',{playerid:playerid},function(data){
            menudata = data;
            var year = new Set();
            var month = new Set();
            var day = new Set();
            var match = new Array();
            for(i = 0;i<data.length;i++){
                year.add(data[i]['year']);
                month.add(data[i]['month']);
                day.add(data[i]['day']);
                match[i] = {'gameid':data[i]['game_id'],'match':data[i]['match']}
            }
            for( item of year){
                $('.shootselect .year').append(
                    '<option value="'+item+'" class="'+item+'">'+item+'</option>')
            }
            for( item of month){
                $('.shootselect .month').append(
                    '<option value="'+item+'" class="'+item+'">'+item+'</option>')
            }
            for( item of day){
                $('.shootselect .day').append(
                    '<option value="'+item+'" class="'+item+'">'+item+'</option>')
            }
            for( item of match){
                $('.shootselect .match').append(
                    '<option value="'+item['gameid']+'" class="'+item['gameid']+'">'+item['match']+'</option>')
            }
        })
        $('.shootselect').change(function(){
            var targetValue={
                'year':$('.year').val(),
                'month':$('.month').val(),
                'day':$('.day').val(),
                'match':$('.match').val()
            };
            menuChange(targetValue);
        });
        $('.selectbtn').click(
            function(){
                var targetValue={
                'year':$('.year').val(),
                'month':$('.month').val(),
                'day':$('.day').val(),
                'match':$('.match').val()
            };
             Redrawshootingplot(targetValue);
            }
        );
        $('.resetbtn').click(
            function(){
                $('.year').val('');
                $('.month').val('');
                $('.day').val('');
                $('.match').val('');
            }
        )
        $.getJSON('/NBAindex/shootingdiagram',{playerid:playerid},function(d){
            shootdata = d;
            drawpoints(chart,shootdata);
        })
    }
);

