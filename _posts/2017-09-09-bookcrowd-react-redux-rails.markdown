---
layout: post
title:  "BookCrowd - with React, Redux, Rails"
date:   2017-07-31 00:00:00
categories: react, redux, ruby, rails, app, coding
---

I created a web app, [The Book Crowd](https://glacial-atoll-99448.herokuapp.com/), using React and Redux for the front-end, and Rails for the backend, [here](https://dry-peak-34989.herokuapp.com/api/v1/books). The repo for the client is here[https://github.com/nadinesk/book-client]; the repo for the backend is [here](https://github.com/nadinesk/book-api). This app crowdsources book ideas by allowing users to add books to a list, and to search for books with Google Books API results. 

## Process

When I began this project, I had intended to use JWT auth, and had intended to do...a completely different web app. I got JWT auth working [here](https://github.com/nadinesk/good_decision_client) and [here](https://github.com/nadinesk/good_decision), but it took so much out of me and was confusing enough at the time that I just had to scrap it and start over. 

I had to start from scratch with something simpler and try to build up, rather than something complex and build upon that. The result was that I feel like I have a pretty strong handle, or at least have significantly learned a lot, about React and Redux, enough to use it to create my own app. When I go over it in my head to simplify the flow so I can program what needs to happen, it goes something like the following. 

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

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

* The store is passed to other containers with the `<Provider store={store}>`, in the main index.js file, to whatever is included within the Provider.

<Provider store={store}>       
      <Router history={browserHistory} routes={Routes} />           
  </Provider>,

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

It was a good idea for me to really understand everything I was coding. I feel that now, I have rehearsed this flow enough that I can move onto my next app, feeling confident I can add more functionality and complexity. But first, pizza. 



