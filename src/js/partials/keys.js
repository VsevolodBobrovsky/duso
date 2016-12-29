$(window).scroll(function(){
	var win = $(window).scrollTop();
	var off = $('.keys').offset().top - 400;
	if (win > off){
		$('.keys-line').animate({ height: $('.keys-step:last-child').position().top + 5 }, 10000);
		setTimeout(function(){ $('.keys-step').eq(1).addClass('keys-step-active') }, 3500);
		setTimeout(function(){ $('.keys-step').eq(2).addClass('keys-step-active') }, 5000);
		setTimeout(function(){ $('.keys-step').eq(3).addClass('keys-step-active') }, 7000);
		setTimeout(function(){ $('.keys-step').eq(4).addClass('keys-step-active') }, 10000);
	}
});