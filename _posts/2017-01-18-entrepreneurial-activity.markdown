---
layout: post
title:  "Entrepreneurial Activity by Various Characteristics"
date:   2017-01-18 00:00:00
categories: r, data, entrepreneur, plots, graphs, kauffman index
---

Entrepreneurial activity has been the highest among immigrants, men, those with less education, and in the West and in the Construction Industry, from 1996-2014. I used the [Kauffman Index of Entrepreneurial Activity](https://www.quandl.com/data/KAUFFMAN-The-Kauffman-Foundation) among these several characteristics to look at overall enterpreneurial activity and changes over time. The plots below show these changes over time, from 1996 to 2014. 

**Age

Entrepreneurial activity has increased for each age grouping from 20 to 64 years, other than the group from 20-34 years. 
![Entrepreneurial Activity by Age, 1996-2014](http://khasachi.com/images/age.png)
     
     library(ggplot2)
     library(dplyr)
     library(reshape2)
     
     age <- read.csv("KAUFFMAN-KAUFF_AGE.csv")
     age01 <- melt(age, id=c("Date"))
     age01$type <- grepl("Index..", age01$variable, ignore.case = TRUE)
     age02 <- subset(age01, type == TRUE)
     age02 <- data.frame(age02)
     age02$Date <- as.Date(as.character(age02$Date))
     age02$variable <- as.character(age02$variable)

     age02 <- age02 %>% 
          mutate(variable= replace(variable, variable == "Total.Index..", "Total")) %>%
          mutate(variable= replace(variable, variable == "X20.34.Index..", "20-34yrs")) %>%
          mutate(variable= replace(variable, variable == "X35.44.Index..", "35-44yrs")) %>%
          mutate(variable= replace(variable, variable == "X45.54.Index..", "45-54yrs")) %>%
          mutate(variable= replace(variable, variable == "X55.64.Index..", "55-64yrs"))

     g.age <- ggplot(age02, aes(Date, value))
     p.age <- g.age + geom_point(size=2, aes(color=variable)) + facet_grid(. ~variable) + 
          geom_smooth(aes(Date, value), method = "lm", color="brown") + ylab("Index") + 
          theme(legend.position = "none") + labs(title = "Age") 
     p.age
     
     
**Education

Entrepreneurial activity has increased for all education levels, other than those with some college. Those with less than a high school education have the largest entrepreneurial activity. Surprisingly to me, entrepeneurial activity is inversely correlated with educational level attained. 
![Entrepreneurial Activity by Education, 1996-2014](http://khasachi.com/images/edu.png)


     library(ggplot2)
     library(dplyr)
     library(reshape2)
     
     edu <- read.csv("KAUFFMAN-KAUFF_EDU.csv")
     edu01 <- melt(edu, id=c("Date"))
     edu01$type <- grepl("Index..", edu01$variable, ignore.case = TRUE)
     edu02 <- subset(edu01, type == TRUE)
     edu02 <- data.frame(edu02)
     edu02$Date <- as.Date(as.character(edu02$Date))
     edu02$variable <- as.character(edu02$variable)

     edu02 <- edu02 %>% 
          mutate(variable= replace(variable, variable == "Total.Index..", "Total")) %>%
          mutate(variable= replace(variable, variable == "Less.Than.High.School.Index..", "< High School")) %>%
          mutate(variable= replace(variable, variable == "High.School.Graduate.Index..", "High School Grad")) %>%
          mutate(variable= replace(variable, variable == "Some.College.Index..", "Some College")) %>%
          mutate(variable= replace(variable, variable == "College.Graduate.Index..", "College Graduate"))

     g.edu <- ggplot(edu02, aes(Date, value))
     p.edu <- g.edu + geom_point(size=2, aes(color=variable)) + facet_grid(. ~variable) + 
          geom_smooth(aes(Date, value), method = "lm", color="brown") + ylab("Index") + 
          theme(legend.position = "none") + labs(title = "Education") 
     p.edu

**Gender

Enterpreneurial activity for females has decreased from 1996-2014, and has increased for males during this time period. 

![Entrepreneurial Activity by Gender, 1996-2014](http://khasachi.com/images/gender.png)

     library(ggplot2)
     library(dplyr)
     library(reshape2)

     gend <- read.csv("KAUFFMAN-KAUFF_SEX.csv")
     gend01 <- melt(gend, id=c("Date"))
     gend01$type <- grepl("Index..", gend01$variable, ignore.case = TRUE)
     gend02 <- subset(gend01, type == TRUE)
     gend02 <- data.frame(gend02)
     gend02$Date <- as.Date(as.character(gend02$Date))
     gend02$variable <- as.character(gend02$variable)
     
     gend02 <- gend02 %>% 
          mutate(variable= replace(variable, variable == "Female.Index..", "Female")) %>%
          mutate(variable= replace(variable, variable == "Male.Index..", "Male")) %>%
          mutate(variable= replace(variable, variable == "Total.Index..", "Total"))

     n.gend <- ggplot(gend02, aes(Date, value))
     p.gend <- n.gend + geom_point(size=2, aes(color=variable)) + facet_grid(. ~variable) + 
          geom_smooth(aes(Date, value), method = "lm", color="brown") + ylab("Index") + 
          theme(legend.position = "none") + labs(title = "Gender") 
     p.gend

**Industry

Construction has show the largest increase in entrepreneurial activity, and also the largest entrepreneurial activity from 1996-2014. The second highest activity is the Services industry, followed by other industries, trade, and then manufacturing. Trade is the only industry that has shown a decrease in entrepreneurial activity. 

![Entrepreneurial Activity by Industry, 1996-2014](http://khasachi.com/images/ind.png)

     library(ggplot2)
     library(dplyr)
     library(reshape2)
     
     ind <- read.csv("KAUFFMAN-KAUFF_IND.csv")
     ind01 <- melt(ind, id=c("Year"))
     ind01$type <- grepl("Index..", ind01$variable, ignore.case = TRUE)
     ind02 <- subset(ind01, type == TRUE)
     ind02 <- data.frame(ind02)
     ind02$Year <- as.Date(as.character(ind02$Year))
     ind02$variable <- as.character(ind02$variable)

     ind02 <- ind02 %>% 
          mutate(variable= replace(variable, variable == "Construction.Index..", "Construction")) %>%
          mutate(variable= replace(variable, variable == "Manufacturing.Index..", "Manufacturing")) %>%
          mutate(variable= replace(variable, variable == "Other.Index..", "Other")) %>%
          mutate(variable= replace(variable, variable == "Services.Index..", "Services")) %>%
          mutate(variable= replace(variable, variable == "Trade.Index..", "Trade"))

     g.ind <- ggplot(ind02, aes(Year, value))
     p.ind <- g.ind + geom_point(size=2, aes(color=variable)) + facet_grid(. ~variable) + 
          geom_smooth(aes(Year, value), method = "lm", color="brown") + ylab("Index") + 
          theme(legend.position = "none") + labs(title = "Industry") 
     p.ind

**Immigrant or Native Enterpreneurs

Immigrants have more enterpreurial activity than native-born entrepreneurs, and they have increased much more from 1996 to 2014, while native-born enterpreneurs have shown a decrease in enterpreneurial activity during this time period. 

![Entrepreneurial Activity, Native or Immigrant, 1996-2014](http://khasachi.com/images/native.png)

     library(ggplot2)
     library(dplyr)
     library(reshape2)
     
     native <- read.csv("KAUFFMAN-KAUFF_NATIVE.csv")
     native01 <- melt(native, id=c("Date"))
     native01$type <- grepl("Index..", native01$variable, ignore.case = TRUE)
     native02 <- subset(native01, type == TRUE)
     native02 <- data.frame(native02)   
     native02$Date <- as.Date(as.character(native02$Date))
     native02$variable <- as.character(native02$variable)

     native02 <- native02 %>% 
          mutate(variable= replace(variable, variable == "Immigrant.Index..", "Immigrant")) %>%
          mutate(variable= replace(variable, variable == "Native.Born.Index..", "Native Born")) %>%
          mutate(variable= replace(variable, variable == "Total.Index..", "Total")) 

     n.ind <- ggplot(native02, aes(Date, value))
     p.ind <- n.ind + geom_point(size=2, aes(color=variable)) + facet_grid(. ~variable) + 
          geom_smooth(aes(Date, value), method = "lm", color="brown") + ylab("Index") + 
          theme(legend.position = "none") + labs(title = "Immigrant vs Native") 
     p.ind

**Region

All regions except the Midwest have show increases in enterpreneurial activity. The West has had the most activity for each year from 1996 to 2014, followed by the South and then the Northeast. 

![Entrepreneurial Activity by Region, 1996-2014](http://khasachi.com/images/region.png)

     library(ggplot2)
     library(dplyr)
     library(reshape2)
     
     region01 <- melt(region, id=c("Year"))
     region01$type <- grepl("Index..", region01$variable, ignore.case = TRUE)
     region02 <- subset(region01, type == TRUE)
     region02 <- data.frame(region02)
     region02$Year <- as.Date(as.character(region02$Year))
     region02$variable <- as.character(region02$variable)
     region02 <- region02 %>% 
          mutate(variable= replace(variable, variable == "Midwest.Index..", "Midwest")) %>%
          mutate(variable= replace(variable, variable == "Northeast.Index..", "Northeast")) %>%
          mutate(variable= replace(variable, variable == "South.Index..", "South")) %>%
          mutate(variable= replace(variable, variable == "Total.Index..", "Total")) %>%
          mutate(variable= replace(variable, variable == "West.Index..", "West"))

     n.region <- ggplot(region02, aes(Year, value))
     p.region <- n.region + geom_point(size=2, aes(color=variable)) + facet_grid(. ~variable) + 
          geom_smooth(aes(Year, value), method = "lm", color="brown") + ylab("Index") + 
          theme(legend.position = "none") + labs(title = "Region") 
     p.region
     
