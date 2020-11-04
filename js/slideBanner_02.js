$(document).ready(function(){
	//�����̵����� ���ΰ� �ִ� ������Ʈ�� �̸�, �� ������Ʈ�� ���̰� �����̵����� ���̰� ��.
	var obj_wrap=$(".slideBanner");
	//������ ������Ʈ�� �̸�
	var obj_name = $(".slideBanner ul");
	//������ ���� �����̵����� ���ΰ� �ִ� ����
	var obj_child = $(".slideBanner ul li");
	
	//�����̵��� �巡�� �̵�, ��뿩�� (true, false)
	var mouse_draging = false;//��ǻ�� ���콺 �巡�� �ν�
	var touch_draging = true;//����Ʈ�� ��ġ �ν�

	//�����̵��� ��Ʈ�ѹ�ư
	var ctrl_btn = true;//��뿩�� (true, false)
	var ctrl_next = $(".slideBanner .next");
	var ctrl_prev = $(".slideBanner .prev");
	var ctrl_stop = $(".slideBanner .stop");
	var ctrl_play = $(".slideBanner .play");

	//���罽���̵��� ��ȣ / ��ü �����̵��ʹ�ȣ
	var numbering = true;//��뿩�� (true, false)
	var curr_num = $(".slideBanner .curr_num");
	var total_num = $(".slideBanner .total_num");

	//�����̵��� ����Ʈ
	var paging = true;//��뿩�� (true, false)
	var paging_obj = $(".slideBanner .paging button");
	var paging_curr_class = "active";//���� ���õ� �����̵����� ǥ���� class��
	var paging_index;//Ŭ���� ������Ʈ

	//�ڵ��÷��� ����(true, false)
	var auto_play = true;
	var auto_time = 5000;
	var auto_status;

	//�� �Ʒ� ������ ���� ����
	var obj_position_reset;
	var refreshInvervalId;
	var obj_drag = false;
	var obj_index = 1;
	//�����̵����� ���� ���
	var obj_length = obj_child.length;
	if(obj_length <= 1){mouse_draging = false; touch_draging = false;}
	//�����̵����� ���� ���
	var obj_width = obj_wrap.width();
	obj_child.width(obj_width);
	var startX = null;
	var prevX = null;
	var currX = null;
	var moveX = null;
	var afterX = null;
	var e = null;
	default_set();

	if(touch_draging == true){
		//����Ͽ��� ��ġ�� �ν�
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
					drag_move(moveX);
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

	if(mouse_draging == true){
		//���콺 �巡�׸� �ν�
		obj_name.on("mousedown", function(a){
			obj_drag = true;
			currX = a.pageX;
			startX = a.pageX;
			obj_name.on("mousemove", function(b){
				if(obj_drag ==  true){
					prevX = currX;
					currX = b.pageX;
					moveX = prevX - currX;
					drag_move(moveX);
				}
			});
		});
		$(document).on("mouseup", function(){
			if((obj_drag == true) && (Math.abs(startX) != (Math.abs(currX)))){
				drag_end();
			}
			obj_drag = false;
			obj_name.off("mousemove");
		});
	}

	//drag Ȥ�� touch �� ������Ʈ�� �����̴� �Լ�
	function drag_move(moveX){
		$(obj_name).offset({
			left : $(obj_name).offset().left - moveX
		});
		obj_index = parseInt(-($(obj_name).position().left) / obj_width);
		index_change(obj_index);
	}

	///drag Ȥ�� touch�� ����Ǿ����� �����ϴ� �Լ�
	function drag_end(){
		if($(obj_name).position().left > 0){
			afterX = 0;
		}else if($(obj_name).position().left < -((obj_length+1) * obj_width)){
			afterX = (obj_length) * obj_width;
		}else{
			if(moveX > 0){
				afterX = (obj_index+1) * obj_width;
			}else{
				afterX = (obj_index) * obj_width;
			}
		}
		$(obj_name).animate({
			left : -afterX
		}, 500, function(){
			obj_index = parseInt(-($(obj_name).position().left) / obj_width);
			if(obj_index <= 0){
				obj_index = obj_length;
				$(obj_name).css("left", -(obj_length*obj_width));
			}else if(obj_index > obj_length){
				obj_index = 1;
				$(obj_name).css("left", -obj_width);
			}
			index_change(obj_index);
			time_reset();
		});
	}

	//animate�� ������Ʈ�� �����̴� �Լ�
	function animate_move(go_index){
		if(go_index < 1){
			obj_index = obj_length;
			obj_position_reset = -(obj_width*obj_length);
		}else if(go_index > obj_length){
			obj_index = 1;
			obj_position_reset = -obj_width;
		}else{
			obj_position_reset = "";
			obj_index = go_index;
		}
		
		$(obj_name).animate({
			left : -((go_index) * obj_width)
		}, 500, function(){
			if(obj_position_reset != ""){
				$(obj_name).css("left", obj_position_reset);
			}
		});
		index_change(obj_index);
	}

	//auto play�� ���� �����̵��ʷ� �̵��ϴ� �Լ�
	function auto_next(){
		obj_index++;
		animate_move(obj_index);
	}

	//index ���� �� �����ؾ� �� �͵� (paging, numbering)
	function index_change(index){
		if(numbering == true){
			curr_num.html(index);
		}
		if(paging == true){
			paging_obj.removeClass(paging_curr_class);
			paging_obj.eq(index-1).addClass(paging_curr_class);
		}
	}

	function time_reset(){
		if(auto_status == "play"){
			clearInterval(refreshInvervalId);
			refreshInvervalId = setInterval(auto_next, auto_time);
		}
	}

	function default_set(){
		if(obj_length > 1){
			obj_child.eq(0).clone().appendTo(obj_name);
			obj_child.eq(obj_length-1).clone().prependTo(obj_name);
			obj_name.css("left", -obj_width);
			obj_name.width((obj_length+2)*obj_width);
		}
		index_change(obj_index);
	}
	
	if(ctrl_btn == true){
		ctrl_prev.on("click", function(){
			obj_index--;
			animate_move(obj_index);
			time_reset();
		});
		ctrl_next.on("click", function(){
			auto_next();
			time_reset();
		});
		ctrl_stop.on("click", function(){
			clearInterval(refreshInvervalId);
			auto_status = "stop";
		});
		ctrl_play.on("click", function(){
			refreshInvervalId = setInterval(auto_next, auto_time);
			auto_status = "play";
		});
	}

	//�ڵ������� �����Ͽ��� ���
	if(auto_play == true){
		//�����̵����� ���� 1�����ϸ� �������� ����
		if(obj_length > 1){
			refreshInvervalId = setInterval(auto_next, auto_time);
			auto_status = "play";
		}
	}

	//��������ȣ�� ����� ���
	if(numbering == true){
		curr_num.html(obj_index);
		total_num.html(obj_length);
	}

	//paging�� ����� ���
	if(paging == true){
		paging_obj.removeClass(paging_curr_class);
		paging_obj.eq(obj_index-1).addClass(paging_curr_class);
		
		paging_obj.on("click", function(){
			//Ŭ���� paging�� ��ȣ (1��° paging�� ���� 0)
			paging_index = $(this).index();
			//console.log(paging_index);
			//�ش� ��ȣ �����̵��ʷ� �̵�..
			animate_move(paging_index+1);
			time_reset();
		});
	}

	//�����찡 ��������Ǹ� �����̵��� ������ �ٽ� ���
	$(window).resize(function(){
		obj_width = obj_wrap.width();
		obj_child.parent().children().width(obj_width);
		$(obj_name).css("left", -((obj_index) * obj_width));
		obj_wrap.height(obj_child.height());
		obj_name.width((obj_length+2)*obj_width);
	});
	
	$(window).load(function(){
		obj_wrap.height(obj_child.height());
	});
});