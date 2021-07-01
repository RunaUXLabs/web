$(document).ready(function(){
	var obj_back = $(".visual");
	var obj_back_cts = $(".visual .cts");
	var obj_top = $(".business");
	var window_h = $(window).height();
	var scrolling = $(window).scrollTop();
	var scroll_count = 0;
	
	obj_back.height(window_h);
	obj_top.height(window_h);
	obj_top.css("margin-top", window_h);

	$("html, body").on("mousewheel DOMMouseScroll", function scroll_check(e){
		scrolling = $(window).scrollTop();
		var E = e.originalEvent;
		var delta = 0;
		if (E.detail) {
			delta = E.detail * -40;
		}else{
			delta = E.wheelDelta;
		};

		$("html, body").off("mousewheel DOMMouseScroll");
		$("html, body").on("mousewheel DOMMouseScroll", function(e){
			e.preventDefault();
			e.stopPropagation();
			return false;
		});

		if(((scrolling) < window_h) && (scroll_count==0)){
			scroll_count++;
			if(delta < 0){
				$("html, body").animate({
				  scrollTop : window_h
				}, 500, function(){scroll_count=0;$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check);$("html, body").stop();});
				obj_back_cts.animate({
					opacity : 0
				}, 500);
			}else{
				$("html, body").animate({
				  scrollTop : 0
				}, 500, function(){scroll_count=0;$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check);$("html, body").stop();});
				obj_back_cts.animate({
					opacity : 1
				}, 500);
			}
		}else{
			$("html, body").off();
			$("html, body").on("mousewheel DOMMouseScroll", scroll_check);
			$("html, body").stop();
		}
	});
		
});