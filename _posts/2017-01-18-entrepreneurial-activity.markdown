---
layout: post
title:  "Entrepreneurial Activity by Various Characteristics"
date:   2016-08-17 00:00:00
categories: r, data, entrepreneur, plots, graphs, kauffman index
---

I used the [Kauffman Index of Entrepreneurial Activity](https://www.quandl.com/data/KAUFFMAN-The-Kauffman-Foundation) by age, education, gender, industry, immigrant/native status, and veteran status to look at changes in entrepreneurial activity over time. The plots below show these changes over time, from 1996 to 2014. 

**Age
Entrepreneurial activity has increased for each age grouping from 20 to 64 years, other than the group from 20-34 years. 
![Entrepreneurial Activity by Age, 1996, 2014](http://khasachi.com/images/age.png)

**Education
Entrepreneurial activity has increased for all education levels, other than those with some college. Those with less than a high school education have the largest entrepreneurial activity. Surprisingly to me, entrepeneurial activity is inversely correlated with educational level attained. 
![Entrepreneurial Activity by Education, 1996, 2014](http://khasachi.com/images/edu.png)





     library(tm)
     library(SnowballC)
     library(wordcloud)
 
