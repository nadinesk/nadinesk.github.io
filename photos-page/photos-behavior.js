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
     $(this).scrollTop(0);


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



if($(window).width() < 750) 
{
$("#cog")
    .on("click", function(e) {
    e.stopPropagation();
    $("#cog p").toggle();     
    
});
   $("#cog2")
    .on("click", function(e) {
    e.stopPropagation();
    $("#cog2 p").toggle();     
   
});

}

});






