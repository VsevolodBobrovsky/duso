/*$('.keys-step').click(function(){
	var ind = $(this).index();
	$('.keys-step').removeClass('keys-step-active');
	for(i=0; i < ind; i++){
		$('.keys-step').eq(i).addClass('keys-step-active');
	}
	$('.keys-line').animate({ height: $(this).position().top + 5 }, 500);
})*/

$(window).scroll(function(){
	var win = $(window).scrollTop();
	var off = $('.keys').offset().top - 400;
	if (win >= off){
		$('.keys-line').animate({ height: $('.keys-step:last-child').position().top + 5 }, 5000);
		for (i=0; i<5; i++){
			$('.keys-step').eq(i).addClass('keys-step-active');
		}
	}
});