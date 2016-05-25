---
layout: post
title:  "Some Trends from Y-Combinator 2016 Applications"
date:   2016-05-23 00:00:00
categories: d3.js, word cloud, y-combinator, start-ups, data, data visualization
---
  
  <div id="example"></div>
  <div id="example1"></div>
  <div id="example2"></div>

  
<link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="http://khasachi.com/New%20folder/resized3.js" charset="utf-8"></script>
<script src="http://khasachi.com/d3.cloud.js"></script>



<style>

 #example, #example1,  #example2 {
        font-family: 'Lato', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
    }

    .legend {
        border: 1px solid #555555;
        border-radius: 5px 5px 5px 5px;
        font-size: 10px;
        margin: 10px;
        padding: 8px;
    }
    .bld {
        font-weight: bold;
    }
    
    #svgtest {
        width: 100%;
    }
</style>



<script>

    var frequency_list = [{"text":"Apps","size":50.4},{"text":"Facebook","size":29.4},{"text":"Videos","size":28.7},{"text":"Google","size":28},{"text":"Internet","size":25.2},{"text":"Book","size":24.5},{"text":"Site","size":24.5},{"text":"Email","size":23.1},{"text":"Music","size":21.7},{"text":"IOS","size":21.7},{"text":"Game","size":18.9},{"text":"Security","size":18.9},{"text":"Uber","size":18.2},{"text":"Sports","size":18.2},{"text":"Smartphones","size":18.2},{"text":"SaaS","size":18.2},{"text":"OnDemand","size":17.5},{"text":"eCommerce","size":16.1},{"text":"Restaurants","size":14.7},{"text":"Healthcare","size":14.7},{"text":"Airbnb","size":14.7},{"text":"Twitter","size":14},{"text":"Booking","size":14},{"text":"3D","size":14},{"text":"Instagram","size":12.6},{"text":"AI","size":12.6},{"text":"Doctors","size":11.9},{"text":"Advertising","size":11.9},{"text":"Photo","size":11.9},{"text":"Ads","size":11.2},{"text":"API","size":11.2},{"text":"Stream","size":11.2},{"text":"India","size":11.2},{"text":"Sensors","size":11.2},{"text":"Amazon","size":11.2},{"text":"B2B","size":10.5},{"text":"Sites","size":10.5},{"text":"YouTube","size":10.5},{"text":"UI","size":9.8},{"text":"Phones","size":9.1},{"text":"VR","size":8.4},{"text":"Globally","size":8.4},{"text":"Streaming","size":8.4},{"text":"IoT","size":8.4},{"text":"SMS","size":8.4},{"text":"Wearable","size":8.4},{"text":"Slack","size":7.7},{"text":"Apple","size":7.7},{"text":"Cars","size":7.7},{"text":"Yelp","size":7},
];

var fill = d3.scale.category20b();

    var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(['#40004b','#762a83','#9970ab','#c2a5cf','#e7d4e8','#acacac','#d9f0d3','#a6dba0','#5aae61','#1b7837','#00441b']);





    d3.layout.cloud().size([800, 300])
            .words(frequency_list)
            .rotate(0)
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

    function draw(words) {
        d3.select("#example").append("svg")
            .attr("id","svgtest")
           .attr("width", "100%")
                   .attr("height", 350)
                 .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(320,200)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return (d.size * 1.2) + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [(d.x*1.3), (d.y*1.2)] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }
</script>

<script>
var frequency_list_1 = [{"text":"Bitcoin","size":61},{"text":"Bluetooth","size":43},{"text":"Currency","size":40},{"text":"Shares","size":37},{"text":"Visual","size":34},{"text":"File","size":33},{"text":"Desktop","size":32},{"text":"Nonprofit","size":29},{"text":"Sites","size":28},{"text":"Classroom","size":28},{"text":"Anonymous","size":27},{"text":"Servers","size":26},{"text":"Crowdfunding","size":25},{"text":"Browser","size":24},{"text":"Printing","size":23},{"text":"Box","size":23},{"text":"Statistics","size":22},{"text":"Smartphones","size":21},{"text":"Tag","size":21},{"text":"Cards","size":20},{"text":"Craigslist","size":20},{"text":"Websites","size":19},{"text":"Internet","size":19},{"text":"Beta","size":18},{"text":"Graph","size":18},{"text":"Twitter","size":17},{"text":"C","size":17},{"text":"Feed","size":17},{"text":"Water","size":17},{"text":"Game","size":16}

];

