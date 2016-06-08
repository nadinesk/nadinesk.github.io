---
layout: post
title:  "General Election: Trump vs. Clinton, May/early June Polls"
date:   2016-06-08 00:00:00
categories: d3.js, data visualization, polls, politics, general election, trump, clinton
---

This chart shows May polling results, sourced from <a href="http://www.realclearpolitics.com/epolls/2016/president/us/general_election_trump_vs_clinton-5491.html" target="#">Real Clear Politics</a>. (Mouse over the line charts to see the values). The overall Real Clear Politics average, for polls included from May 2015 to the present, show HRC ahead of Trump with a 2.0 spread (44.0 to 42.0).

The data for the chart uses the last date of the pollign period per poll for the date. When two polls ended on the same date, the average between the two results is used. The poll showing the oddest result, the Rasmussen Reports poll on 5/17-5/18 (with a <a href="https://en.wikipedia.org/wiki/Rasmussen_Reports#Nate_Silver" Republican-leaning past </a>), shows Clinton down 37 to Trump's 42 points. The Rasmussen Reports has three polls included in this data set taken from RCP (so make of that what you will).

The largest spread is the most recent poll, the <a href="http://www.investors.com/">IBD/TIPP</a> poll, from 5/31 to 6/5, showing Clinton ahead by 5 points (45 to 40). The last poll might reflect Trump's bad week (or, a good week for the good of humanity) -- from the <a href="http://www.latimes.com/politics/la-na-pol-clinton-trump-analysis-20160608-snap-story.html">LA Times</a>: "House Speaker Paul Ryan had barely endorsed Trump before he was in front of cameras decrying Trump’s attacks on federal Judge Gonzalo Curiel, an Indiana-born jurist Trump described as Mexican because of his ancestry. On Tuesday, Illinois Sen. Mark Kirk, one of a group of Republicans facing tough reelection fights in November, said he would not support the New York businessman as nominee. Kirk said Trump does not possess the temperament of a president."

  <div class="title">Chart 1: Polling Data Monthly Averages</div>
  <div id="example"></div>
  <div class="fortable">
      <table class="table">
        <caption>Source: <a href="http://www.realclearpolitics.com/epolls/2016/president/us/general_election_trump_vs_clinton-5491.html">Real Clear Politics</a>
        <thead>
          <tr>
            <th>Poll</th>
            <th>Date</th>
            <th>Other</th>
            <th>Clinton</th>
            <th>Trump</th>
            <th>Spread</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">IBD/TIPP</th>
            <td>5/31-6/5</td>
            <td>3.3</td>
            <td>45</td>
            <td>40</td>
            <td>Clinton +5</td>
          </tr>
          <tr>
            <th scope="row">Rasmussen Reports</th>
            <td>5/31-6/1</td>
            <td>3</td>
            <td>39</td>
            <td>38</td>
            <td>Clinton +1</td>
          </tr>
          <tr>
            <th scope="row">Quinnipiac</th>
            <td>5/24-5/30</td>
            <td>2.5</td>
            <td>45</td>
            <td>41</td>
            <td>Clinton +4</td>
          </tr>
          <tr>
            <th scope="row">Rasmussen Reports</th>
            <td>5/23-5/24</td>
            <td>3</td>
            <td>40</td>
            <td>39</td>
            <td>Clinton +1</td>
          </tr>
          <tr>
            <th scope="row">ABC News/Wash Post</th>
            <td>5/16-5/19</td>
            <td>3.5</td>
            <td>44</td>
            <td>46</td>
            <td>Trump +2</td>
          </tr>
          <tr>
            <th scope="row">NBC News/Wall St Jrnl</th>
            <td>5/15-5/19</td>
            <td>3.1</td>
            <td>46</td>
            <td>43</td>
            <td>Clinton +3</td>
          </tr>
          <tr>
            <th scope="row">Rasmussen Reports</th>
            <td>5/18-5/18</td>
            <td>3</td>
            <td>37</td>
            <td>42</td>
            <td>Trump +5</td>
          </tr>
          <tr>
            <th scope="row">FOX News</th>
            <td>5/14-5/17</td>
            <td>3</td>
            <td>42</td>
            <td>45</td>
            <td>Trump +3</td>
          </tr>
          <tr>
            <th scope="row">CBS News/NY Times</th>
            <td>5/13-5/17</td>
            <td>3</td>
            <td>47</td>
            <td>41</td>
            <td>Clinton +6</td>
          </tr>
          <tr>
            <th scope="row">Gravis</th>
            <td>5/10-5/10</td>
            <td>2.5</td>
            <td>48</td>
            <td>46</td>
            <td>Clinton +2</td>
          </tr>
          <tr>
            <th scope="row">PPD (D)</th>
            <td>5/6-5/9</td>
            <td>3.2</td>
            <td>47</td>
            <td>41</td>
            <td>Clinton +6</td>
          </tr>




        </tbody>
      </table>
    </div>

<link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>

<style>

body {
  background-color: white;
  }
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
.fortable {
  margin-left: 50px;
  margin-right: 50px;
  width: 90%;
}

.table td, .table th {
  padding: .75rem;
  line-height: 1.5;
  vertical-align: top;
  border-top: 1px solid #eceeef;
  font-size: 0.9em;
}

td, th {
display: table-cell;
text-align: center;
}

table {
  border-collapse: collapse;
}

caption {
padding-top: 8px;
padding-bottom: 8px;
color: #777;
text-align: left;
font-size:0.7em;
line-height: 1.1;

}

</style>


<script>

   var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
      },
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%x").parse;

    var x = d3.time.scale()
      .range([0, width])


    var y = d3.scale.linear()
      .range([height, 0]);

    var color = d3.scale.ordinal()
    .range(["#81dafc", "#fc819d"]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.time.format("%x"));

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

 d3.tsv("http://www.khasachi.com/d3Data/mayPolls.tsv", function(error, data) {
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
      .call(xAxis)
      .selectAll("text")
        .attr("transform", function(d) {
          return "rotate(-65)"
        });

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

A note on these charts: I used the <a href="https://d3js.org/" target="#">D3.js</a> Javascript library, with help from <a href="http://stackoverflow.com/questions/34886070/d3-js-multiseries-line-chart-with-mouseover-tooltip" target="#">this</a> Stack Overflow answer on mousing over the multiseries chart lines to obtain the data points.
