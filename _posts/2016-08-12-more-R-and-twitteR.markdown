---
layout: post
title:  "More R and TwitteR"
date:   2016-08-12 00:00:00
categories: r, data, twitter, twitter data
---

I wanted to practice more with the Twitter client for R, so I riffed on the code from [this](http://geoffjentry.hexdump.org/twitteR.pdf). 

The end goal is to compare Twitter sources between Japan and the United States, for the top trending hashtag, using the 5,000 most recent tweets. 

Get the woeid's for the United States and Japan: 

     avail_trends = availableTrendLocations()
     findCountry_JP <- avail_trends[grep("Japan", avail_trends$name), ]
     findCountry_JP
     findCountry_US <- avail_trends[grep("United States", avail_trends$name), ]
     findCountry_US

This returns the woeid for Japan (23424856) and the U.S. (23424977). 

Using those IDs, I get the top 10 trends for each country

     UStrends = getTrends(23424977)
     head(UStrends, n=10)

     JPtrends = getTrends(23424856)
     head(JPtrends, n=10)

Then I get the most recent 5,000 tweets for each top hashtag trend for each country. I get the source for these tweets, strip out the tags, create a table to count the number of tweets per source, get the percentage of each surce, and create a pie chart for all sources with counts that make up greater than or equal to 1 percent of the 5000 tweet sources. 

     US_tweet_1 <- searchTwitter("#IfYouWantToBeMyNeighbor", n=5000)
     head(US_tweet_1)
     sources_US_1 <- sapply(US_tweet_1, function(x) x$getStatusSource())
     sources_US_1 <- gsub("</a>", "", sources_US_1)
     sources_US_1 <- strsplit(sources_US_1, ">")
     sources_US_1 <- sapply(sources_US_1, function(x) ifelse(length(x) >1, x[2], x[1]))
     source_US1_table = table(sources_US_1)
     write.csv(source_US1_table, "D:/source_US.csv")
     pct_US <- round(source_US1_table/sum(source_US1_table)*100)
     lbls <- paste(names(source_US1_table[pct_US >= 1]), "\n", pct[pct_US >= 1], sep="")
     lbls <- paste(lbls,"%",sep="") 
     pie(source_US1_table[pct_US >= 1], labels = lbls)
     
     JP_tweet_1 <- searchTwitter("#自殺と打って続きを見守れ", n=5000)
     head(JP_tweet_1)
     sources_JP_1 <- sapply(JP_tweet_1, function(x) x$getStatusSource())
     sources_JP_1 <- gsub("</a>", "", sources_JP_1)
     sources_JP_1 <- strsplit(sources_JP_1, ">")
     sources_JP_1 <- sapply(sources_JP_1, function(x) ifelse(length(x) >1, x[2], x[1]))
     source_JP1_table = table(sources_JP_1)
     source_JP1_table
     write.csv(source_JP1_table, "D:/source_JP_1.csv")
     pct_JP <- round(source_JP1_table/sum(source_JP1_table)*100)
     lbls_JP <- paste(names(source_JP1_table[pct_JP >= 1]), "\n", pct_JP[pct_JP >=1], sep="")
     lbls_JP <- paste(lbls_JP,"%",sep="") 
     pie(source_JP1_table[pct_JP >=1], labels = lbls_JP)
     
More people tweeted from Twitter for iPhone than all other sources for these top hashtags this morning. Twitter for iPhone is 58% of the sources of the most recent 5,000 tweets for the top trend in the U.S. (which this morning at around 9:30 am is #IfYouWantToBeMyNeighbor) and 65% of sources in Japan (their top hashtag this morning is #自殺と打って続きを見守れ)

Japan
![Japan Pie Chart](http://khasachi.com/photos/source_JP_1.png)

United States
![U.S. Pie Chart](http://khasachi.com/photos/source_US_2.png)

