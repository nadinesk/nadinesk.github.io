

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

$('.container').on({
    mouseenter: function () {
        $(".sidenavOff").hide(); 
        $(".sidenavOver").show();
    },
    mouseleave: function () {
        $(".sidenavOff").show();
    }
});
	

	/*
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

*/


if ($(window).width() > 680) {
   $("li.pgmlist")
		.hover(function() {
			$("#pgmout").hide();
			$("#showpgmdiv").show();
			$(this).css("background-image", "url('images/IMG_036.jpg')");
			$(this).css("background-size", "cover");
		},
		function() {
			$("#pgmout").show();
			$("#showpgmdiv").hide();
			$(".pgmimage").hide();
			$(this).css("background", "#C7BFD4");
			
		}); 

   $("li.webdevlist")
		.hover(function() {
			$("#web-dev").hide();
			$("#show-webdev").show();
			$(this).css("background-image", "url('images/Untitled2.png')");
			$(this).css("background-size", "cover");
		},
		function() {
			$("#web-dev").show();
			$("#show-webdev").hide();
			$(this).css("background", "#C7BFD4");
			
		}); 

   $("li.appdevlist")
		.hover(function() {
			$("#appdevout").hide();
			$("#show-appdev").show();
			$(this).css("background-image", "url('images/Untitled4copy.png')");
			$(this).css("background-size", "cover");
		},
		function() {
			$("#appdevout").show();
			$("#show-appdev").hide();
			$(this).css("background", "#C7BFD4");
			
		}); 		

	   $("li.datavizlist")
		.hover(function() {
			$("#datavizout").hide();
			$("#showdataviz").show();
			$(this).css("background-image", "url('images/Untitled3copy.png')");
			$(this).css("background-size", "cover");
		},
		function() {
			$("#datavizout").show();
			$("#showdataviz").hide();
			$(this).css("background", "#C7BFD4");
			
		}); 		

		$("li.cutelist")
		.hover(function() {
			$("#cuteout").hide();
			$("#show-cute").show();
			$(this).css("background-image", "url('images/Untitled5copy.png')");
			$(this).css("background-size", "cover");
		},
		function() {
			$("#cuteout").show();
			$("#show-cute").hide();
			$(this).css("background", "#C7BFD4");
			
		}); 	

		$("li.viral-list")
		.hover(function() {
			$("#viral-out").hide();
			$("#show-viral").show();
			$(this).css("background-image", "url('images/Untitled6copy.png')");
			$(this).css("background-size", "cover");
		},
		function() {
			$("#viral-out").show();
			$("#show-viral").hide();
			$(this).css("background", "#C7BFD4");
			
		}); 	

		$("li.gov-list")
		.hover(function() {
			$("#gov-out").hide();
			$("#show-gov").show();
			$(this).css("background-image", "url('images/Untitled7copy.png')");
			$(this).css("background-size", "cover");
		},
		function() {
			$("#gov-out").show();
			$("#show-gov").hide();
			$(this).css("background", "#C7BFD4");
			
		}); 	

}
else {
   $(".pgmlist")
	.on("click", function(e) {
    e.stopPropagation();
    $(".showprogram").toggle();		
    $(".pgmclass").toggle();
    if($(".pgmclass").is(':hidden'))
    {
    	$(".pgmlist").css("background-image", "url('images/IMG_036.jpg')");
    	$(this).css("background-size", "cover");
    }
    else {
    	$(".pgmlist").css("background", "#C7BFD4");
    }
});
	$(document).click(function() {
		$('.showprogram').hide();
		$('.pgmlist').show();
		$('.pgmclass').show();
		$(".pgmlist").css("background", "#C7BFD4");
	})

   $(".webdevlist")
	.on("click", function(e) {
    e.stopPropagation();
    $(".showweb").toggle();		
    $(".webclass").toggle();
    if($(".webclass").is(':hidden'))
    {
    	$(".webdevlist").css("background-image", "url('images/Untitled2.png')");
    	$(this).css("background-size", "cover");
    }
    else {
    	$(".webdevlist").css("background", "#C7BFD4");
    }
});
	$(document).click(function() {
		$('.showweb').hide();
		$('.webdevlist').show();
		$('.webclass').show();
		$(".webdevlist").css("background", "#C7BFD4");
	})

   $(".appdevlist")
	.on("click", function(e) {
    e.stopPropagation();
    $(".showapp").toggle();		
    $(".appclass").toggle();
    if($(".appclass").is(':hidden'))
    {
    	$(".appdevlist").css("background-image", "url('images/Untitled4copy.png')");
    	$(this).css("background-size", "cover");
    }
    else {
    	$(".appdevlist").css("background", "#C7BFD4");
    }
});
	$(document).click(function() {
		$('.showapp').hide();
		$('.appdevlist').show();
		$('.appclass').show();
		$(".appdevlist").css("background", "#C7BFD4");
	})

	$(".datavizlist")
	.on("click", function(e) {
    e.stopPropagation();
    $(".showdata").toggle();		
    $(".dataclass").toggle();
    if($(".dataclass").is(':hidden'))
    {
    	$(".datavizlist").css("background-image", "url('images/Untitled3copy.png')");
    	$(this).css("background-size", "cover");
    }
    else {
    	$(".datavizlist").css("background", "#C7BFD4");
    }
});
	$(document).click(function() {
		$('.showdata').hide();
		$('.datavizlist').show();
		$('.dataclass').show();
		$(".datavizlist").css("background", "#C7BFD4");
	})

$(".cutelist")
	.on("click", function(e) {
    e.stopPropagation();
    $(".showcute").toggle();		
    $(".cuteclass").toggle();
    if($(".cuteclass").is(':hidden'))
    {
    	$(".cutelist").css("background-image", "url('images/Untitled5copy.png')");
    	$(this).css("background-size", "cover");
    }
    else {
    	$(".cutelist").css("background", "#C7BFD4");
    }
});
	$(document).click(function() {
		$('.showcute').hide();
		$('.cutelist').show();
		$('.cuteclass').show();
		$(".cutelist").css("background", "#C7BFD4");
	})

	$(".viral-list")
	.on("click", function(e) {
    e.stopPropagation();
    $(".showviral").toggle();		
    $(".viralclass").toggle();
    if($(".viralclass").is(':hidden'))
    {
    	$(".viral-list").css("background-image", "url('images/Untitled6copy.png')");
    	$(this).css("background-size", "cover");
    }
    else {
    	$(".viral-list").css("background", "#C7BFD4");
    }
});
	$(document).click(function() {
		$('.showviral').hide();
		$('.virallist').show();
		$('.viralclass').show();
		$(".viral-list").css("background", "#C7BFD4");
	})

$(".gov-list")
	.on("click", function(e) {
    e.stopPropagation();
    $(".showgov").toggle();		
    $(".govclass").toggle();
    if($(".govclass").is(':hidden'))
    {
    	$(".gov-list").css("background-image", "url('images/Untitled7copy.png')");
    	$(this).css("background-size", "cover");
    }
    else {
    	$(".gov-list").css("background", "#C7BFD4");
    }
});
	$(document).click(function() {
		$('.showgov').hide();
		$('.govlist').show();
		$('.govclass').show();
		$(".gov-list").css("background", "#C7BFD4");
	})


}


$(document).mouseup(function (e)
{
    var container = $(".nav");
    
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
    }

});


		
	  $(window).scroll(function () {

      console.log($(window).scrollTop())
    if ($(window).scrollTop() > 278) {
      $('#nav_bar').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < 279) {
      $('#nav_bar').removeClass('navbar-fixed');
    }
  });

	
});



