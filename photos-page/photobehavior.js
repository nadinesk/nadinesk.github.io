$(function() {
	$(window).load(function() {
		$(".name-title").animate ({
			height: "toggle",
			opacity: "toggle"
		}, 
		{
			duration: 900, 
			easing: "linear"
		});
		$(".photo-title").show("puff", 1000);
		$(".menu-title").show("puff", 800);
	});

	$(".menu-title").click(function() {	
		$(".nav-menu" ).toggle();
	});

	$(".name-title").click(function() {	
		$(this ).effect( "bounce",  { times: 1 },"slow" );
	});

	$(".menu-title").click(function() {	
		$(this ).effect( "bounce",  { times: 1 },"slow" );
	});

});



/*
        if (i > 4 && i <= 9)
        {
        var circle = document.getElementById("circle" + i);
        var x = circle.getAttribute("cx");
        
        var newX = 2 + parseInt(x);
        
        if(newX > 130) {
            newX = 80;
            
            clearInterval(timerFunction1);
            timerFunction1 = null;
        }
           
        	circle.setAttribute("cx", newX);	   
        	
        }	
        
        if (i > 9 && i <= 14)
        {
        var circle = document.getElementById("circle" + i);
        var x = circle.getAttribute("cx");
        
        var newX = 2 + parseInt(x);
        
        if(newX > 180) {
            newX = 130;
            
            clearInterval(timerFunction1);
            timerFunction1 = null;
        }
           
        	circle.setAttribute("cx", newX);	   
        	
        }	*/

    
        	
        
       

     
    