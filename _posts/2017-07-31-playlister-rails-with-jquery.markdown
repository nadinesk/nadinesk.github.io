---
layout: post
title:  "Rails App with JQuery Front End - Playlister"
date:   2017-07-31 00:00:00
categories: ruby, rails, app, jquery, ajax
---


Rails App with JQuery Front-End

I updated my [Playlister App](www.github.com/nadinesk/playlister) to include a JQuery front-end. 

**The Moods index page that lists all of the mood categories -- Mood.all :) -- is rendered with JQuery and an Active Model Serialization backend.** The route, moods.json, displays something like this JSON: 

``` Javascript

SHOW JSON

```

The get request uses a Javascript Model Object to translate the JSON, and calls a method on the prototype called showMoods(). This Mood prototype method creates html with the Mood title : 

The AJAX get request to render this page is: 

``` Javascript 

$.get("/moods.json", function(data) {
 		
 		var moods = '' 		
 		$.each(data, function(index, value){        
        var mood = new Mood(id= data[index].id, title= data[index].title);

        moods += mood.showMoods();
      });
 		$("#ml").html(moods);
 	})

```
 
**Each Moods show page can be sifted through via a “Next” link, and each show page rendered in this way uses AJAX/JQuery to display the next Mood, and its associated TV shows.**The get request uses a Javascript Model Object to translate the JSON. The object created calls the showTvshows() Mood prototype method to create HTML that will be appended to the page: 

``` Javascript

$(".js-next").on("click", function() {
    var nextId = parseInt($(".js-next").attr("data-id")) + 1;
    
    $.get("/moods/" + nextId + ".json", function(data) {
      var mood = new Mood(id=data["id"], title = data["title"]);

      var mood_shows =[]
      data["tvshows"].forEach(function(element) {
    		mood_shows.push(element)
	  });
	     mood.tvshows = mood_shows; 
      ts_list = mood.showTvshows()

      $(".moodTitle").text(mood.title);
        $(".moodTvshow").html(ts_list);
        //$(".test").html(test_form);
      $(".js-next").attr("data-id", mood.id);
    })
    .fail(function() {
      alert("You have reached the end of the Moods list"); 
    })
  });
  
```
**The Moods JSON serialization includes the has-many relationship, where each mood has many TV shows, and those tv shows are shown on the Mood Show page (/moods/:id).** The route, moods/1.json, displays something like this JSON: 

``` Javascript

SHOW JSON 

```

**The Moods show page includes a form to create a TV show for that mood, and the response to submitting that form is submitted with an AJAX POST request; the new TV show is  rendered on the same page without a page refresh.** For example, the new TV show that is submitted on this form is appended to the DOM with Javascript.

The AJAX POST request for this form is: 

``` Javascript 
 
 $("#blabla").on('submit', function(event) {
    
    var form = document.getElementById("blabla");
    var act = this.action
    var moodStuff = $('.test').attr("data-moodid")

    function urlStuff() {
      if (moodStuff) {
        return '/moods/' + moodStuff + '/tvshows'
      }
      else {
         return act 
      }
    }
    
     $.ajax({
               type: ($("input[name='_method']").val() || this.method),
               datatype: 'json',
               url: urlStuff(),
               data: $(this).serialize(),
               success: function(response){
                  
              tvshow = new Tvshow(id=response["id"], title=response["title"], price=response["price"], time_commitment=response["time_commitment"], suspense_level = response["suspense_level"])
              tvshow.showNewShow(); 
               form.reset(); 

              }


        }); 
     debugger
      event.preventDefault();

 });

```

A tvshow object is created from the TV show JS Model Object: 
``` Javascript 

tvshow = new Tvshow(id=response["id"], title=response["title"], price=response["price"], time_commitment=response["time_commitment"], suspense_level = response["suspense_level"]). 

```

The showNewShow() prototype method is called on this object, which creates html for the new show, and appends it to the page. 

When a mood is shown via the JQUERY get request, only the Mood and its TV Shows are updated, and the TV how form is not. The form action, when rendered in this way, is no longer relevant to the Mood being shown. The Mood ID needs to be updated on this form, so that the AJAX url will reflect the correct mood and the TV Show will be added to the correct mood (not the one rendered without the AJAX GET request). I did this by adding a data-moodId to an existing <div> on the Mood show page, which captures the correct mood ID. This ID is then used to get the correct URL item. 

This portion of the code updates the url within the AJAX post request: 
 
``` Javascript  
 function urlStuff() {
      if (moodStuff) {
        return '/moods/' + moodStuff + '/tvshows'
      }
      else {
         return act 
      }
    }

```

**The JSON response are translated into Javascript Model Objects, with methods on these prototypes.** The model objects are located within the app/assets/moods.js file. The model objects are: 

``` Javascript
class Mood {
  constructor(id,title) {    
    this.id = id; 
    this.title= title;    
    this.tvshow = [] 
	}
}

class Tvshow {
	constructor(id, title, price, suspense_level, time_commitment){
		this.id = id; 
		this.title = title; 
		this.price = price; 
    this.time_commitment = time_commitment; 
    this.suspense_level = suspense_level; 
	}
}

```

The methods on these prototypes are: 

``` Javascript 
Mood.prototype.showMoods = function() {
		var moodList = ''; 
		moodList += '<li class="js-mood" data-id="' + this.id + '">' + '<a href="moods/' + this.id+ '">' 
     +  this.title + '</a>' + '</li>'; 
		return moodList
}

Mood.prototype.showTvshows = function() {
		var moodId = this.id
		var tvshowList = ''; 
		
		$.each(this.tvshows, function(index, value) {			
			
			tvshowList += '<li class="js-order" data-id="' + this.id + '">' + '<a href="' + moodId+ '/tvshows/' + this.id + '">'  + this.title + 
			'</a> - $' + (this.price/100) + '<br>' 
		})		

    tvshowList += '<div class="test" data-moodId="' + this.id + '">'

		return tvshowList	
		
		
}

Tvshow.prototype.showNewShow = function() {

  var newShow = '<li><a href=/tvshows/' + this.id + '">' + this.title + '</a>' + ' - $' + (this.price/100) + '</li>'
               $('.result').html(newShow);
               //location.reload(); 

  $('.test').html(newShow); 
}

```
 







