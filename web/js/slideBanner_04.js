$(document).ready(function(){
	//페이드배너를 감싸고 있는 오브젝트의 이름, 이 오브젝트의 넓이가 페이드배너의 넓이가 됨.
	var obj_wrap=$(".slideBanner");
	//페이드배너 전체를 묶어주는 요소
	var obj_name = $(".slideBanner ul");
	//보여질 실제 페이드배너를 감싸고 있는 영역
	var obj_child = $(".slideBanner ul li");
	var obj_child_acitve = "active";
	var obj_child_animate = "ani";

	//페이드배너 드래그 이동, 사용여부 (true, false)
	var touch_draging = true;//스마트폰 터치 인식

	//페이드배너 컨트롤버튼
	var ctrl_btn = true;//사용여부 (true, false)
	var ctrl_next = $(".slideBanner .next");
	var ctrl_prev = $(".slideBanner .prev");
	var ctrl_stop = $(".slideBanner .stop");
	var ctrl_play = $(".slideBanner .play");

	//현재페이드배너 번호 / 전체 페이드배너번호
	var numbering = true;//사용여부 (true, false)
	var curr_num = $(".slideBanner .curr_num");
	var total_num = $(".slideBanner .total_num");

	//페이드배너 리스트
	var paging = true;//사용여부 (true, false)
	var paging_obj = $(".slideBanner .paging button");
	var paging_curr_class = "active";//현재 선택된 페이드배너를 표시할 class명
	var paging_index;

	//자동플레이 여부(true, false)
	var auto_play = true;
	var auto_time = 5000;
	var refreshInvervalId;
	var auto_status;

	//이 아래 변수는 수정 금지
	var obj_drag = false;
	var obj_index = 0;
	var next_index = obj_index+1;
	//페이드배너의 갯수 계산
	var obj_length = obj_child.length;
	//페이드배너의 넓이 계산
	var obj_width = obj_wrap.width();
	var startX = null;
	var prevX = null;
	var currX = null;
	var moveX = null;
	var afterX = null;
	var e = null;
	
	
	if(touch_draging == true){
		//모바일에서 터치를 인식
		obj_name.on("touchstart", function(a){
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
					//drag_move(moveX);
				}
			});
			
		});
		$(document).on("touchend", function(){
			if((obj_drag == true) && (Math.abs(startX) != (Math.abs(currX)))){
				drag_end();
			}
			obj_drag = false;
			obj_name.off("touchmove");
		});
	}

	///drag 혹은 touch가 종료되었을때 실행하는 함수
	function drag_end(){
		//console.log(moveX);
		if(moveX > 0){
			next_index = obj_index+1;
		}else{
			next_index = obj_index-1;
		}

		if(next_index > obj_length-1){
			next_index = 0;
		}else if(next_index<0){
			next_index = obj_length-1;
		}
		popup_change(next_index);
		time_reset();
	}
	
	function popup_change(next_index){
		//console.log(obj_index+", "+next_index);
		if(obj_index != next_index){
			obj_child.eq(next_index).show();
			obj_child.eq(obj_index).fadeOut(500, function(){
				obj_child.eq(next_index).addClass(obj_child_acitve);
				obj_child.eq(obj_index).removeClass(obj_child_acitve);
				obj_child.eq(next_index).addClass(obj_child_animate);
				obj_child.eq(obj_index).removeClass(obj_child_animate);
				obj_index = next_index;
				index_change(obj_index);
			});
		}
		
	}//popup_change

	//index 변경 시 변경해야 할 것들 (paging, numbering)
	function index_change(index){
		if(numbering == true){
			curr_num.html(index+1);
		}
		if(paging == true){
			paging_obj.removeClass(paging_curr_class);
			paging_obj.eq(index).addClass(paging_curr_class);
		}
	}

	function auto_next(){
		if(obj_index >= obj_length -1){
			next_index = 0;
		}else{
			next_index = obj_index+1;
		}
		popup_change(next_index);
	}

	function time_reset(){
		if(auto_status == "play"){
			clearInterval(refreshInvervalId);
			refreshInvervalId = setInterval(auto_next, auto_time);
		}
	}

	if(ctrl_btn == true){
		ctrl_prev.on("click", function(){
			if(obj_index < 1){
				next_index = obj_length-1;
			}else{
				next_index = obj_index-1;
			}
			popup_change(next_index);
			time_reset();
		});
		ctrl_next.on("click", function(){
			auto_next();
			time_reset();
		});
		ctrl_stop.on("click", function(){
			auto_status = "stop";
			clearInterval(refreshInvervalId);
		});
		ctrl_play.on("click", function(){
			auto_status = "play";
			refreshInvervalId = setInterval(auto_next, auto_time);
		});
	}

	if(auto_play == true){
		//페이드배너의 수가 1개이하면 실행하지 않음
		if(obj_length > 1){
			obj_child.eq(obj_index).addClass(obj_child_acitve);
			refreshInvervalId = setInterval(auto_next, auto_time);
			auto_status = "play";
		}
	}else{
		obj_child.eq(obj_index).addClass(obj_child_acitve);
	}
	$(window).load(function(){ 
		obj_child.eq(obj_index).addClass(obj_child_animate);
	});

	//페이지번호를 사용할 경우
	if(numbering == true){
		curr_num.html(obj_index+1);
		total_num.html(obj_length);
	}

	//paging을 사용할 경우
	if(paging == true){
		paging_obj.removeClass(paging_curr_class);
		paging_obj.eq(obj_index).addClass(paging_curr_class);
		paging_obj.on("click", function(){
			paging_index = $(this).index();
			//console.log(paging_index);
			popup_change(paging_index);
			time_reset();
		});
	}

	//높이 재설정
	obj_wrap.height(obj_child.height());
	$(window).load(function(){
		obj_wrap.height(obj_child.height());
	});
	$(window).resize(function(){
		obj_wrap.height(obj_child.height());
	});
});
