export default function general_ui(){

    $(document).ready(function(){
        //scroll animation for scroll-anim elements
        let k = 0;
        $(window).scroll(function(){
            //Check every 250ms only to save resources
            if(new Date().getTime() - k<250){return;}
            k = new Date().getTime();

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
        
        });

    });

}
