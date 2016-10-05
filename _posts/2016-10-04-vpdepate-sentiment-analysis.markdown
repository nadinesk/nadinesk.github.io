---
layout: post
title:  "Kaine and Pence VP Debate Sentiment Analysis"
date:   2016-10-04 00:00:00
categories: r, data, graphs, politics, debates, clinton, trump, general election, kaine, pence
---

**Overview**: 

Sentiment Analysis of the VP Debate on 10/4/2016: 

![Trump 9 2016 debate ](http://khasachi.com/images/vp_barchart.png)

Kaine total words: 4,105
Pence total words: 4,178
(Pence said 73 more words.)

The top four sentiments the candidate's expressed most are positive, trust, negative, and fear, out of the ten. Their frequency rankings for these were in the same order for both VP candidates. Their third lowest sentiments expressed (surprise, joy, disgust -- in that order) were also the same, and in the same order. They only differed in the ranking of sentiments expressed for their fifth through seventh highest sentiments. Kaine's were anticipation, sadness, and anger, in that order (most to least used); and Pence's were anger, anticipation, and sadness, in that oder (most to least used).

*Getting the Data*: 

I obtained transcripts of the debates from the Washington Post [VP Debate](https://www.washingtonpost.com/news/the-fix/wp/2016/10/04/the-mike-pence-vs-tim-kaine-vice-presidential-debate-transcript-annotated/).

*Getting the Sentiment Analysis Results*: 

I used R to perform the analysis. Specifically, I used the code provided in [this](http://varianceexplained.org/r/trump-tweets/) post by David Robinson to perform the sentiment analysis. I then used R to create functions to automate total word counts; perform the sentiment analysis (again using the code in Varience Explained post by Robinson to do all the heavy lifting); reshape data to reshape it for the bar chart; and to create the bar chart. 

*Sentiment Analysis Rankings by VP Candidate*: 

![Kaine Sentiment](http://khasachi.com/images/kaine_sentiment.png)

![Pence Sentiment](http://khasachi.com/images/pence_sentiment.png)

**Process**

* Get transcripts (link above)
* Code all lines by person 
* Save as csv with two columns: one text and one person. These files be used for sentiment function also 
* Includes all words, and doesn’t exclude words excluded in sentiment analysis

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
    kaine_tw <- totalWords("vpdeb.csv", 'KAINE')
    pence_tw <- totalWords("vpdeb.csv", 'PENCE')


SENTIMENT ANALYSIS

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
      
      ## Run ##
      kaine_sentiment <- sentmt("vpdeb.csv",'KAINE')

      pence_sentiment <- sentmt("vpdeb.csv",'PENCE')


    ##MERGE FUNCTION

    mergestuff <- function(xMerge, yMerge) {
      primMerge <- merge(x=xMerge, y=yMerge, by = "sentiment", all.x = TRUE)
      sorted <- primMerge[order(-primMerge[,2]),]
      sorted
    }
    
    vpMg <- mergestuff(kaine_sentiment, pence_sentiment)

BAR CHARTS

    ##Melt Function
    melting <- function(file,ons, id) {
      newdata <- file[id]
      mdata <- melt(newdata, id=c(ons))  
    }

     melt_vp <- melting(vpMg,"sentiment",c(1,3,5))
     
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

      make_bar(melt_vp,c("Kaine", "Pence"))

