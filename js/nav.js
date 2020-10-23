//메뉴클릭시 하위메뉴 슬라이드 다운
//하위메뉴가 열린상태에서 다른메뉴 클릭시 변경, 자기메뉴 클릭시 슬라이드 업
$(".header3link").click(function(){
    $('.content').children().removeClass('on');
    if($(this).hasClass('on')){
        $(this).removeClass('on');
        $("nav").removeClass('on').children().removeClass('on');
    }
    else{
        $("nav").addClass('on');
        $(this).addClass('on').siblings().removeClass('on');
        $("#"+$(this).data('id')).addClass('on').siblings().removeClass('on');
    }
});
//하위메뉴의 서브를 클릭할때마다 바뀌게 하기
$(".list li").click(function(){
    $(this).addClass('on').siblings().removeClass('on');
    $("."+$(this).data('id')).addClass('on').siblings().removeClass('on');
});