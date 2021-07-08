$(document).ready(function(){
	var obj_name = $(".fullpage");
	var obj_cts1 = $(".sec01 .cts");
	var obj_cts2 = $(".sec02 .cts");
	var obj_cts3 = $(".sec03 .cts");
	var obj_top;
	var window_h = $(window).height();
	resize_check();
	

	$(window).resize(function(){
		window_h = $(window).height();
		resize_check();
	});

	function resize_check(){
		obj_name.height(window_h);
		obj_top = (window_h - obj_cts1.height())/2;
		obj_cts1.css("padding-top", obj_top);
		obj_top = (window_h - obj_cts2.height())/2;
		obj_cts2.css("padding-top", obj_top);
		obj_top = (window_h - obj_cts3.height())/2;
		obj_cts3.css("padding-top", obj_top);
	}
});