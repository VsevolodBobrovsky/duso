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
	$('.question-bg-img').animate({'opacity':'0'}, 0, function(){
		$('.question-bg-img').removeClass('question-bg-img-active');
		$('.question-bg-img').eq(ind).addClass('question-bg-img-active');
	});
	$('.question-bg-img').animate({'opacity':'1'}, 150);
});

var mousewheelevent = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";

$('.question').bind(mousewheelevent, function(e){
	var indPrev = $('.question-slide-active').index() - 1;
	if(indPrev < 0) indPrev = 0;
	var indNext = $('.question-slide-active').index() + 1;
	$('.question-dots .slider-dot').removeClass('slider-dot-active');
	$('.question-slide').removeClass('question-slide-active');
	if(mousewheelevent == 'DOMMouseScroll'){
		if(e.originalEvent.detail < 0) $('.question-slider').children('.question-slide').eq(indPrev).addClass('question-slide-active')
		else $('.question-slider').children('.question-slide').eq(indNext).addClass('question-slide-active');
	}
	else if(mousewheelevent == 'mousewheel'){
		if(e.originalEvent.wheelDelta / 120 > 0) $('.question-slider').children('.question-slide').eq(indPrev).addClass('question-slide-active')
		else $('.question-slider').children('.question-slide').eq(indNext).addClass('question-slide-active');
	}
	var ind = $('.question-slide-active').index();
	if(ind < 0) {
		ind = 0;
		$('.question-slider').children('.question-slide').eq(ind).addClass('question-slide-active');
	}
	$('.question-dots .slider-dot[data-index="' + ind + '"]').addClass('slider-dot-active');
	$('.question-bg-img').animate({'opacity':'0'}, 0, function(){
		$('.question-bg-img').removeClass('question-bg-img-active');
		$('.question-bg-img').eq(ind).addClass('question-bg-img-active');
	});
	$('.question-bg-img').animate({'opacity':'1'}, 150);
	if(indNext == dotsQuan){
		$('html, body').animate({
			scrollTop: $( $('.question').next() ).offset().top
		}, 500);
	} 
	else e.preventDefault()
});