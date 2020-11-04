$(document).ready(function(){
	var page_wrap = $(".layout"); // Ȩ������ ��ü�� ���δ� ������ �̸�
	var page_name = $(".fullpage");
	var page_inner_name = $(".cts_wrapper"); // ���Ʒ� ��� ��ġ�� ������ �̸�
	var page_css = "on"; // �� ������ ���϶� �߰��� class��
	var window_h = $(window).height();
	var window_w = $(window).width();
	var index_wrap_name = $("aside"); // ���޴��� �̸�
	var index_name = $("aside ul li"); // ���޴� �ϳ��� �̸�
	var index_length = index_name.length;
	var index_css = "on"; // ���޴��� ���� �޴��� �߰��Ǵ� Ŭ������ 
	var mobile_size = 640; //����Ϸ� ��ȯ�Ǵ� ������ (�ڵ���ũ��, �ڵ��������� ����)
	var footer_use = true;//footer�� ���翩�� (true - ������, false - �������� ����)
	var footer_name = $("#footer");//footer�̸�
	var footer_use_h;//footer�� ���̰�
	var header_name = $("#header"); //header�� �̸�
	var header_fix_use = true;//header�� fixed�� �� ��� (���� absolute�� ���� ���� ���� false�� ��� �Ѵ�.)
	var header_fix_h;//header�� ���̰� 
	var page_index = 1;//���� ��������ȣ
	var prev_index;
	var page_total;

	page_h();
	page_total = page_name.length;
	prev_index = page_total;
	index_labeling();
	index_reset();
	
	if(footer_use == true){
		footer_name.css("z-index",1);
	}

	function index_reset(){
		if(window_w>mobile_size){
			if(page_index<page_total){
				for(i=0;i<page_total;i++){
					page_name.eq(i).css("z-index",page_total-i+1);
				}
				page_name.eq(page_index-1).css("z-index",page_total+2);
			}
		}else{
			page_name.css("z-index",1);
			footer_name.css("z-index",1);
		}
	}

	function index_labeling(){
		if(window_w>mobile_size){
			page_name.removeClass(page_css);
			page_name.eq(page_index-1).addClass(page_css);
			index_name.removeClass(index_css);
			index_name.eq(page_index-1).addClass(index_css);
		}else{
			page_name.removeClass(page_css);
			index_name.removeClass(index_css);
		}
		index_wrap_name.removeClass();
		index_wrap_name.addClass("sec"+page_index);
		header_name.removeClass();
		header_name.addClass("sec"+page_index);
	}

	function page_h(){
		if(window_w>mobile_size){
			page_name.height(window_h);
			page_wrap.height(window_h);
		}else{
			page_name.height("auto");
			page_wrap.height("auto");
		}
	}

	function inner_padding(){
		if(window_w>mobile_size){
			for(var i=0;i<page_total;i++){
				if(header_fix_use == true){
					page_name.eq(i).find(page_inner_name).css("padding-top", ((window_h  - page_name.eq(i).find(page_inner_name).height() - header_fix_h)/2)+header_fix_h);
				}else{
					page_name.eq(i).find(page_inner_name).css("padding-top", (window_h  - page_name.eq(i).find(page_inner_name).height())/2);
				}
			}
		}else{
			page_name.find(page_inner_name).css("padding-top", 0);
		}
	}

	$(window).resize(function(){
		window_w = $(window).width();
		window_h = $(window).height();
		header_fix_h = header_name.height();
		footer_use_h = footer_name.height();
		page_h();
		index_labeling();
		inner_padding();
		if(window_w<=mobile_size){
			page_name.css("top","auto");
			page_name.css("z-index",1);
			if(footer_use == true){
				footer_name.css("z-index",1);
				footer_name.css("top","auto");
			}
		}else{
			console.log("�����");
			page_index = 1;
			index_reset();
			index_labeling();
		}
	})

	$(window).load(function(){
		header_fix_h = header_name.height();
		footer_use_h = footer_name.height();
		index_labeling();
		inner_padding();
	});

	$(index_name).on("click", function(){
		if($(this).index()+1 != page_index){
			prev_index = page_index;
			page_index = $(this).index()+1;
			if(Math.abs(page_index-prev_index) > 1){
				page_name.eq(page_index-1).css("z-index",page_total+2);
				page_name.eq(prev_index-1).css("z-index",page_total+2);
			}
			if(prev_index>page_total){
				if(page_index == page_total){
					page_name.eq(page_index-1).css("top",-footer_use_h+"px");
					footer_name.animate({
						top : window_h+"px"
					},1000,"easeOutQuint", index_reset);
					page_name.eq(page_index-1).animate({
						top : 0
					},1000,"easeOutQuint");
				}else{
					page_name.eq(page_index-1).css("z-index",page_total+3);
					page_name.eq(page_index-1).css("top",-window_h+"px");
					page_name.eq(page_total-1).css("top",-footer_use_h+"px");
					footer_name.animate({
						top : window_h+"px"
					},800,"easeOutQuint");
					page_name.eq(page_total-1).animate({
						top : 0
					},800,"easeOutQuint");
					page_name.eq(page_index-1).delay(300).animate({
						top : 0
					},800,"easeOutQuint", index_reset);
				}
			}else{
				if(page_index>prev_index){//�Ʒ��� ��ũ��
					page_name.eq(page_index-1).css("top",window_h+"px");
					page_name.eq(prev_index-1).animate({
						top : - window_h+"px"
					},1000,"easeOutQuint", index_reset);
					page_name.eq(page_index-1).animate({
						top : 0
					},1000,"easeOutQuint");
				}else{//���� ��ũ��
					page_name.eq(page_index-1).css("top",-window_h+"px");
					page_name.eq(prev_index-1).animate({
						top : window_h+"px"
					},1000,"easeOutQuint", index_reset);
					page_name.eq(page_index-1).animate({
						top : 0
					},1000,"easeOutQuint");
				}
			}
			index_labeling();
		}
	});

	//���콺 ��ũ���� �����ؼ� ���������� �̵�
	$("html, body").on("mousewheel DOMMouseScroll", function scroll_check(e){
		if(window_w > mobile_size){
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
			},function(){passive: false});


			if(delta > 0){//���� ��ũ��
				if((page_index > page_total)&&(footer_use == true)){//footer�� �����
					prev_index = page_index;
					page_index = page_total;
				}else if(page_index > 1){
					prev_index = page_index;
					page_index--;
				}else{
					prev_index = page_index;
					page_index = 1;
				}
			}else{//�Ʒ��� ��ũ��
				if(page_index<page_total){
					prev_index = page_index;
					page_index++;
				}else if((page_index<page_total+1)&&(page_index!=prev_index)&&(footer_use == true)){
					prev_index = page_index;
					page_index++;
				}else{
					prev_index = page_index;
				}
			}
			if((page_index != prev_index)&&(page_index <= page_total)&&(prev_index <= page_total)){//�Ϲ� ������.
				if(page_index>prev_index){//�Ʒ��� ��������
					page_name.eq(page_index-1).css("top",window_h+"px");
					page_name.eq(prev_index-1).animate({
						top : - window_h+"px"
					},1000,"easeOutQuint");
					page_name.eq(page_index-1).animate({
						top : 0
					},1000,"easeOutQuint", function(){$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();index_reset();});
				}else{//���� �ö󰥶�
					page_name.eq(page_index-1).css("top",-window_h+"px");
					page_name.eq(prev_index-1).animate({
						top : window_h+"px"
					},1000,"easeOutQuint");
					page_name.eq(page_index-1).animate({
						top : 0
					},1000,"easeOutQuint", function(){$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();index_reset();});
				}
				index_labeling();
			}else if((page_index > page_total)||(prev_index > page_total)){//footer�� �ö���� animation
				footer_name.css("z-index",page_total+2);
				if(page_index > prev_index){//footer�� ��Ÿ���� ȿ��
					footer_name.css("top",window_h+"px");
					page_name.eq(prev_index-1).animate({
						top : - footer_use_h+"px"
					},1000,"easeOutQuint");
					footer_name.animate({
						top : window_h - footer_use_h+"px"
					},1000,"easeOutQuint", function(){$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();index_reset();});
				}else if(page_index < prev_index){//footer�� ������� ȿ��
					page_name.eq(page_index-1).css("top",-footer_use_h+"px");
					footer_name.animate({
						top : window_h+"px"
					},1000,"easeOutQuint");
					page_name.eq(page_index-1).animate({
						top : 0
					},1000,"easeOutQuint", function(){$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();index_reset();footer_name.css("z-index",1);});
				}else{
					$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();
				}
				index_labeling();
			}else{
				$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();
			}
		}
	});
	
});

