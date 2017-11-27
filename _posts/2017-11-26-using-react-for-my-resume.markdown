---
layout: post
title:  "Using React and Javascript to Show My Resume"
date:   2017-11-26 00:00:00
categories: react, resume, javascript
---

# Overview

I got away from React and Javascript for a couple weeks while digging a little deeper into R and creating my [first R package](https://cran.r-project.org/web/packages/proPubBills/index.html). I eased back into it by creating my resume with React, inspired by [this example](https://github.com/freaksauce/React-Resume-ES6).

# Single Source of JSON

I created the data for my resume with JSON, using the structure from [JSON Resume](https://jsonresume.org/) as an example and tailoring it to my own needs. This JSON file was the single source of data that was loaded with index.js, which then fed the data as a prop to App.js, and App.js fed the pertinent pieces of the resume JSON to the other components through props. So clean! 


App.js

```
const App = props => {
    const profileData = props.jsonObj.basics; 
    const projectsData = props.jsonObj.projects; 
    const workData = props.jsonObj.work; 
    const educationData = props.jsonObj.education; 
    const skillsData = props.jsonObj.skills; 
    return (
      <div className="container"> 
        <div className="row"> 
          <Profile profileData={profileData} /> 
          <Projects projectsData={projectsData} /> 
          <Work workData={workData} /> 
          <Skills skillsData={skillsData} /> 
          <Education educationData={educationData} /> 
          
        </div>
      </div> 
    );
};

```






















