---
layout: post
title:  "Learning R and using the Twitter API"
date:   2016-08-15 00:00:00
categories: r, data, twitter, twitter data, trump, clinton
---

My most recent attempt at R involved me copying and pasting code into R Studio, that was far beyond my extreme beginner capabilities. I'm not sure if, "You have to start somewhere" means I should start here, but the analysis was so...cool...that I just thought maybe I'd jump in and see how it goes. 

Here's how it went: copying and pasting and downloading libraries is not too difficult! But as with all the programming things I try to learn, I know I'm going to have to go back to the basics soon, and reach these other heights on my own at a (much?) later time. 

So what I can say from this is -- wonderful exposure to what R can do! 

The analysis I tried to follow along (read: copy and paste) was a blog post by [David Robinson](http://varianceexplained.org/), [Text analysis of Trump's tweets confirms he writes only the (angrier) Android half](http://varianceexplained.org/r/trump-tweets/). The analysis takes the 3,200 most recent tweets from Donald Trump's twitter account (@realDonaldTrump) and uses sentinment analysis to test a hypothesis that Trump's staff tweets the less angry, more rote, tweets from an iPhone; and Trump himself tweets angrier, less filtered tweets from an Android phone. The conclusion is that tweets from the Android phone are angrier and more negative than tweets from the iPhone. 

There were two horizontal bar charts created that didn't show the code, so I created one of those, which showed the most common words (from any source) in the 3,200 most tweets. I included two extra bar charts, showing the same data for Hillary Clinton and myself. 

The following code shows the section for HRC. The same would be used for Donald Trump, replacing userTimeline("realDonaldTrump", n=3200)

get the tweets and just the words from user timelines: 

     hillary_tweets <- userTimeline("hillaryclinton", n= 3200)
     hillary_tweets_df <- tbl_df(map_df(hillary_tweets, as.data.frame))
     reg <- "([^A-Za-z\\d#@']|'(?![A-Za-z\\d#@]))"
     hill_tweet_words <- hillary_tweets_df %>%
          filter(!str_detect(text, '^"')) %>%
          mutate(text = str_replace_all(text, "https://t.co/[A-Za-z\\d]+|&amp;", "")) %>%
          unnest_tokens(word, text, token = "regex", pattern = reg) %>%
          filter(!word %in% stop_words$word,
          str_detect(word, "[a-z]"))

get the count for each word

     hill_tweet_words_count_1 <- hill_tweet_words %>%
         count(word)
get just words used five or more times (for trump, n>=40 since he used many more words)

     hill_tweet_words_count_2 <- hill_tweet_words_count_1 %>%
       filter(n>=5)

create the bar chart 

     ggplot(data=hill_tweet_words_count_2, aes(x=word, y=n, fill=n)) + 
       geom_bar(stat="identity", position="dodge") + 
       coord_flip()

Donald Trump used 8,517 total words and 2,578 unique words in his last 3200 tweets. Hillary Clinton used 1,089 total words and 639 unique words in the same number of tweets. (I used 516 total and 399 unique words.)

Their top words look weirdly similar: 

* The top word for both Trump and Clinton is the other's opponent (3.9% for Clinton, and 2.3% for Trump). 
* The fifth most frequent word for both is "people" (1.1% for both Trump and Clinton). 
* The second and fourth most frequent words for Clinton and Trump are either first/last name of their opponent, or their own name.
* Trump's third most frequent word is "crooked" in reference to Clinton (1.2%)
* Clinton's third most frequent word is "America" (1.7%). 
* Trump's top 5 most frequent words referring to Clinton add up to about 5% (429 timeS), and Clinton's referring to Trump are 6.29% (68 times). 

Donald Trump's top words and perentage of their use to total words used (8,517): 

* hillary: 192, 2.25%
* trump2016: 132, 1.55% 
* crooked: 129, 1.51%
* clinton: 104, 1.22%
* people: 92, 1.1%

Hillary Clinton's top words and perentage of their use to total words used (1,089): 

* trump: 42, 3.9%
* donald: 26, 2.39% 
* america: 25, 2.30%
* hillary: 19, 1.74%
* people: 12, 1.1%

My top words and counts: 

* http (25), 
* app (10), 
* d3js (8), 
* data(6), 
* love (5), 
* dataviz(5)


Donald Trump's Most Common Words
<a href="http://khasachi.com/images/trump_common_words.png"><img height="550" src="http://khasachi.com/images/trump_common_words.png"/></a>

Hillary Clinton's Most Common Words
<a href="http://khasachi.com/images/hill_common_words.png"><img height="550" src="http://khasachi.com/images/hill_common_words.png"/></a>

My Most Common Words
<a href="http://khasachi.com/images/nf_common_words.png"><img src="http://khasachi.com/images/nf_common_words.png"/></a>
