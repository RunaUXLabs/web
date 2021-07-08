$(document).ready(function(){
	var speed = 3000; /* ��ũ���� �Ҷ� �߰��� ��ũ�� �� �� (��, ���� ũ�� �� ���� ��ũ�� ��) */
	var scroll_top = $(window).scrollTop();
	$("html, body").on("mousewheel DOMMouseScroll", function scroll_check(e){
		scroll_top = $(window).scrollTop();
		
		var E = e.originalEvent;
		var delta = 0;
		if (E.detail) {
			delta = E.detail * -40;
		}else{
			delta = E.wheelDelta;
		}
		$("html, body").off("mousewheel DOMMouseScroll");
		$("html, body").on("mousewheel DOMMouseScroll", function(e){
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
		
		
		if(delta > 0){//���� ��ũ��
			scroll_top = scroll_top-speed;
		}else{//�Ʒ��� ��ũ��
			scroll_top = scroll_top+speed;
		}
		$("html, body").animate({
			scrollTop : scroll_top
		}, 500, "swing", function(){$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();});
	});
});
