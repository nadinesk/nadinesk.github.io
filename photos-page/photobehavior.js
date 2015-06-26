$(function() {
	
	$(window).load(function() {
$( ".name-title" ).animate({
  height: "toggle",
  opacity: "toggle"
}, 1000, "linear"
);
$(".photo-title").show("puff", 1100);
$(".menu-title").show("puff", 800);
	});

$(".menu-title").click(function(){
	$(".nav-menu")
		.animate({
			
			height: "toggle",
			width: "toggle",
		},
	{	
		duration: 200, specialEasing: {
      	width: "linear",
      	height: "linear"
  	}
});
});	

	$(".name-title").click(function() {	
	$(this ).effect( "bounce",  { times: 1 },"slow" );
	});

	$(".menu-title").click(function() {	
	$(this ).effect( "bounce",  { times: 1 },"slow" );
	});

	$(".photo-title").hover(function() {	
		$(this ).effect( "bounce", { times: 3 }, "slow" );
	});


	/*$(window).load(function() {
		$(".name-title").show("puff", 1000);
		$(".photo-title").show("puff", 900);
		$(".menu-title").show("puff", 800);
	});
	
	$(".name-title").click(function() {	
		$(this ).effect( "bounce",  { times: 1 },"slow" );
	});
	$(".name-title").hover(function() {	
		$(this ).effect( "bounce", { times: 3 }, "slow" );
	});

	$(".menu-title").click(function() {	
		$(this ).effect( "bounce",  { times: 3 },"slow" );
	});
	
	$(".menu-title").click(function() {	
		$(".nav-menu" ).toggle();
	});

	$(document).ready(function () {
    var $bubbles = $('<div class="bubbles" />');
    for (var i = 0; i < 10; i++) {
        $bubbles = $('<div class="bubbles" />');
        $('.design').append($bubbles);
    }    
    var $leftbubbles = $('<div class="left-bubbles" />');
    for (var i = 0; i < 10; i++) {
        $leftbubbles = $('<div class="left-bubbles" />');
        $('.left-col').append($leftbubbles);    
    }


    $(".bubbles").hover(function() {	
		$(this ).effect( "bounce", { times: 3 }, "slow" );
	});
}); */


});