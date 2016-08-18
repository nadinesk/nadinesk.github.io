---
layout: post
title:  "Hashtag Sentiment Analysis with R and TwitteR" 
date:   2016-08-18 01:00:00
categories: r, data, twitter, twitter data, sentiment analysis, twitter trends
---

Today I used sentiment analysis in R to compare sentiments for the 5,000 most recent tweets between some of the most popular hashtags on Thursday morning, and one hashtag that I included as comparison, Aleppo, because of the extremely tragic situation there. Again, I'm using heavily [this](http://varianceexplained.org/r/trump-tweets/) code, and [this](http://geoffjentry.hexdump.org/twitteR.pdf) code. 

Sentiments are based on the [NRC Word-Emotion Association Lexicon](http://saifmohammad.com/WebPages/NRC-Emotion-Lexicon.htm) in the [tidytext](https://cran.r-project.org/web/packages/tidytext/) package, which, from [here again](http://varianceexplained.org/r/trump-tweets/) categorizes words into ten sentiments: positive, negative, anger, anticipation, disgust, fear, joy, sadness, surprise, and trust.

The bar chart compares percentage of total words for each sentiment. 

Hashtag Sentiment Comparison
![Hashtag Sentiment Comparison](http://khasachi.com/images/trend_perc.png)

One would expect sentiments with the #Aleppo hashtag to be very sad, fearful, and negative, and they are. The other three hashtags I included in this analysis are: the first most popular Thursday morning hashtag, #ThursdayThoughts, surprisingly negative; the fifth most popular hashtag this morning, "NASAMarsDay", which as one would guess, is more positive and anticipatory; and the tenth most popular hashtag this morning, "PhillyFed," which is both negative and positive (the n was only 1121 because by the time I had gotten around to pulling these tweets, the hashtag had already lost its luster). 

Code: 

Get the trends for the US, using the US's woeid

     US_trends = getTrends(23424977)
	 
	 head(US_trends, n=10)

Get the 5000 most recent tweets for the top hashtag, and convert it to a dataframe

     us_trends_1 <- searchTwitter("#ThursdayThoughts", n=5000)
	 
	 us_trend_1_df <- do.call("rbind", lapply(us_trends_1, as.data.frame))
	 
Get just the text of the tweets, convert it to a dataframe, and change the column name to "text"

     just_text <- us_trend_1_df$text
	 
     just_text_df <- do.call("rbind", lapply(just_text, as.data.frame))
	 
     names(just_text_df)[1] <- "text"

Use the tidytext package

     nrc <- sentiments %>%
      filter(lexicon == "nrc") %>%
      dplyr::select(word, sentiment)

Get just the words from the tweets

	just_words <- just_text_df %>%
		filter(!str_detect(text, '^"')) %>%
		unnest_tokens(word, text, token = "regex", pattern = reg) %>%
		filter(!word %in% stop_words$word,
         str_detect(word, "[a-z]"))

Categorize the words into sentiments by joining them and counting the number of words associated with each of the ten sentiments
		 
     trend_words_sentiment <- asdf_words %>%
		inner_join(nrc, by = "word") %>%
		count(sentiment) %>%
		ungroup() %>%
		complete(sentiment,  fill = list(n = 0)) %>%
		group_by(sentiment) %>%
		summarize(words = sum(n)) %>%
		ungroup()

Repeat this for each hashtag

Merge the dataframes together: 

	trend_sentiments_v1 <- merge(x = alep_words_sentiment, 
										   y = trend_words_sentiment_3, 
										   by = c("sentiment"), all.x=TRUE)

	trend_sentiments_v2 <- merge(x = trend_sentiments_v1, 
								 y = trend_words_sentiment_2, 
								 by = c("sentiment"), all.x=TRUE)

	trend_sentiments_v3 <- merge(x = trend_sentiments_v2, 
								 y = trend_words_sentiment, 
								 by = c("sentiment"), all.x=TRUE)


Change the column names, and get percentages for each hashtag
     names(trend_sentiments_v3)[2] <- "Alep_Words"
     names(trend_sentiments_v3)[3] <- "Phily_Fed_Words"
     names(trend_sentiments_v3)[4] <- "NASAMarsDay_Words"
     names(trend_sentiments_v3)[5] <- "ThursdayThoughts_Words"
     
     trend_sentiments_v3$Alep_Perc <- trend_sentiments_v3$Alep_Words/sum(trend_sentiments_v3$Alep_Words)
     trend_sentiments_v3$Philly_Fed_Perc <- trend_sentiments_v3$Phily_Fed_Words/sum(trend_sentiments_v3$Phily_Fed_Words)
     trend_sentiments_v3$NASAMarsDay_Perc <- trend_sentiments_v3$NASAMarsDay_Words/sum(trend_sentiments_v3$NASAMarsDay_Words)
     trend_sentiments_v3$ThursdayThoughts_Perc <- trend_sentiments_v3$ThursdayThoughts_Words/sum(trend_sentiments_v3$ThursdayThoughts_Words)

Reshape the data (reshaper2 package) for the bar chart

     trend_melt <- melt(trend_sentiments_v3[,c('sentiment','Alep_Perc','Philly_Fed_Perc', 'NASAMarsDay_Perc', 'ThursdayThoughts_Perc')],id.vars = 1)
	    
Use ggplot2 package to plot

     ggplot(trend_melt,aes(x = sentiment, y = value)) + 
	      geom_bar(aes(fill = variable),stat="identity", position = "dodge")

