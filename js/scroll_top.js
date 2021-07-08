$(document).ready(function(){
    $(".goTop").click(function(){
        $("html, body").animate({
            scrollTop : 0
        }, 500);
    });

    var sectiontop = $(".section02").offset().top;
    $(".goSection02").click(function(){
        $("html, body").animate({
            scrollTop : sectiontop
        }, 500);
    });
});




