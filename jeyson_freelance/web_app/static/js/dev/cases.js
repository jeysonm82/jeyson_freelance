export default function f() {
    $(document).ready(
            function() {
                $('.cases-btn').click(function(){
                    $(this).toggleClass('less');
                    $('.cases-cont').toggle(250);
                });
            }
            );
}
