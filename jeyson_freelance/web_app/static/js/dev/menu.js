export default function menu_ui(){

    $(document).ready(function(){
    
        $(".menu a").click(function(event){
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
        
        //scroll animation for menu-top  elements
        $(window).scroll(function(){
            let scroll_value = $(this).scrollTop();
            let top_header_height = $(".top-header").height();
            let class2add;
            $("section").each(function(index){
                let elem_top = $(this).offset().top;
                if(scroll_value >=  (elem_top - top_header_height)){class2add = "color"+index}
            });
            
            $(".menu--top").removeClass("color0 color1 color2 color3 color4");
            $(".menu--top").addClass(class2add);
        
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
