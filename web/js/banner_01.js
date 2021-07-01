$(document).ready(function(){
	var obj_wrap = $(".banner .banner_wrap");
	var obj_name = $(".banner .banner_wrap ul");
	var obj_child = $(".banner .banner_wrap ul li");
	var btn_next = $(".banner .next");
	var btn_prev = $(".banner .prev");
	var obj_move = obj_child.width();;//이동값
	var obj_oneview = 4;//한번에 보이는 배너수
	var obj_length = obj_child.length;
	var obj_index = 1;
	var obj_moveX;

	obj_name.width(obj_child.width()*obj_length);
	obj_wrap.height(obj_child.height());

	btn_next.on("click", function(){
		if(obj_index < obj_length-obj_oneview+1){
			obj_index++;
			obj_moveX = -(obj_index-1) * obj_move;
			obj_name.animate({
				left : obj_moveX
			}, 300);
			
		}
	});
	btn_prev.on("click", function(){
		if(obj_index > 1){
			obj_index--;
			obj_moveX = -(obj_index-1) * obj_move;
			obj_name.animate({
				left : obj_moveX
			}, 300);
			
		}
	});

});
