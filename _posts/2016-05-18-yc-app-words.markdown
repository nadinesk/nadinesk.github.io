---
layout: post
title:  "Some Trends from Y-Combinator 2016 Applications"
date:   2016-05-23 00:00:00
categories: d3.js, word cloud, y-combinator, start-ups, data, data visualization
---
These word clouds made with D3.js are from <a href="http://www.themacro.com/articles/2016/05/the-startup-zeitgeist/">this</a> blog post, The Startup Zeitgeist, from <a href="http://www.themacro.com/about/">Y-Combinator's blog</a> about happenings in the startup community. The post discusses analysis of eight years of anonymized Y-Combinator application data. 

The first word cloud shows a selection of the most popular terms from 2016 YC applications. The data is <a href="http://www.themacro.com/images/articles/startupzeitgeist17-0e6248d2.png">here</a>. The values are in percentage of applications using the terms. The larger, purple words were more popular; the smaller, green words were less popular. the legend below the first word cloud shows the color range, from green to purple, or low to high values. 

The second word cloud shows terms with the greatest decreases from 2015 to 2016 YC applications. The data is <a href="http://www.themacro.com/images/articles/startupzeitgeist18-b8bc3a2b.png">here</a>. The values are in percentage decrease in usage of terms in applications. The color range for this word cloud is, low to high in absolute values, pink (lowest) to yellow/green (mid) to blue (highest). The larger words have higher absolute values, and the smaller words have lower absolute values. For example, Bitcoin is largest and blue because it had a 61% decrease. It had the largest absolute value percent change. 

The second word cloud shows terms with the greatest increases from 2015 to 2016 YC applications. The data is <a href="http://www.themacro.com/images/articles/startupzeitgeist19-c7bdb0dc.png">here</a>. The values are in percentage increase in usage of terms in applications from 2015 to 2016. The color range for this word cloud is, low to high in absolute values, light blue (lowest) to purple (mid) to darker blue (highest). The larger words have higher values, and the smaller words have lower values. Slack is in dark blue and the largest font because its usage increased by 850% from 2015 to 2016 YC applications. 

  <div id="graph-title">Selection of Popular Terms from 2016 Y-Combinator Applications</div>
  <div id="example"></div>
  <div id="legend-text">color code legend: low to high values</div>
  <div id="cfree"></div>
  <div id="graph-title">Terms with Greatest Decreases from 2015-16 YC Applications</div>
  <div id="example1"></div>
  <div id="legend-text">color code legend: high to low absolute values</div>
  <div id="c20b"></div>  
  <div id="graph-title">Terms with Greatest Increases from 2015-16 YC Applications</div>
  <div id="example2"></div>
  <div id="legend-text">color code legend: high to low absolute values</div>
   <div id="c20"></div>  

  
<link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="http://khasachi.com/New%20folder/resized3.js" charset="utf-8"></script>
<script src="http://khasachi.com/d3.cloud.js"></script>



<style>
    
#graph-title {
    font-family: 'Lato', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 20px;
        text-align: center;
        color: #0077BE;
        margin-top: 10px;
    }


 #example, #example1,  #example2 {
        font-family: 'Lato', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
    }

        #legend-text {
        font-family: 'Lato', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 12px;
        color: black; 
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

    var frequency_list = [{"text":"Apps","size":50.4},{"text":"Facebook","size":29.4},{"text":"Videos","size":28.7},{"text":"Google","size":28},{"text":"Internet","size":25.2},{"text":"Book","size":24.5},{"text":"Site","size":24.5},{"text":"Email","size":23.1},{"text":"Music","size":21.7},{"text":"IOS","size":21.7},{"text":"Game","size":18.9},{"text":"Security","size":18.9},{"text":"Uber","size":18.2},{"text":"Sports","size":18.2},{"text":"Smartphones","size":18.2},{"text":"SaaS","size":18.2},{"text":"OnDemand","size":17.5},{"text":"eCommerce","size":16.1},{"text":"Restaurants","size":14.7},{"text":"Healthcare","size":14.7},{"text":"Airbnb","size":14.7},{"text":"Twitter","size":14},{"text":"Booking","size":14},{"text":"3D","size":14},{"text":"Instagram","size":12.6},{"text":"AI","size":12.6},{"text":"Doctors","size":11.9},{"text":"Advertising","size":11.9},{"text":"Photo","size":11.9},{"text":"Ads","size":11.2},{"text":"API","size":11.2},{"text":"Stream","size":11.2},{"text":"India","size":11.2},{"text":"Sensors","size":11.2},{"text":"Amazon","size":11.2},{"text":"B2B","size":10.5},{"text":"Sites","size":10.5},{"text":"YouTube","size":10.5},{"text":"UI","size":9.8},{"text":"Phones","size":9.1},{"text":"VR","size":8.4},{"text":"Globally","size":8.4},{"text":"Streaming","size":8.4},{"text":"IoT","size":8.4},{"text":"SMS","size":8.4},{"text":"Wearable","size":8.4},{"text":"Slack","size":7.7},{"text":"Apple","size":7.7},{"text":"Cars","size":7.7},{"text":"Yelp","size":7}
];

