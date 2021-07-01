$(document).ready(function(){
	var speed = 3000; /* 스크롤을 할때 추가로 스크롤 될 값 (즉, 값이 크면 더 많이 스크롤 됨) */
	var scroll_top = $(window).scrollTop();
	$("html, body").on("mousewheel DOMMouseScroll", function scroll_check(e){
		scroll_top = $(window).scrollTop();
		
		var E = e.originalEvent;
		var delta = 0;
		if (E.detail) {
			delta = E.detail * -40;
		}else{
			delta = E.wheelDelta;
		}
		$("html, body").off("mousewheel DOMMouseScroll");
		$("html, body").on("mousewheel DOMMouseScroll", function(e){
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
		
		
		if(delta > 0){//위로 스크롤
			scroll_top = scroll_top-speed;
		}else{//아래로 스크롤
			scroll_top = scroll_top+speed;
		}
		$("html, body").animate({
			scrollTop : scroll_top
		}, 500, "swing", function(){$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();});
	});
});
