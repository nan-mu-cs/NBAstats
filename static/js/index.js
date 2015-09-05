/**
 * Created by andyyang on 15/9/5.
 */
$(document).ready(
    function(){
        $('.img-responsive').click(
            function(){
                var src = $(this).attr('src');
                $('#imginmodal').attr('src',src);
                $('#imgmodal').modal({ show: true, backdrop: 'static' });
            }
        )
    }
);