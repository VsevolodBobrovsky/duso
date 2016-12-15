for (i=0; i < $('.blog-slide').length; i++){
	var dot = document.createElement('li');
	dot.setAttribute('class', 'slider-dot');
	dot.setAttribute('data-index', i);
	$('.blog-dots .slider-dots').append(dot);
}

$('.blog-dots .slider-dot:first-child').addClass('slider-dot-active');

$('.blog-arrows .slider-arrow').click(function(){
	var dir = $(this).attr('data-dir');
	var ind = $('.blog-slider').children('.blog-slide-active').index();
	var len = $('.blog-slide').length;
	$('.blog-slide').removeClass('blog-slide-active');
	$('.blog-dots .slider-dot').removeClass('slider-dot-active');
	if (dir == 'next'){
		var indNext = ind + 1;
		if (indNext == len) indNext = 0;
		$('.blog-dots .slider-dot[data-index="' + indNext + '"]').addClass('slider-dot-active');
		$('.blog-slider').children('.blog-slide').eq(indNext).addClass('blog-slide-active');
	}
	else{
		var indPrev = ind -1;
		if (indPrev < 0) indPrev = len - 1;
		$('.blog-dots .slider-dot[data-index="' + indPrev + '"]').addClass('slider-dot-active');
		$('.blog-slider').children('.blog-slide').eq(indPrev).addClass('blog-slide-active');
	}
});

$('.blog-dots .slider-dot').click(function(){
	if ($(this).hasClass('slider-dot-active') ) return false;
	var ind = $(this).attr('data-index');
	$('.blog-slide').removeClass('blog-slide-active');
	$('.blog-slider').children('.blog-slide').eq(ind).addClass('blog-slide-active');
	$('.blog-dots .slider-dot').removeClass('slider-dot-active');
	$(this).addClass('slider-dot-active');
});