---
layout: post
title:  "Median House Values per Square Foot charts with D3.js"
date:   2016-05-18 00:00:00
categories: d3.js, charts, median house values, data, data visualization
---
<style>

#example {
  font: 12px sans-serif;
  color: blue;
}

#example1 {
  font: 12px sans-serif;
  color: blue;
  margin-top: 20px;
}
.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.bar {
  fill: #402824;
  font-weight: 900;
}
.xaxislabels {
  fill: #402824;
}
.x.axis path {
  display: none;
}
.x.axis {
    color: blue;
}

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 1.5px;
}
</style>
<body>
  <div id="example"></div>
 <div id="example1"></div> 
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script>
var margin = {top: 20, right: 200, bottom: 50, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
var negWidth = width * -1;
var posWidth = width * 0.5;

d3.select(window).on('resize', resize);

function resize(){
    width = window.innerWidth;
    height = window.innerHeight;
    svg.style({ width: width + 'px', height: height + 'px' });
    updateNodes(); // update the nodes incorporating the new width and height
}

resize();
var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var x1 = d3.scale.ordinal();
var y = d3.scale.linear()
    .range([height, 0]);
var color = d3.scale.ordinal()
    .range(["#FFA08F",  "#5E83CC",   "#40B282"]);
var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".1s"));
var svg = d3.select("#example").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
d3.csv("/datamv.csv", function(error, data) {
  if (error) throw error;
  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "RegionName"; });
  data.forEach(function(d) {
    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
  });
  x0.domain(data.map(function(d) { return d.RegionName; }));
  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
  var d3Min =    d3.min(data, function (d) {
      return d3.min(d.ages, function (d) {
          return d.value;
      });
  });
  var  d3Max =  d3.max(data, function (d) {
          return d3.max(d.ages, function (d) {
              return d.value;
          });
      });
     y.domain([ d3Min,d3Max ]);
     var xAxisTransform =  height;
     if(d3Min < 0 && 0 < d3Max) {
         xAxisTransform = height * (d3Max / (d3Max -d3Min));
     }
     svg.append("g")
           .attr("class", "y axis")
           .attr("transform", "translate(0," + xAxisTransform + ")") // this line moves x-axis
           .call(xAxis)
           .selectAll("text")
           .attr("y", 0)
           .attr("x",5)
           .attr("transform", "rotate(80)")
           .attr("class", "xaxislabels")
           .style("text-anchor", "start");
     svg.append("g")
           .attr("class", "y axis")
           .call(yAxis)
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 10)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("Percent Change");
  var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "state")
      .attr("transform", function(d) { return "translate(" + x0(d.RegionName) + ",0)"; });
      state.selectAll("rect")
            .data(function (d) {
                return d.ages;
            })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function (d) {
                return x1(d.name);
            })
            .attr("y", function (d) {
                if(d.value < 0)
                    return y(0);
                return y(d.value);
            })
            .attr("height", function (d) {
                if(d.value < 0) {
                     return y(d.value+d3Max);
                }
                return height - y(d.value+d3Min);
            })
            .style("fill", function (d) {
                return color(d.name);
            });
      state.selectAll("text")
        .data(function(d) { return d.ages; })
      .enter().append("text")
       .attr("x", function(d) { return y(d.value); })
       .attr("y", function(d) { return -x1(d.name); })
        .attr("transform", "rotate(90)")
        .attr("text-anchor", "start")
        .attr("class","bar" )
        .text(function(d, i) { return d.value + "%"; });
  var legend = svg.selectAll(".legend")
      .data(ageNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
});



resize();

var parseDate = d3.time.format("%Y").parse;

var x2 = d3.time.scale()
    .range([0, width]);

var y1 = d3.scale.linear()
    .range([height, 0]);

var color1 = d3.scale.category10();

var xAxis1 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x2(d.date); })
    .y(function(d) { return y1(d.temperature); });

var svg1 = d3.select("#example1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var focus = svg1.append("g")
      .attr("transform", "translate(-100,-100)")
      .attr("class", "focus");

  focus.append("circle")
      .attr("r", 3.5);

  focus.append("text")
      .attr("y", -10);


d3.tsv("/New folder/data1.tsv", function(error, data) {
  if (error) throw error;

  color1.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var cities = color1.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, temperature: +d[name]};
      })
    };
  });

  x2.domain(d3.extent(data, function(d) { return d.date; }));

  y1.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
  ]);

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis1);

  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Dollars per square foot");

  var city = svg1.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color1(d.name);})
      .on("mouseover",function(d) {focus.select("text").text(d.temperature)});

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .filter (function(d,i){ return i % 2 === 1 ? this: null;})
      .attr("transform", function(d) { return "translate(" + x2(d.value.date) + "," + y1(d.value.temperature ) + ")"; })
      .attr("x", 1)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

        city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .filter (function(d,i){ return i % 2 === 0 ? this: null;})
      .attr("transform", function(d) { return "translate(" + x2(d.value.date) + "," + y1(d.value.temperature) + ")"; })
      .attr("x", 30)
      .attr("dy", "-.35em")
      .text(function(d) { return d.name; });
      
 
});


</script>


<p>
The first chart (bar chart) shows percentage increases (2014-2015, 2005-2015, 2010-2015) in yearly average median house values per square footage in the top 10 highest metro areas, and the average for U.S. metro areas, ranked by 2015 annual average values. Median house values per square foot for the top 10 metro areas (ranked according to 2015 values) all showed  percentage increases from 2014-2015 and from 2010-15, but some metro areas showed percentage decreases from 2005-2015. Data is from <a href="http://www.zillow.com/research/data/">Zillow</a>: "Median ZHVI per sq. ft. ($): Median of the value of all homes per square foot. This number is calculated by taking the estimated home value for each home in a given region and dividing it by the home’s square footage." 
</p>
<p>
The second chart (line chart) shows yearly average median house values per square footage from 1998 to March 2016 in the top 10 highest metro areas, and the average for U.S. metro areas, by 2015 annual average values. The average house values are 
</p>
<p>I made both charts using D3.js. Raw data can be found in the data.csv/.tsv files <a href="http://bl.ocks.org/nadinesk/81c88201e760ae35af66c1fd30b6e7f3">here</a>for percentage change values, and <a href="http://bl.ocks.org/nadinesk/a54be2ef5866243fdd9834e48f3402b2">here</a> for raw median house values per square footage information.</p>
