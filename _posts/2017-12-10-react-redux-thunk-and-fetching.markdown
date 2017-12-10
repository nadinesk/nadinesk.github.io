---
layout: post
title:  "React, Redux, Thunk and Fetching"
date:   2017-12-10 00:00:00
categories: react, fetch, javascript, redux, api
---

# Testing Fetch

After the packages for Redux, React-Redux, isomorphic-fetch, and Redux Thunk have been installed, discussed [here](https://nadinesk.github.io/react,/setup,/javascript,/redux,/api/2017/12/03/setting-up-a-react-app-to-fetch-data.html), I create a test fetch within the App component. The test allows me to make sure that the basic request with API key are correct, before I move the call to an [action creator that will return an action](https://redux.js.org/docs/basics/Actions.html), that will then update the store. 

My test fetch looks something like this: 

```	
var apiURLbills = 'https://api.propublica.org/congress/v1/bills/search.json?query=megahertz';
var apiKey = process.env.REACT_APP_SECRET_CODE
console.log('apiKey', apiKey)    	
const test = fetch(apiURLbills, {
	headers: {
        	Accept: 'application/json',
        	'X-API-KEY': apiKey
	}
})
.then(res =>  res.json())
.then(billsFound => {
	return billsFound.results[0].bills                	
})
```

I console.log everything out, so I know the structure of the JSON response, and how to get the data that I need. This step requires a lot of debugging and examining the responses; when the fetch request is moved to a separate action creator, you will know how to get the data you need. 

# Action Creator 

After the test fetch is working, it's time to move the fetch to a new actions folder, and create a new function that calls the action creator. 

The action creator: 

```
const receivedBills = bills => {  
	return {
		type: 'RECEIVED_BILLS',
	    	bills
	}
}

```

The function: 

```
export function getBills(chamber, type,offset) {      
  return function(dispatch){                    
    return fetch(`https://api.propublica.org/congress/v1/115/${chamber}/bills/${type}.json?offset=${offset}`, {
	headers: {
        	Accept: 'application/json',
        	'X-API-KEY': apiKey
	}
    })     
    .then(res =>  res.json())
    .then(billsFound => {     	     	
     	dispatch(receivedBills(billsFound.results[0].bills))
     	console.log((receivedBills(billsFound.results[0].bills)))
     })   
  }
}
```

The getBills() function gets called in the [componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount) mounting lifecycle method. The data will get fetched and loaded once the component is mounted. 

For example: 

```
componentDidMount() {    	
    	this.props.fetchBills('house', 'introduced')	  
}

```

Before the store is set up, you can test that the fetch is working by logging out the responses in the function that will call the action creator (and leave out the call to the action creator). 

# The Store

The action creator, `receivedBills`, provides the source of information for the store, by sending [payloads](https://en.wikipedia.org/wiki/Payload_(computing)) of information. 

The next step is to add the [reducer](https://redux.js.org/docs/basics/Reducers.html), which tells the application how to update the state. 

```
export default function billReducer(state = [], action) {
  
  switch(action.type) {
  	case 'RECEIVED_BILLS':    
      return action.bills          
    default:       
      return state;
  }  
}
``` 

I added another index reducer with a [combineReducer](https://redux.js.org/docs/api/combineReducers.html) in anticipation of my app growing, to manage different parts of the state. From the documentation, 'The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.'

The main index.js file includes the [createStore](https://github.com/reactjs/redux/blob/master/docs/api/createStore.md) function, which has the whole state of the app. 

```
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
```

# Next Steps

I've since started creating new components and updating the app, and the code so far is [here](https://github.com/nadinesk/congress-bills) on Github. 


