(function () { 
	var body= $('body');
	var side=$('nav.menu-side');
    $('.menu-toggle').bind('click',function(){
        body.toggleClass('menu-open');
        side.toggleClass('menu-open');
        return false;
    })
    })();

