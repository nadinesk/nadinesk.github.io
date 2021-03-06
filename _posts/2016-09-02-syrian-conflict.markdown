---
layout: post
title:  "Number of Deaths in Syrian Conflict"
date:   2016-09-02 00:00:00
---
<style>
body {
	background-color: white;
	 font-family: 'Open Sans', sans-serif;
}

#total-main-count {
	font-size: 40px; 
	
}

.blink {
	text-align: center; 
	font-size: 40px;
	animation: blinker 1.5s linear infinite;
	margin: 15px;
  
}

#select-list {
	margin-top: 30px;
	margin-left: 220px;
	display: none; 
	font-size: 20px;
	color: #2F4F4F;
	padding: 5px;
	font-weight: 700; 
}

option {
	font-weight: 700; 
	color: #2F4F4F;
}

.heading {
	font-size: 30px;
	font-weight: 700; 
	margin-left: 200px;
	color: #2F4F4F;
	display: none;
}

#source {
	margin-left: 200px; 
	margin-right: 200px;
	line-height: 1.2;
	width: 500px;
	display: none;
}
@keyframes blinker {  
  50% { opacity: 0.2; }
}



</style>
<body>


<div class="blink">Loading...</div>


<select id="select-list">
	<option value="2016">1/1/2016 to 9/1/2016</option>
	<option value="2011">2011</option>
	<option value="2012">2012</option>
	<option value="2013">2013</option>
	<option value="2014">2014</option>
	<option value="2015">2015</option>
</select>

