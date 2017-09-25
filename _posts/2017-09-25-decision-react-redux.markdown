---
layout: post
title:  "React and then Redux and then..."
date:   2017-09-25 00:00:00
categories: react, redux, javascript, coding
---

# Overview

I created two apps, both that essentially do the same things: one uses only React, and the other uses React, Redux, and React-Redux. The purpose of the apps are to facilitate decision-making for users. It allows users to enter pros and cons to a decision, along with weights for each item. If the pros outweigh the cons, the app will suggest that the user should make the decision in the affirmative, and that they should not if the cons outweight the pros.

For example:
Should I eat ice cream?
Pros:
* tastes good, weight: 8
* Get out of the house, weight: 4

Cons:
* unhealthy, weight: 4
* will feel tired aftewards, weight: 3

Pros (12) - cons (7) = 5

You should eat ice cream!

## The [React Decision App](http://radiant-lake-94362.herokuapp.com/)

### Flow of the React App

- `Index.js` renders `App.js`
-   `App` renders `DecisionInput.js`
    - `DecisionInput` includes the forms for five pros and five con items
      - When the input changes, the state for those items is set
      - Renders `ShowPC.js` and passes `this.state` to it, which will allow it to have access to the state as props
      - `ShowPC.js`
        - Displays the pros and cons, which are accessible because they are passed down from the state from `DecisionInput`, as props to the `ShowPC` component
        - Calculates the weights of the Total Pros and the Total Cons, and subtracts Pros from Cons, to make a determination on the question submitted.

```
      const total_pro = parseFloat(this.props.items.proweight1) + parseFloat(this.props.items.proweight2) +
   					parseFloat(this.props.items.proweight3) + parseFloat(this.props.items.proweight4) +
   					 parseFloat(this.props.items.proweight5)
  const total_con = parseFloat(this.props.items.conweight1) + parseFloat(this.props.items.conweight2) +
  					parseFloat(this.props.items.conweight3) + parseFloat(this.props.items.conweight4) +
parseFloat(this.props.items.conweight5)

```
and

```
 {total_pro - total_con === 0 ? "TBD" : total_pro - total_con > 0 ? "You should do it" : "You should not do it"}

 ```

## React and Redux App

