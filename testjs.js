	$(document).ready(function(){

				$("#main-list ul").addClass("load");
				$("#project-list ul").addClass("load");
				
				$("#name-text").mouseover(function () {
					$(this).stop().effect("shake", {distance: 3}, 200); 
				}); 
				
				$("#main-list li a").each(function( index) {
					$(this).on('mouseover', function(event) {
						$(this).css("letter-spacing", "5px"); 
						$(this).css("border-radius", "5px"); 
						$(this).css("background-color", "#319b54"); 
						$(this).css("padding-left", "10px"); 
						$(this).css("padding-right", "10px"); 
						$(this).css("padding-top", "7px"); 
						$(this).css("padding-bottom", "7px"); 
						$(this).css("color", "white"); 
						$(this).css("transition", "all 0.5s ease-in-out");
					}); 
					
					$(this).on("mouseout", function(event) {
						$(this).css("padding", "7px"); 
						$(this).css("letter-spacing", "2px"); 
						$(this).css("background-color", "white"); 
						$(this).css("color", "#319b54"); 						
					}); 
				}); 
				
			});
