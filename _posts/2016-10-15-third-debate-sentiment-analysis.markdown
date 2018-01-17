---
layout: post
title:  "Clinton and Trump Sentiment Analysis: Three Debates"
date:   2016-10-25 00:00:00
categories: r, data, graphs, politics, debates, clinton, trump, general election
---


**Clinton Clearly More Positive, and Why That's Important**

Sentiment Analyses comparisons, using R (code at the end of post), between Clinton and Trump between their convention party acceptance speeches and the three debates show that Clinton is by far the more positive candidate. Trump spoke more in the first two debates, but Clinton, fighting back and being more aggressive in the third debate, spoke more words than Trump did. 

![Second Debates Comparison Chart](https://nadinesk.github.io/images/positiveNegativesum1.png)

![Second Debates Comparison Table](https://nadinesk.github.io/images/posnegsumtable1.png)

The line chart and table above compare positive and negative sentiments in the past three debates by Clinton and Trump. I used the three debates' transcripts ([third debate transcript](https://www.washingtonpost.com/news/the-fix/wp/2016/10/19/the-final-trump-clinton-debate-transcript-annotated/)) to perform the sentiment analysis, informed by [this](http://varianceexplained.org/r/trump-tweets/) blog post by David Robinson. Each candidates’ words are grouped according to the [NRC Emotion Lexicon](http://saifmohammad.com/WebPages/NRC-Emotion-Lexicon.htm),  “a list of English words and their associations with eight basic emotions (anger, fear, anticipation, trust, surprise, sadness, joy, and disgust) and two sentiments (negative and positive).” I then further grouped these emotions and sentiments into the larger categories of positive (anticipation, trust, surprise, joy, positive) or negative (anger, fear, sadness, disgust, negative), and totaled the word counts by the overarching categories, for each candidate across the three debates. 

The line chart above summarizing the three debates, the sentiment analysis I did for the [convention speeches](https://nadinesk.github.io/r,/data,/twitter,/twitter/trump,/clinton,/election,/convention/speeches,/politics/2016/08/17/speech-sentiment-analysis.html), and the [first](https://nadinesk.github.io/r,/data,/graphs,/politics,/debates,/clinton,/trump,/general/election/2016/09/29/Clinton-Trump-Debate-Sentiment-Analysis.html) and [second](https://nadinesk.github.io/r,/data,/graphs,/politics,/debates,/clinton,/trump,/general/election/2016/10/13/pdeb2.html) debates, show that Clinton is clearly the more positive candidate. 

Why does this matter? A [classic study](http://www.nytimes.com/1988/05/08/us/for-presidential-candidates-optimism-appears-a-winner.html) by Harold Zullow and Martin Seligman showed that a candidate’s optimism relative to their opponent is a good predictor of his/her success. 

From the [LA Times](http://www.latimes.com/opinion/op-ed/la-oe-1105-lyubomirsky-optimism-politics-20151105-story.html): 

> Perhaps unsurprisingly, candidates whose speeches were sunnier and less likely to dwell on negatives were the winners in 18 out of the 
> 22 elections. Furthermore, the more positive the candidate was relative to his opponent — for example, projecting optimism that 
> America's problems were temporary and that he was the one to set things right — the wider his victory margin. (On a side note, Zullow 
> and Seligman found that the more positive the candidate, the more active he was on the trail, making more frequent stump speeches.)

The sentiment analysis I’ve done shows that Clinton is clearly the more optimistic candidate; and the polls have her clearly ahead at this point (the [RCP average](http://www.realclearpolitics.com/epolls/2016/president/us/general_election_trump_vs_clinton-5491.html) has her ahead by 5.1 points today). 


**Sentiment Analysis Rankings by Each Candidate in the Three Debates** 

Below are bar charts of sentiment rankins by each candidate. The number one rank is the sentiment expressed most by the candidate, and number 10 rank is the least expressed sentiment.

Three Debates: Clinton Sentiment Rankings
![Clinton Comparison](https://nadinesk.github.io/images/clintonrank.png)

Three Debates: Trump Sentiment Rankings
![Trump Comparison](https://nadinesk.github.io/images/trump_rank.png)

Third Debate: Clinton vs Trump Sentiment Rankings
![Clinton and Trump Comparison Third debate](https://nadinesk.github.io/images/clinton_trump_debate3.png)

The following table shows the word counts and percentages of sentiments expressed, and sentiment rankings for both candidates.
![Clinton and Trump Comparison Third debate](https://nadinesk.github.io/images/tablesum.png)

**Total Words Spoken**

Trump spoke much more than Clinton in the first two debates but she spoke more than Trump in the third. The chart below shows total words spoken by each candidate in the three debates. 

![Clinton and Trump Total Words](https://nadinesk.github.io/images/twLine.png)

And finally, here is Trump displaying more negativity and craziness/scariness at his last debate performance. 

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr">Yup <a href="https://t.co/vDf6G8bRmZ">pic.twitter.com/vDf6G8bRmZ</a></p>&mdash; Chris Cillizza (@TheFix) <a href="https://twitter.com/TheFix/status/789090575249125376">October 20, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

**R Code**

TOTAL WORDS

    totalWords <- function(directory, person_spk) {
      wd <- getwd()
      dir <- paste(wd,"/",directory,sep="")
      db_text <- read.csv(dir)
      atext <- subset(db_text, person == person_spk)
      atext$total <- str_count(atext$text, '\\s+')+1
      dword_count <- sum(atext$total)
      dword_count  
    }

   
SENTIMENT ANALYSIS

The actual sentiment analysis function is from [this](http://varianceexplained.org/r/trump-tweets/) post

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
      freq_words <- subset(freq_words, person==person)
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
    
    ##MERGE FUNCTION

    mergestuff <- function(xMerge, yMerge) {
    primMerge <- merge(x=xMerge, y=yMerge, by = "sentiment", all.x = TRUE)
    sorted <- primMerge[order(-primMerge[,2]),]
    sorted
    }
  
BAR CHARTS

    ##Melt Function
    melting <- function(file,ons, id) {
    newdata <- file[id]
    mdata <- melt(newdata, id=c(ons))  
    }
    
    ##Bar Chart Function 
    make_bar <- function(file,blabels,legTitle, colorsbar) {
    label_dig <- round(file$value, digits=0)
    label_perc <- paste(label_dig, "%",sep="")
    ggplot(data=file, aes(x=sentiment, y=value, fill=variable)) +
        geom_bar(stat="identity", position=position_dodge()) + 
        scale_fill_manual(labels=blabels, name=legTitle, values=colorsbar) +
        geom_text(aes(label=label_perc),
                  position=position_dodge(width=0.9), vjust=-0.25, size=2.5 )
    }

RUNNING THE CODE

    #### TOTAL WORDS #############################

    c1_tw <- totalWords("ctdeb.csv", "C")
    t1_tw <- totalWords("ctdeb.csv", "T")
    c_tw_2 <- totalWords("Book2ct.csv", 'CLINTON')
    t_tw_2 <- totalWords("Book2ct.csv", 'TRUMP')
    c_tw_3 <- totalWords("Book1.csv", 'CLINTON')
    t_tw_3 <- totalWords("Book1.csv", 'TRUMP')
    
    Clinton.total_words <- c(c1_tw, c_tw_2, c_tw_3 )
    Trump.total_words <- c(t1_tw, t_tw_2, t_tw_3)
    debateNum <- c("debate 1", "debate 2", "debate 3")

    totalWordsDebates <- data.frame(debateNum, Clinton.total_words, Trump.total_words)

    twMelt <- melting(totalWordsDebates, "debateNum", c(1:3))

    twLineChart <- ggplot(data=twMelt, aes(x=debateNum, y=value, group=variable, shape=variable, colour = variable)) +
      geom_line() +
      geom_point() + 
      scale_color_manual(values = c("blue", "red"))

    twLineChart

    #####SENTIMENT ANALYSIS RANKINGS AND BAR CHARTS##########

    c1_sentiment <- sentmt("ctdeb.csv",'C')
    t1_sentiment <- sentmt("ctdeb.csv",'T')
    c2_sentiment <- sentmt("Book2ct.csv",'CLINTON')
    t2_sentiment <- sentmt("Book2ct.csv",'TRUMP')
    c3_sentiment <- sentmt("book1.csv",'CLINTON')
    t3_sentiment <- sentmt("book1.csv",'TRUMP')

    c12Mg <- mergestuff(c1_sentiment, c2_sentiment)
    c123Mg <- mergestuff(c12Mg, c3_sentiment)

    t12Mg <- mergestuff(t1_sentiment, t2_sentiment)
    t123Mg <- mergestuff(t12Mg, t3_sentiment)

    c123Mg$rank1 <- rank(-c123Mg$words_perc.x, na.last = TRUE,
                         ties.method = c("first"))

    c123Mg$rank2 <- rank(-c123Mg$words_perc.y, na.last = TRUE,
                         ties.method = c("first"))

    c123Mg$rank3 <- rank(-c123Mg$words_perc, na.last = TRUE,
                         ties.method = c("first"))

    t123Mg$rank1 <- rank(-t123Mg$words_perc.x, na.last = TRUE,
                         ties.method = c("first"))

    t123Mg$rank2 <- rank(-t123Mg$words_perc.y, na.last = TRUE,
                         ties.method = c("first"))

    t123Mg$rank3 <- rank(-t123Mg$words_perc, na.last = TRUE,
                         ties.method = c("first"))

    c123Mg.sorted <- c123Mg[order(c123Mg$rank3),]
    
    t123Mg.sorted <- t123Mg[order(t123Mg$rank3),]
    

    names(t123Mg.sorted)[2] <- "Trump.words-deb1"
    c123Mg.sortednames(t123Mg.sorted)[3] <- "Trump.per-deb1"
   
    ct123Mg1 <- mergestuff(c123Mg.sorted, t123Mg.sorted)

    c123Mg2 <- ct123Mg1[c(1,2,3,8,11,12,17,4,5,9,13,14,18,6,7,10,15,16,19)]

    t123Mg.sorted.subset <- t123Mg.sorted[c(1,8:10)]
    c123Mg.sorted.subset <- c123Mg.sorted[c(1,8:10)]
    ct123Mg <- mergestuff(c123Mg.sorted.subset, t123Mg.sorted.subset)
    t123.melt <- melting(t123Mg.sorted.subset, "sentiment", c(1:4))
    c123.melt <- melting(c123Mg.sorted.subset, "sentiment", c(1:4))
    ct123Mg.melt <- melting(ct123Mg.subset, "sentiment", c(1:3))
               t3Bar <- make_bar(t123.melt,c("debate 1", "debate 2", "debate 3"), "Debates", c("#ffb2b2", "#ff4c4c", "#ff0000"),         
                   t123.melt$sentiment, t123.melt$value)
    t3Bar

    c3Bar <- make_bar(c123.melt,c("debate 1", "debate 2", "debate 3"), "Debates", c("#b2b2ff", "#4c4cff", "#0000ff"), 
        c123.melt$sentiment, c123.melt$value)

    ctBar3 <- make_bar(ct123Mg.melt, c("Clinton", "Trump"), "Debate", c("#0000ff", "#ff0000"), ct123Mg.melt$sentiment, 
        ct123Mg.melt$value)

    #########SENTIMENT ANALYSIS POSITIVE AND NEGATIVE SUMMARY AND LINE CHART########
    tPosSum <- subset(t123Mg.sorted, t123Mg.sorted$sentiment == 'positive' | t123Mg.sorted$sentiment == 'trust' |
                        t123Mg.sorted$sentiment == 'anticipation' | t123Mg.sorted$sentiment == 'joy' |
                        t123Mg.sorted$sentiment == 'surprise' )

    tNegSum <- subset(t123Mg.sorted, t123Mg.sorted$sentiment == 'negative' | t123Mg.sorted$sentiment == 'anger' |
                        t123Mg.sorted$sentiment == 'fear' | t123Mg.sorted$sentiment == 'sadness' |
                        t123Mg.sorted$sentiment == 'disgust' )
    
    cPosSum <- subset(c123Mg.sorted, c123Mg.sorted$sentiment == 'positive' | c123Mg.sorted$sentiment == 'trust' |
                        c123Mg.sorted$sentiment == 'anticipation' | c123Mg.sorted$sentiment == 'joy' |
                        c123Mg.sorted$sentiment == 'surprise' )

    cNegSum <- subset(c123Mg.sorted, c123Mg.sorted$sentiment == 'negative' | c123Mg.sorted$sentiment == 'anger' |
                        c123Mg.sorted$sentiment == 'fear' | c123Mg.sorted$sentiment == 'sadness' |
                        c123Mg.sorted$sentiment == 'disgust' )
    
    debateNum <- c("debate1", "debate2", "debate3")
    tPosDF <- c(sum(tPosSum$`Trump.words-deb1`), sum(tPosSum$`Trump.words-deb2`), sum(tPosSum$`Trump.words-deb3`))
    tNegDF <- c(sum(tNegSum$`Trump.words-deb1`), sum(tNegSum$`Trump.words-deb2`), sum(tNegSum$`Trump.words-deb3`))
    cPosDF <- c(sum(cPosSum$`Clinton.words-deb1`), sum(cPosSum$`Clinton.words-deb2`), sum(cPosSum$`Clinton.words-deb3`))
    cNegDF <- c(sum(cNegSum$`Clinton.words-deb1`), sum(cNegSum$`Clinton.words-deb2`), sum(cNegSum$`Clinton.words-deb3`))
    posNegSum = data.frame(debateNum, tPosDF, tNegDF, cPosDF, cNegDF)
    posNegSum$`Trump Negative` <- posNegSum$tNegDF/(posNegSum$tPosDF + posNegSum$tNegDF)
    posNegSum$`Trump Positive`  <-  posNegSum$tPosDF/(posNegSum$tPosDF + posNegSum$tNegDF)
    posNegSum$`Clinton Negative`  <- posNegSum$cNegDF/(posNegSum$cPosDF + posNegSum$cNegDF)
    posNegSum$`Clinton Positive`  <- posNegSum$cPosDF/(posNegSum$cPosDF + posNegSum$cNegDF)

    posNegSumPerc <- posNegSum[c(1,10:13)]
    posNegSumPercMelt <- melting(posNegSumPerc, "debateNum", c(1:5))

    posNegLineChart <- ggplot(data=posNegSumPercMelt, aes(x=debateNum, y=value, 
                                                      group=variable, shape=variable, color=variable )) +
      geom_line(aes(linetype=variable, color=variable)) +
      geom_point() + 
      scale_color_manual(values=c("#ff4c4c", "red", "blue", "#4c4cff" ))

