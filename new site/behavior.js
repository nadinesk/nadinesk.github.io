

$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });

    $(".sidenavOver").hide();
//on hover over the a tag with atribute href='#games' 
$('.container').on({
    mouseenter: function () {
        $(".sidenavOff").hide(); //On mouseover, hode the first div
        $(".sidenavOver").show();
    },
    mouseleave: function () {
        $(".sidenavOff").show();
    }
});

	$("li.javalist")
		.hover(function() {
			$("#javaout").fadeOut("fast");
			$("#showjavadiv").fadeIn("fast");

		},
		function() {
			$("#javaout").fadeIn(300);
			$("#showjavadiv").fadeOut(200);
		}
		);


});

