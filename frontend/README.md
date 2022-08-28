# React Frontend

## Install

### Run on local machine

Please install `npm` and `nodejs` on your local machine. 

```sh
# under /frontend dir 
npm install

# Start react app
npm start
```

### Run on Docker

```
# Build docker image
docker build . -t blogweb-frontend

# Start docker container
docker run -dp 3000:3000 blogweb-frontend
```

### Access on Web Browser

open `http://localhost:3000`. 

## Redux

Redux is a global state management library for NodeJS app. React component is able to manage states within their lifecycle. But it is painful to manage **global states** by using Native React only. Redux can help create a global state store. And react components can **dispatch** pre-defined
actions to the store to update global states. 

Redux store config is in `/frontend/src/store.js` file. It mainly manages the logged in user state, including user details and JWT token. 

### Persist Redux store to LocalStorage

The Redux store is cleared when user refreshes the web page. So the redux store periodically persist all its state to the localStorage. And it load the states on page refresh. The persistence and loading logic is in `/frontend/src/utils/localStorage.jsx`. 

## Configs

React App configuration is in `/frontend/src/config.js`

```js
export const appConfig = {
  websiteName: "MarkItDown",
  blogListPageSize: parseInt(process.env.REACT_APP_BLOG_LIST_PAGE_SIZE) || 4,
  pageStaleTimeInMS: 30 * 60000,
  tokenKey: "MarkItDown_TOKEN",
  reduxKey: "MarkItDown_REDUX"
}
```
- blogListPageSize: control's the page size of blog list component. 
- pageStaleTimeInMS: clean up stale redux store states from LocalStorage. 
- tokenKey: LocalStorage Key to store JWT token. 
- reduxKey: LocalStorage Key to store redux store states. 

## Axios

The React App send HTTP requests to our backend for data access. We use `axios` library to send async HTTP requests. Requests can be found in `/frontend/src/actions/**`. 

