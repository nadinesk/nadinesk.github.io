---
layout: post
title:  "Atomic Bomb on Japan in WWII U.S. Support Through the Years"
date:   2016-05-31 00:00:00
categories: d3.js, data visualization, atomic bomb, polls, United States, WWII
---

Go ahead and mark this one under polls that surprise me. At different points in time since the United States dropped atomic bombs in Hiroshima and Nagasaki in 1945,<a href="http://www.gallup.com/poll/17677/majority-supports-use-atomic-bomb-japan-wwii.aspx">Gallup</a> has asked Americans if they supported this action. Support was at 85% just after the bombs were dropped in 1945. The most recent poll in 2005 was at 57%, a 2 % decrease in support from a poll 10 years prior. I'm surprised that a majority of Americans still support this decision.

  <div id="chart-title">Support of Use of Atomic Bomb on Japan in WWII</div>
  <div id="example"></div>
  <div class="fortable">
    <table class="table">
      <caption>Question: As you may know, the United States dropped atomic bombs on Hiroshima and Nagasaki in August 1945 near the end of World War II. Looking back, would you say you approve or disapprove of using the atomic bomb on Japanese cities in 1945? </caption>
      <thead>
        <tr>
          <th>Date</th>
          <th>Approve</th>
          <th>Disapprove</th>
          <th>No Opinion</th>
          <th>Current Poll - Prior Poll</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">2005 Jul 25-28, </th>
          <td>57</td>
          <td>38</td>
          <td>5</td>
          <td>-2</td>
        </tr>
        <tr>
          <th scope="row">1995 Jul 20-23</th>
          <td>59</td>
          <td>35</td>
          <td>6</td>
          <td>4</td>
        </tr>
        <tr>
          <th scope="row">1994 Dec 2-5</th>
          <td>55</td>
          <td>39</td>
          <td>6</td>
          <td>2</td>
        </tr>
        <tr>
          <th scope="row">1991 Nov 21-24</th>
          <td>53</td>
          <td>41</td>
          <td>6</td>
          <td>0</td>
        </tr>
        <tr>
          <th scope="row">1990 Jul 19-21</th>
          <td>53</td>
          <td>41</td>
          <td>6</td>
          <td>32</td>
        </tr>
        <tr>
          <th scope="row">1945 Aug 10-15</th>
          <td>85</td>
          <td>10</td>
          <td>5</td>
          <td>N/A</td>
        </tr>

      </tbody>
    </table>
  </div>


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

.fortable {
  margin-left: 50px;
  margin-right: 50px;
  width: 80%;
}

</style>

<script>


var myData = "date	Approve	Disapprove	No opinion\n\
August 1945	85	10	5\n\
July 1990	53	41	6\n\
November 1991	53	41	6\n\
December 1994	55	39	6\n\
July 1995	59	35	6\n\
July 2005	57	38	5\n";

   var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
      },
      width = 450 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%B %Y").parse;

    var x = d3.time.scale()
      .domain([new Date(1945, 8, 1), new Date(2012, 7, 1)])
      .range([0, width]);


    var y = d3.scale.linear()
      .range([height, 0]);

    var color = d3.scale.ordinal()
    .range(["#ff0000", "#ffc87c","#d3d3d3"]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(d3.time.decades)

        .orient("bottom");

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

    var data = d3.tsv.parse(myData);

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
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(45)");

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

  </script>
