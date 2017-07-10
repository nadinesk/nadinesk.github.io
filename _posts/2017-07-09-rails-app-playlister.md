---
layout: post
title:  "Rails App - Playlister"
date:   2017-07-09 00:00:00
categories: ruby, rails, app
---

# Overview
The [Playlister app](https://github.com/nadinesk/playlister) Ruby on Rails app I created allows users to add TV shows to playlists, and determines if the user has enough time and spare stress, to add tv shows to a playlist. 

Users can create new TV shows within a specific mood, and they can create new moods and an associated TV show at the same time. 

# Interacting with the App

## Users and TV shows
Users sign up with their own accounts, either with a new username, email, and password, or through their Facebook account. 

Users enter their own happiness level and free time (hours). The default value is 11, for each user attribute. 

TV Shows have their own price, suspense-level, and length (hours). 

Users add tv shows to a current playlist, but the addition is not permitted if:
     - The length of the TV show is more than the user's free time. 
     - The TV show's suspense level is higher than the user's happiness level. 

Every time a user adds a TV show successfully to their current playlist, their happiness level and free time decreases by the amounts of the suspense-level and length of the tv show, respectively. 

After a user submits their current playlist, they will then create a new playlist. 

A user can see their profile and all of their created playlists when they click on the "Your Profile" link. 

A user can see all of their playlists on the "All of Your Playlists" link. 

## TV shows and Moods

TV shows can be categorized into moods. 

TV shows can be added for each mood (e.g., mood/3/tvshows/new)

Moods can be created along with their associated TV shows (e.g., moods/new)

## Playlists

A user can view all of their playlists (e.g., users/1/playlists). 

## Stats 

Stats for the app are available at (/admin/stats).
The stats show the number of users, the number of tv shows, the happiest user, and the least expensive TV shows. 

# Process

I used Ruby on Rails for this app, and the Devise gem and Facebook Omniauth gem for user sign in, login/logout, and sign up. 

## Models

This app has six models.

The User model's Active Record associations are: 
*  has_many :playlists
*  belongs_to :current_playlist, :class_name => "Playlist"

The MoodShow model is a join table for the Mood and TV show classes. This model's Active Record associations are: 
* belongs_to :tvshow
* belongs_to :mood

The Playlist model's Active Record associations are:
* has_many :showlines
* has_many :tvshows, through: :showlines
* belongs_to :user

The ShowLine model is the join table for TV shows and playlist. This model's Active Record associations are: 
* belongs_to :tvshow
* belongs_to :playlist

The TVshow model's Active Record associations are: 
* has_many :mood_shows
* has_many :moods, through: :mood_shows
* has_many :showlines

The Mood model's Active Record associations are: 
* has_many :mood_shows
* has_many :tvshows, through: :mood_shows

To summarize: 
* Users have many playlists, and belongs to a current playlist. 
* Playlists have many TV shows through Showlines, which joins playlists and TV shows together: Playlists can have many TV shows, and TV shows can be in many playlists. 
* TV shows have many mood, through MoodShows, which joins TV shows and Moods together: TV shows can be within many moods, and moods can have many TV shows. 

## Tables

The User database table is created with Derive, with additional fields that I added: 
- name
- happiness (default 11)
- free time (default 11) 

Playlists and Moods have a Title

TV shows have a title, a suspsense-level field, and a time-commitment field. 

## Nested Routes

### Create New Moods and an associated TV shows

The `/moods/new` route allows a user to fill in a form to create a new mood, and a TV show associated with that new mood. A link to this form is in the header of the app. Validations are created on this form, for the presence of a Mood title, and the presence of all TV show attributes. If an error is made, a message is provided at the top of the page, along with a red box around the field(s) with the errors made. 

### View a User's Playlist

The `users/:id/playlists/:id` (substituting numbers for the :id param) route allows a user to view a particular playlist for a particular user. The link for this route is located within the users/:id/playlists route, which has a link to a user's playlist from the playlist title. 

### Create a New TV show for a Particular Mood
The `moods/3/tvshows/new` route allows a user to create a new TV show for the mood with an ID of 3, using this example. The link to this form is within the mood_path(3) route, which has a link to add a new TV show. 


# Class level ActiveRecord Scope Method
A class level ActiveRecord scope method is within the Stats_Controller.rb file, and at the `stats/admin` link in the header section of the app. It shows the app's number of users, the number of TV shows, and the least expensive TV show. 

<% highlight ruby %> 
namespace :admin do
    resources :stats, only: [:index]
  end
 <% endhighlight %> 
 








