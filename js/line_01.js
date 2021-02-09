$(document).ready(function(){
	var line_w;
	$(".line_01.sample nav>ul>li").on("mouseenter", function(){
		line_w = ($(this).index() * 300)+300;
		// console.log(line_w);
		$(".line_01.sample .nav_line").animate({
			width : line_w
		}, 500);
	});

	$(".line_01.sample nav").on("mouseleave", function(){
		$(".line_01.sample .nav_line").animate({
			width : 0
		}, 200);
	});

});