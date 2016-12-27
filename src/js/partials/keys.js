$('.keys-step').click(function(){
	var ind = $(this).index();
	$('.keys-step').removeClass('keys-step-active');
	for(i=0; i < ind; i++){
		$('.keys-step').eq(i).addClass('keys-step-active');
	}
	$('.keys-line').animate({ height: $(this).position().top + 5 }, 500);
})