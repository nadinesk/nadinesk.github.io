---
layout: post
title: "A Look at Hacker News Data"
date: 2018-05-26 00:00:00
categories: r, data, hacker news, google big data
---

I decided to take a look at the data on [Hacker News Google BigQuery](https://cloud.google.com/bigquery/public-data/hacker-news). [This post](https://medium.com/@hoffa/hacker-news-on-bigquery-now-with-daily-updates-so-what-are-the-top-domains-963d3c68b2e2) gave me ideas of data to pull, and an idea of the type of SQL queries I could run.  

I pulled the data with SQL queries, and used R to take a longitudinal look at domains with the most stories, from 2006 to 2017 year-to-date.And I used R's [TidyText package](https://cran.r-project.org/web/packages/tidytext/vignettes/tidytext.html) to do a pretty terse sentiment analysis of story titles for top stories by score. 

# Domains with Most Stories

I got count of stories by domain for each year, from 2006 to 2017 year-to-date. 

{% highlight sql %}

 SELECT 
 REGEXP_EXTRACT(url, '//([^/]*)/?') domain
 , COUNT(*) c
 , EXTRACT(YEAR FROM timestamp) y
 FROM `bigquery-public-data.hacker_news.full`
 WHERE url!='' AND EXTRACT(YEAR FROM timestamp) = 2006 --> replace for each year
 GROUP BY domain, y ORDER BY c desc LIMIT 10

 {% endhighlight %}

{% highlight r %}

biggest_complaint <- as.data.frame(table(df_comb2$Complaint.Type))

biggest_complaint1 <- biggest_complaint %>%
                        arrange(desc(Freq))

{% endhighlight %}

{% highlight text %}

## A tibble: 275 x 2
##                      Var1   Freq
##                    <fctr>  <int>
## 1     Noise - Residential 848649
## 2          HEAT/HOT WATER 688968
## 3        Street Condition 444825
## 4  Street Light Condition 404171
## 5        Blocked Driveway 401503
## 6         Illegal Parking 369456
## 7                 HEATING 300493
## 8                PLUMBING 276949
## 9            Water System 273922
## 10   UNSANITARY CONDITION 251285
## ... with 265 more rows

{% endhighlight %}


![months_complaints](https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/months1.png)

