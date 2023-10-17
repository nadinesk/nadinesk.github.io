---
layout: post
title:  "R from the Beginning"
date:   2023-10-17 00:00:00
categories: R
---

From [R for Data Science](https://duckduckgo.com](https://r4ds.hadley.nz/data-visualize)

<b>How many rows are in penguins? How many columns?</b>

    > glimpse(penguins)
    Rows: 344
    Columns: 8

<b>What does the bill_depth_mm variable in the penguins data frame describe? Read the help for ?penguins to find out.</b>

    > bill_depth_mm
       a number denoting bill depth (millimeters)

<b>Make a scatterplot of bill_depth_mm vs. bill_length_mm. That is, make a scatterplot with bill_depth_mm on the y-axis and bill_length_mm on the x-axis. Describe the relationship between these two variables.</b>

    > ggplot(data=penguins, mapping=aes(x=bill_length_mm, y=bill_depth_mm)) + geom_point(mapping=aes(color=species, shape=species)) + geom_smooth(method="lm") + labs(title="Bill Depth and Bill Length", subtitle="Dimensions for Adelie, Chinstrap, and Gentoo", x="Bill Length (mm)", y="Bill Depth (mm)", color="Species", shape="Species") + scale_color_colorblind()

As bill length increases, bill depth decreases

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/d4e8be312782093d52552f0ecdbe4dc1ad284643/images/eg1q3.png"/>


<b>What happens if you make a scatterplot of species vs. bill_depth_mm? What might be a better choice of geom?</b>

<img src="https://raw.githubusercontent.com/nadinesk/nadinesk.github.io/master/images/eg1q4.png"/>

<b> Why does the following give an error and how would you fix it?</b>

    > ggplot(data = penguins) + 
    +     geom_point()
    Error in `geom_point()`:
    ! Problem while setting up geom.
    ℹ Error occurred in the 1st layer.
    Caused by error in `compute_geom_1()`:
    ! `geom_point()` requires the following missing aesthetics:
     x and y
    Run `rlang::last_trace()` to see where the error occurred.

 There is an error becaus no aesthetics are provided for x and y axes

<b>What does the na.rm argument do in geom_point()? What is the default value of the argument? Create a scatterplot where you successfully use this argument set to TRUE.</b>

na.rm if set to TRUE removes the missing values silently. na.rm is set to FALSE removes the missing values with a warning. The default value is FALSE, and shows the warning message

> ggplot(data=penguins, mapping=aes(x=species, y=bill_depth_mm)) + geom_point(mapping=aes(color=species, shape=species), na.rm=FALSE) + geom_smooth(method="lm") + labs(title="Bill Depth and Bill Length", subtitle="Dimensions for Adelie, Chinstrap, and Gentoo", x="Bill Length (mm)", y="Bill Depth (mm)", color="Species", shape="Species") + scale_color_colorblind() 
`geom_smooth()` using formula = 'y ~ x'
Warning messages:
1: Removed 2 rows containing non-finite values (`stat_smooth()`). 
2: Removed 2 rows containing missing values (`geom_point()`). 

<b>Add the following caption to the plot you made in the previous exercise: “Data come from the palmerpenguins package.” Hint: Take a look at the documentation for labs().</b>

	> ggplot(data=penguins, mapping=aes(x=bill_length_mm, y=bill_depth_mm)) + geom_point(mapping=aes(color=species, shape=species)) + geom_smooth(method="lm") + labs(caption="Data is from the palmerpenguins package",title="Bill Depth and Bill Length", subtitle="Dimensions for Adelie, Chinstrap, and Gentoo", x="Bill Length (mm)", y="Bill Depth (mm)", color="Species", shape="Species") + scale_color_colorblind()

<b>Recreate the following visualization. What aesthetic should bill_depth_mm be mapped to? And should it be mapped at the global level or at the geom level?</b>

    > ggplot(data=penguins, mapping=aes(x=flipper_length_mm, y=body_mass_g)) + geom_point(mapping=aes(color=bill_depth_mm)) + geom_smooth() + labs(caption="Data is from the palmerpenguins package") 