### Flow of the React and Redux App

 - `Index.js` uses the React Redux component, [Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store), to make the [store](http://redux.js.org/docs/basics/Store.html) available to all container components.
 - Renders the `App.js` page
  - `App` (within the components directory)
    - Renders the forms to add pro items (`AddProItem.js`), add con items, (`AddConItem.js`), and shows the items added (`ItemList.js`).
    - `AddProItem` and `AddConItem` (within the src/containers directory) are connected components, so they have access to the store, which combines the actions and reducers to hold the application state. Both of these components call mapDispatchToProps, to merge the actions into the component props.
      - When the pro and con forms are submitted (separately), they call their respective actions -- `addProItem()`, `addConItem()` -- with the text and weight arguments from the form.
      - These actions (within the actions directory), use the arguments to set the action properties (type, id, text, weight, category), which are passed to the reducers, which set the state, depending on the action type.

      actions/index.js

      ```
      let nextItemId = 0

      export const addProItem = (text, weight) => {
     	return {
     		type: 'ADD_PRO_ITEM',
     		id: nextItemId++,
     		text,
     		weight,
     		category: 'pro'
     	}
     }

      export const addConItem = (text, weight) => {
     	return {
     		type: 'ADD_CON_ITEM',
     		id: nextItemId++,
     		text,
     		weight,
     		category: 'con'
     	}
     }

     ```

     reducers/items.js

     ```

     const items = (state = [], action) => {

	      switch(action.type) {
		        case 'ADD_PRO_ITEM':
			         return [
				           ...state,
			                {
                				id: action.id,
                				text: action.text,
                				category: action.category,
                				weight: action.weight
                			}
                		]

                		case 'ADD_CON_ITEM':
                			return [
                				...state,
                			{
                				id: action.id,
                				text: action.text,
                				category: action.category,
                				weight: action.weight
                			}

                		]

                		default:
                			return state
                	}
                }

                export default items

      ```

The Redux `combineReducers()`` utility, called in the `reducers/index.js` file combines state into a single object. This app has one reducer that manages all of the state, but if the app grew and other reducers managed other parts of the state, they could be combined within this function.

```
const decisionApp = combineReducers({
	items
})

```

#### Display and Decide

The `ItemList` component is responsible for rendering the items entered, tallying weights and making a suggestion based on the information entered.

It is also a connected component, and uses mapStateToProps to get the state of the items, created from the actions, reducers, and store.

The items props are mapped to the `Item.js` component, which displays each item's text and weight.

The `makeSum()`` function is called after rendering the items submitted: it adds up the pros and cons, and subtracts the pros from the con weight totals.

The `makeSomething()`` function is then called, using `makeSum()` as an argument, and depending on that total, either advises that the user make or not make the decison (positive = "go for it"; negative = "don't go for it!").


## Next Steps

My app went from React to React and Redux, and my next step is to include React-Redux with Redux Thunk middleware to make calls to a backend API that I'll create with Ruby.





Passing props and setting state


Redux and actions

Next steps
  - Create API and use Redux Thunk for Async Actions



## React and Redux Flow

* The containers either call an action after a user submits a form, or after the page loads (within `componentsDidMount`).
* The actions fetch a resource (those are APIs in my case), and then dispatch to reducers. We can do asynchronous fetches with Redux Thunk middleware.
* The reducers set the state of the data.
* The reducers are combined in a `rootReducer` with `combineReducers`, in an reducers/index.js file, and the state is consolidated.  For example,

``` Javascript

const rootReducer =  combineReducers({
  books: booksReducer,
  booksFound: gbooksReducer
});

```

* The store calls the rootReducer to set the state. For example:

``` Javascript
export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

```

* The store is passed to other containers with the `<Provider store={store}>`, in the main index.js file, to whatever is included within the Provider.

``` Javascript
<Provider store={store}>
      <Router history={browserHistory} routes={Routes} />
  </Provider>,

```

* The Router allows CRUD routing, and also allows included containers to access the store. The store enables the components to access the state and actions through `mapStateToProps` and `mapDispatchToProps`. For example, when I add

``` Javascript

<Route path="/books/new" component={ConnectedBooksInput} />

```

to the `Routes.js`, and include within the `AddBooks` container the following,

``` Javascript

function mapDispatchToProps(dispatch){
  return {actions: bindActionCreators(actions, dispatch)}
}

function mapStateToProps(state){
  return { books: state.books}
}

export const ConnectedBooksInput = connect(mapStateToProps, mapDispatchToProps)(AddBook)

```

I can call `this.props.actions.addBook(book)` after a submit button is clicked, and that will call the action

```

export function addBook(book) {
  console.log('addbook')
  return function(dispatch) {
    dispatch({type: 'POST_BOOK'})
    return fetch('https://dry-peak-34989.herokuapp.com/api/v1/books', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ book: book})
    })
      .then(res => res.json())
      .then(responseJson => {
          browserHistory.push('/books')
      })
  }
}

```

### Container to Action to Reducer to Store

When the `/books` route is loaded, `componentsDidMount` calls the `fetchBooks()` action, which dispatches to the RECEIVED_BOOKS_DATA reducer, which sets the state of books. The state is stored in the `store`, called in the main index.js, which passes it down when needed, to the other components.

#### Actions

``` Javascript


const receivedBooksData = booksData => {
  console.log(booksData)
  return {
    type: 'RECEIVED_BOOKS_DATA',
    booksData
  }
}

export function fetchBooks() {

  return function(dispatch){
    //dispatch({type: 'FETCH_BOOKS'})
    return fetch('https://dry-peak-34989.herokuapp.com/api/v1/books')
      .then(console.log(response => response.json()))
      .then(res =>  res.json())
      .then(booksData => {
        console.log(booksData)
        dispatch(receivedBooksData(booksData))
        dispatch(stopFetchingData())
    })

  }
}


```

#### Reducers

```

export default function booksReducer(state = {}, action) {
  console.log('state', state)
  switch(action.type) {
    case 'RECEIVED_BOOKS_DATA':
    console.log('BOOKS action', action.booksData)
      return action.booksData;

    default:
      return state;
  }
}


```
