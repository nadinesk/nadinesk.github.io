---
layout: post
title:  "Clinton and Trump Debate Sentiment Analysis"
date:   2016-09-29 00:00:00
categories: r, data, graphs, politics, debates, clinton, trump, general election
---

**Overview**: 

This post provides a sentiment analysis of words used by Clinton and Trump in their debate in September 2016. Sentiment analyses of Clinton and Trump in their last primary debates (April 2016 for Clinton, and March 2016 for Trump’s last debate) is also provided as a point of comparison and/or trends. 

*Getting the Data*: 

I obtained transcripts of the three debates from the Washington Post ([Dem Prim Debate](https://www.washingtonpost.com/news/the-fix/wp/2016/04/14/the-brooklyn-democratic-debate-transcript-annotated/), [Rep Prim Debate](https://www.washingtonpost.com/news/the-fix/wp/2016/03/10/the-cnn-miami-republican-debate-transcript-annotated/), [Sept 2016 Debate](https://www.washingtonpost.com/news/the-fix/wp/2016/09/26/the-first-trump-clinton-presidential-debate-transcript-annotated/)), and coded each part of the transcript by who said what, and saved as a csv file. 

*Getting the Sentiment Analysis Results*: 

I used R to perform the analysis. Specifically, I used the code provided in [this](http://varianceexplained.org/r/trump-tweets/) post by David Robinson to perform the sentiment analysis. I then used R to create functions to automate total word counts; perform the sentiment analysis (again using the code in Varience Explained post by Robinson to do all the heavy lifting); reshape data to reshape it for the bar chart; and to create the bar chart. 

*Sentiment Analysis Overview*: 

The results show that Clinton overwhelmingly uses words of positivity and trust (44% of her words used in the primary debate, and 39% of her words in the Sept 2016 debate). Trump is more negative than Clinton when looking at both debates: he has higher percentages than her for all negative-associated sentiments (anger, disgust, fear, negative, sadness). 

Clinton’s top five sentiments in the September 2016 debate comprise 71% of her total words used and are: positive, trust, negative, anticipation, fear

Trump’s top five sentiments in the September 2016 debate comprise 71% of his total words used:   positive, negative, trust, sadness, fear

*Number of Words*: 

Word count (not sentiment analysis, I know) shows that Trump said 27% more words than Clinton in the September 2016 debate; Clinton said 31% more words than Trump when comparing their non head-to-head primary debates in April and March, respectively. Clinton had only one opponent in her last primary debate; Trump had three other opponents, and so he said less (but still more than any of his opponents). (The word counts include all words, while the sentiment analysis removes words that should not be included in a sentiment analysis.)

**Analyses and Process**:

**WORD COUNTS**

**Data**

Republican Primary Debate, March 2016:

* Trump: 5,588
* Cruz: 3,877
* Kasich: 3,880
* Rubio: 5,013

Democratic Primary Debate, April 2016:

* Clinton: 8,157
* Sanders: 6,294

General Election Debate, September 2016: 

* Trump: 8,675
* Clinton: 6,332

**Analysis**

* Trump said 27% more words than Clinton in gen election debate
* Clinton said 31% more words than Trump when comparing the primary debates, probably because she had one opponent and he had 3 others

**Process**

* Get transcripts (links above)
* Code all lines by person 
* Save as csv with two columns: one text and one person. These files be used for sentiment function also 
* Includes all words, and doesn’t exclude words excluded in sentiment analysis

**R Code**

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

**SENTIMENT ANALYSIS**

**Data**

Clinton vs Trump Comparison: Last Primary Debates for Each and 9/2016 Head-to-Head Debate

![Clinton vs Trump Comparison](http://khasachi.com/images/sent_comp.PNG)

**Analysis**

Clinton is more positive and expresses more trusting sentiments than Trump. Clinton had higher percentages for positive,trust, and anticipation sentiment words when comparing both primary and head to head general election debate. She was lower on negative, fear, anger, joy, sadness, surprise, and disgust. 

Clinton: sentiments expressed more than Trump

* positive,trust, and anticipation

Trump: sentiments expressed less than Trump

* negative, fear, anger, joy, sadness, surprise, and disgust. 

**Data**

Clinton vs Sanders: Democratic Primary Debate, April 2016

![Clinton vs Sanders Comparison](http://khasachi.com/images/demCScomp.PNG)

**Analysis**

Clinton is more positive than Sanders

Clinton: sentiments expressed more than Sanders

* positive, trust, anticipation, disgust

Clinton: sentiments expressed less than Sanders 

* negative, fear, sadness, anger, joy, surprise

**Data**

Republican Primary Debate, March 2016

![Repbulican Primary Debate March 2016](http://khasachi.com/images/primTOthcop.PNG)

**Analysis**

Trump expresses more negative-associated sentiments than average of 3 opponents 

Used positive, trust, and negative sentiments less than average opponents. Used surprise, joy, anger, disgust, sadness, and fear sentiments more than average of opponents.

Rankings: 

Sentiment Rankings for Clinton, 9/2016 Debate

![Clinton 9 2016 debate ](http://khasachi.com/images/clintononlygen.PNG)

Sentiment Rankings for Trump

![Trump 9 2016 debate ](http://khasachi.com/images/tronlygen.PNG)

**Process**

* Get word sentiments for each candidate and different debates
* Merge two times (one for primary debates, one for General Election debates)
* Add two columns to calculate percentage variances between Clinton and Trump during primaries and Clinton and Trump head-to-head general election debate

**R Code**

The actual sentiment analysis function is from [this](http://varianceexplained.org/r/trump-tweets/) post

    ##Sentiment Function 

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

    ##MERGE FUNCTION

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

**GRAPHS**

**Clinton vs Trump, Last Primary for Each, and Head-to-Head 9/2016 Debate**

![Chart all debates ](http://khasachi.com/images/chart_all_debates.png)

**Clinton Comparison: 4/2016 Dem Primary Debate and 9/2016 Gen Election Debate**

![Clinton comparison ](http://khasachi.com/images/chart_clinton_only.png)

**Trump Comparison: 3/2016 Dem Primary Debate and 9/2016 Gen Election Debate**

![Trump comparison ](http://khasachi.com/images/chart_tr_only.png)

**Clinton vs Trump, Head-to-Head 9/2016 General Election Debate**

![Debate GenElec ](http://khasachi.com/images/chart_92016_debate.png)


**Process**: 

Use reshape package to melt data for bar chart

**R Code**

    ##Melt Function
    melting <- function(file,ons, id) {
      newdata <- file[id]
      mdata <- melt(newdata, id=c(ons))  
    }

    melt_ev <- melting(merge_ev,"sentiment",c(1,3,5,7,9))
    melt_gen <- melting(genMerge,"sentiment",c(1,3,5))
    melt_clint_comp <- melting(clinton_comp,"sentiment",c(1,3,5))
    melt_trump_comp <- melting(trump_comp, "sentiment", c(1,2,4))

    ##Bar Chart Function 
    make_bar <- function(file,blabels,legTitle) {
        label_dig <- round(file$value, digits=0)
        label_perc <- paste(label_dig, "%",sep="")
        ggplot(data=file, aes(x=sentiment, y=value, fill=variable)) +
        geom_bar(stat="identity", position=position_dodge()) + 
        scale_fill_discrete(labels=blabels, name=legTitle) + 
        geom_text(aes(label=label_perc),
              position=position_dodge(width=0.9), vjust=-0.25, size=2.5 )
      }

    make_bar(melt_ev,c("Clinton-pmy", "Trump-pmy", "Clinton-9/16", "Trump-9/16"), "Candidate-Debate")
    make_bar(melt_clint_comp,c("Clinton-pmy", "Clinton-9/16"), "Debate")
    make_bar(melt_trump_comp,c("Trump-pmy", "Trump-9/16"), "Debate")
    make_bar(melt_gen, c("Clinton-9/16", "Trump-9/16"), "Sept 2016 Debate")
