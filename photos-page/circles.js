var timerFunction = null;
var timerFunction1 = null;

    function startAnimation() {
        if(timerFunction == null) {
            timerFunction = setInterval(animate, 20);
        }
       
    }

    function stopAnimation() {
        if(timerFunction != null){
            clearInterval(timerFunction);
            timerFunction = null;
        }
    }

    function animate() {
        for (var i = 0; i < 40; i++)
        {
        	if (i % 5 == 0)
        	{
        		var circle = document.getElementById("circle" + i);
	        	var y = circle.getAttribute("cy");
	        	var newY = 2 + parseInt(y);
	        	if(newY > 300) {
	            newY = 30;
	           	clearInterval(timerFunction);
	           	timerFunction = null;
        		}
        		
        		circle.setAttribute("cy", newY);	
        	}

        	if ((i==1) || (i==6) || (i==11) || (i==16) || (i==21)|| (i==26) || (i==31) || (i==36))
        	{
        		var circle = document.getElementById("circle" + i);
	        	var y = circle.getAttribute("cy");
	        	var newY = 2 + parseInt(y);
	        	if(newY > 340) {
	            newY = 70;
	           	clearInterval(timerFunction);
	           	timerFunction = null;
        		}
        		
        		circle.setAttribute("cy", newY);	
        	}

        	if ((i==2) || (i==7) || (i==12) || (i==17) || (i==22)|| (i==27) || (i==32) || (i==37))
        	{
        		var circle = document.getElementById("circle" + i);
	        	var y = circle.getAttribute("cy");
	        	var newY = 2 + parseInt(y);
	        	if(newY > 390) {
	            newY = 120;
	           	clearInterval(timerFunction);
	           	timerFunction = null;
        		}
        		
        		circle.setAttribute("cy", newY);	
        	}

			if ((i==3) || (i==8) || (i==13) || (i==18) || (i==23)|| (i==28) || (i==33) || (i==38))
        	{
        		var circle = document.getElementById("circle" + i);
	        	var y = circle.getAttribute("cy");
	        	var newY = 2 + parseInt(y);
	        	if(newY > 460) {
	            newY = 190;
	           	clearInterval(timerFunction);
	           	timerFunction = null;
        		}
        		
        		circle.setAttribute("cy", newY);	
        	}

        	
        }

       

    }