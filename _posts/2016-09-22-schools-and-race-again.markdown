---
layout: post
title:  "School Districts and Race, Integration"
date:   2016-09-22 00:00:00
categories: r, data, graphs, integration, education, race, schools
---


There is a very sobering and sad episode of [This American Life](http://www.thisamericanlife.org/), [The Problem We All Live With](http://www.thisamericanlife.org/radio-archives/episode/562/the-problem-we-all-live-with), about the harmful impacts of the segregation that exists in our school districts, and an accidental case of integration for students in the Normandy School District in Missouri. 

![Rockwell Painting](http://khasachi.com/gack/562enlarged.png)
*[The Problem We All Live With, by Norman Rockwell](https://en.wikipedia.org/wiki/The_Problem_We_All_Live_With). The image depicts Ruby Bridges, a 6-year-old girl on her way to William Frantz Elementary School in 1960, during the New Orleans desegration crisis.*

I was inspired by this episode to again look at the [Stanford Education Data Archive](https://cepa.stanford.edu/seda/download?nid=1727&destination=node/1717), which provides data from 2009-2013 for grades 3-8, for U.S. School Districts' demographic and Math and ELA scores. 

The two tables I used pooled all data for all grades and years together. The two tables I used and joined together on school district ID are the MeanC_V1.1 and CovC_V1.1 datasets. The first dataset (the Mean dataset), "contains district level means in grade equivalent units. There is one observations per district; values are averaged across years, grades and subjects." The second dataset (CovC dataset),"contains district level covariates (socioeconomic, demographic, school level data)." 

Then I went into what I can only call a long and dark R-hole, wherein I made the same graphs I've already made [here](http://khasachi.com/school_test_results.html), essentially, but this time with R. The only new data I really added was an attempt at some sort of integration proxy, creating a variable for the variance between percent whites and percent blacks in a school district (the lower the value, the more integrated). I also just wanted to see how different states did overall with average ELA/Math scores, and the average percent of blacks and whites in each state. 

And so, here are the many, many graphs I created, followed by some example R code: 

**School Districts: Percent Whites - Percent Blacks and Avg Math/ELA Scores**, Regression Coefficient: 1.4056
![Percent White - Percent Black and Avg Math/ELA Scores](http://khasachi.com/images/blkwhtscatter.png)


**Percent White and Avg Math/ELA Scores**, Regression Coefficient: 2.025
![Percent White and Avg Math/ELA Scores](http://khasachi.com/images/whiteplot.png)


**Percent Black Avg Math/ELA Scores**,Regression Coefficient: -2.2550
![Percent Black and Avg Math/ELA Scores](http://khasachi.com/images/blkplot.png)


**Percent Asian and Avg Math/ELA Scores**, Regression Coefficient: 5.56798
![Percent Asian and Avg Math/ELA Scores](http://khasachi.com/images/asnplot.png)


**Percent Hispanic and Avg Math/ELA Scores**, Regression Coefficient: -1.7949
![Percent Hispanic and Avg Math/ELA Scores](http://khasachi.com/images/hspplot.png)


**STATE-LEVEL CHARTS** (click to expand chart)

**States: Percent White - Percent Black and Avg Math/ELA Scores**
<a href="http://khasachi.com/images/whtblkstateplot.png">![States: Percent White - Percent Black and Avg Math/ELA Scores](http://khasachi.com/images/whtblkstateplot.png)</a>

**States: Percent White and Avg Math/ELA Scores**
<a href="http://khasachi.com/images/statewhteplot.png">![States: Percent White and Avg Math/ELA Scores](http://khasachi.com/images/statewhtplot.png)</a>

**States: Percent Black and Avg Math/ELA Scores**
<a href="http://khasachi.com/images/stateblkplot.png">![States: Percent Black and Avg Math/ELA Scores](http://khasachi.com/images/stateblkplot.png)</a>

**States: States and Avg Math/ELA Scores**
<a href="http://khasachi.com/images/staterestultsplot.png">![States: Percent Black and Avg Math/ELA Scores](http://khasachi.com/images/stateresultsplot.png)</a>

I used the ggplot2, reshape, and dplyr packages 

<pre><code>
#####Graphs#########
wb_var <- ggplot(data=demo_grade_1, aes(x=demo_grade.wb_var, y=demo_grade.gsmn_ela)) + 
  geom_point(color="#94D639")  +
  geom_smooth(aes(color="red", method = "lm", se = TRUE)) + 
  theme(legend.position="none") + 
  labs(x="Percent White - Percent Black", y="Math and ELA Average")

perwht <- ggplot(data=demo_grade_1, aes(x=demo_grade.perwht, y=demo_grade.avg_math_ela)) + 
  geom_point(color="#844D18")  +
  geom_smooth(aes(color="red", method = "lm", se = TRUE)) + 
  theme(legend.position="none") + 
  labs(x="Percent White", y="Math and ELA Average")

perblk <- ggplot(data=demo_grade_1, aes(x=demo_grade.perblk, y=demo_grade.avg_math_ela)) + 
  geom_point(color="#004A4A")  +
  geom_smooth(aes(color="red", method = "lm", se = TRUE)) + 
  theme(legend.position="none") + 
  labs(x="Percent Black", y="Math and ELA Average")

perhsp <- ggplot(data=demo_grade_1, aes(x=demo_grade.perhsp, y=demo_grade.avg_math_ela)) + 
  geom_point(color="#083194")  +
  geom_smooth(aes(color="red", method = "lm", se = TRUE)) + 
  theme(legend.position="none") + 
  labs(x="Percent Hispanic", y="Math and ELA Average")

perasn <- ggplot(data=demo_grade_1, aes(x=demo_grade.perasn, y=demo_grade.avg_math_ela)) + 
  geom_point(color="#94D6CE")  +
  geom_smooth(aes(color="red", method = "lm", se = TRUE)) + 
  labs(x="Percent Asian", y="Math and ELA Average")
  theme(legend.position="none") + 
###Coefficents###

wbvar_lm <- lm(formula=demo_grade.avg_math_ela ~ demo_grade.wb_var, data = demo_grade_1)
wht_lm <- lm(formula=demo_grade.avg_math_ela ~ demo_grade.perwht, data = demo_grade_1)
blk_lm <- lm(formula=demo_grade.avg_math_ela ~ demo_grade.perblk, data = demo_grade_1)
hsp_lm <- lm(formula=demo_grade.avg_math_ela ~ demo_grade.perhsp, data = demo_grade_1)
asn_lm <- lm(formula=demo_grade.avg_math_ela ~ demo_grade.perasn, data = demo_grade_1)
ind_lm <- lm(formula=demo_grade.avg_math_ela ~ demo_grade.perind, data = demo_grade_1)

</pre></code>
