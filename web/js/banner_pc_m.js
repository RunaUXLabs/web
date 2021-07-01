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
	var obj_width = obj_wrap.width();//�ѹ��� �������� �� ����(���⼭�� obj_wrap�� ����)
	var obj_index = 1;//���� ���̴� ����� ��ȣ
	var obj_length = obj_child.length;//����� ��
	var obj_left;
	var touch_draging = true;//����Ʈ�� ��ġ �ν�
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
		//����Ͽ��� ��ġ�� �ν�
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

	//drag Ȥ�� touch �� ������Ʈ�� �����̴� �Լ�
	function drag_move(moveX){
		obj_name.offset({
			left : obj_name.offset().left - moveX
		});
	}

	
	//drag Ȥ�� touch�� ����Ǿ����� �����ϴ� �Լ�
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
		//obj_index�� ��ġ���� ��� �ٽ� ����ϴ� ������ �ѹ� �߸� �̵��ϴ��� ������ ����� �̵��ϱ� ���ؼ� 
		obj_name.animate({
			left : obj_moveX
		}, 300)
		index_change();

	}//drag_end
	
	//��ʰ� �Ѿ�� �ٲ�� �͵� (paging)
	function index_change(){
		console.log(obj_index);
		obj_paging.removeClass("on");
		obj_paging.eq(obj_index-1).addClass("on");
	}
	
	
	/* ���� ���� ��ư */
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









