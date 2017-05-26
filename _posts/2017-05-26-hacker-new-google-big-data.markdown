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

I read in the data for each year:

{% highlight r %}

f2006 <- read.csv("results-20170522-131635.csv")
f2007 <- read.csv("results-20170522-131626.csv")
f2008 <- read.csv("results-20170522-131616.csv")
f2009 <- read.csv("results-20170522-131646.csv")
f2010 <- read.csv("results-20170522-131654.csv")
f2011 <- read.csv("results-20170522-131704.csv")
f2012 <- read.csv("results-20170522-131713.csv")
f2013 <- read.csv("results-20170522-131724.csv")
f2014 <- read.csv("results-20170522-131524.csv")
f2015 <- read.csv("results-20170522-131516.csv")
f2016 <- read.csv("results-20170522-131453.csv")
f2017 <- read.csv("results-20170522-132414.csv")

{% endhighlight %}

I combined the dataframes into one, and arranged them in descending order by count of stories:

{% highlight r %}

fall_year <- rbind(f2006, f2007, f2008, f2009, f2010, f2011, f2012, f2013, f2014, f2015, f2016, f2017)

fall_year <- fall_year %>%
              arrange(desc(c))


{% endhighlight %}

A look at the resulting dataframe:

{% highlight r %}

tbl_df(fall_year)

# A tibble: 120 x 3
#            domain     c     y
#            <fctr> <int> <int>
#1       medium.com 18451  2016
#2       github.com 15030  2016
#3       github.com 11780  2015
#4       medium.com 11210  2015
#5  www.youtube.com  9433  2016
#6       github.com  8211  2014
#7  www.youtube.com  7657  2015
#8  www.youtube.com  7562  2014
#9       medium.com  7388  2017
#10      github.com  6643  2013
# ... with 110 more rows

{% endhighlight %}

I grouped by domain and summed counts by domain, got rid of the year variable, arranged in descending order by count, and took the top 10 domains by count of stories: 

{% highlight r %}

fj3 <- fall_year %>%
  group_by(domain) %>%
  select(-y)%>%
  summarise_each(funs(sum)) %>%
  arrange(desc(c)) %>%
  slice(1:10)

{% endhighlight %}

Here's a look at the result: 

{% highlight r %}

tbl_df(fj3)

# A tibble: 10 x 2
#                domain     c
#                <fctr> <int>
#1           github.com 54350
#2           medium.com 47455
#3      www.youtube.com 45240
#4       techcrunch.com 31004
#5      www.nytimes.com 30598
#6      arstechnica.com 18536
#7        www.wired.com 11793
#8  www.theguardian.com  9617
#9     en.wikipedia.org  9086
#10       www.bbc.co.uk  5649

{% endhighlight %}

Here's a table of the top 10 domains, from 2006 to 2017, by story count:

![top_10_overall_domain_story_count](https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/overall_top_domains.png)


biggest_complaint <- as.data.frame(table(df_comb2$Complaint.Type))

biggest_complaint1 <- biggest_complaint %>%
                        arrange(desc(Freq))



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

