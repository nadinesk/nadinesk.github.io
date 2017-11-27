---
layout: post
title:  "Using React and Javascript to Show My Resume"
date:   2017-11-26 00:00:00
categories: react, resume, javascript
---

# Overview

I got away from React and Javascript for a couple weeks while creating my [first R package](https://cran.r-project.org/web/packages/proPubBills/index.html). I eased back into it by creating my resume with React, inspired by [this example](https://github.com/freaksauce/React-Resume-ES6).

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

# Sections

The code in the App.js files shows the sections and how the data is passed to them from the JSON. For example, the profile data, which includes the name, gets passed to the Profile.js component. The relevant JSON for this section is: 

```
{
  "basics": {
    "name": "Nadine Fischoff",    
    "email": "nadine.khattak@gmail.com",
    "website": "https://nadinesk.github.io/",
    ...
```

The Profile componenet uses the data passed to it from App.js to render the information (relevant pieces of code below).

```
const Profile = props => {
  const profileObj = props.profileData; 
  return (
    <div> 
      <h1> {profileObj.name} </h1>      
      <span><a href={`mailto:${profileObj.email}`}>{profileObj.email} </a>
      <div>
        {profileObj.summary} 
      </div>      
    </div> 
    )
};


```

The work and projects sections were a little more complicated, and I used two additional components to keep the code cleaner. I had to use some if/else logic to render the correct information, and to not include commas for the last elements in a list. 

For example, the Project component is passed all of the project JSON from App.js. This Project component then maps through each project and passes each one to a ProjectItem component, and then this ProjectItem Component is rendered with Project.js: 

Project.js

```
  const projectsExp = props.projectsData.map((project) => (
      <div><ProjectItem projectItemData={project} /></div>
      ))

```

Here is an some relevant information within ProjectItem.js

ProjectItem.js

```

const projectObj = props.projectItemData;
let projectGit; 
const projectGithub_map = (projectObj.github.length > 1) ? (
      projectGit = projectObj.github.map((gitlink, key) => (           
              (key === 0) ? 
              <span><a href={gitlink}>Frontend</a>, </span> 
              : 
              <span><a href={gitlink}>Backend</a> </span>         
        ))      
    ) : 
  (
     projectGit= projectObj.github.map((gitlink, key) => (                             
              <span><a href={gitlink}>Github </a></span>  
    ))
    )
    ...
return (
        <div>
          <h4>{props.projectItemData.title}</h4>
          <div>Code: {projectGithub_map} &nbsp;</div>     
  ...
  )

```

### Next Steps

This was a nice and simple project that clear shows the passage of data from one component to another in a linear way. Now that I have all of the information structured in the way I want (and React makes this so easy to rearrange even if I didn't), I will work on laying out the page and doing some styling to it. 








