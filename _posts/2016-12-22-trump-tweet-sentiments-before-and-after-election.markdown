---
layout: post
title:  "Trump Tweet Sentiments, Before and After Election"
date:   2016-12-22 00:00:00
categories: r, data, twitter, twitter data, trump, clinton, election, politics
---

Trump's tweets have been more positive since he was elected president than before. This data looks at Trump's tweets from 9/15/2016 to 12/22/2016, categorizing tweets as before election (before 11/9/2016) or after election(on or after 11/9/2016). 

I use sentiment analysis based on [this](http://varianceexplained.org/r/trump-tweets/) post. Trump uses a higher percentage of positive sentiments in his tweets, post-election.  

![Trump Word Cloud](http://khasachi.com/images/sent.befandafter.png)


    tr_tw <- userTimeline("realDonaldTrump", n= 3200)
    tr_tw_df <- tbl_df(map_df(tr_tw, as.data.frame))
     
    tr_tw_df$time_catg <- ifelse(tr_tw_df$created < "2016-11-09 00:00:00", "before election", "after election")  
    tr_tw_df_be <- subset(tr_tw_df, created <= "2016-11-09 00:00:00")
    table(tr_tw_df$time_catg)
    reg <- "([^A-Za-z\\d#@']|'(?![A-Za-z\\d#@]))"

    tweet_words <- tr_tw_df %>%
      filter(!str_detect(text, '^"')) %>%
      mutate(text = str_replace_all(text, "https://t.co/[A-Za-z\\d]+|&amp;", "")) %>%
      unnest_tokens(word, text, token = "regex", pattern = reg) %>%
      filter(!word %in% stop_words$word,
             str_detect(word, "[a-z]"))
    sources <- tweet_words %>%
      group_by(time_catg) %>%
      mutate(total_words = n()) %>%
      ungroup() %>%
      distinct(id, time_catg, total_words)

    nrc <- sentiments %>%
      filter(lexicon == "nrc") %>%
      dplyr::select(word, sentiment)
    
    by_source_sentiment <- tweet_words %>%
      inner_join(nrc, by = "word") %>%
      count(sentiment, id) %>%
      ungroup() %>%
      complete(sentiment, id, fill = list(n = 0)) %>%
      inner_join(sources) %>%
      group_by(time_catg, sentiment, total_words) %>%
      summarize(words = sum(n)) %>%
      ungroup()

      by_source_sentiment$pct <- ((by_source_sentiment$words/ by_source_sentiment$total_words) * 100)
      by_source_sentiment
      ggplot(by_source_sentiment,aes(x = sentiment, y = pct)) + 
        geom_bar(aes(fill = time_catg),stat="identity", position = position_dodge()) 
       library(broom)


