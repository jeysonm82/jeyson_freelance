export default function menu_ui(){

    $(document).ready(function(){
    
        $(".menu a:not(:last-child)").click(function(event){
            event.preventDefault();
            let section_id = $(this).attr("href");
            console.log("click");
            console.log(section_id);
            //Simulate the affix first because the topmenu goes out of the flow with scroll
            $(".top-header").addClass("affix"); 
            let top_header_height = $(".top-header").height();
            $('html, body').animate({
                    scrollTop: $(section_id).offset().top - top_header_height
                }, 500);
        
        });

        // Go top logic
        $(window).scroll(function(){
            let goto_class = $(this).scrollTop()>400?'go-top visible':'go-top';
            $(".go-top").removeClass().addClass(goto_class);
        
        });

        $(".go-top").click(function(event){
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, 500);
        });
    
    });

}
