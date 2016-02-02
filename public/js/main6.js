(function () { var body= $('body');
	var side=$('nav.menu-side');
	var toggle=$('a.menu-toggle');
    $('.menu-toggle').bind('click',function(){
        body.toggleClass('menu-open');
        side.toggleClass('menu-open');
        toggle.toggleClass('menu-open');

        return false;
    })
    })();
    // ******set the mode for pop out side menu**************



