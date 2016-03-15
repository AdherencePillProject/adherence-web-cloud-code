
$('ul.nav li.dropdown').hover(function() {
	$(this).find('.nav-hover').stop(true, true).delay(200).fadeIn(500);
}, function() {
  	$(this).find('.nav-hover').stop(true, true).delay(200).fadeOut(500);
});// dashboard dropdown menu animation