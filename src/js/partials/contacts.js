$('.contacts-toggle-link').click(function(){
	var lat = $(this).attr('data-lat');
	var lng = $(this).attr('data-lng');
	if($(this).hasClass('contacts-toggle-link-active') ) return false;
	$('.contacts-toggle-link').removeClass('contacts-toggle-link-active');
	$(this).addClass('contacts-toggle-link-active');
	contactsMap.panTo(new google.maps.LatLng(lat, lng));
	$('.contacts-addr').removeClass('contacts-addr-active');
	$('.contacts-addr[data-ind="' + $(this).index() + '"]').addClass('contacts-addr-active');
});