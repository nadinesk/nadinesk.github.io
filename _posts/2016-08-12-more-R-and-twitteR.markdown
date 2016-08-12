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

This returns: 
     name country    woeid
428 Japan   Japan 23424856

and 
             name       country    woeid
461 United States United States 23424977



![Pie chart](http://khasachi.com/images/Rplot.png)

