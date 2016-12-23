$('.hr-arrows .slider-arrow').click(function(){
	var front = $('.hr-front').attr('src');
	var back = $('.hr-background').attr('src');
	$('.hr-slider').animate({'opacity':'0'}, 250, function(){
		$('.hr-front').attr('src', back);
		$('.hr-background').attr('src', front);
	});
	$('.hr-slider').animate({'opacity':'1'}, 250);
});