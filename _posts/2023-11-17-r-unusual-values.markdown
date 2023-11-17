---
layout: post
title:  "R for Data Science - Variation"
date:   2023-11-17 00:00:00
categories: R
---

From [R for Data Science](https://r4ds.hadley.nz)

[Variation](https://r4ds.hadley.nz/layers#the-layered-grammar-of-graphics)

#### 1-Explore the distribution of each of the x, y, and z variables in diamonds. What do you learn? Think about a diamond and how you might decide which dimension is the length, width, and depth.

The z variable is the depth because it is smaller than the x and y values; and the x and y values are have almost the same values, and a diamond would most likely have nearly equal sides. 
```
#depth  
ggplot(diamonds, aes(x = z)) +
  geom_histogram(binwidth = 0.5) +
  coord_cartesian(xlim = c(0, 10))

ggsave("r-10-3-3-q1_1.png")

#width/height
ggplot(diamonds, aes(x = x)) +
  geom_histogram(binwidth = 0.5) +
  coord_cartesian(xlim = c(0, 10))

ggsave("r-10-3-3-q1_2.png")

#width/height
ggplot(diamonds, aes(x = y)) +
  geom_histogram(binwidth = 0.5) +
  coord_cartesian(xlim = c(0, 10))

ggsave("r-10-3-3-q1_3.png")

```

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/r-10-3-3-q1_1.png"/>

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/r-10-3-3-q1_2.png"/>

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/r-10-3-3-q1_1.png"/>

#### 2-Explore the distribution of price. Do you discover anything unusual or surprising? (Hint: Carefully think about the binwidth and make sure you try a wide range of values.)

The larges number of the diamonds in the dataset are priced just below $1,000, and the number of diamonds decreases as the prices get higher for the most part, with a slight increasebetween 4,000 to 4,500. 

When the binwidth is too large, it groups all of the diamonds below 1000 together, so that it obscures the variation in the number of diamonds within the $500 to $1,000 range. When the binwidth is too small and the whole x-axis is shown without limiting the higher, outer range of the values where there are not as many observations, it is difficult to decipher which price has the more diamonds. The smaller binwidth shows that the largest number of diamonds are around $700, and then decreases as the price reaches $1,000. 

This plot has the default binwidth, at 30, and does not show that the number of diamonds decrease suddenly at $1,000 and does not show the variation just before $1,000 also 

```
ggplot(diamonds, aes(x = price )) +
  geom_histogram(color="red") 

ggsave("r-10-3-3-q2_2.png")
```  

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/r-10-3-3-q2_2.png"/>

A better binwidth size. Not too small, not too big either 
```
ggplot(diamonds, aes(x = price )) +
  geom_histogram(binwidth =100,color="red") +
  coord_cartesian(xlim = c(0,5000))

ggsave("r-10-3-3-q2_1.png")

```

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/r-10-3-3-q2_1.png"/>

#### 3-How many diamonds are 0.99 carat? How many are 1 carat? What do you think is the cause of the difference?

```
diamonds |>
  filter(carat == 1 | carat == 0.99) |>
  count(carat)

# A tibble: 2 × 2
  carat     n
  <dbl> <int>
1  0.99    23
2  1     1558
```

There are 1,558 diamonds that are 1 carat, and 0.99 that are 23. Rounding up is probably the cause of the difference. 

#### 4-Compare and contrast coord_cartesian() vs. xlim() or ylim() when zooming in on a histogram. What happens if you leave binwidth unset? What happens if you try and zoom so only half a bar shows?

coord_cartesian needs xlim or ylim to zoom. If binwidth is unset, it defaults to 30. If you try to zoom so only half a bar shows, it will only show half the bar on the graph then