var fill1 = d3.scale.category20b();

var color1 = d3.scale.linear()
        .domain([0,1,2,3,4,5,6,10,15,20,100])
        .range(['#40004b','#762a83','#9970ab','#c2a5cf','#e7d4e8','#acacac','#d9f0d3','#a6dba0','#5aae61','#1b7837','#00441b']);





d3.layout.cloud().size([800, 300])
        .words(frequency_list_1)
        .rotate(0)
        .fontSize(function(d) { return d.size; })
        .on("end", draw)
        .start();

function draw(words) {
    d3.select("#example1").append("svg")
            .attr("width", 850)
            .attr("height", 350)
            .attr("class", "wordcloud")
            .append("g")
            // without the transform, words words would get cutoff to the left and top, they would
            // appear outside of the SVG area
            .attr("transform", "translate(320,200)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("fill", function(d, i) { return fill1(i); })
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
}
</script>

<script>
var frequency_list_2 = [ {"text":"Slack","size":61},{"text":"Vehicles","size":43},{"text":"Firms","size":40},{"text":"Journey","size":37},{"text":"IoT","size":34},{"text":"OnDemand","size":33},{"text":"Integrations","size":32},{"text":"Visits","size":29},{"text":"VR","size":28},{"text":"Drone","size":28},{"text":"Drones","size":27},{"text":"AI","size":26},{"text":"Pattern","size":25},{"text":"Assistant","size":24},{"text":"Bills","size":23},{"text":"Robots","size":23},{"text":"Linking","size":22},{"text":"Academic","size":21},{"text":"Concierge","size":21},{"text":"Rooms","size":20},{"text":"Bookings","size":20},{"text":"Orderings","size":19},{"text":"Portable","size":19},{"text":"Bookings","size":18},{"text":"Exercise","size":18},{"text":"Parking","size":17},{"text":"Logistics","size":17},{"text":"Ingredients","size":17},{"text":"Uber","size":17},{"text":"India","size":16},{"text":"Campus","size":61},{"text":"B2C","size":43},{"text":"Environmental","size":40},{"text":"Healthy","size":37},{"text":"QA","size":34},{"text":"Parent","size":33},{"text":"Vehicle","size":32},{"text":"Meals","size":29},{"text":"Deep","size":28},{"text":"Artificial","size":28},{"text":"Visualization","size":27},{"text":"Provider","size":26},{"text":"Delivering","size":25},{"text":"Transportation","size":24},{"text":"ID","size":23},{"text":"SaaS","size":23},{"text":"Charge","size":22},{"text":"Cash","size":21},{"text":"Fly","size":21},{"text":"Automatic","size":20},


];

var fill2 = d3.scale.category20();

var color2 = d3.scale.linear()
        .domain([0,1,2,3,4,5,6,10,15,20,100])
        .range(['#40004b','#762a83','#9970ab','#c2a5cf','#e7d4e8','#acacac','#d9f0d3','#a6dba0','#5aae61','#1b7837','#00441b']);


d3.layout.cloud().size([800, 300])
        .words(frequency_list_2)
        .rotate(0)
        .fontSize(function(d) { return d.size; })
        .on("end", draw)
        .start();

function draw(words) {
    d3.select("#example2").append("svg")
            .attr("width", 850)
            .attr("height", 350)
            .attr("class", "wordcloud")
            .append("g")
            // without the transform, words words would get cutoff to the left and top, they would
            // appear outside of the SVG area
            .attr("transform", "translate(320,200)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("fill", function(d, i) { return fill2(i); })
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
}
</script>

<div style="width: 40%;">
    <div class="legend">
        Words used in a higher percentage of 2016 Y-Combinator applications are larger and purple. The colors progress from green (lower percentages) to gray (mid-percentages) to purple (higher percentages).
    </div>

</div>
