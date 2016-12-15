for (i=0; i < $('.history-slide').length; i++){
	var dot = document.createElement('li');
	dot.setAttribute('class', 'slider-dot');
	dot.setAttribute('data-index', i);
	$('.history-dots .slider-dots').append(dot);
}

$('.history-dots .slider-dot:first-child').addClass('slider-dot-active');

$('.history-arrows .slider-arrow').click(function(){
	var dir = $(this).attr('data-dir');
	var ind = $('.history-slider').children('.history-slide-active').index();
	var len = $('.history-slide').length;
	$('.history-slide').removeClass('history-slide-active');
	$('.history-dots .slider-dot').removeClass('slider-dot-active');
	if (dir == 'next'){
		var indNext = ind + 1;
		if (indNext == len) indNext = 0;
		$('.history-dots .slider-dot[data-index="' + indNext + '"]').addClass('slider-dot-active');
		$('.history-slider').children('.history-slide').eq(indNext).addClass('history-slide-active');
		$('.history').animate({'opacity':'0'}, 200, function(){
			$('.history').css({'background-image':'url(../img/bgs/history/' + indNext + '.png)'});
		});
		$('.history').animate({'opacity':'1'}, 200);
	}
	else{
		var indPrev = ind -1;
		if (indPrev < 0) indPrev = len - 1;
		$('.history-dots .slider-dot[data-index="' + indPrev + '"]').addClass('slider-dot-active');
		$('.history-slider').children('.history-slide').eq(indPrev).addClass('history-slide-active');
		$('.history').animate({'opacity':'0'}, 200, function(){
			$('.history').css({'background-image':'url(../img/bgs/history/' + indPrev + '.png)'});
		});
		$('.history').animate({'opacity':'1'}, 200);
	}
});

$('.history-dots .slider-dot').click(function(){
	if ($(this).hasClass('slider-dot-active') ) return false;
	var ind = $(this).attr('data-index');
	$('.history-slide').removeClass('history-slide-active');
	$('.history-slider').children('.history-slide').eq(ind).addClass('history-slide-active');
	$('.history-dots .slider-dot').removeClass('slider-dot-active');
	$(this).addClass('slider-dot-active');
	$('.history').animate({'opacity':'0'}, 200, function(){
		$('.history').css({'background-image':'url(../img/bgs/history/' + ind + '.png)'});
	});
	$('.history').animate({'opacity':'1'}, 200);
});