---
layout: post
title:  "R for Data Science 2.5.5 Exercises"
date:   2023-10-24 00:00:00
categories: R
---

From [R for Data Science](https://r4ds.hadley.nz/data-visualize)

Exercises [2.5.5](https://r4ds.hadley.nz/data-visualize)

<b>1-The mpg data frame that is bundled with the ggplot2 package contains 234 observations collected by the US Environmental Protection Agency on 38 car models. Which variables in mpg are categorical? Which variables are numerical? (Hint: Type ?mpg to read the documentation for the dataset.) How can you see this information when you run mpg?</b>

```
> glimpse(mpg)
Rows: 234
Columns: 11
$ manufacturer <chr> "audi", "audi", "audi", "audi", "audi", "aud…
$ model        <chr> "a4", "a4", "a4", "a4", "a4", "a4", "a4", "a…
$ displ        <dbl> 1.8, 1.8, 2.0, 2.0, 2.8, 2.8, 3.1, 1.8, 1.8,…
$ year         <int> 1999, 1999, 2008, 2008, 1999, 1999, 2008, 19…
$ cyl          <int> 4, 4, 4, 4, 6, 6, 6, 4, 4, 4, 4, 6, 6, 6, 6,…
$ trans        <chr> "auto(l5)", "manual(m5)", "manual(m6)", "aut…
$ drv          <chr> "f", "f", "f", "f", "f", "f", "f", "4", "4",…
$ cty          <int> 18, 21, 20, 21, 16, 18, 18, 18, 16, 20, 19, …
$ hwy          <int> 29, 29, 31, 30, 26, 26, 27, 26, 25, 28, 27, …
$ fl           <chr> "p", "p", "p", "p", "p", "p", "p", "p", "p",…
$ class        <chr> "compact", "compact", "compact", "compact", …

```

Categorical variables are mostly non-int variables, excluding year; numerical variables are mostly doubles or floats.

Categorical: manufacturer, model, year, drv, fl, class

Numerical: displ, cyl, cty, hwy

<b>2-Make a scatterplot of hwy vs. displ using the mpg data frame. Next, map a third, numerical variable to color, then size, then both color and size, then shape. How do these aesthetics behave differently for categorical vs. numerical variables?</b>

The aesthetics for numerical variables are shown as scales, and separated when both are shown. The aesthetics for categorical variables are determined based on specific values, and different aesthetics, like size and shape, can be combined into one legend for them. 

```
> ggplot(mpg, aes(x=hwy, y=displ)) + geom_point()

```

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/Screen%20Shot%202023-10-24%20at%206.18.45%20AM.png" />

```
> ggplot(mpg, aes(x=hwy, y=displ, color=displ)) + geom_point()
```

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/Screen%20Shot%202023-10-24%20at%206.20.34%20AM.png" />

```
> ggplot(mpg, aes(x=hwy, y=displ, size=displ)) + geom_point()
```

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/Screen%20Shot%202023-10-24%20at%206.32.00%20AM.png" />

```
> ggplot(mpg, aes(x=hwy, y=displ, size=displ, color=displ)) + geom_point()
```

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/Screen%20Shot%202023-10-24%20at%206.22.00%20AM.png" />

```
> ggplot(mpg, aes(x=hwy, y=displ, shape=displ)) + geom_point()
Error in `geom_point()`:
! Problem while computing aesthetics.
ℹ Error occurred in the 1st layer.
Caused by error in `scale_f()`:
! A continuous variable cannot be mapped to the shape aesthetic
ℹ choose a different aesthetic or use `scale_shape_binned()`
Run `rlang::last_trace()` to see where the error occurred.

> ggplot(mpg, aes(x=hwy, y=displ, shape=class)) + geom_point()
```

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/Screen%20Shot%202023-10-24%20at%206.24.02%20AM.png" />

```
> ggplot(mpg, aes(x=hwy, y=displ, color=class, size=class)) + geom_point()
```

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/Screen%20Shot%202023-10-24%20at%206.24.55%20AM.png" />

<b>3-In the scatterplot of hwy vs. displ, what happens if you map a third variable to linewidth?</b>

Nothing is affected

<b>4-What happens if you map the same variable to multiple aesthetics?</b>

If it's a numerical value, they get mapped to the aesethtics separately on the legend and combined on the plot itself then. If it's a categorical value, they get combined

<b>5-Make a scatterplot of bill_depth_mm vs. bill_length_mm and color the points by species. What does adding coloring by species reveal about the relationship between these two variables? What about faceting by species?</b>

Coloring the points shows that there is a stronger relationship between these variables for Gentoo penguins, then Chinstrap, then Adelie penguins. 

Faceting the species shows the same but more clearly

```
> ggplot(penguins, aes(x=bill_depth_mm, y=bill_length_mm, color=species)) + geom_point()
```

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/Screen%20Shot%202023-10-24%20at%206.40.06%20AM.png" />

```
> ggplot(penguins, aes(x=bill_depth_mm, y=bill_length_mm)) + geom_point() + facet_wrap(~species)
```

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/Screen%20Shot%202023-10-24%20at%206.45.41%20AM.png" />

<b>6-Why does the following yield two separate legends? How would you fix it to combine the two legends?</b>

```
ggplot(
  data = penguins,
  mapping = aes(
    x = bill_length_mm, y = bill_depth_mm, 
    color = species, shape = species
  )
) +
  geom_point() +
  labs(color = "Species")
```

It shows two separate legends because of the labs(color="Species") code. The legends are combined if that code is not included


<b>7-Create the two following stacked bar plots. Which question can you answer with the first one? Which question can you answer with the second one?</b>

```
ggplot(penguins, aes(x = island, fill = species)) +
  geom_bar(position = "fill")
ggplot(penguins, aes(x = species, fill = island)) +
  geom_bar(position = "fill")
```

The first plot shows what percentage of each island contains each penguin species.
<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/Screen%20Shot%202023-10-24%20at%206.49.16%20AM.png" />

The second plot shows what percentage of penguins are on each island. 

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/Screen%20Shot%202023-10-24%20at%206.50.15%20AM.png" />


















