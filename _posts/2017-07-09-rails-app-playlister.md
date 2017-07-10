---
layout: post
title:  "Rails App - Playlister"
date:   2017-07-09 00:00:00
categories: ruby, rails, app
---

# Overview
The [Playlister app](https://github.com/nadinesk/playlister) I created allows users to add TV shows to playlists, and determines if the user has enough time and spare stress, to add tv shows to a playlist. 

# Interacting with the App

## Users and TV shows
Users sign up with their own accounts, either with a new username, email, and password, or through their Facebook account. 

Users enter their own happiness level and free time (hours). 

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

TV shows can be added for each mood (mood/3/tvshows/new)

Moods can be created along with their associated TV shows (moods/new)

## Playlists

A user can view all of their playlists (users/1/playlists). 

## Stats 

Stats for the app are available at (/admin/stats).
The stats show the number of users, the number of tv shows, the happiest user, and the least expensive TV shows. 

