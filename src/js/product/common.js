$(document).ready(function(){

	/* меняем скрол */
	$('.tab-panel').mCustomScrollbar();

	/*вешаем аттрибуты на табы*/
	function addAttr(){
		var index = 1;
		var index2 = 1;

		$('.tab-item').each(function(){
			$(this).attr('data-num', index);
			index++;
		});

		$('.tab-item-content').each(function(){
			$(this).attr('data-num', index2);
			index2++;
		});
	}
	addAttr();

	/* переключаем табы */
	$('.tab-item').on('click', function(){
		/* активный таб */
		$('.tab-item').removeClass('active');
		$(this).addClass('active');

		$('.tab-item-content').removeClass('active');

		var attr = $(this).attr('data-num');
		$('.tab-item-content[data-num ='+attr+']').addClass('active');		
	});

	/* Слайдер блок с ценой */
	$('.slider-cost').slick({
    	fade: true,
    	dots: true,
    	infinite: true,
    	cssEase: 'linear',
    	appendArrows: $('.navigation'),
    	appendDots: $('.navigation'),
    	prevArrow: '<div class="prev"></div>',
    	nextArrow: '<div class="next"></div>',
  	});

  	/* переносим кнопку next в конец */
  	$('.navigation .next').appendTo('.navigation');

  	$('.navigation button').html('');

  	/* поп-ап с видео */

  	$('.you-tube-icon').on('click', function(){
  		$('.pop-up-wrapp, .pop-up').css('display', 'block');
  	});

  	$('.pop-up-wrapp, .close').on('click', function(){
  		$('.pop-up-wrapp, .pop-up').css('display', 'none');

  		/* перезагружаем iframe при закрытии поп-ап */
		var iframe = document.getElementById('iframe');
		iframe.src = iframe.src;

  	});

});