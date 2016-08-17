---
layout: post
title:  "Convention Speech Sentiment Analysis" 
date:   2016-08-17 01:00:00
categories: r, data, twitter, twitter data, trump, clinton, election, convention speeches, politics
---

Getting more mileage out of the sentiment analysis post I've blogged about this week (at least a couple times??) and combining that with the word cloud on the convention speeches I did, I used R to do a sentiment analysis on the convention speeches by Hillary Clinton, Bill Clinton, and Trump. 

The speeches did happen a while ago, and Trump has done a lot to damage (permanently, one can only hope here) his campaign since then, but his polls began to drop after the conventions, and they haven't really picked back up since then. 

There was a HUGE contrast between the #RNCinCLE with the #DemsinPhilly. The Republican National Convention was a mess. Watching the Democratic National Convention the next week made me feel even more this way: it was not even comparable how much more polished, on-message, and positive the Democratic convention was. They did such a good job of casting Hillary Clinton and the Democratic Party as positive, inclusive, and caring, competent, and widely supported. 

The sentiment analysis I did shows the percentage of words to each person's (Hillary Clinton, Trump, Bill Clinton) whole speech, associated with each of the ten main sentiments. I included Bill Clinton's speech in this analysis because it was light, sentimenta, and intended to cast his wife as a caring but driven person; I was curious to see how it would compare to speeches intended to lay out the nominees' paths forward.) 

People generally felt that Trump's convention speech was very negative, and the sentiment analysis I did bears this out. As the chart below shows, he used a higher percentage of words than both Clintons, associated with negativity, fear, sadness, anger, and digust. HRC and BC used more words than Trump, associated with positivity, trust anticipation, joy, and surprise. 

The tables below show the counts of words associated with each emotion, and percentage of total words, and ranks each person's sentiments by percentage of words. 

HRC's and BC's speeches were very similar in the proportion of words they used associated with each sentiment. They had the same top six sentiments, and their last four were slightly different. 

Convention Speech Sentiment Comparision 
![Convention Speech Sentiment Comparision](http://khasachi.com/images/speechcomparison.png)

Table: Convention Speech Sentiment Comparision 
![Table: Convention Speech Sentiment Comparision](http://khasachi.com/images/comp_table.png)

I'm not going to paste the code here since it's the same with slight variations of my other posts, and just replacing the text. 
