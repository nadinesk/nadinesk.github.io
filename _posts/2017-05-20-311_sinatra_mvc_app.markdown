---
layout: post
title: "MVC Sinatra CRUD App"
date: 2017-05-19 00:00:00
categories: sinatra, ruby, mvc, crud, programming
---

# Project
I create a [MVC Sinatra CRUD App](https://github.com/nadinesk/preschool_list), where logged-in users with an account can create a list of preschools, and view all preschools added by other users. Preschools can only be edited and deleted by the signed-in user. 

## Actions
* A user can add a preschool and information about each preschool: name, address, cost, and a summary. 
* A user can edit or delete a preschool after it has been added. 

View 
* A user can view all preschools added by other users. 
* A user can view just the preschools they have added.
* A user can view just one preschool they have added. 

## Security
The app includes secure passwords, using the `bcrypt` gem. 

# Process 

## Project structure

```
├── preschool_list
│   ├── .bundle
│   │   ├── config
│   ├── app
│   │   ├── controllers
│   │   │   ├── applicaiton_controller.rb
│   │   │   ├── preschools_controller.rb
│   │   │   ├── users_controller.rb
│   │   ├── models
│   │   │   ├── preschool.rb
│   │   │   ├── user.rb
│   │   ├── views
│   │   │   ├── preschools
│   │   │   │   ├──create.erb
│   │   │   │   ├──edit.erb
│   │   │   │   ├──preschools.erb
│   │   │   │   ├──show.erb
│   │   │   │   ├──user_preschools.erb
│   │   │   ├── users
│   │   │   │   ├──login.erb
│   │   │   │   ├──signup.erb
│   │   ├── index.erb
│   │   ├── layout.erb
│   ├── config
│   │   ├── environment.rb
│   ├── db
│   │   ├── migrate
│   │   │   ├──users_table.rb
│   │   │   ├──preschools_table.rb
│   ├── config.ru
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── Rakefile
│   ├── README.md
│   ├── spec.md
```

## Create Tables

I created two tables using `rake db:create_migration NAME=` for users and preschools, and ran these migrations with `rake db:migrate`. I had to add another migration to add the user_column to the preschool table.

## Models

I created two models, Preschool and User. The User has_many Preschools, and Preschools belong_to a user. I added those Active Record methods to the Preschool (`belongs_to :user`) and User (`has_many :preschools`) models, along with the `has_secure_password` Active Record method, to the User model. 

## Controllers

This app contains three controllers: application_controller.rb, preschools_controller.rb, and users_controller.rb. The users and preschools application controllers inherit from application_controller.rb. 

### Application_Controller.rb

This file contains the routes to get the home page, and helper methods to check if a user is logged in, and to get the current user. 

### User_Controller.rb

This file contains the routes to sign up, login, logout, and view the signed-in user's preschool list. 

Get requests load the forms to sign up and login, and post requests process the sign-up and login parameters. 

### Preschool_Controller.rb

This file contains the actions to view all preschools, create a new prechool, edit a preschool, view one preschool, and delete a preschool. 

Get requests load the page to view all preschools and view one single preschool; the edit form to edit one preschool; and the create form, to add a new preschool to the list. 

A post request processes the forms, using parameters from the form, for creating a new preschool. A patch request processes the form to edit an existing preschool from the list; and a delete request deletes a preschool from the user's list. 

### View

* User views
  * login.erb -> Login page
  * signup.erb -> Signup page
* Preschool views
  * create.erb -> create a new preschool
  * edit.erb -> edit a preschool
  * preschools.erb -> view all preschools
  * show.erb -> show one preschool
  * user_preschoools.erb -> show all preschools for just the user 

  

