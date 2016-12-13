for (i=0; i < $('.discount-slide').length; i++){
	var dot = document.createElement('li');
	dot.setAttribute('class', 'slider-dot');
	dot.setAttribute('data-index', i);
	$('.discount-dots .slider-dots').append(dot);
}

$('.discount-dots .slider-dot:first-child').addClass('slider-dot-active');

$('.discount-arrows .slider-arrow').click(function(){
	var dir = $(this).attr('data-dir');
	var ind = $('.discount-slider').children('.discount-slide-active').index();
	var len = $('.discount-slide').length;
	$('.discount-slide').removeClass('discount-slide-active');
	$('.discount-dots .slider-dot').removeClass('slider-dot-active');
	if (dir == 'next'){
		var indNext = ind + 1;
		if (indNext == len) indNext = 0;
		$('.discount-dots .slider-dot[data-index="' + indNext + '"]').addClass('slider-dot-active');
		$('.discount-slider').children('.discount-slide').eq(indNext).addClass('discount-slide-active');
	}
	else{
		var indPrev = ind -1;
		if (indPrev < 0) indPrev = len - 1;
		$('.discount-dots .slider-dot[data-index="' + indPrev + '"]').addClass('slider-dot-active');
		$('.discount-slider').children('.discount-slide').eq(indPrev).addClass('discount-slide-active');
	}
});

$('.discount-dots .slider-dot').click(function(){
	var ind = $(this).attr('data-index');
	$('.discount-slide').removeClass('discount-slide-active');
	$('.discount-slider').children('.discount-slide').eq(ind).addClass('discount-slide-active');
	$('.discount-dots .slider-dot').removeClass('slider-dot-active');
	$(this).addClass('slider-dot-active');
});