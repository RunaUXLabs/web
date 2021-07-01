$(document).ready(function(){
	var window_w = $(window).width();
	var obj_wrap = $(".seven");
	var obj_name = $(".seven ul");
	var obj_child = $(".seven ul li");
	var obj_child_width = "33.3%";
	var mobile_size = 640;
	var obj_paging = $(".seven .paging button");
	var btn_next = $(".seven .btn_next");
	var btn_prev = $(".seven .btn_prev");
	var obj_paging_index;
	var obj_width = obj_wrap.width();//한번에 움직여야 할 넓이(여기서는 obj_wrap의 넓이)
	var obj_index = 1;//현재 보이는 배너의 번호
	var obj_length = obj_child.length;//배너의 수
	var obj_left;
	var touch_draging = true;//스마트폰 터치 인식
	var obj_drag;
	
	size_set();
	index_change();
	
	$(window).resize(function(){
		window_w = $(window).width();
		size_set();
	});
	$(window).load(function(){
		size_set();
	});
	
	function size_set(){
		if(window_w<=mobile_size){
			obj_width = obj_wrap.width();
			obj_child.width(obj_width);
			obj_name.width(obj_width*obj_length);
			obj_wrap.height(obj_child.height());
		}else{
			obj_name.width("auto");
			obj_child.width(obj_child_width);
		}
	}
	
	if(touch_draging == true){
		//모바일에서 터치를 인식
		obj_name.on("touchstart", function(a){
			if(window_w<=mobile_size){
				obj_drag = true;
				e = a.originalEvent;
				currX = e.touches[0].pageX
				startX = e.touches[0].pageX;
				obj_name.on("touchmove", function(b){
					if(obj_drag ==  true){
						e = b.originalEvent;
						prevX = currX;
						currX = e.touches[0].pageX;
						moveX = prevX - currX;
						drag_move(moveX);
					}
				});
			}else{
				obj_drag = false;
			}
		});
		$(document).on("touchend", function(){
			if((obj_drag == true) && (Math.abs(startX) != (Math.abs(currX)))){
				drag_end();
			}
			obj_drag = false;
			obj_name.off("touchmove");
		});
	}

	//drag 혹은 touch 시 오브젝트를 움직이는 함수
	function drag_move(moveX){
		obj_name.offset({
			left : obj_name.offset().left - moveX
		});
	}

	
	//drag 혹은 touch가 종료되었을때 실행하는 함수
	function drag_end(){
		
		if(moveX > 0){//next
			obj_index++;
		}else{//prev
			obj_index--;
		}

		if(obj_index > obj_length){
			obj_index = obj_length;
		}else if(obj_index<1){
			obj_index = 1;
		}

		obj_moveX = -(obj_index-1)*obj_width;
		//obj_index로 위치값을 계속 다시 계산하는 이유는 한번 잘못 이동하더라도 다음에 제대로 이동하기 위해서 
		obj_name.animate({
			left : obj_moveX
		}, 300)
		index_change();

	}//drag_end
	
	//배너가 넘어가면 바뀌는 것들 (paging)
	function index_change(){
		console.log(obj_index);
		obj_paging.removeClass("on");
		obj_paging.eq(obj_index-1).addClass("on");
	}
	
	
	/* 이전 다음 버튼 */
	btn_next.on("click", function(){
		if(obj_index>=obj_length){
			obj_index = 1;
		}else{
			obj_index++;
		}
		obj_move();
	});
	
	btn_prev.on("click", function(){
		if(obj_index<=1){
			obj_index = obj_length;
		}else{
			obj_index--;
		}
		obj_move();
	});
	
	obj_paging.on("click", function(){
		obj_paging_index = $(this).index();
		console.log(obj_paging_index);
		obj_index = obj_paging_index+1;
		obj_move();
	});
	
	function obj_move(){
		obj_left = -(obj_index-1)*obj_width;
		obj_name.animate({
			left : obj_left
		},500);
		index_change();
	}
	
});









