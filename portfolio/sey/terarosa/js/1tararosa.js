var swiper = new Swiper('.swiper-container.banner', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 3300,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination.ban',
      },
});

var swiper2 = new Swiper('.swiper-container.timesimg',{
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

var swiper3 = new Swiper('.swiper-container.Origin', {
    pagination: {
        el: '.swiper-pagination.greenbean',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

var swiper4 = new Swiper('.swiper-container.Blend', {
    pagination: {
        el: '.swiper-pagination.blendig',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

var swiper5 = new Swiper('.swiper-container.Locations', {
    slidesPerView: 1,
    direction: getDirection(),
    autoplay: {
        delay: 4500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination.space',
        clickable: true,
    },
    on: {
        resize: function () {
            swiper5.changeDirection(getDirection());
        }
    }
});
function getDirection() {
    var direction = window.innerWidth <= 640 ? 'horizontal' : 'vertical';
    return direction;
}



$(document).ready(function() {
    $(".news .tab > span:eq(0)").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $(".story").addClass("on");
        $(".New").removeClass("on");
    });
    $(".news .tab > span:eq(1)").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $(".New").addClass("on");
        $(".story").removeClass("on");
    });

    $(".sec02 .tab > span").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $('#'+$(this).data('id')).addClass('on').siblings().removeClass('on');
        $("#"+$(this).data('id')).find('.swiper-container')[0].swiper.update();
    });

    $(".linetab > span:eq(0)").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $(".Locations").addClass("on");
        $(".TERAMUSEUM").removeClass("on");
    });
    $(".linetab > span:eq(1)").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $(".TERAMUSEUM").addClass("on");
        $(".Locations").removeClass("on");
    });
    $(".mbmanu").click(function(){
        $("nav").toggleClass("on");
        $(".mbsearch > input").toggleClass("on");
        $(this).toggleClass("on");
    });
    
    for (var i = 1; i <= 49; i++) {
        $('#montly').append(new Option('No.' + i + '호', '../files/no' + i + '_newsletter.pdf'));
    }
    $('#montly').on('change',function() {
        var url = $(this).val();
        if (url) {
            window.open(url);
        }
        return false;
    });

    $("button").click(function() {
        $('form').toggleClass('on')
    });

    $('.scrolltop').click(function(){
        $('html, body').animate({
            scrollTop : 0
        }, 1000);
    });
});
