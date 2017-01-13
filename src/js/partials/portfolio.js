//= ../product/jquery.mCustomScrollbar.js
//= ../product/slick.min.js
$('.portfolio-break').mCustomScrollbar();
$('.portfolio-inner-slider').slick({
	prevArrow: $('.portfolio-inner-slider-arrow-left'),
	nextArrow: $('.portfolio-inner-slider-arrow-right')
});

$('.portfolio-arrows .slider-arrow').click(function(){
	var dir = $(this).attr('data-dir');
	var ind = $('.portfolio-slider').children('.portfolio-slide-active').index();
	var len = $('.portfolio-slide').length;
	$('.portfolio-slide').removeClass('portfolio-slide-active');
	$('.portfolio-dots .slider-dot').removeClass('slider-dot-active');
	if (dir == 'next'){
		var indNext = ind + 1;
		if (indNext == len) indNext = 0;
		$('.portfolio-dots .slider-dot[data-index="' + indNext + '"]').addClass('slider-dot-active');
		$('.portfolio-slider').children('.portfolio-slide').eq(indNext).addClass('portfolio-slide-active');
	}
	else{
		var indPrev = ind -1;
		if (indPrev < 0) indPrev = len - 1;
		$('.portfolio-dots .slider-dot[data-index="' + indPrev + '"]').addClass('slider-dot-active');
		$('.portfolio-slider').children('.portfolio-slide').eq(indPrev).addClass('portfolio-slide-active');
	}
});