{% highlight r %}

mt_5 <- mt_2 %>%
  arrange(desc(`2016`)) %>%
  slice(1:10) %>%
  data.frame
  
 {% end highlight}