<div id="charting"></div>
<div id="source">
	Number of deaths documented by the Violations Documentation Center in Syria (http://www.vdc-sy.info/index.php/en/). Each circle represents a casualty during the specified time range. Ages and other demographics per person are documented on this site for some deaths, and of those documented, children who have died between the age of 1 and 10 are represented with black circles. Code is <a href="http://bl.ocks.org/nadinesk/74da1f566f8bdb742bdcfad31178d4dc">here</a>. HT <a href="http://www.nytimes.com/interactive/2015/09/14/world/middleeast/syria-war-deaths.html?_r=0">here</a> for data source and visualization idea.
	
</div>
</body>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"></script>
<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
  <script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
<script>

$(document).ready(function(){
    setTimeout(function () {  	
	$('.blink').fadeOut("medium");
	    }, 200);
	
	setTimeout(function () {  	
	$('#select-list').fadeIn("medium");
	$('.heading').fadeIn("medium");
	$('#source').fadeIn("medium");
	    }, 200);
	
	setTimeout(function () {  	
	$('#source').fadeIn("medium");
	    }, 200);    
	    
	    
});

var node_range = 11407

var margin = {top: 50, right: 200, bottom: 50, left: 200};

var width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

 var nodes = d3.range(node_range).map(function() { return { 
    cx: Math.random() * width  , 
	    cy: Math.random() * height  } 
});

var svg = d3.select("#charting").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	.attr("border", "1px solid black");

var formatComma = d3.format(","); 
svg.append("g")
	.append('text')
    .attr("x", 180)
    .attr("y", height/2)
    .text(function() { return formatComma(node_range); })
	.attr("id", 'total-main-count')
	.attr("fill", "#2F4F4F");

// Append each circle in nodes to SVG
for (var i = 0; i < nodes.length; i++) {
    svg.append("circle")
    .attr("id","blah")
    .attr("cx", nodes[i].cx)
    .attr("cy", nodes[i].cy)
    .attr("r", function() {if (i<=312) { return 1.2} else { return .8}; })
    .attr("fill", function(){if (i<=312) {return "black"} else {return "#ff3232"}; })
    .style("stroke", "none");
}

d3.select("#select-list").on("change", function() {

d3.selectAll("#blah").attr("fill", "white"); 
d3.selectAll("#total-main-count").attr("fill", "white"); 

var selectedValue = d3.event.target.value;

	$('.blink').fadeIn("medium");

	$(document).ready(function(){
    setTimeout(function () {  	
	$('.blink').fadeOut("medium");
    }, 200);
});

var formatComma = d3.format(","); 

if (selectedValue == "2016") {

	var node_range = 11407; 

	var nodes = d3.range(node_range).map(function() { return { 
	  cx: Math.random() * width  , 
	    cy: Math.random() * height  } 
	   }); 

	for (var i = 0; i < nodes.length; i++) {
	    svg.append("circle")
	     .attr("id","blah")
	    .attr("cx", nodes[i].cx)
	    .attr("cy", nodes[i].cy)
	    .attr("r", function() {if (i<=312) { return 1.2} else { return 0.8}; })
		.attr("fill", function(){if (i<=312) {return "black"} else {return "#ff3232"}; })
        .style("stroke", "none");
	}
	
	
	svg.append("g")
	.append('text')
    .attr("x", 180)
    .attr("y", height/2)
    .text(function() { return formatComma(node_range); })
	.attr("id", 'total-main-count')
	.attr("fill", "#2F4F4F");

}

else if (selectedValue == "2011") {
	
	var node_range = 4834; 
	
	var nodes = d3.range(node_range).map(function() { return { 
	    	    cx: Math.random() * width  , 
	    cy: Math.random() * height  } 
	   }); 

	 
	for (var i = 0; i < nodes.length; i++) {
	    svg.append("circle")
	    	    .attr("id","blah")
	    .attr("cx", nodes[i].cx)
	    .attr("cy", nodes[i].cy)
	    .attr("r", function() {if (i<=78) { return 1.2} else { return 0.8}; })
		.attr("fill", function(){if (i<=78) {return "black"} else {return "#ff3232"}; })
	    .style("stroke", "none");
	}
	
svg.append("g")
	.append('text')
    .attr("x", 180)
    .attr("y", height/2)
    .text(function() { return formatComma(node_range); })
	.attr("id", 'total-main-count')
	.attr("fill", "#2F4F4F");
}

else if (selectedValue == "2012") {
// Append each circle in nodes to SVG
	var node_range = 38584; 

	var nodes = d3.range(node_range).map(function() { return { 
	    cx: Math.random() * width  , 
	    cy: Math.random() * height  } 

	                                        });
											
svg.append("g")
	.append('text')
    .attr("x", 180)
    .attr("y", height/2)
    .text(function() { return formatComma(node_range); })
	.attr("id", 'total-main-count')
	.attr("fill", "#2F4F4F");


	for (var i = 0; i < nodes.length; i++) {
	    svg.append("circle")
	    	    .attr("id","blah")
	    .attr("cx", nodes[i].cx)
	    .attr("cy", nodes[i].cy)
	    .attr("r", function() {if (i<=1109) { return 1.2} else { return 0.8}; })
		.attr("fill", function(){if (i<=1109) {return "black"} else {return "#ff3232"}; })
	    .style("stroke", "none");
	}
	
}
else if (selectedValue == "2013") {

	var node_range = 40305; 

	var nodes = d3.range(node_range).map(function() { return { 
		cx: Math.random() * width  , 
	    cy: Math.random() * height  } 
 });

 svg.append("g")
	.append('text')
    .attr("x", 180)
    .attr("y", height/2)
    .text(function() { return formatComma(node_range); })
	.attr("id", 'total-main-count')
	.attr("fill", "#2F4F4F");


	for (var i = 0; i < nodes.length; i++) {
	    svg.append("circle")
	    	    .attr("id","blah")
	    .attr("cx", nodes[i].cx)
	    .attr("cy", nodes[i].cy)
	    .attr("r", function() {if (i<=1393) { return 1.2} else { return 0.8}; })
		.attr("fill", function(){if (i<=1393) {return "black"} else {return "#ff3232"}; })
	    .style("stroke", "none");
	}
	console.log('2013'); 
}

else if (selectedValue == "2014") {

	var node_range = 26662; 

	var nodes = d3.range(node_range).map(function() { return { 
	    cx: Math.random() * width  , 
	    cy: Math.random() * height  } 
 });

 svg.append("g")
	.append('text')
    .attr("x", 180)
    .attr("y", height/2)
    .text(function() { return formatComma(node_range); })
	.attr("id", 'total-main-count')
	.attr("fill", "#2F4F4F");
					

	for (var i = 0; i < nodes.length; i++) {
	    svg.append("circle")
		.attr("id","blah")
	    .attr("cx", nodes[i].cx)
	    .attr("cy", nodes[i].cy)
	    .attr("r", function() {if (i<=957) { return 1.2} else { return 0.8}; })
		.attr("fill", function(){if (i<=957) {return "black"} else {return "#ff3232"}; })
	    .style("stroke", "none");
	}

}

else if (selectedValue == "2015") {
// Append each circle in nodes to SVG
	var node_range = 18089; 

	var nodes = d3.range(node_range).map(function() { return { 
	    cx: Math.random() * width  , 
	    cy: Math.random() * height  } 
	});
	
svg.append("g")
	.append('text')
    .attr("x", 180)
    .attr("y", height/2)
    .text(function() { return formatComma(node_range); })
	.attr("id", 'total-main-count')
	.attr("fill", "#2F4F4F");


	for (var i = 0; i < nodes.length; i++) {
	    svg.append("circle")
	    .attr("id","blah")
	    .attr("cx", nodes[i].cx)
	    .attr("cy", nodes[i].cy)
	    .attr("r", function() {if (i<=465) { return 1.2} else { return 0.8}; })
		.attr("fill", function(){if (i<=465) {return "black"} else {return "#ff3232"}; })	    .style("stroke", "none")
	    .style("stroke-width", 1);
	}
	console.log('2015'); 
}
 })


</script>


