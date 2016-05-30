---
layout: post
title:  "Clinton vs. Trump: Polling Data"
date:   2016-05-30 00:00:00
categories: d3.js, data visualization, politics, election, polling data, polls
---

These charts show polling data averages, sourced from <a href="http://www.realclearpolitics.com/epolls/2016/president/us/general_election_trump_vs_clinton-5491.html" target="#">Real Clear Politics</a>. 

  <div class="title">Polling Data Monthly Averages</div>
  <div id="example"></div>
  <div class="title">Polling Data Average <br>(5/13/16 to 5/24/16)</div>
  <div id="example1"></div>
  <div class="title">Spread of Polling Data Monthly Averages</div>
  <div id="example2"></div>

  
<link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>



<style>
    
 #example, #example1,  #example2 {
        font-family: 'Lato', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        text-align: center;
        
    }

.arc text {
  font: 15px sans-serif;
  text-anchor: middle;
}

.arc path {
  stroke: #fff;
}

.axis path,
    .axis line {
      fill: none;
      stroke: #000;
      shape-rendering: crispEdges;
    }
    
    .x.axis path {
      display: none;
    }
    
    .line {
      fill: none;
      stroke: steelblue;
      stroke-width: 3.5px;
    }


    #example, #example1, #example2 {
      margin: 50px;
  font: 10px sans-serif;
}

.title {
  font-family: 'Lato', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 15px;
        text-align: center;
    }
</style>



<script>

var width1 = 960,
    height1 = 500,
    radius = Math.min(width1, height1) / 2;

var color2 = d3.scale.ordinal()
    .range(["#81dafc", "#fc819d", "#d3d3d3"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 100)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg1 = d3.select("#example1").append("svg")
    .attr("width", width1)
    .attr("height", height1)
  .append("g")
    .attr("transform", "translate(" + width1 / 2 + "," + height1 / 2 + ")");

d3.csv("data.csv", type, function(error, data) {
  if (error) throw error;

  var g = svg1.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color2(d.data.age); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.age + "," + d.data.population; });
      
});

function type(d) {
  d.population = +d.population;
  return d;
}

</script>
<script>

   var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
      },
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%B %Y").parse;

    var x = d3.time.scale()
      .range([0, width])
      

    var y = d3.scale.linear()
      .range([height, 0]);

    var color = d3.scale.ordinal()
    .range(["#81dafc", "#fc819d"]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.time.format("%b %y"));

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.temperature);
      });

    var svg = d3.select("#example").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 d3.tsv("/d3Data/ctmonthavgs.tsv", function(error, data) {
  if (error) throw error;

    color.domain(d3.keys(data[0]).filter(function(key) {
      return key !== "date";
    }));

    data.forEach(function(d) {
      d.date = parseDate(d.date);
    });

    var cities = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {
            date: d.date,
            temperature: +d[name]
          };
        })
      };
    });

    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));

    y.domain([
      d3.min(cities, function(c) {
        return d3.min(c.values, function(v) {
          return v.temperature;
        });
      }),
      d3.max(cities, function(c) {
        return d3.max(c.values, function(v) {
          return v.temperature;
        });
      })
    ]);

    var legend = svg.selectAll('g')
      .data(cities)
      .enter()
      .append('g')
      .attr('class', 'legend');

    legend.append('rect')
      .attr('x', width - 20)
      .attr('y', function(d, i) {
        return i * 20;
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) {
        return color(d.name);
      });

    legend.append('text')
      .attr('x', width - 8)
      .attr('y', function(d, i) {
        return (i * 20) + 9;
      })
      .text(function(d) {
        return d.name;
      });

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Percentage (%)");

    var city = svg.selectAll(".city")
      .data(cities)
      .enter().append("g")
      .attr("class", "city");

    city.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        return color(d.name);
      });

    city.append("text")
      .datum(function(d) {
        return {
          name: d.name,
          value: d.values[d.values.length - 1]
        };
      })
      .attr("transform", function(d) {
        return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
      })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.name ;
      });

    var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", function(d) {
        return color(d.name);
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0"); 
      }) 
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            console.log(width/mouse[0])
            var xDate = x.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.values, xDate);
                
            
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }
            
            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2));

              
            return "translate(" + mouse[0] + "," + pos.y +")";
          });
      });
        });
  </script>
  <script>
    

   var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
      },
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%B %Y").parse;

    var x = d3.time.scale()
      .range([0, width])
      

    var y = d3.scale.linear()
      .range([height, 0]);

    var color1 = d3.scale.ordinal()
    .range(["purple", "#fc819d"]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.time.format("%b %y"));

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.temperature);
      });

    var svg2 = d3.select("#example2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 d3.tsv("/d3Data/ctspreadsdata.tsv", function(error, data) {
  if (error) throw error;

    color1.domain(d3.keys(data[0]).filter(function(key) {
      return key !== "date";
    }));

    data.forEach(function(d) {
      d.date = parseDate(d.date);
    });

    var cities = color1.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {
            date: d.date,
            temperature: +d[name]
          };
        })
      };
    });

    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));

    y.domain([
      d3.min(cities, function(c) {
        return d3.min(c.values, function(v) {
          return v.temperature;
        });
      }),
      d3.max(cities, function(c) {
        return d3.max(c.values, function(v) {
          return v.temperature;
        });
      })
    ]);

    

    svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Percentage (%)");

    var city = svg2.selectAll(".city")
      .data(cities)
      .enter().append("g")
      .attr("class", "city");

    city.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        return color1(d.name);
      });

    city.append("text")
      .datum(function(d) {
        return {
          name: d.name,
          value: d.values[d.values.length - 1]
        };
      })
      .attr("transform", function(d) {
        return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
      })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.name ;
      });

    var mouseG = svg2.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", function(d) {
        return color(d.name);
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0"); 
      }) 
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            console.log(width/mouse[0])
            var xDate = x.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.values, xDate);
                
            
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }
            
            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2));

              
            return "translate(" + mouse[0] + "," + pos.y +")";
          });
      });
        });
  </script>


