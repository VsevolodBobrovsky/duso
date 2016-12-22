$(document).ready(function(){
	$('.lang-link-active').click(function(){
		$('.lang-link').toggleClass('lang-link-dropdown');
		return false;
	})

	for (i=0; i < $('.discount-slide').length; i++){
		var dot = document.createElement('li');
		dot.setAttribute('class', 'slider-dot');
		dot.setAttribute('data-index', i);
		$('.discount-dots .slider-dots').append(dot);
	}
	
	$('.discount-dots .slider-dot:first-child').addClass('slider-dot-active');
	
	$('.discount-arrows .slider-arrow').click(function(){
		var dir = $(this).attr('data-dir');
		var ind = $('.discount-slider').children('.discount-slide-active').index();
		var len = $('.discount-slide').length;
		$('.discount-slide').removeClass('discount-slide-active');
		$('.discount-dots .slider-dot').removeClass('slider-dot-active');
		if (dir == 'next'){
			var indNext = ind + 1;
			if (indNext == len) indNext = 0;
			$('.discount-dots .slider-dot[data-index="' + indNext + '"]').addClass('slider-dot-active');
			$('.discount-slider').children('.discount-slide').eq(indNext).addClass('discount-slide-active');
		}
		else{
			var indPrev = ind -1;
			if (indPrev < 0) indPrev = len - 1;
			$('.discount-dots .slider-dot[data-index="' + indPrev + '"]').addClass('slider-dot-active');
			$('.discount-slider').children('.discount-slide').eq(indPrev).addClass('discount-slide-active');
		}
	});
	
	$('.discount-dots .slider-dot').click(function(){
		if ($(this).hasClass('slider-dot-active') ) return false;
		var ind = $(this).attr('data-index');
		$('.discount-slide').removeClass('discount-slide-active');
		$('.discount-slider').children('.discount-slide').eq(ind).addClass('discount-slide-active');
		$('.discount-dots .slider-dot').removeClass('slider-dot-active');
		$(this).addClass('slider-dot-active');
	});
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
			hisBg(indNext);
		}
		else{
			var indPrev = ind - 1;
			if (indPrev < 0) indPrev = len - 1;
			$('.history-dots .slider-dot[data-index="' + indPrev + '"]').addClass('slider-dot-active');
			$('.history-slider').children('.history-slide').eq(indPrev).addClass('history-slide-active');
			hisBg(indPrev);
		}
	});
	
	$('.history-dots .slider-dot').click(function(){
		if ($(this).hasClass('slider-dot-active') ) return false;
		var ind = $(this).attr('data-index');
		$('.history-slide').removeClass('history-slide-active');
		$('.history-slider').children('.history-slide').eq(ind).addClass('history-slide-active');
		$('.history-dots .slider-dot').removeClass('slider-dot-active');
		$(this).addClass('slider-dot-active');
		hisBg(ind);
	});
	
	function hisBg(index){
		$('.history-bg').animate({'opacity':'0'}, 120, function(){
			$(this).removeClass().addClass('history-bg').addClass('history-bg-' + index);
		});
		$('.history-bg').animate({'opacity':'1'}, 120);
	}
	for (i=0; i < $('.clients-slide').length; i++){
		var dot = document.createElement('li');
		dot.setAttribute('class', 'slider-dot');
		dot.setAttribute('data-index', i);
		$('.clients-dots .slider-dots').append(dot);
	}
	
	$('.clients-dots .slider-dot:first-child').addClass('slider-dot-active');
	
	$('.clients-arrows .slider-arrow').click(function(){
		var dir = $(this).attr('data-dir');
		var ind = $('.clients-slider').children('.clients-slide-active').index();
		var len = $('.clients-slide').length;
		$('.clients-slide').removeClass('clients-slide-active');
		$('.clients-dots .slider-dot').removeClass('slider-dot-active');
		if (dir == 'next'){
			var indNext = ind + 1;
			if (indNext == len) indNext = 0;
			$('.clients-dots .slider-dot[data-index="' + indNext + '"]').addClass('slider-dot-active');
			$('.clients-slider').children('.clients-slide').eq(indNext).addClass('clients-slide-active');
		}
		else{
			var indPrev = ind -1;
			if (indPrev < 0) indPrev = len - 1;
			$('.clients-dots .slider-dot[data-index="' + indPrev + '"]').addClass('slider-dot-active');
			$('.clients-slider').children('.clients-slide').eq(indPrev).addClass('clients-slide-active');
		}
	});
	
	$('.clients-dots .slider-dot').click(function(){
		if ($(this).hasClass('slider-dot-active') ) return false;
		var ind = $(this).attr('data-index');
		$('.clients-slide').removeClass('clients-slide-active');
		$('.clients-slider').children('.clients-slide').eq(ind).addClass('clients-slide-active');
		$('.clients-dots .slider-dot').removeClass('slider-dot-active');
		$(this).addClass('slider-dot-active');
	});
	$('.team-arrows .slider-arrow').click(function(){
		var dir = $(this).attr('data-dir');
		var ind = $('.team-slider').children('.team-slide-active').index();
		var len = $('.team-slide').length;
		$('.team-slide').removeClass('team-slide-active');
		$('.team-dots .team-dot').removeClass('team-dot-active');
		if (dir == 'next'){
			var indNext = ind + 1;
			if (indNext == len) indNext = 0;
			$('.team-dots .team-dot[data-index="' + indNext + '"]').addClass('team-dot-active');
			$('.team-slider').children('.team-slide').eq(indNext).addClass('team-slide-active');
		}
		else{
			var indPrev = ind -1;
			if (indPrev < 0) indPrev = len - 1;
			$('.team-dots .team-dot[data-index="' + indPrev + '"]').addClass('team-dot-active');
			$('.team-slider').children('.team-slide').eq(indPrev).addClass('team-slide-active');
		}
	});
	
	$('.team-dots .team-dot').click(function(){
		if ($(this).hasClass('team-dot-active') ) return false;
		var ind = $(this).attr('data-index');
		$('.team-slide').removeClass('team-slide-active');
		$('.team-slider').children('.team-slide').eq(ind).addClass('team-slide-active');
		$('.team-dots .team-dot').removeClass('team-dot-active');
		$(this).addClass('team-dot-active');
	});
	$('.news').bind('mouseover', function(){
		$('.news-parallax-img').each(function(){
			var topRand = Math.floor(Math.random() * (150 - 1) ) + 1;
			var leftRand = Math.floor(Math.random() * (200 - 1) ) + 1;
			$(this).css('transform', 'translate(' + topRand + 'px, ' + leftRand + 'px)');
		});
	});
	for (i=0; i < $('.blog-slide').length; i++){
		var dot = document.createElement('li');
		dot.setAttribute('class', 'slider-dot');
		dot.setAttribute('data-index', i);
		$('.blog-dots .slider-dots').append(dot);
	}
	
	$('.blog-dots .slider-dot:first-child').addClass('slider-dot-active');
	
	$('.blog-arrows .slider-arrow').click(function(){
		var dir = $(this).attr('data-dir');
		var ind = $('.blog-slider').children('.blog-slide-active').index();
		var len = $('.blog-slide').length;
		$('.blog-slide').removeClass('blog-slide-active');
		$('.blog-dots .slider-dot').removeClass('slider-dot-active');
		if (dir == 'next'){
			var indNext = ind + 1;
			if (indNext == len) indNext = 0;
			$('.blog-dots .slider-dot[data-index="' + indNext + '"]').addClass('slider-dot-active');
			$('.blog-slider').children('.blog-slide').eq(indNext).addClass('blog-slide-active');
		}
		else{
			var indPrev = ind -1;
			if (indPrev < 0) indPrev = len - 1;
			$('.blog-dots .slider-dot[data-index="' + indPrev + '"]').addClass('slider-dot-active');
			$('.blog-slider').children('.blog-slide').eq(indPrev).addClass('blog-slide-active');
		}
	});
	
	$('.blog-dots .slider-dot').click(function(){
		if ($(this).hasClass('slider-dot-active') ) return false;
		var ind = $(this).attr('data-index');
		$('.blog-slide').removeClass('blog-slide-active');
		$('.blog-slider').children('.blog-slide').eq(ind).addClass('blog-slide-active');
		$('.blog-dots .slider-dot').removeClass('slider-dot-active');
		$(this).addClass('slider-dot-active');
	});

	
	
	$('.steps-arrows .slider-arrow').click(function(){
		var dir = $(this).attr('data-dir');
		var ind = $('.steps-slider').children('.steps-slide-active').index();
		var len = $('.steps-slide').length;
		$('.steps-slide').removeClass('steps-slide-active');
		if (dir == 'next'){
			var indNext = ind + 1;
			if (indNext == len) indNext = 0;
			$('.steps-slider').children('.steps-slide').eq(indNext).addClass('steps-slide-active');
		}
		else{
			var indPrev = ind -1;
			if (indPrev < 0) indPrev = len - 1;
			$('.steps-slider').children('.steps-slide').eq(indPrev).addClass('steps-slide-active');
		}
	});
	
	
	
	

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

	$('.contacts .title-number').text($('section').length);
});