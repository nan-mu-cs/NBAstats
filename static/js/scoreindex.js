/**
 * Created by andyyang on 15/9/1.
 */
var gamedata;
function filldata(data){
    $('.gamecontainer').empty()
    if(data.length == 0)
        $('.gamecontainer').append('<h1 class="text-center">NO GAMES</h1>');
    else {
        for(i = 0;i<data.length;i++)
        {
            $('.gamecontainer').append('<div class="' + data[i]['game_id'] + '"></div>');
            $('.' + data[i]['game_id']).append('<table class="table table-striped ">' +
                '<thead>' +
                '<th></th>' +
                '<th>Team</th>' +
                '</thead>' +
                '</table>')
            for(j = 0;j<data[i]['period'];j++){
                if(j<4)
                    str = j+1;
                else str = 'OT'+(j-3);
                $('.' + data[i]['game_id'] + ' table thead tr').append('<th>'+str+'</th>');
            }
            $('.' + data[i]['game_id'] + ' table thead tr').append('<th>PTS</th>');
            $('.' + data[i]['game_id'] + ' table ').append('<tbody>' +
                '<tr class="home"></tr>' +
                '<tr class="visitor"></tr>' +
                '</tbody>');
            $('.'+data[i]['game_id'] + ' table tbody .home').append('<td>home</td>' +
                '<td>'+data[i]['hometeamname']+'</td>');
            for(j = 0;j<data[i]['period'];j++)
                $('.'+data[i]['game_id'] + ' table tbody .home').append('<td>'+data[i]['homeqtr'][j]+'</td>');
            $('.'+data[i]['game_id'] + ' table tbody .home').append('<td>'+data[i]['homepts']+'</td>');
            $('.'+data[i]['game_id'] + ' table tbody .visitor').append('<td>visitor</td>' +
                '<td>'+data[i]['visitorteamname']+'</td>');
            for(j = 0;j<data[i]['period'];j++)
                $('.'+data[i]['game_id'] + ' table tbody .visitor').append('<td>'+data[i]['visitorqtr'][j]+'</td>');
            $('.'+data[i]['game_id'] + ' table tbody .visitor').append('<td>'+data[i]['visitorpts']+'</td>');
            $('.'+data[i]['game_id']).append('<a href="/scorepage/'+data[i]['game_id']+'">' +
                '<button class="btn btn-default pull-right">View Details</button>' +
                '</a>');
            $('.gamecontainer').append('<br/><br/>');
        }
    }
}
$(document).ready(
    function(){
        var nowdate = new Date();
        var year = nowdate.getFullYear();
        var month = nowdate.getMonth()+1;
        var day = nowdate.getDate();
        var datestr = year + '-' + month + '-' + day;
        $('.form_date').attr('data-date',datestr);
        $('.form_date .form-control').attr('value',datestr);
        /*$('.form_date').datepicker({
        //language:  'fr',
        weekStart: 1,
        todayBtn:  'linked',
		autoclose: true,
		todayHighlight: true,
		startView: 2,
		minView: 2,
		forceParse: 0,
        keyboardNavigation: true,
    });*/
        $('.form_date').datepicker({
            autoclose:true
        });
        $('.loading').hide();
        $.get('/NBAindex/scoredatesearch',{date:datestr},
                function(data){
                    gamedata = data;
                    filldata(data);
                });
        $('#dtp_input').change(
            function(){
                $('.gamecontainer').empty()
                $('.loading').show();
                $.get('/NBAindex/scoredatesearch',{date:$(this).val()},
                function(data){
                    gamedata = data;
                    $('.loading').hide();
                    filldata(data);
                });
            }
        );
    }
)