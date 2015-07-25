/*var $cog = $('#cog');
var $cog2 = $('#cog2');
var $cog3 = $('#cog3');
var $cog4 = $('#cog4');
var $cog5 = $('#cog5');
var $cog6 = $('#cog6');
var $cog7 = $('#cog7');
var $cog8 = $('#cog8');
*/

(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       only accounts for vertical position, not horizontal.
     */
    $.fn.visible = function(partial){
        
        var $t              = $(this),
            $w              = $(window),
            viewTop         = $w.scrollTop(),
            viewBottom      = viewTop + $w.height(),
            _top            = $t.offset().top,
            _bottom         = _top + $t.height(),
            compareTop      = partial === true ? _bottom : _top,
            compareBottom   = partial === true ? _top : _bottom;
        
        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };
    
})(jQuery);



$(document).ready(function(){



var scrollTop =$(window).scrollTop();



/*var distanceOneInit = ((cog1Offset - scrollTop)/$(window).height()) * 100;
var distanceTwoInit = ((cog2Offset - scrollTop)/$(window).height()) * 100;
var distanceThreeInit = ((cog3Offset - scrollTop)/$(window).height()) * 100;
var distanceFourInit = ((cog4Offset - scrollTop)/$(window).height()) * 100; */

$(window).scroll(function () {
    var scrollTopMove =$(window).scrollTop();

    
    var win = $(window).height(); 

   /* var distanceOneMove = ((cog1MovingOffset - scrollTop)/$(window).height()) * 100;
    var distanceTwoMove = ((cog2MovingOffset - scrollTop)/$(window).height()) * 100;
    var distanceThreeMove = ((cog3MovingOffset - scrollTop)/$(window).height()) * 100;
    var distanceFourMove = ((cog4MovingOffset - scrollTop)/$(window).height()) * 100; */
            
    /*console.log("static1", cog1Offset);
    console.log("movin1",cog1MovingOffset); 
    console.log("static2", cog2Offset);
    console.log("movin2",cog2MovingOffset);
    console.log("static offset", $("#cog2").offset().top);
    /*console.log("static3", cog3Offset);
    console.log("movin3",cog3MovingOffset);
    console.log("scrolltop", scrollTopMove); 
    console.log("win height", win);
    /*console.log("static4", cog4Offset);
    console.log("movin4",cog4MovingOffset);*/
    
    if ($(".odd-cog").visible(true)) 
    {
        $(".odd-cog").css({
                'transform': 'rotate('  + 5 +  'deg)'
            });
        $(".odd-cog").css({
                'transform-origin': 'top left'
            });

    }

    if ($(".odd-cog").visible(false)) 
    {
         $(".odd-cog").css({
                'transform': 'rotate('  + 0 +  'deg)'
            });
        $(".odd-cog").css({
                'transform-origin': 'top left'
            });

    }

        if ($(".odd-cog-one").visible(true)) 
    {
        $(".odd-cog-one").css({
                'transform': 'rotate('  + 5 +  'deg)'
            });
        $(".odd-cog-one").css({
                'transform-origin': 'top left'
            });

    }

    if ($(".odd-cog-one").visible(false)) 
    {
         $(".odd-cog-one").css({
                'transform': 'rotate('  + 0 +  'deg)'
            });
        $(".odd-cog-one").css({
                'transform-origin': 'top left'
            });

    }

    if ($(".even-cog").visible(true)) 
    {
         $(".even-cog").css({
                'transform': 'rotate('  + -5 +  'deg)'
            });
        $(".even-cog").css({
                'transform-origin': 'top right'
            });
    }

    if ($(".even-cog").visible(false))     
    {
         $(".even-cog").css({
                'transform': 'rotate('  + 0 +  'deg)'
            });
            
        $(".even-cog").css({
                'transform-origin': 'top right'
            });
        
    }

        if ($(".even-cog-one").visible(true)) 
    {
         $(".even-cog-one").css({
                'transform': 'rotate('  + -5 +  'deg)'
            });
        $(".even-cog-one").css({
                'transform-origin': 'top right'
            });
    }

    if ($(".even-cog-one").visible(false))     
    {
         $(".even-cog-one").css({
                'transform': 'rotate('  + 0 +  'deg)'
            });
            
        $(".even-cog-one").css({
                'transform-origin': 'top right'
            });
        
    }

   
    
    });

setInterval(function() {toggleStuff()}, 1000);

function toggleStuff() {
    $(".first-show-text").toggle(); 
    $(".second-show-text").toggle(); 
    $(".more").toggle(); 
    $(".months").toggle(); 
}


    $(".menu-svg").click(function() {
        $(this).effect("bounce", { times: 3 }, "slow" );
        $(".menu-list").toggle();
    })

<<<<<<< HEAD
if($(window).width() < 750) 
{
    
    $("#cog")
    .on("click", function() {
    $(this).width("300px"); 
    $(this).height("226px"); 
    $(".month-phone").toggle(); 
})
  if($("#cog").width() < 350) 
  {
     $("#cog")
    .on("click", function() {
    $(this).width("550px"); 
    $(this).height("414px"); 
  }) 
}
}

console.log($("#cog").width());


if ($(window).width() <= 750) {
    $('#cog').click( function() {
		if (($("#cog").width() == 450) &&  ($("#cog").height() == 338)) {	
			$('#cog').animate({ width: "200px" });
			$('#cog').animate({ height: "200px" });
		}
		else if (($("#cog").width() == 200) && ($("#cog").height() == 200)) {
			$('#cog').animate({ width: "450px" });
			$('#cog').animate({ height: "338px" });
		}

	}); 

    $('#cog2').click( function() {
		if (($("#cog2").width() == 450) &&  ($("#cog2").height() == 338)) {	
			$('#cog2').animate({ width: "200px" });
			$('#cog2').animate({ height: "200px" });
		}
		else if (($("#cog2").width() == 200) && ($("#cog2").height() == 200)) {
			$('#cog2').animate({ width: "450px" });
			$('#cog2').animate({ height: "338px" });
		}

	}); 
    $('#cog3').click( function() {
		if (($("#cog3").width() == 450) &&  ($("#cog3").height() == 338)) {	
			$('#cog3').animate({ width: "200px" });
			$('#cog3').animate({ height: "200px" });
		}
		else if (($("#cog3").width() == 200) && ($("#cog3").height() == 200)) {
			$('#cog3').animate({ width: "450px" });
			$('#cog3').animate({ height: "338px" });
		}

	}); 
}


});






