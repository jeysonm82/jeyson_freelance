export default function general_ui(){

    $(document).ready(function(){
        //scroll animation for scroll-anim elements
        let do_scroll_anim_timer;

        function do_scroll_anim() {
            let scroll_value = $(this).scrollTop();
            let window_height = $(this).height();

            $(".scroll-anim").not(".animated").each(
                    function(index) {
                        let elem_top = $(this).offset().top;
                        if ((scroll_value + window_height)> elem_top + 100){
                            $(this).addClass('animated slideInUp');
                            $(this).removeClass('scroll-anim');
                        }
                    }
                    );
                clearTimeout(do_scroll_anim_timer);
        }

        $(window).scroll(function(){
            let window_width = $(window).width();
            if(window_width > 768){
                if(do_scroll_anim_timer) {
                    clearTimeout(do_scroll_anim_timer);
                }
                do_scroll_anim_timer = setTimeout(do_scroll_anim, 50);
            }
        });

        $(window).trigger( "scroll" );

    });

}
