$('.contacts-toggle-link').click(function(){
	if($(this).hasClass('contacts-toggle-link-active') ) return false;
	$('.contacts-toggle-link').removeClass('contacts-toggle-link-active');
	$(this).addClass('contacts-toggle-link-active');
	$('.contacts-map').animate({'opacity':'0'}, 200, function(){
		
	});
	$('.contacts-map').animate({'opacity':'1'}, 200);
	$('.contacts-addr').removeClass('contacts-addr-active');
	$('.contacts-addr:nth-child(' + $(this).index() + 1 + ')').addClass('contacts-addr-active');
});

var coordinateY = $('.contacts-toggle-link').eq(0).attr('data-coordinateY'),
    coordinateX = $('.contacts-toggle-link').eq(0).attr('data-coordinateX');