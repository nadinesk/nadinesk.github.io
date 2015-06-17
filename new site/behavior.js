

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

	$("li.pgmlist")
		.hover(function() {
			$("#pgmout").hide();
			$("#showpgmdiv").show();

		},
		function() {
			$("#pgmout").show();
			$("#showpgmdiv").hide();
		});

	$("li.webdevlist")
		.hover(function() {
			$("#web-dev").hide();
			$("#show-webdev").show();

		},
		function() {
			$("#web-dev").show();
			$("#show-webdev").hide();
		});

	$("li.appdevlist")
		.hover(function() {
			$("#appdevout").hide();
			$("#show-appdev").show();

		},
		function() {
			$("#appdevout").show();
			$("#show-appdev").hide();
		});
	$("li.datavizlist")
		.hover(function() {
			$("#datavizout").hide();
			$("#showdataviz").show();

		},
		function() {
			$("#datavizout").show();
			$("#showdataviz").hide();
		});

	$("li.cutelist")
		.hover(function() {
			$("#cuteout").hide();
			$("#show-cute").show();

		},
		function() {
			$("#cuteout").show();
			$("#show-cute").hide();
		});
	$("li.viral-list")
		.hover(function() {
			$("#viral-out").hide();
			$("#show-viral").show();

		},
		function() {
			$("#viral-out").show();
			$("#show-viral").hide();
		});
	$("li.gov-list")
		.hover(function() {
			$("#gov-out").hide();
			$("#show-gov").show();

		},
		function() {
			$("#gov-out").show();
			$("#show-gov").hide();
		});
		
		$("#menu-toggle")
		.hover(function() {
			$(".nav").show();

		}); 

$(document).mouseup(function (e)
{
    var container = $(".nav");
    
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
    }

});


  		/*	$(".nav" ).show("fast");
  			$("button").addClass("button-off");
		});

		$(".button-off" ).click(function() {
  			$(".nav" ).hide("fast");
  			$("button").addClass("button-on");
		}); */
		
	  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
      console.log($(window).scrollTop())
    if ($(window).scrollTop() > 278) {
      $('#nav_bar').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < 279) {
      $('#nav_bar').removeClass('navbar-fixed');
    }
  });



});

