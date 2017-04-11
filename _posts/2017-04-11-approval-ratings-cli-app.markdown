---
layout: post
title:  "Ruby Gem: Presidential Approval Ratings"
date:   2017-04-11 00:00:00
categories: ruby, gems, programming, coding, presidential approval ratings
---

## Project

I created a Ruby gem, [Approval Ratings CLI](https://rubygems.org/gems/approval-ratings-cli-app), that lists 20 recent polls that have measured Donald Trump's approval ratings. The ratings are obtained from [FiveThirtyEight's](https://projects.fivethirtyeight.com/trump-approval-ratings/) compilation of presidential approval polls. The user of the Approval Ratings CLI app can get more information about each poll listed, including the date of the poll, FiveThirtyEight's [pollster grade](https://projects.fivethirtyeight.com/pollster-ratings/), and the poll's approval and disapproval ratings. 

## Process

### Project Structure 
```
├── approval-ratings-cli-app/
│   ├── bin
│   │   ├── approval-ratings
│   │   ├── console
│   │   ├── setup
│   ├── lib
│   │   ├── approval-ratings
│   │   │   ├── cli.rb
│   │   │   ├── rating.rb
│   │   │   ├── version.rb
│   │   ├── approval-ratings.rb
│   ├── .rspec
│   ├── approval-ratings-cli-app.gemspec
│   ├── CODE_OF_CONDUCT.md
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── LICENSE.txt
│   ├── Rakefile
│   ├── README.md
│   ├── spec.md
```

### Scraping the Site with ApprovalRatings::Rating.rb

The ApprovalRatings::Ratings class scrapes [FiveThirtyEight's](https://projects.fivethirtyeight.com/trump-approval-ratings/) approval polls site, and uses the [Nokogiri](https://rubygems.org/gems/nokogiri/versions/1.6.8) gem. I inspected the elements on the site to find the elements, tags, and attributes that would be included in the app. 

The ApprovalRatings module requires the `open-uri` and `nokogiri` gems, and collects the constants and methods defined in the Rating, Version, and CLI classes. The Ratings class's, `scrape_approval_ratings` is the workhorse that scrapes the site. First, it iterates through the children of `tbody tr.hidden[data-subgroup='Adults`. The function creates new instances of each poll and adds the following attributes to each object, with information scraped from the site: pollster name, poll date, 538-assigned pollster grade, approval rating, disapproval rating. All newly instantiated objects are added to an array and the return value is that array. 

```
def self.scrape_approval_ratings
      doc = Nokogiri::HTML(open('https://projects.fivethirtyeight.com/trump-approval-ratings/'))
      pollsters = []
      doc.css("tbody tr.hidden[data-subgroup='Adults']").each do |pollster|
        pollster_name = pollster.css("td.pollster a").text
        pollster_date = pollster.css("td.dates").text
        pollster_summary = pollster.css("div.gradeText").text
        pollster_approval = pollster.at_css("td.answer.first").text
        pollster_disapproval = pollster.at_css("td.answer.last").text
        # puts "pollster #{pollster}"
        new_pollster = new(pollster_name, pollster_date, pollster_summary, pollster_approval, pollster_disapproval)
        pollsters << new_pollster unless pollsters.include?(new_pollster.name) || pollsters.size > 19

      end
      pollsters

    end
   ```
   


* `self.find` and `self.find_by_name` methods - interact with inputs from the CLI Class to find and return objects, either by index number or pollster name. 

* `self.all` method - returns an array of all the objects in the class (i.e., all the pollsters). 

### Command Line Interface - ApprovalRatings::CLI.rb

The user can interact with the gem through the ApprovalRating module's CLI class. The user can run the app with the `approval-ratings`,  command. This calls the CLI Class. 

#### CLI.rb methods
The method `call` runs the `start` method. The `start` method first calls the `list` method. The `list` method calls the Rating's `all` method, and iterates through the list of the 20 pollsters in the `all` array, and prints them as a numbered list. The list includes the pollster's name, and the date the poll was taken (`poll.date`). 

```
  def list
    puts ""
    puts "************* President Trump Approval Ratings *************"
    puts ""
    ApprovalRatings::Rating.all.each.with_index(1) do |rating, i|
      puts "#{i}. #{rating.name} on #{rating.date}" 
    end
    puts ""
  end
```

#### User Input

* "list": the list is printed again. 
* "exit": the app exits. 
* 1-20: If the user types in a number corresponding to a pollster, they will be provided with additional information: date, pollster's [FiveThirtyEight-grade](https://projects.fivethirtyeight.com/pollster-ratings/) grade, approval and disapproval ratings.

  * The `Ratings.find` method is called if the user types a number on the list. This method returns the element of the `Ratings.all` that corresponds to the index-1 of the array.   

  * If the index of the object exists, the CLI method, `print_rating_i` method is called, and the date, grade, approval and disapproval ratings of the pollster are printed. 

* Name of pollster: If the user types a pollster's name, they will be provided with all polls by that pollster. For example, if Gallup has three polls within the list of 20, the details of each poll will be provided. 

  * The `Ratings.find_by_name` method iterates through the `Ratings.all` method, and returns an array with all objects that match the `name` attribute of the user input provided. 

  * If the index of the object exists, the CLI method, `print_rating` method is called, and the date, grade, approval and disapproval ratings of all instances of the pollster's name are printed. 

## Building and Publshing the Approval Ratings CLI App Gem

I published the [approval-ratings-cli-app gem](https://rubygems.org/gems/approval-ratings-cli-app) by following along with this [guide](http://guides.rubygems.org/make-your-own-gem/) to build the gem, and create a gemspec file; and this [guide](http://guides.rubygems.org/publishing/) to publish the gem. 

   
