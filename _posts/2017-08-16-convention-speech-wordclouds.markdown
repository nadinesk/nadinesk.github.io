---
layout: post
title:  "Word Clouds, Presidential Nominee 2016 Convention Speeches"
date:   2016-08-17 00:00:00
categories: r, data, twitter, twitter data, trump, clinton, election, convention speeches, politics
---

Word Clouds created with R, for Clinton's and Trump's 2016 convention speeches accepting their parties' nominations. Following along with [this](https://www.r-bloggers.com/building-wordclouds-in-r/) blog post. 

Clinton's 2016 Convention Speech Word Cloud
![Clinton Word Cloud](http://khasachi.com/images/c_wc1.png)

Trump's 2016 Convention Speech Word Cloud
![Trump Word Cloud](http://khasachi.com/images/twc.png)


     library(tm)
     library(SnowballC)
     library(wordcloud)
     
     cl_text <- read.csv("clinton-text.csv")
     c_text <- Corpus(VectorSource(cl_text$text))
     c_text <- tm_map(c_text, PlainTextDocument)
     c_text <- tm_map(c_text, removePunctuation)
     c_text <- tm_map(c_text, removeWords, c('And', 'the', 'this', stopwords('english')))
     stopwords('english')
     c_text <- tm_map(c_text, stemDocument)
     wordcloud(c_text, max.words = 100,random.order = FALSE, colors=brewer.pal(8, "Dark2"))

     tr_text <- read.csv("//ES04CIFS00/Users$/nfischoff/Winnt/System/Desktop/New folder/ttext.csv")
     t_text <- Corpus(VectorSource(tr_text$text))
     t_text <- tm_map(t_text, PlainTextDocument)
     t_text <- tm_map(t_text, removePunctuation)
     t_text <- tm_map(t_text, removeWords, c('And', 'the', 'this', stopwords('english')))
     stopwords('english')
     t_text <- tm_map(t_text, stemDocument)
     wordcloud(t_text, max.words = 100,random.order = FALSE, colors=brewer.pal(8, "Dark2"))