var fill = d3.scale.category20b();

    var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(['#40004b','#762a83','#9970ab','#c2a5cf','#e7d4e8','#acacac','#d9f0d3','#a6dba0','#5aae61','#1b7837','#00441b']);


function colores_google(n) {
  var colores_g = ['#00441b','#1b7837','#5aae61','#a6dba0','#d9f0d3', '#acacac','#e7d4e8','#c2a5cf','#9970ab','#762a83','#40004b'];
  
  return colores_g[n % colores_g.length];
}

var c20b = d3.scale.category20b();


    d3.layout.cloud().size([800, 300])
            .words(frequency_list)
            .rotate(0)
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

    function draw(words) {
        d3.select("#example").append("svg")
                .attr("width", "100%")
                .attr("height", 310)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(320,170)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return (d.size *1.2) + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }

var svg1b = d3.select("#cfree")
             .append("svg")
             .attr("width", 320)
             .attr("height", 40);

svg1b.selectAll("circle")
    .data( d3.range(11) )
    .enter()
    .append("circle")
    .attr("r", 7 )
    .attr("cx", d3.scale.linear().domain([-1, 10]).range([0, 130]) )
    .attr("cy", 25)
    .attr("fill", function(d,i) { return colores_google(i); } )
     

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
            .attr("width", "100%")
            .attr("height", 310)
            .attr("class", "wordcloud")
            .append("g")
            // without the transform, words words would get cutoff to the left and top, they would
            // appear outside of the SVG area
            .attr("transform", "translate(320,170)")
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

var svg3 = d3.select("#c20b")
             .append("svg")
             .attr("width", 400)
             .attr("height", 20);

svg3.selectAll("circle")
    .data( d3.range(20) )
    .enter()
    .append("circle")
    .attr("r", 7 )
    .attr("cx", d3.scale.linear().domain([-1, 20]).range([0, 200]) )
    .attr("cy", 10)
    .attr("fill", c20b );

</script>
<script>
var frequency_list_2 = [ {"text":"Slack","size":850},{"text":"Vehicles","size":211},{"text":"Firms","size":204},{"text":"Journey","size":175},{"text":"IoT","size":172},{"text":"OnDemand","size":147},{"text":"Integrations","size":143},{"text":"Visits","size":136},{"text":"VR","size":133},{"text":"Drone","size":130},{"text":"Drones","size":129},{"text":"AI","size":127},{"text":"Pattern","size":120},{"text":"Assistant","size":119},{"text":"Bills","size":119},{"text":"Robots","size":110},{"text":"Linking","size":107},{"text":"Academic","size":107},{"text":"Concierge","size":104},{"text":"Rooms","size":102},{"text":"Bookings","size":96},{"text":"Orderings","size":88},{"text":"Portable","size":88},{"text":"Bookings","size":88},{"text":"Exercise","size":86},{"text":"Parking","size":85},{"text":"Logistics","size":82},{"text":"Ingredients","size":77},{"text":"Uber","size":76},{"text":"India","size":74},{"text":"Campus","size":74},{"text":"B2C","size":74},{"text":"Environmental","size":74},{"text":"Healthy","size":72},{"text":"QA","size":71},{"text":"Parent","size":70},{"text":"Vehicle","size":70},{"text":"Meals","size":67},{"text":"Deep","size":63},{"text":"Artificial","size":63},{"text":"Visualization","size":62},{"text":"Provider","size":58},{"text":"Delivering","size":57},{"text":"Transportation","size":54},{"text":"ID","size":53},{"text":"SaaS","size":52},{"text":"Charge","size":52},{"text":"Cash","size":52},{"text":"Fly","size":51},{"text":"Automatic","size":50}


];


var fill2 = d3.scale.category20();

var color2 = d3.scale.linear()
        .domain([50,60,70,86,100,130,160,200,220,860])
        .range(['#40004b','#762a83','#9970ab','#c2a5cf','#e7d4e8','#acacac','#d9f0d3','#a6dba0','#5aae61','#1b7837','#00441b']);


d3.layout.cloud().size([800, 300])
        .words(frequency_list_2)
        .rotate(0)
        .fontSize(function(d) { return (d.size/5); })
        .on("end", draw)
        .start();

function draw(words) {
    d3.select("#example2").append("svg")
            .attr("width", "100%")
            .attr("height", 310)
            .attr("class", "wordcloud")
            .append("g")
            // without the transform, words words would get cutoff to the left and top, they would
            // appear outside of the SVG area
            .attr("transform", "translate(320,170)")
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

var c20 = d3.scale.category20();

var svg20 = d3.select("#c20")
             .append("svg")
             .attr("width", 400)
             .attr("height", 20);

svg20.selectAll("circle")
    .data( d3.range(20) )
    .enter()
    .append("circle")
    .attr("r", 7 )
    .attr("cx", d3.scale.linear().domain([-1, 20]).range([0, 200]) )
    .attr("cy", 10)
    .attr("fill", c20 );
</script>

<!--<div style="width: 40%;">
    <div class="legend">
        Words used in a higher percentage of 2016 Y-Combinator applications are larger and purple. The colors progress from green (lower percentages) to gray (mid-percentages) to purple (higher percentages).
    </div>

</div> -->
