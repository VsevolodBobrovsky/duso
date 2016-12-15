$('.contacts-toggle-link').click(function(){
	if($(this).hasClass('contacts-toggle-link-active') ) return false;
	var ind = $(this).attr('data-city');
	$('.contacts-toggle-link').removeClass('contacts-toggle-link-active');
	$(this).addClass('contacts-toggle-link-active');
	$('.contacts-map').animate({'opacity':'0'}, 200, function(){
		$('.contacts-map').removeClass('contacts-map-active');
		$('.contacts-map:nth-child(' + ind + ')').addClass('contacts-map-active');
		});
	$('.contacts-map').animate({'opacity':'1'}, 200);
	$('.contacts-addr').removeClass('contacts-addr-active');
	$('.contacts-addr:nth-child(' + ind + ')').addClass('contacts-addr-active');
});