/**
 * Created by andyyang on 15/9/3.
 */
$(document).ready(
    function(){
        var numofevent = $('#gamereplay ul').children().length
        var numofshownevent = numofevent>5?5:numofevent;
        $('#gamereplay ul li:gt(4)').hide();
        $('#gamereplay .up').attr('disable',true);
        if(numofevent<=5)
            $('#gamereplay .down').attr('disable',true);
        $('#gamereplay .up').click(
            function(){
                $('#gamereplay ul li:gt(4)').hide();
                $('#gamereplay .up').attr('disable',true);
                numofshownevent = numofevent>5?5:numofevent;
                if(numofevent>5)
                $('#gamereplay .down').attr('disable',false);
            }
        );
        $('#gamereplay .down').click(
            function(){
                numofshownevent = numofshownevent+5<numofevent?numofshownevent+5:numofevent;
                $('#gamereplay ul li').show();
                $('#gamereplay ul li:gt('+numofshownevent+')').hide();
                if(numofshownevent == numofevent)
                    $('#gamereplay .down').attr('disable',true);
                if(numofshownevent>5)
                    $('#gamereplay .up').attr('disable',true);
            }
        )
        $('#gamereplay li a').click(
            function(){
                url = $(this).attr('href');
                $("#replayiframe").attr("src", url);
                title = $(this).text();
                $('#replayiframetitle').text(title);
                $('#replaymodal').modal({ show: true, backdrop: 'static' });
                /*
                $('#replaymodal').on('show.bs.modal', function () {
                $(this).find('.modal-body').css({
                    width:'auto', //probably not needed
                    height:'auto', //probably not needed
                    'max-height':'100%'
                });
});*/
                return false;
            }
        )
    }
);