---
layout: post
title:  "Setting up a React App with Data Fetching"
date:   2017-12-03 00:00:00
categories: react, setup, javascript, redux, api
---

It can take me a while to just get set up with building a new app, so I'm outlining some of the steps that will likely routinely have to be made when developing a new React and Redux app that fetches data from an API that requires a secret key. 


# Create React App

[Create React App](https://github.com/facebookincubator/create-react-app) makes it really easy to start on a React app, with no-build configuration. 

From their documentation: 

```

npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start

```

# API Key

The next step I stake is to set up a .env and .gitignore file to hide your API. This documentation gives a good overview of how to do this step: 

https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables

Create your .env file with your API key: 

```
REACT_APP_SECRET_CODE=your_api_key

```

Create your .gitignore file to ignore the .env file in the Github repository you create: 

Here is the relevant portion: 

```
# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.env

```

Within your index.js file, include

```

require('dotenv').config()

```

You can access your API Key with this code: 

```

{process.env.REACT_APP_SECRET_CODE}

```

# Fetch and Redux

Now that this is set up, I move on to including [isomorphic fetch](npm install --save isomorphic-fetch es6-promise), [Redux](https://redux.js.org/) and [React-Redux](https://github.com/reactjs/react-redux), and [Redux-Thunk](https://github.com/gaearon/redux-thunk): 

```
npm install --save isomorphic-fetch es6-promise
npm install --save redux
npm install --save react-redux
npm install --save-dev redux-devtools
npm install --save redux-thunk

```

# Next Steps

That is the general set-up for creating a React app wthat makes external API calls with a secrete API key. I plan on including further steps that include how to use the installed tools. 
