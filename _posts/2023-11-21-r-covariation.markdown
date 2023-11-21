---
layout: post
title:  "R for Data Science Covariation"
date:   2023-11-21 00:00:00
categories: R
---

From [R for Data Science](https://r4ds.hadley.nz)

[Unusual Values](https://r4ds.hadley.nz/eda#exercises-2)

Covariation Exercises


#### 1-Use what you’ve learned to improve the visualization of the departure times of cancelled vs. non-cancelled flights.

The visualization is improved by changing the y values to show the density, because it remove the effect of the larger number of non-cancelled flights, and both can be compared. It is clearer to show the density on one graph instead of a facet, because the frequencies are overlayed and can be compared directly on the same plot. This shows that there are fewer canceled flights in the mornign hours, and more canceled flights compared to non-canceled flights after 3 pm, especially just betweena round 5-8 pm, and around 9 pm. 

```
ggplot(flights2, aes(x = sched_dep_time, y = after_stat(density))) +
  geom_freqpoly(aes(color = canceled), binwidth = 1/4, linewidth = 0.75)  
  
ggsave("r-10-5-1-q1.png")
```

<img src="https://github.com/nadinesk/nadinesk.github.io/blob/master/images/r-10-5-1-q1.png?raw=true"/>

#### 2-Based on EDA, what variable in the diamonds dataset appears to be most important for predicting the price of a diamond? How is that variable correlated with cut? Why does the combination of those two relationships lead to lower quality diamonds being more expensive?

It looks like size (x,y variables) is the most important variable for predicting the price of a diamond. The larger sizes are associated with lower quality diamonds. Fair diamonds have the largest median size, followed by premium, then good. The ideal and very good cuts have the lowest median sizes. 

```
ggplot(diamonds2, aes(x = y, y = price)) + 
  geom_smooth()
  
ggsave("r-10-5-1-q2-1.png")
  
ggplot(diamonds, aes(x = fct_reorder(cut,x, median), y = x)) + 
  geom_boxplot()    

ggsave("r-10-5-1-q2-2.png")
  
```

<img src="https://github.com/nadinesk/nadinesk.github.io/blob/master/images/r-10-5-1-q2-1.png?raw=true"/>

<img src="https://github.com/nadinesk/nadinesk.github.io/blob/master/images/r-10-5-1-q2-2.png?raw=true"/>


#### 3-Instead of exchanging the x and y variables, add coord_flip() as a new layer to the vertical boxplot to create a horizontal one. How does this compare to exchanging the variables?

The plots are the same when adding coord_flip() as a new layer instead of exchanging the variables. 

```
ggplot(mpg, aes(x = class, y = hwy)) +
  geom_boxplot() + 
  coord_flip()

ggplot(mpg, aes(x = hwy, y = class)) +
  geom_boxplot() 
```

#### 4-One problem with boxplots is that they were developed in an era of much smaller datasets and tend to display a prohibitively large number of “outlying values”. One approach to remedy this problem is the letter value plot. Install the lvplot package, and try using geom_lv() to display the distribution of price vs. cut. What do you learn? How do you interpret the plots?

```
ggplot(diamonds, aes(x = cut, y = price)) + 
  geom_boxplot()    
  
ggsave("r-10-5-1-q4_1.png")

ggplot(diamonds, aes(x = cut, y = price)) + 
  geom_lv()    

ggsave("r-10-5-1-q4_2.png")
```

<img src="https://github.com/nadinesk/nadinesk.github.io/blob/master/images/r-10-5-1-q4_1.png?raw=true"/>
<img src="https://github.com/nadinesk/nadinesk.github.io/blob/master/images/r-10-5-1-q4_2.png?raw=true"/>

The geom_lv() plots shows the same quartiles as the boxplot, but adds more with the shapes above the quartiles used in the geom_boxplot(). 

#### 5-Create a visualization of diamond prices vs. a categorical variable from the diamonds dataset using geom_violin(), then a faceted geom_histogram(), then a colored geom_freqpoly(), and then a colored geom_density(). Compare and contrast the four plots. What are the pros and cons of each method of visualizing the distribution of a numerical variable based on the levels of a categorical variable?

The geom_violin() plots clearly shows that the Fair and Good diamonds have more that are within the higher prices, adn taht the Ideal diamonds have more in the lower price range. The histogram is harder to decipher because of the range of the prices on the x axis, and it is not as obvious that the Fair diamonds have more within the higher price ranges. It mostly shows that the Ideal and Very good diamonds have a lot of diamonds in the lower price range. The geom_freqpoly() plot by itself isn't very valuable and needs to be combined with after_stat(density). This, and geom_freqpoly() make it easier to compare the different cuts across the price ranges as they categories are overlayed and can be easily compared. It shows how the Fair diamonds have more diamonds in the higher price ranges than the other cuts of diamonds also

```
ggplot(diamonds, aes(x = price, y = cut)) + 
  geom_violin()  

ggsave("r-10-5-1-q5_1.png")

ggplot(diamonds, aes(x = price, y = after_stat(density))) + 
  geom_histogram()  + 
  facet_grid(~cut)

ggsave("r-10-5-1-q5_2.png")
  
ggplot(diamonds, aes(x = price, y = after_stat(density))) + 
  geom_freqpoly(aes(color = cut))
  
ggsave("r-10-5-1-q5_3.png")
  
ggplot(diamonds, aes(x = price)) + 
  geom_density(aes(color = cut))  
  
ggsave("r-10-5-1-q5_4.png")

```

<img src="https://github.com/nadinesk/nadinesk.github.io/blob/master/images/r-10-5-1-q5_1.png?raw=true"/>
<img src="https://github.com/nadinesk/nadinesk.github.io/blob/master/images/r-10-5-1-q5_2.png?raw=true"/>
<img src="https://github.com/nadinesk/nadinesk.github.io/blob/master/images/r-10-5-1-q5_3.png?raw=true"/>
<img src="https://github.com/nadinesk/nadinesk.github.io/blob/master/images/r-10-5-1-q5_4.png?raw=true"/>

#### 6-If you have a small dataset, it’s sometimes useful to use geom_jitter() to avoid overplotting to more easily see the relationship between a continuous and categorical variable. The ggbeeswarm package provides a number of methods similar to geom_jitter(). List them and briefly describe what each one does.

From the [documentation](https://github.com/eclarke/ggbeeswarm)

Beeswarm plots (aka column scatter plots or violin scatter plots) are a way of plotting points that would ordinarily overlap so that they fall next to each other instead. In addition to reducing overplotting, it helps visualize the density of the data at each point (similar to a violin plot), while still showing each data point individually.

ggbeeswarm provides two different methods to create beeswarm-style plots using ggplot2. It does this by adding two new ggplot geom objects:

geom_quasirandom: Uses a van der Corput sequence or Tukey texturing (Tukey and Tukey “Strips displaying empirical distributions: I. textured dot strips”) to space the dots to avoid overplotting. This uses sherrillmix/vipor.

geom_beeswarm: Uses the beeswarm library to do point-size based offset.


