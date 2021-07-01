$(document).ready(function(){
	var scrolling = $(window).scrollTop();
	scroll_check();

	$(window).scroll(function(){
		scrolling = $(window).scrollTop();
		console.log(scrolling);
		scroll_check();
	});

	function scroll_check(){
		if(scrolling>900){
			$(".transition .show1").addClass("on");
		}
		if(scrolling>1300){
			$(".transition .show2").addClass("on");
		}
		if(scrolling>1600){
			$(".transition .show3").addClass("on");
		}

		if(scrolling < 10){
			$(".transition .show1").removeClass("on");
			$(".transition .show2").removeClass("on");
			$(".transition .show3").removeClass("on");
		}
	};
});