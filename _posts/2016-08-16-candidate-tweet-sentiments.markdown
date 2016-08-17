---
layout: post
title:  "Using R and Sentiment Analysis on Clinton and Trump Tweets"
date:   2016-08-16 00:00:00
categories: r, data, twitter, twitter data, trump, clinton, election
---

I'm still utlizing the code from this, [Text analysis of Trump's tweets confirms he writes only the (angrier) Android half](http://varianceexplained.org/r/trump-tweets/), to compare tweet word sentiments between Clinton and Trump's recent tweets. 

Following are the grouped bar charts, table with values, and code

Clinton vs Trump Tweets Sentiment Percentage Comparison
<a href="http://khasachi.com/images/percent_comparison.png"><img width="650" src="http://khasachi.com/images/percent_comparison.png"/></a>

Clinton vs Trump Tweets Sentiment Value (Count) Comparison
<a href="http://khasachi.com/images/comp_values.png"><img width="650" src="http://khasachi.com/images/comp_values.png"/></a>

Top 5 Highest percentage of sentiments in Trump's tweets: 
<ol>
<li>positive(18.5%)</li>
<li>negative (16.0%) </li>
<li>trust(12.2%) </li>
<li>anger(9.5%) </li>
<li>sadness (8.9%) </li>
</ol>

Top 5 Highest percentage of sentiments in Clinton's tweets: 
<ol>
<li>positive(20.8%) </li>
<li>trust (15.7%) </li>
<li>anticipation(13.4%) </li>
<li>negative(10.9%) </li>
<li>surprise (10.9%) </li>
</ol>

Hillary's top five have four positive-ish sentiments, and Trump's has two...

<table>
  <tr>
    <th>sentiment</th>
    <th>Trump:word-count</th>
    <th>Trump:word-percent</th>
    <th>Clinton:word-count</th>
    <th>Clinton:word-percent</th>
  </tr>
  <tr>
    <td>anger</td>
    <td>465</td>
    <td>9.5%</td>
    <td>32</td>
    <td>4.3%</td>
  </tr>
  <tr>
    <td>anticipation</td>
    <td>430</td>
    <td>8.8%</td>
    <td>99</td>
    <td>13.4%</td>
  </tr>
  <tr>
    <td>disgust</td>
    <td>306</td>
    <td>6.2%</td>
    <td>14</td>
    <td>1.9%</td>
  </tr>
  <tr>
    <td>fear</td>
    <td>398</td>
    <td>8.1%</td>
    <td>49</td>
    <td>6.6%</td>
  </tr>
  <tr>
    <td>joy</td>
    <td>333</td>
    <td>6.8%</td>
    <td>81</td>
    <td>10.9%</td>
  </tr>
  <tr>
    <td>negative</td>
    <td>788</td>
    <td>16.5%</td>
    <td>81</td>
    <td>10.9%</td>
  </tr>
    <tr>
    <td>positive</td>
    <td>911</td>
    <td>18.5%</td>
    <td>154</td>
    <td>20.8%</td>
  </tr>
    <tr>
    <td>sadness</td>
    <td>438</td>
    <td>8.9%</td>
    <td>47</td>
    <td>6.4%</td>
  </tr>
    <tr>
    <td>surprise</td>
    <td>245</td>
    <td>5.0%</td>
    <td>81</td>
    <td>10.9%</td>
  </tr>
  <tr>
    <td>trust</td>
    <td>599</td>
    <td>12.2%</td>
    <td>116</td>
    <td>15.7%</td>
  </tr>
</table>

The code: 

<pre>
     hill_tweets <- userTimeline("HillaryClinton", n= 3200)
     hill_tweets_df <- tbl_df(map_df(hill_tweets, as.data.frame))
     library(tidyr)

     hill_tweets_df

     reg <- "([^A-Za-z\\d#@']|'(?![A-Za-z\\d#@]))"
     hill_tweet_words <- hill_tweets_df %>%
       filter(!str_detect(text, '^"')) %>%
       mutate(text = str_replace_all(text, "https://t.co/[A-Za-z\\d]+|&amp;", "")) %>%
       unnest_tokens(word, text, token = "regex", pattern = reg) %>%
       filter(!word %in% stop_words$word,
              str_detect(word, "[a-z]"))

     hill_by_source_sentiment <- hill_tweet_words %>%
       inner_join(nrc, by = "word") %>%
       count(sentiment, id) %>%
       ungroup() %>%
       complete(sentiment, id, fill = list(n = 0)) %>%
       group_by(sentiment) %>%
       summarize(words = sum(n)) %>%
       ungroup()

     head(hill_by_source_sentiment, n=500)

     trump_tweets <- userTimeline("realDonaldTrump", n= 3200)
     trump_tweets_df <- tbl_df(map_df(trump_tweets, as.data.frame))
     
     trump_tweets_df

     reg <- "([^A-Za-z\\d#@']|'(?![A-Za-z\\d#@]))"
     trump_tweet_words <- trump_tweets_df %>%
       filter(!str_detect(text, '^"')) %>%
       mutate(text = str_replace_all(text, "https://t.co/[A-Za-z\\d]+|&amp;", "")) %>%
       unnest_tokens(word, text, token = "regex", pattern = reg) %>%
       filter(!word %in% stop_words$word,
              str_detect(word, "[a-z]"))

     trump_by_source_sentiment <- trump_tweet_words %>%
       inner_join(nrc, by = "word") %>%
       count(sentiment, id) %>%
       ungroup() %>%
       complete(sentiment, id, fill = list(n = 0)) %>%
       group_by(sentiment) %>%
       summarize(words = sum(n)) %>%
       ungroup()

     head(trump_by_source_sentiment, n=500)
     
     combine_trump_clinton <- merge(x = trump_by_source_sentiment, y = hill_by_source_sentiment, by = c("sentiment"), all.x=TRUE)

     combine_trump_clinton

     trump_by_source_sentiment$pct <- ((trump_by_source_sentiment$words / sum(trump_by_source_sentiment$words)) * 100)

     trump_by_source_sentiment

     sum(trump_by_source_sentiment$words)

     hill_by_source_sentiment$pct <- ((hill_by_source_sentiment$words / sum(hill_by_source_sentiment$words)) * 100)

     hill_by_source_sentiment

     sum(hill_by_source_sentiment$words)

     ggplot(combine_trump_clinton, aes(x=sentiment, y=pct.y, fill=pct.x)) +   
       geom_bar(position = "dodge", stat="identity")


     names(combine_trump_clinton)[2] <- "Trump:word-count"
     names(combine_trump_clinton)[3] <- "Trump:word-percent"
     names(combine_trump_clinton)[4] <- "Clinton:word-count"
     names(combine_trump_clinton)[5] <- "Clinton:word-percent"

     combine_trump_clinton

     sentiment_comp_percent <- melt(combine_trump_clinton[,c('sentiment','Trump:word-percent','Clinton:word-percent')],id.vars = 1)
     sentiment_comp_percent

     ggplot(sentiment_comp_percent,aes(x = sentiment, y = value)) + 
       geom_bar(aes(fill = variable),stat="identity", position = "dodge")

     sentiment_comp_values <- melt(combine_trump_clinton[,c('sentiment','Trump:word-count','Clinton:word-count')],id.vars = 1)
     sentiment_comp_values

     ggplot(sentiment_comp_values,aes(x = sentiment, y = value)) + 
       geom_bar(aes(fill = variable),stat="identity", position = position_dodge()) 
    </pre>

And to this I'll add graphs showing the change in retweets and likes by month for Trump's tweets, from January to August. 

Retweets
<a href="http://khasachi.com/images/r_m.png"><img width="650" src="http://khasachi.com/images/r_m.png"/></a>

Likes
<a href="http://khasachi.com/images/t_m_likes.png"><img width="650" src="http://khasachi.com/images/t_m_likes.png"/></a>
