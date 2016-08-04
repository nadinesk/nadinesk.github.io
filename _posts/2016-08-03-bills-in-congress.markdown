---
layout: post
title:  "Using JQuery and Ajax with GovTrack API"
date:   2016-08-03 00:00:00
categories: jquery, ajax, congress, bills, government, open data
---

I used [GovTrack's](http://www.govtrack.us) API to create [a page](http://www.khasachi.com/congressbills) that automatically updates the ten most recent bills in the U.S. Congress. I used JQuery and AJAX to pull in and post information from their API. I plan to include more features to this page, but it just depends. 

Other things I've been meddling with - Node.js and Express.js with Heroku. I'll get back to this later on...

And I created a data visualization on [school districts and test scores](http://bl.ocks.org/nadinesk/0cd8447e563cdb3be8aa62a6cca80e22), sort of replicating one already done by the New York Times - [Money, Race and Success: How Your School District Compares](http://www.nytimes.com/interactive/2016/04/29/upshot/money-race-and-success-how-your-school-district-compares.html?smid=tw-share). 

The data is from [Stanford cepa](https://cepa.stanford.edu/seda/data-archive)

The chart includes data from the Stanford Center for Education Policy Analysis, standardizing district-level test math and ELA test scores for third to eighth graders, from 2009-2013. The results show the district's grade level above/below the national average. More detail on how this database was created is [here](https://cepa.stanford.edu/sites/default/files/wp16-09-v201604.pdf). The results show the grade level above/below the tested grade of students. 

The test results are show in correlation with various district-level characteristics, here in order of correlation coefficient: 

* median family income: 0.66
* percent of females with BA: 0.64
* percent of females in poverty: -0.64
* percent whites: 0.54
* percent blacks: -0.37

Median family income has the strongest positive correlation out of the factors included, with test results: the higher the median income of a district, the higher the students in the district scored. The precent of females with a BA (also an indicator of median income) had the second highest correlation with test scores, followed closely by percent of females in poverty. The male counterparts to both of these characteristics, not shown, were similar. The percentage of whites in the district had a positive correlation on test scores of 0.54, and the percent of blacks in teh district had a negative correlation on test scores of 0.37. 


