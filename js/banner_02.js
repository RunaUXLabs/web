$(document).ready(function(){
    /*
        ��� �̹����� ��� �ε��� �Ŀ� ���̸� ����ؾ� �ϹǷ� $(window).load�� �Ѵ�.
    */
    
        var window_w = $(window).width();
        var obj_wrap = $(".banner .banner_wrap"); //���� ����
        var obj_name = $(".banner .banner_wrap ul"); // ���� �����ϳ�
        var obj_child = $(".banner .banner_wrap ul li");// �ϳ��� ���
    
        //��� ��Ʈ�ѹ�ư
        var ctrl_btn = true;//��뿩�� (true, false)
        var ctrl_next = $(".next");
        var ctrl_prev = $(".prev");
        var ctrl_stop = $(".stop");
        var ctrl_play = $(".play");
    
        var mobile_size = 640;
        var obj_width = obj_wrap.width();
        var obj_move;//li �ϳ��� ���̰�(margin���Գ���)
        var mobile_view = 1;//����Ʈ������ ��ġ�� �ѱ��� �ݵ�� ������� 1���̾�� ��.(�������ص� �ϳ��� �Ѿ)
        var pc_view = 4;
        var obj_oneview;
        var obj_length = obj_child.length;
        var obj_index = 1;
        var obj_moveX;
        var obj_left;//�⺻ �������� �̵��ؾ��ϴ� ��
        var copy_count;
    
        //�ڵ��÷��� ����(true, false)
        var refreshInvervalId;
        var auto_play = true;
        var auto_time = 5000;
        var obj_drag = false;
    
        //��� �巡�� �̵�, ��뿩�� (true, false)
        var touch_draging = true;//����Ʈ�� ��ġ �ν�
    
        
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
        //drag Ȥ�� touch �� ������Ʈ�� �����̴� �Լ�
        function drag_move(moveX){
            obj_name.offset({
                left : obj_name.offset().left - moveX
            });
        }
    
        ///drag Ȥ�� touch�� ����Ǿ����� �����ϴ� �Լ�
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
    
            obj_moveX = (-(obj_index-1)*obj_move)-obj_left;
            //obj_index�� ��ġ���� ��� �ٽ� ����ϴ� ������ �ѹ� �߸� �̵��ϴ��� ������ ����� �̵��ϱ� ���ؼ� 
            obj_name.animate({
                left : obj_moveX
            }, 300)
    
        }
    
        //�տ��� li�� �����ؼ� �ڷ� �ٿ��ֱ�
        if(pc_view > mobile_view){
            copy_count = pc_view;
        }else{
            copy_count = mobile_view;
        }
        for(var i=0; i<copy_count; i++){
            obj_child.eq(i).clone().appendTo(obj_name);
            obj_child.eq(obj_length-(i+1)).clone().prependTo(obj_name);
        }
    
        view_count();
    
        if(ctrl_btn == true){
            ctrl_next.click(function(){
                auto_next();
                time_reset();
            });
            
            ctrl_prev.click(function(){
                obj_index = --obj_index;
                if(obj_index < 0){
                    obj_index = (obj_length-1);
                    obj_name.css("left", -obj_left-((obj_length-1)*obj_move));
                }
                obj_moveX = (-(obj_index-1)*obj_move)-obj_left;
                obj_name.animate({
                    left : obj_moveX
                }, 300);
                time_reset();
            });
            ctrl_stop.click(function(){
                auto_status = "stop";
                clearInterval(refreshInvervalId);
            });
            ctrl_play.click(function(){
                auto_status = "play";
                refreshInvervalId = setInterval(auto_next, auto_time);
            });
        }
    
        //�ڵ������� �����Ͽ��� ���
        if(auto_play == true){
            //����� ���� 1�����ϸ� �������� ����
            if(obj_length > 1){
                refreshInvervalId = setInterval(auto_next, auto_time);
            }
        }
        
        //�����찡 ��������Ǹ� ��� ������ �ٽ� ���
        $(window).resize(function(){
            window_w = $(window).width();
            obj_width = obj_wrap.width();
            view_count();
        });
    
        $(window).load(function(){
            obj_wrap.height(obj_child.height());
        });
        
        
        function view_count(){
            if(window_w > mobile_size){//pc
                obj_oneview = pc_view;
            }else{//mobile
                obj_oneview = mobile_view;
            }
    
            obj_child.parent().children().width(obj_width/obj_oneview); //������ �� li�� ���̸� �����ϱ� ���ؼ� �̷��� ��
            obj_move = obj_width/obj_oneview;
            obj_left = obj_move*copy_count;
            obj_wrap.height(obj_child.height()); // ����� ���̰��� ���� (����Ͽ��� ���̰� �ٸ� ���̵� ���̱� ���ؼ�)
            obj_name.width(((obj_oneview*2)*obj_length)*obj_move+100);//ul�� ���� ���� (li�� �Ʒ��� �ȶ�������)
            obj_name.css("left", (-(obj_index-1)*obj_move)-obj_left);
        }
    
        function auto_next(){
            obj_index = ++obj_index;
            //console.log(obj_index);
            if(obj_index > obj_length){ //���̻� ������ ����� ������ 
                obj_index = 1;
                obj_name.css("left", -obj_left+obj_move);
            }
            
            obj_moveX = (-(obj_index-1)*obj_move)-obj_left;
            //obj_index�� ��ġ���� ��� �ٽ� ����ϴ� ������ �ѹ� �߸� �̵��ϴ��� ������ ����� �̵��ϱ� ���ؼ� 
            obj_name.animate({
                left : obj_moveX
            }, 300);
        }
    
        function time_reset(){
            if(auto_status == "play"){
                clearInterval(refreshInvervalId);
                refreshInvervalId = setInterval(auto_next, auto_time);
            }
        }
    });