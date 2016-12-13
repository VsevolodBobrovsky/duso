for (i=0; i < $('.clients-slide').length; i++){
	var dot = document.createElement('li');
	dot.setAttribute('class', 'slider-dot');
	dot.setAttribute('data-index', i);
	$('.clients-dots .slider-dots').append(dot);
}

$('.clients-dots .slider-dot:first-child').addClass('slider-dot-active');

$('.clients-arrows .slider-arrow').click(function(){
	var dir = $(this).attr('data-dir');
	var ind = $('.clients-slider').children('.clients-slide-active').index();
	var len = $('.clients-slide').length;
	$('.clients-slide').removeClass('clients-slide-active');
	$('.clients-dots .slider-dot').removeClass('slider-dot-active');
	if (dir == 'next'){
		var indNext = ind + 1;
		if (indNext == len) indNext = 0;
		$('.clients-dots .slider-dot[data-index="' + indNext + '"]').addClass('slider-dot-active');
		$('.clients-slider').children('.clients-slide').eq(indNext).addClass('clients-slide-active');
	}
	else{
		var indPrev = ind -1;
		if (indPrev < 0) indPrev = len - 1;
		$('.clients-dots .slider-dot[data-index="' + indPrev + '"]').addClass('slider-dot-active');
		$('.clients-slider').children('.clients-slide').eq(indPrev).addClass('clients-slide-active');
	}
});

$('.clients-dots .slider-dot').click(function(){
	var ind = $(this).attr('data-index');
	$('.clients-slide').removeClass('clients-slide-active');
	$('.clients-slider').children('.clients-slide').eq(ind).addClass('clients-slide-active');
	$('.clients-dots .slider-dot').removeClass('slider-dot-active');
	$(this).addClass('slider-dot-active');
});