---
layout: post
title:  "Words Used Most Frequently Used in Y-Combinator Applications"
date:   2016-05-23 00:00:00
categories: d3.js, word cloud, y-combinator, start-ups, data, data visualization
---
<style>

    #example {
        font-family: 'Lato', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #ffffbe;
    }
    .legend {
        border: 1px solid #555555;
        border-radius: 5px 5px 5px 5px;
        font-size: 0.8em;
        margin: 10px;
        padding: 8px;
    }
    .bld {
        font-weight: bold;
    }
</style>

<body>
  <div id="example"></div>
</body>
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
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }
</script>

<div style="width: 40%;">
    <div class="legend">
        Words with higher percentage of mentions in Y-Combinator applications are larger and purple. The colors progress from green (lower percentages) to gray (mid-percentages) to purple (higher percentages).
    </div>

</div>
