# React Routing with Redux Action

The browser has `history` and `location` ects storing the path information and routing history. 
**react-router** library integrate those built-in routing objects into the React Native **Components**. 
So we can access and operate these routing objects inside react Component lifecycle. 

When we use Redux to manage a centralized **store** outside the React Component lifecycle, we'd like to 
operate on routing inside the **Redux Action**, which can also be asynchronised. But we cannot access the react-router
object directly in React Action, which is outside the scope. 

What we can do to integrate with Redux Action is that 
1) we create the routing `history` object outside the React app. 
2) register the `history` object to Redux **store** and **middleware**. 
3) inject the `history` object into `react-router` which will integrate it with the actual browser `history`

There are some existing library that implement this:
1. [redux-react-router](https://github.com/lagunovsky/redux-react-router): compatible with `react-router` v6
2. [connected-react-router](https://www.npmjs.com/package/connected-react-router) does not support `react-router` v6. But we can 
use it for `react-route` v4 and v5)


## redux-react-router Example

https://github.com/lagunovsky/redux-react-router/tree/main/examples/basic

```js
// history.js
import { createBrowserHistory } from 'history'

export const browserHistory = createBrowserHistory()
```

```js
// store.js

import {createStore, combineReducers, applyMiddleware} from "redux";
import { createRouterReducer, createRouterMiddleware } from '@lagunovsky/redux-react-router'

import {browserHistory} from "./utils/history";

const store = createStore(combineReducers({
  router: createRouterReducer(browserHistory),
  // ... 
  // other reducers
}), {}, applyMiddleware(
  // ...
  // other middlewares
  createRouterMiddleware(browserHistory)
));

export default store;
```

```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {ReduxRouter} from "@lagunovsky/redux-react-router";

import store from "./store";
import {browserHistory} from "./utils/history";

ReactDOM.render(
  <Provider store={store}>
    <ReduxRouter
      history={browserHistory}
      store={store}
      children={<AppRoutes/>}
    />
  </Provider>,
  document.getElementById('root')
);
```

```js
// AppRoutes.js

import React from 'react'
import {Route, Routes} from "react-router-dom";

export function AppRoutes(props){
  return (
    <Routes>
      <Route path="/" exact element={...}/>
      // other routes
      // ...
    </Routes>
  )
}
```

```js
// action.js

export const acquireJwtCredentials = (username, password) => dispatch => {
  const url = api.blogWeb.jwt;

  return axios.post(url, {
    username: username,
    password: password
  }, {
    headers: {
      "Content-Type": "application/json"
    },
  }).then(promise => {
    dispatch({
      type: ACTIONS.JWT.UPDATE_TOKEN_CREDENTIALS,
      payload: promise.data,
    })
    dispatch(push("/"))
  }).catch(error => {
    console.log(error)
  })
}
```