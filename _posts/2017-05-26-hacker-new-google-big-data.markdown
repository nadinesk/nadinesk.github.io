---
layout: post
title: "A Look at Hacker News Data"
date: 2018-05-26 00:00:00
categories: r, data, hacker news, google big data
---

I decided to take a look at the data on [Hacker News Google BigQuery](https://cloud.google.com/bigquery/public-data/hacker-news). [This post](https://medium.com/@hoffa/hacker-news-on-bigquery-now-with-daily-updates-so-what-are-the-top-domains-963d3c68b2e2) gave me ideas of data to pull, and an idea of the type of SQL queries I could run.  

I pulled the data with SQL queries, and used R to take a longitudinal look at domains with the most stories, from 2006 to 2017 year-to-date.And I used R's [TidyText package](https://cran.r-project.org/web/packages/tidytext/vignettes/tidytext.html) to do a pretty terse sentiment analysis of story titles for top stories by score. 

# Domains with Most Stories, 2006 to May 2017

I got count of stories by domain for each year, from 2006 to 2017 year-to-date. 

{% highlight sql %}

 SELECT 
 REGEXP_EXTRACT(url, '//([^/]*)/?') domain
 , COUNT(*) c

 FROM `bigquery-public-data.hacker_news.full`
 WHERE url!='' 
 GROUP BY domain ORDER BY c desc LIMIT 10

 {% endhighlight %}

I read in the data :

{% highlight r %}

fj3.1 <- read.csv("results-20170527-004428.csv")

{% endhighlight %}

A look at the resulting dataframe:

{% highlight r %}

> tbl_df(fj3.1)

# A tibble: 10 x 2
                domain     c
                <fctr> <int>
1           github.com 55751
2           medium.com 47725
3      www.youtube.com 45760
4       techcrunch.com 31056
5      www.nytimes.com 30675
6      arstechnica.com 18685
7        www.wired.com 14684
8     en.wikipedia.org 11874
9        www.bbc.co.uk 10968
10 www.theguardian.com 10705

{% endhighlight %}


Here's a bar chart of the top 10 domains, from 2006 to 5/25/2017, by story count:

![top_10_overall_domain_story_count](https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/overall_top_domains.png)

Github had the most stories submitted, with 55,751 stories submitted. Medium and Youtube were close behind. The Top five all are pretty close in story count. There's a big drop-off after the top 5 (after the NY Times), with arstechnica.com having 49% (11,990) fewer stories than the NY Times. 

# Most Popular 2017 Domains and Change over Time

I looked at the 2017 YTD (May 2017) top 10 domains in Hacker News by count of stories, and how these domains have compared in the previous years, beginning with 2017. 

First I ran this query to get the count of stories by the ten most popular domains in 2017. 

{% highlight sql %}

standardSQL
 SELECT 
 REGEXP_EXTRACT(url, '//([^/]*)/?') domain
 , COUNT(*) c
 , EXTRACT(YEAR FROM timestamp) y
 FROM `bigquery-public-data.hacker_news.full`
 WHERE url!='' AND EXTRACT(YEAR FROM timestamp) = 2006
 GROUP BY domain, y ORDER BY c desc LIMIT 10
 
{% endhighlight %}

Then I read in the results.

{% highlight r %}
f2017 <- read.csv("results-20170522-132414.csv")

{% endhighlight %}

Here is a look at the results

tbl_df(f1)

{% highlight r %}

# A tibble: 10 x 3
                domain     c     y
                <fctr> <int> <int>
1           medium.com  7388  2017
2           github.com  6384  2017
3      www.youtube.com  3836  2017
4      www.nytimes.com  2357  2017
5       techcrunch.com  1676  2017
6    www.bloomberg.com  1495  2017
7      arstechnica.com  1320  2017
8  www.theguardian.com  1306  2017
9             youtu.be  1099  2017
10    www.theverge.com  1013  2017

{% endhighlight %}


I then pulled the counts for each of these ten domains, by year. 

{% highlight sql %}

 SELECT 
 REGEXP_EXTRACT(url, '//([^/]*)/?') domain
 , COUNT(*) c
 , EXTRACT(YEAR FROM timestamp) y
 FROM `bigquery-public-data.hacker_news.full`
 WHERE REGEXP_EXTRACT(url, '//([^/]*)/?') in ('medium.com', 'github.com', 'www.youtube.com', 'www.nytimes.com', 'techcrunch.com', 'www.bloomberg.com', 'arstechnica.com',
                                              'www.theguardian.com', 'youtu.be', 'www.theverge.com')
 GROUP BY domain, y ORDER BY c desc 

{% endhighlight %}

I read in the data and arranged it ascending by year. 

{% highlight r %}

fj2 <- read.csv("results-20170522-133430.csv")

fj2 <- fj2 %>%
          arrange(y)

fj2

{% endhighlight %}

Here are some of the results:

{% highlight r %}

# A tibble: 90 x 3
              domain     c     y
              <fctr> <int> <int>
1    www.nytimes.com     9  2006
2    www.nytimes.com   474  2007
3    arstechnica.com   122  2007
4    www.youtube.com    99  2007
5  www.bloomberg.com    12  2007
6    www.nytimes.com  1650  2008
7    arstechnica.com   534  2008
8    www.youtube.com   326  2008
9  www.bloomberg.com    99  2008
10        github.com    66  2008

{% endhighlight %}

This line chart shows the change in count of stories by each top 10 2017 domain, from 2006 to May 2017.

{% highlight r %}

ggplot(data=fj2, aes(x=y, y=c, group=domain, colour=domain)) +
  geom_line() +
  geom_point()

{% endhighlight %}

![2017_comp_top_domains](https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/2017_comp_top_domains.png)


