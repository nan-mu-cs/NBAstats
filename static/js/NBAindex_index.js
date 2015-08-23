/**
 * Created by andyyang on 15/8/20.
 */
function dealwithjson(data)
{
    for(var ele in data){
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
        $.getJSON('/NBAindex/index_initialize/',function(data){dealwithjson(data)})
        $('.indexbutton .btn').click(
            function(){
                var index = $(this).text();
                $('.playerindex .container').hide();
                $('.playerindex  .' + index).show();
            }
        )
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
        )
    }
)

