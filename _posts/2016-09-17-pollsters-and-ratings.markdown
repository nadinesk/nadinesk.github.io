---
layout: post
title:  "Pollster Ratings and Results"
date:   2016-09-17 00:00:00
categories: r, data, trump, clinton, election, convention speeches, politics, polls, pollsters
---


I was looking at [Real Clear Politics’ Clinton vs. Trump polls](http://www.realclearpolitics.com/epolls/2016/president/us/general_election_trump_vs_clinton-5491.html) this morning because of the news that Trump is tightening the race, after I had just become comfortable with Hillary’s lead in the polls like, last week? The RCP average today shows Clinton ahead by 0.9 points. But I realized I don’t know anything about all the polls on this site used to derive the average. 

I’ve been listening to [FiveThirtyEight’s podcast](http://fivethirtyeight.com/tag/fivethirtyeight-podcasts/), and they have mentioned that they have [rated the pollsters](http://projects.fivethirtyeight.com/pollster-ratings/). So I decided to see what grades 538 gave the polls used on RCP. The table below shows the frequency of grades for each poll result RCP used to arrive at their average spread (the same pollster’s results could have been returned multiple times in the time period of the results used - May 2015 to September 2016). As of today, the RCP spread uses 185 poll results. A large proportion of the poll returns cited were by pollsters with an A- rating (80 times or 43%); and the next most frequent rating cited was an A (22 or 55%). The lowest rated poll used is a C-, and it is used 9 times. 

NA   ->   10 <br/>
A    ->   22 <br/>
A-   ->   80 <br/>
A+   ->   11 <br/>
B    ->   15 <br/>
B-   ->   5 <br/>
B+   ->   18 <br/>
C-   ->   9 <br/>
C+   ->   15 <br/>

A total of 29 distinct pollsters are used, and here is the breakdown of the number of grades give to each of the 29 polls. . 

A    ->   3 <br/>
A-   ->   10 <br/>
A+   ->   2 <br/>
B    ->   2 <br/>
B-   ->   2 <br/>
B+   ->   3 <br/>
C-   ->   1 <br/>
C+   ->   1 <br/>
N/A  ->   5 <br/>

I then wanted to see how different the results between the pollsters with As (A, A+, A-) were from those with C’s (C, C+). The following graph shows this difference. The bad news here is that more recently, the A-rated polls show Trump ahead, and the C-rated ones show Clinton ahead. One A+-rated poll from 9/7-9/10 (ABC News/Wash Post) does show Clinton ahead by 8 points...but that was two weeks ago. So again...not good.

apluscminus.png
*A's and C's Results*

![A's and C's Results](http://khasachi.com/images/apluscminus.png)

The following two graphs disaggregate the A+ polls and the C+ polls, respectively (the highest and lowest rated polls), and shows all results for any poll result for pollsters in these respective ratings. 
 
*A Plus Results*
![A+ Results](http://khasachi.com/images/aplus.png)

*C Minus Results*
![C- Results](http://khasachi.com/images/cminus.png)



The following graph shows the monthly average spread for Clinton, with results categorized by pollster rating. 

![Monthly Average Spread by Pollster 538 Rating](http://khasachi.com/images/Picture1.png)

A note on getting the results: 
I used R to create all graphs except for the last bar chart, which was created with Excel. Below is my R code for some of the results. 
<pre><code>
library("ggplot2")
library("reshape2")
book2 <- read.csv("D:/stuff.csv")

cminus <- book2[ which(book2$X538.grade=='C-'), ]
str(cminus)

cminus_1 <- data.frame(cminus$poll.last.date, cminus$Clinton..D., cminus$Trump..R.)
str(cminus_1)

cminus_1_melt <- melt(cminus_1, id="cminus.poll.last.date") 
str(cminus_1_melt)
cminus_1_melt

ggplot(data=cminus_1_melt, aes(x=cminus.poll.last.date, y=value, group=variable, color=variable)) +
  geom_line(size=1.5) + 
  scale_color_manual(values=c("#9999CC", "#CC6666")) +
  theme(panel.background = element_rect(fill = "#d3d3d3"))

###########################

ggplot(data=book2, aes(x=poll.last.date, y=Spread, group=X538.grade, color=X538.grade)) +
  geom_line(size=1.5) + 
  theme(panel.background = element_rect(fill = "#d3d3d3")) + 
  theme(axis.text.x = element_text(angle = 45, hjust = 1)) + 
  scale_x_discrete(breaks=c("2016-09-18", "2016-08-01", "2016-07-01", "2016-06-01", "2016-05-01", "2016-04-01", "2016-03-01", "2016-02-01", "2016-01-01", "2015-12-01", "2015-11-01", "2015-10-01", "2015-09-01", "2015-08-01","2015-07-01", "2015-06-01","2015-05-01"))

</pre></code>