The first word cloud shows a selection of the most popular terms from 2016 YC applications. The data is <a href="http://www.themacro.com/images/articles/startupzeitgeist17-0e6248d2.png" target="#">here</a>. The values are in percentage of applications using the terms. The larger, purple words were more popular; the smaller, green words were less popular. The legend below the first word cloud shows the color range, from green to purple, or low to high values. The term 'Apps' was most popular, in 7.2 percent of applications. Out of the selected terms, 'Yelp' was the least popular, in 1.0 percent of applications. 

The second word cloud shows terms with the greatest decreases from 2015 to 2016 YC applications. The data is <a href="http://www.themacro.com/images/articles/startupzeitgeist18-b8bc3a2b.png" target="#">here</a>. The values are in percentage decrease in usage of terms in applications. The color range for this word cloud is, low to high in absolute values, pink (lowest) to yellow/green (mid) to blue (highest). The larger words have higher absolute values, and the smaller words have lower absolute values. The term 'Bitcoin' is largest and blue; it had a 61% decrease. It had the largest absolute value percent change. The term 'Game' had the lowest percentage decrease out of the selected terms, a 16 percent decrease in usage. 

The third word cloud shows terms with the greatest increases from 2015 to 2016 YC applications. The data is <a href="http://www.themacro.com/images/articles/startupzeitgeist19-c7bdb0dc.png" target="#">here</a>. The values are in percentage increase in usage of terms in applications from 2015 to 2016. The color range for this word cloud is, low to high in absolute values, light blue (lowest) to purple (mid) to darker blue (highest). The larger words have higher values, and the smaller words have lower values. Slack is in dark blue and the largest: its usage increased by 850% from 2015 to 2016 YC applications. The second highest increase in usage is the term 'Vehicles', a 215% increase. The lowest percentage increase out of the selected terms, is the term 'Automatic', a 50% increase. 

A note on the word clouds: I used the <a href="https://github.com/jasondavies/d3-cloud" target="#">d3-cloud library</a>; <a href="http://bl.ocks.org/ericcoopey/6382449" target="#">this</a> example implementation; and <a href="http://bl.ocks.org/aaizemberg/78bd3dade9593896a59d" target="#">this</a> example for the legend for the graphs.

<!--<div style="width: 40%;">
    <div class="legend">
        Words used in a higher percentage of 2016 Y-Combinator applications are larger and purple. The colors progress from green (lower percentages) to gray (mid-percentages) to purple (higher percentages).
    </div>

</div> -->
