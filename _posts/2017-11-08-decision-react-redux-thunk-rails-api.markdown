---
layout: post
title:  "React, Redux, Thunk middleware, and Rails Backend API"
date:   2017-11-10 00:00:00
categories: react, redux, javascript, coding, redux thunk, asynchronous, rails, api
---

I built off my previous two Decision-making apps, discussed [here](https://nadinesk.github.io/react,/redux,/javascript,/coding/2017/09/25/decision-react-redux.html), that used React, and then React and Redux, to build the Decider, another decision-making app that includes a Rails backend API. The client-side code is [here](https://github.com/nadinesk/decision-helper-client); the backend code is [here](https://github.com/nadinesk/decision-helper-api) and you can use it [here](http://thawing-reaches-13962.herokuapp.com/). The Decider helps user make decisions by allowing them to log in, add a question they are trying to decided, and add pros and cons, with weights for each, for each question.

This app's front-end uses:
* [React](https://reactjs.org/) to render components;
* [Redux](http://redux.js.org/) and [react-redux](https://github.com/reactjs/react-redux) to manage the application's state;
* [Redux Thunk](https://github.com/gaearon/redux-thunk) to make asynchronous calls to the backend API; and
* [React Router](https://reacttraining.com/react-router/) for dynamic routing.

This app's backend is built with Rails and includes data persistence.

What I found to be really fun about building this app was the flow of the state through the actions and reducers.

For example, when a user adds a decision, the following flow occurs to update state:

### DecisionForm.js

* The Form:

```
<form onSubmit={this.handleOnSubmit.bind(this)}>
               <FormGroup>
               <FormControl
                 type="text"
                 name="title"
                 onChange={(event) => this.handleInputChange(event)}
                 placeholder="Enter a question"/>
               </FormGroup>
                 <Button type="submit" disabled={!this.state.formValid} >Submit </Button>
</form>
```

* The function to handle the form submission:

```
handleOnSubmit(event){
     event.preventDefault()
     let decision = Object.assign({}, this.state)
     this.props.addDecision(this.props.currentUser.id, decision)
     this.setState({
       title: '',
        formValid: false
     })
     event.target.reset()
}
```

* The included `mapDispatchToProps()` to returns the callback prop, `addDecision()`, which is called within `handleOnSubmit()`.

### actions/decisionActions.js

The `addDecision(user_id, decision)` function makes a post request to the backend, to post the decision to the current user. It receives the response as JSON, and sends that information to the store with the dispatch function.

```
export function addDecision(user_id, decision) {
  return function(dispatch) {
    dispatch({type: 'POST_DECISION'})
    return fetch(`https://stark-garden-80644.herokuapp.com/api/v1/users/${user_id}/decisions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ decision: decision})
    })
      .then(res => res.json())
      .then(responseJson => {
         dispatch({type: 'POST_SUCCESS', decision: responseJson.decision})

      })
  }
}
```
### reducers/decision_reducer.js

The state is updated in this case, with POST_SUCCESS:

```
export default function decisionReducer(state = [], action) {  
  switch(action.type) {
  	case 'RECEIVED_DECISIONS':    
      return action.decisions
    case 'POST_SUCCESS':         
     var newArray = {...state,decisions:[...state, action.decision]}
     return newArray.decisions    
    default:
      return state;
  }
}
```

This similar process is made in this app for deleting decisions, fetching decisions; and creating, reading, updating, and deleting items.
