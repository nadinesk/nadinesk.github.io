---
layout: post
title:  "Clinton vs. Trump: Polling Data"
date:   2016-05-30 00:00:00
categories: d3.js, data visualization, politics, election, polling data, polls
---

These charts show polling data averages, sourced from <a href="http://www.realclearpolitics.com/epolls/2016/president/us/general_election_trump_vs_clinton-5491.html" target="#">Real Clear Politics</a>. (Mouse over the line charts to see the data). Chart 1 shows monthly averages, using Real Clear Politics' data from various polls, from May 2015 to May 2016. The highest monthly average spread (Chart 3) between Clinton and Trump was in June 2015, with Clinton up by 21 points. The lowest spread is the current Real Clear Politics average (Chart 2), with Hillary up by just one point. I listened to the Five-Thirty-Eight podcast last week, and am holding on to the idea that the polls right now aren't that meaningful (because I'm so with her). 

  <div class="title">Chart 1: Polling Data Monthly Averages</div>
  <div id="example"></div>
  <div class="title">Chart 2:Polling Data Average <br>(5/13/16 to 5/24/16)</div>
  <div id="example1"></div>
  <div class="title">Chart 3:Spread of Polling Data Monthly Averages</div>
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
      margin-top: 50px;
      margin-bottom: 50px;
  font: 10px sans-serif;
}

.title {
  font-family: 'Lato', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 17px;
        text-align: center;
        font-weight: 700;
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
  stroke-width: 1.5px;
}

.overlay {
  fill: none;
  pointer-events: all;
}

.focus circle {
  fill: none;
  stroke: steelblue;
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

d3.csv("http://www.khasachi.com/d3Data/ctMayAvg.csv", type, function(error, data) {
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

 d3.tsv("http://www.khasachi.com/d3Data/ctmonthavgs.tsv", function(error, data) {
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

var marginSD = {top: 20, right: 50, bottom: 30, left: 50},
    widthSD = 960 - marginSD.left - marginSD.right,
    heightSD = 500 - marginSD.top - marginSD.bottom;

var parseDate = d3.time.format("%B %Y").parse,
    bisectDate = d3.bisector(function(d) { return d.date; }).left,
    formatValue = d3.format(",.1f"),
    formatCurrency = function(d) { return  formatValue(d); };

var xSD = d3.time.scale()
    .range([0, widthSD]);

var ySD = d3.scale.linear()
    .range([heightSD, 0]);

var xAxisSD = d3.svg.axis()
    .scale(xSD)
    .orient("bottom");

var yAxisSD = d3.svg.axis()
    .scale(ySD)
    .orient("left");

var lineSD = d3.svg.line()
    .x(function(d) { return xSD(d.date); })
    .y(function(d) { return ySD(d.Spread); });

var svgSD = d3.select("#example2").append("svg")
    .attr("width", widthSD + marginSD.left + marginSD.right)
    .attr("height", heightSD + marginSD.top + marginSD.bottom)
  .append("g")
    .attr("transform", "translate(" + marginSD.left + "," + marginSD.top + ")");

d3.tsv("http://www.khasachi.com/d3Data/ctspreadsdata.tsv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.Spread = +d.Spread;
  });

  data.sort(function(a, b) {
    return a.date - b.date;
  });

  xSD.domain([data[0].date, data[data.length - 1].date]);
  ySD.domain(d3.extent(data, function(d) { return d.Spread; }));

  svgSD.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + heightSD + ")")
      .call(xAxisSD);

  svgSD.append("g")
      .attr("class", "y axis")
      .call(yAxisSD)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

  svgSD.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", lineSD);

  var focus = svgSD.append("g")
      .attr("class", "focus")
      .style("display", "none");

  focus.append("circle")
      .attr("r", 4.5);

  focus.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

  svgSD.append("rect")
      .attr("class", "overlay")
      .attr("width", widthSD)
      .attr("height", heightSD)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

  function mousemove() {
    var x0 = xSD.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + xSD(d.date) + "," + ySD(d.Spread) + ")");
    focus.select("text").text(formatCurrency(d.Spread));
  }
});

</script>

A note on these charts: I used the <a href="https://d3js.org/" target="#">D3.js</a> Javascript library, with help from <a href="http://stackoverflow.com/questions/34886070/d3-js-multiseries-line-chart-with-mouseover-tooltip" target="#">this</a> Stack Overflow answer on mousing over the multiseries chart lines to obtain the data points. 

<!--<div style="width: 40%;">
    <div class="legend">
        Words used in a higher percentage of 2016 Y-Combinator applications are larger and purple. The colors progress from green (lower percentages) to gray (mid-percentages) to purple (higher percentages).
    </div>

</div> -->
