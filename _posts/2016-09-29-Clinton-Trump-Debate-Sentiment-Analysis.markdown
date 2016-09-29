---
layout: post
title:  "Clinton and Trump Debate Sentiment Analysis"
date:   2016-09-29 00:00:00
categories: r, data, graphs, politics, debates, clinton, trump, general election
---

**Overview**: 

This post provides a sentiment analysis of words used by Clinton and Trump in their debate in September 2016. Sentiment analyses of Clinton and Trump in their last primary debates (April 2016 for Clinton, and March 2016 for Trump’s last debate) is also provided as a point of comparison and/or trends. 

*Getting the Data*: 

I obtained transcripts of the three debates from the Washington Post ((Dem Prim Debate)[link], (Rep Prim Debate)[link], (Sept 2016 Debate)[link]), and coded each part of the transcript by who said what, and saved as a csv file. 

*Getting the Sentiment Analysis Results*: 

I used the function provided in [this](http://varianceexplained.org/r/trump-tweets/) post by David Robinson to perform the sentiment analysis. I then created functions to automate total word counts; perform the sentiment analysis (again using the code in Varience Explained post by Robinson to do all the heavy lifting); reshape data to reshape it for the bar chart; and to create the bar chart. 

*Sentiment Analysis Overview*: 

The results show that Clinton overwhelmingly uses words of positivity and trust (44% of her words used in the primary debate, and 39% of her words in the Sept 2016 debate). Trump is more negative than Clinton when looking at both debates: he has higher percentages than her for all negative-associated sentiments (anger, disgust, fear, negative, sadness). 

Clinton’s top five sentiments in the September 2016 debate comprise 71% of her total words used and are: positive, trust, negative, anticipation, fear

Trump’s top five sentiments in the September 2016 debate comprise 71% of his total words used:   positive, negative, trust, sadness, fear

*Number of Words*: 

Word count (not sentiment analysis, I know) shows that Trump said 27% more words than Clinton in the September 2016 debate; Clinton said 31% more words than Trump when comparing their non head-to-head primary debates in April and March, respectively. Clinton had only one opponent in her last primary debate; Trump had three other opponents, and so he said less (but still more than any of his opponents). (The word counts include all words, while the sentiment analysis removes words that should not be included in a sentiment analysis.)

**Analysis and Process**:

*Word Counts*

DATA

Republican Primary Debate, March 2016:

* Trump: 5588
* Cruz: 3877
* Kasich: 3880
* Rubio: 5013

Democratic Primary Debate, April 2016:

* Clinton: 8157
* Sanders: 6294

General Election Debate, September 2016: 

* Trump: 8,675
* Clinton: 6,332

ANALYSIS

* Trump said 27% more words than Clinton in gen election debate
* Clinton said 31% more words than Trump when comparing the primary debates, probably because she had one opponent and he had 3 others

PROCESS

* Get transcript (link to transcripts)
* Code all lines by person 
* Save as csv with two columns: one text and one person. These files be used for sentiment function also 
* Includes all words, and doesn’t exclude words excluded in sentiment analysis

CODE

<pre><code>
totalWords <- function(directory, person_spk) {
  wd <- getwd()
  dir <- paste(wd,"/",directory,sep="")
  db_text <- read.csv(dir)
  atext <- subset(db_text, person == person_spk)
  atext$total <- str_count(atext$text, '\\s+')+1
  dword_count <- sum(atext$total)
  dword_count  
}

clinton_TW <- totalWords("ctdeb.csv",'C')
trump_TW <- totalWords("ctdeb.csv",'T')
clintonPrim_TW <- totalWords("demprim.csv",'CLINTON')
sandersPrim_TW <- totalWords("demprim.csv",'SANDERS')
trumpPrim_TW <- totalWords("repprim.csv",'TRUMP')
CruzPrim_TW <- totalWords("repprim.csv",'CRUZ')

</pre></code>

*Sentiment Analysis*:

DATA

Clinton vs Trump Comparison: Last Primary Debates for Each and 9/2016 Head-to-Head Debate

![Clinton vs Trump Comparison](http://khasachi.com/images/sent_comp.PNG)

ANALYSIS

Clinton is more positive and expresses more trusting sentiments than Trump. Clinton had higher percentages for positive,trust, and anticipation sentiment words when comparing both primary and head to head general election debate. She was lower on negative, fear, anger, joy, sadness, surprise, and disgust. 

Clinton: sentiments expressed more than Trump

* positive,trust, and anticipation

Trump: sentiments expressed less than Trump

* negative, fear, anger, joy, sadness, surprise, and disgust. 

DATA

Clinton vs Sanders: Democratic Primary Debate, April 2016

![Clinton vs Sanders Comparison](http://khasachi.com/images/demCScomp.PNG)

ANALYSIS

Clinton is more positive than Sanders

Clinton: sentiments expressed more than Sanders

* positive, trust, anticipation, disgust

Clinton: sentiments expressed less than Sanders 

* negative, fear, sadness, anger, joy, surprise

DATA

Republican Primary Debate, March 2016

![Repbulican Primary Debate March 2016](http://khasachi.com/images/primTOthcop.PNG)

ANALYSIS

Trump expresses more negative-associated sentiments than average of 3 opponents 

Used positive, trust, and negative sentiments less than average opponents. Used surprise, joy, anger, disgust, sadness, and fear sentiments more than average of opponents.

Rankings: 

Sentiment Rankings for Clinton, 9/2016 Debate

![Clinton 9 2016 debate ](http://khasachi.com/images/clintononlygen.PNG)

Sentiment Rankings for Trump

![Trump 9 2016 debate ](http://khasachi.com/images/tronlygen.PNG)

PROCESS

* Get word sentiments for each candidate and different debates
* Merge two times (one for primary debates, one for General Election debates)
* Add two columns to calculate percentage variances between Clinton and Trump during primaries and Clinton and Trump head-to-head general election debate


CODE

The actual sentiment analysis function is from [this](http://varianceexplained.org/r/trump-tweets/) post

<pre><code

Sentiment Function 

sentmt <- function(directory, person_spk) {
  wd <- getwd()
  
  dir <- paste(wd,"/",directory,sep="")
  db_text <- read.csv(dir)
  
  atext <- subset(db_text, person == person_spk)
  
  reg <- "([^A-Za-z\\d#@']|'(?![A-Za-z\\d#@]))"
  
  nrc <- sentiments %>%
    filter(lexicon == "nrc") %>%
    dplyr::select(word, sentiment)
  
  deb_words <- atext %>%
    filter(!str_detect(text, '^"')) %>%
    unnest_tokens(word, text, token = "regex", pattern = reg) %>%
    filter(!word %in% stop_words$word,
           str_detect(word, "[a-z]"))
  freq_words <- data.frame(table(deb_words))
  freq_words <- subset(h_freq_words, person==person)
  freq_words <- freq_words[order(-freq_words$Freq),]
  words_sentiment <- deb_words %>%
    inner_join(nrc, by = "word") %>%
    count(sentiment) %>%
    ungroup() %>%
    complete(sentiment,  fill = list(n = 0)) %>%
    group_by(sentiment) %>%
    summarize(words = sum(n)) %>%
    ungroup()
  
  words_sentiment$words_perc <- ((words_sentiment$words)/sum(words_sentiment$words)*100)
  words_sentiment
  }

##Run function and rename columns 

clinton_sentiment <- sentmt("ctdeb.csv",'C')
clinton_sentiment <-  clinton_sentiment[order(-clinton_sentiment$`C-gen-perc`),]
names(clinton_sentiment)[2] <- "C-gen-words"
names(clinton_sentiment)[3] <- "C-gen-perc"

trump_sentiment <- sentmt("ctdeb.csv",'T')
names(trump_sentiment)[2] <- "T-gen-words"
names(trump_sentiment)[3] <- "T-gen-perc"

demClinton_sentiment <- sentmt("demprim.csv",'CLINTON')
names(demClinton_sentiment)[2] <- "C-prim-words"
names(demClinton_sentiment)[3] <- "C-prim-perc"

repTrump_sentiment <- sentmt("repprim.csv",'TRUMP')
names(repTrump_sentiment)[2] <- "T-prim-words"
names(repTrump_sentiment)[3] <- "T-prim-perc"

MERGE FUNCTION

mergestuff <- function(xMerge, yMerge) {
  primMerge <- merge(x=xMerge, y=yMerge, by = "sentiment", all.x = TRUE)
  sorted <- primMerge[order(-primMerge[,2]),]
  sorted
}
primMg <- mergestuff(demClinton_sentiment, repTrump_sentiment)
genMerge <- mergestuff(clinton_sentiment, trump_sentiment)
clinton_comp <- mergestuff(demClinton_sentiment, clinton_sentiment)
trump_comp <- mergestuff(repTrump_sentiment, trump_sentiment)
merge_ev <- mergestuff(primMg, genMerge)

</pre></code

**Graphs**:

**Clinton vs Trump, Last Primary for Each, and Head-to-Head 9/2016 Debate**

![Chart all debates ](http://khasachi.com/images/chart_all_debates.PNG)

**Clinton Comparison: 4/2016 Dem Primary Debate and 9/2016 Gen Election Debate**

![Clinton comparison ](http://khasachi.com/images/chart_clinton_only.PNG)

**Trump Comparison: 3/2016 Dem Primary Debate and 9/2016 Gen Election Debate**

![Trump comparison ](http://khasachi.com/images/chart_tr_only.PNG)

**Clinton vs Trump, Head-to-Head 9/2016 General Election Debate**

![Debate GenElec ](http://khasachi.com/images/chart_92016_debate.PNG)



