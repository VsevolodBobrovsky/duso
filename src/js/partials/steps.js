$('.steps-arrows .slider-arrow').click(function(){
	var dir = $(this).attr('data-dir');
	var ind = $('.steps-slider').children('.steps-slide-active').index();
	var len = $('.steps-slide').length;
	$('.steps-slide').removeClass('steps-slide-active');
	if (dir == 'next'){
		var indNext = ind + 1;
		if (indNext == len) indNext = 0;
		$('.steps-slider').children('.steps-slide').eq(indNext).addClass('steps-slide-active');
	}
	else{
		var indPrev = ind -1;
		if (indPrev < 0) indPrev = len - 1;
		$('.steps-slider').children('.steps-slide').eq(indPrev).addClass('steps-slide-active');
	}
});