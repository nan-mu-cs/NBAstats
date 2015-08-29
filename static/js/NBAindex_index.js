/**
 * Created by andyyang on 15/8/20.
 */
var playerdata;
function searchstr(item,str){
    var flag = item.toLocaleLowerCase().search(str.toLocaleLowerCase());
    if (flag == -1)
        return false;
    else return true;
}
function searchdata(data,str){
    var result = new Array();
    for(ele in data){
        var alpset = $.grep(data[ele],function(item){return searchstr(item['display_last_comma_first'],str)});
        var length = alpset.length;
        var part = parseInt(length/3 +1);
        var partset = new Array();
        var part1 = new Array();
        for(i = 0;i<part&&i<length;i++)
            part1[i] = alpset[i];
        partset['part1'] = part1;
        var part2 = new Array();
        for(j = 0,i = part;i<2*part&&i<length;i++,j++)
            part2[j] = alpset[i];
        partset['part2'] = part2;
        var part3 = new Array();
        for(j = 0,i=2*part;i<length&&i<length;i++,j++)
            part3[j] = alpset[i];
        partset['part3'] = part3;
        result[ele] = partset;
    }
    return result;
}
function dealwithjson(data)
{
    for(var ele in data){
        if(data[ele]['part1'].length == 0)
            continue;
        $(".playerindex").append(
            '<div class="container '+ele+'"></div>'
        );
        $(".playerindex ."+ele).append(
            '<div class="row"></div>'
        )
        $("."+ele + " .row").append(
            '<div class="col-md-3">'+
            '<h3>'+ele+'</h3>'+
            '</div>'
        );
        for(part in data[ele]){
            $("."+ele + ' .row').append(
                '<div class="col-md-3">'+
                '<ul class="'+part+'">'+
                '</ul>'+
                '</div>'
            );
            for(player in data[ele][part]){
                $("."+ele +'  .col-md-3   .'+part).append(
                    '<li class="inline-group"><a class="h4" href="/playerpage/'+data[ele][part][player]['playerid']+'" >'+data[ele][part][player]['display_last_comma_first']
                    +'</a><small> ['+data[ele][part][player]['team_abbr']+']</small></li>'
                );
            }
        }
        $(".playerindex ."+ele).append('<hr>');
    }
    $('.playerindex .container').hide();
}
$(document).ready(
    function(){
        $.getJSON('/NBAindex/index_initialize/',function(data){
            playerdata = data;
            var resultdata = searchdata(data,'');
            dealwithjson(resultdata);})
        $('.indexbutton .btn').click(
            function(){
                var index = $(this).text();
                $('.playerindex .container').hide();
                $('.playerindex  .' + index).show();
            }
        )
        /*
        $("#searchplayername").keyup(
            function(){
                var query = $(this).val();
                $(".playerindex").empty();
                $.get('/NBAindex/index_search',{searchname:query},
                function(data){
                    dealwithjson(data);
                        $('.playerindex .container').show();
                });
            }
        )*/
        $('#searchplayername').keyup(
            function(){
                var query = $(this).val();
                $(".playerindex").empty();
                var data = searchdata(playerdata,query);
                dealwithjson(data);
                $('.playerindex .container').show();
            }
        )
    }
)

