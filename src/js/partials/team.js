$('.team-arrows .slider-arrow').click(function(){
	var dir = $(this).attr('data-dir');
	var ind = $('.team-slider').children('.team-slide-active').index();
	var len = $('.team-slide').length;
	$('.team-slide').removeClass('team-slide-active');
	$('.team-dots .team-dot').removeClass('team-dot-active');
	if (dir == 'next'){
		var indNext = ind + 1;
		if (indNext == len) indNext = 0;
		$('.team-dots .team-dot[data-index="' + indNext + '"]').addClass('team-dot-active');
		$('.team-slider').children('.team-slide').eq(indNext).addClass('team-slide-active');
	}
	else{
		var indPrev = ind -1;
		if (indPrev < 0) indPrev = len - 1;
		$('.team-dots .team-dot[data-index="' + indPrev + '"]').addClass('team-dot-active');
		$('.team-slider').children('.team-slide').eq(indPrev).addClass('team-slide-active');
	}
});

$('.team-dots .team-dot').click(function(){
	if ($(this).hasClass('team-dot-active') ) return false;
	var ind = $(this).attr('data-index');
	$('.team-slide').removeClass('team-slide-active');
	$('.team-slider').children('.team-slide').eq(ind).addClass('team-slide-active');
	$('.team-dots .team-dot').removeClass('team-dot-active');
	$(this).addClass('team-dot-active');
});