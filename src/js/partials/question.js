var dotsQuan = $('.question-slide').length;

for (i=0; i < dotsQuan; i++){
	var dot = document.createElement('li');
	dot.setAttribute('class', 'slider-dot');
	dot.setAttribute('data-index', i);
	$('.question-dots .slider-dots').append(dot);
}

$('.question-dots .slider-dot:first-child').addClass('slider-dot-active');

$('.question-dots .slider-dot').click(function(){
	if ($(this).hasClass('slider-dot-active') ) return false;
	var ind = $(this).attr('data-index');
	$('.question-slide').removeClass('question-slide-active');
	$('.question-slider').children('.question-slide').eq(ind).addClass('question-slide-active');
	$('.question-dots .slider-dot').removeClass('slider-dot-active');
	$(this).addClass('slider-dot-active');
});

$('.question').bind('mousewheel', function(e){
	var indPrev = $('.question-slide-active').index() - 1;
	var indNext = $('.question-slide-active').index() + 1;
	$('.question-dots .slider-dot').removeClass('slider-dot-active');
	$('.question-slide').removeClass('question-slide-active');
	if(e.originalEvent.wheelDelta / 120 > 0) {
		$('.question-slider').children('.question-slide').eq(indPrev).addClass('question-slide-active');
	}
	else{
		$('.question-slider').children('.question-slide').eq(indNext).addClass('question-slide-active');
	}
	var ind = $('.question-slide-active').index();
	console.log(ind);
	if(ind < 0) {
		ind = 0;
		$('.question-slider').children('.question-slide').eq(ind).addClass('question-slide-active');
	}
	$('.question-dots .slider-dot[data-index="' + ind + '"]').addClass('slider-dot-active');
	if(indNext < dotsQuan) e.preventDefault()
	else{
		$('html, body').animate({
			scrollTop: $( $('.question').next() ).offset().top
		}, 500);
	}
});