# README

## About

This is the react/redux teaching "todos" reference app. Each commit point and associated notes below provide a step by step guide on how to build a todo app with react and redux.

This app was started from https://github.com/tripott/redux-todo-starter-kit.git. I cloned the starter kit, removed git db locally, git init-ed a fresh repo locally, and pushed this new project to https://github.com/tripott/redux-todo-reference-app.git.

## Getting Started

- Clone the repo.
- Install dependencies. There's a lot. This will take some time to install.
- Start parcel with the `npm run dev` script and browse to localhost:1234.

```bash
git clone https://github.com/tripott/redux-todo-reference-app.git
cd redux-todo-reference-app
npm i
npm run dev
```

## Why Redux?

Redux is used to manage the state of your data. Redux attempts to impose control on how and when updates occur within the data for your app.

Use redux to control when, why and how data changes:

- API server responses
- Cached data
- Locally created data that has not yet been persisted to the server
- UI State

- https://redux.js.org/basics/data-flow#data-flow
- https://redux.js.org/introduction/motivation
- https://redux.js.org/introduction/three-principles

## State

State is a single object. The state of your whole application is stored in an object tree:

```
{
  isAuthenticated: false,
  userProfile: {firstName: "Eric", lastName: "Foreman"}
  customers: [
    { id: 107, firstName: "Midge", lastName: "Pinciotti" },
    { id: 209, firstName: "Bob", lastName: "Pinciotti" }
  ],
  whatsNewFeatures: [
    {featureName: "dark mode", completed: true, displayOrder: 1},
    {featureName: "connect with friends", completed: false, displayOrder: 2},
    {featureName: "incognito mode", completed: false, displayOrder: 3}
  ]
}
```

- https://redux.js.org/glossary#state

## Data Lifecycle / Uni-directional Flow of Data

- https://redux.js.org/basics/data-flow

> "all data in an application follows the same lifecycle pattern, making the logic of your app more predictable and easier to understand. t also encourages data normalization, so that you don't end up with multiple, independent copies of the same data that are unaware of one another."

### Flow

1. You call `store.dispatch(action)`. An **action** is a plain object describing _what happened_. For example:

```js
{ type: 'USER_SIGNED_IN', payload: {firstName: "Eric", lastName: "Foreman"} }
```

or

```js
{
  type: 'USER_SIGNED_OUT'
}
```

or

```js
{
  type: FETCH_CUSTOMERS_SUCCESS, payload: [
    { id: 107, firstName: "Midge", lastName: "Pinciotti" },
    { id: 209, firstName: "Bob", lastName: "Pinciotti" }
  ]
}
```

> Think of an action as a headline in a newspaper article summarizing _what happened_.

## Step by Step

## Actions

- https://redux.js.org/basics/actions#actions
- https://redux.js.org/glossary#action

- An action is a plain JavaScript object.
- An action represents an intention to change the state.
- Actions are the only way to get data into the store.
- Any data, whether from UI events, network callbacks, or other sources such as WebSockets needs to eventually be _dispatched_ as actions.
- Actions must have a `type` field that indicates the type of action being performed. Types can be defined as constants and imported from another module.
- Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`.

> Actions only describe _what happened, but don't describe how_ the application's state changes.

```js
const ADD_TODO = 'ADD_TODO'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

## Action Creators

- [02f25ab](https://github.com/tripott/redux-todo-reference-app/commit/02f25abb4be337470ded602e576e87be6052c564)

- https://redux.js.org/basics/actions#action-creators

Action creators are exactly that—functions that create actions. It's easy to conflate the terms “action” and “action creator”, so do your best to use the proper term.

```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

To dispatch an action to the redux store, pass the result of the call to the action creator function to the `dispatch()` function:

```js
dispatch(addTodo(text))
```

The `dispatch()` function can be accessed directly from the store as `store.dispatch()`, but more likely you'll access it using a helper like react-redux's `connect()`.

## Reducers and State

- [daf0b41](https://github.com/tripott/redux-todo-reference-app/commit/daf0b41235f617514e19f784c717e0af4cc5ed7d)

- https://redux.js.org/basics/reducers
- https://redux.js.org/glossary#reducer

- A reducer reduces a collection of values down to a single value.
- In Redux, the accumulated value is the `state` object, and the values being accumulated are _actions_.
- Reducers calculate a new state given the previous state and an action.
- Reducers must be pure functions.
- Reducers must be free of side effects. i.e.: Do not put API calls within a reducer.
- Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe _what happened_, but don't describe how the application's state changes.

- All the application state is stored as a _single object_.

- Define the shape of the state object before writing any code.

- You'll often find that you need to store some data, as well as some UI state, in the state tree. This is fine, but try to keep the data separate from the UI state.

- After you define the state object, you can handle actions and change the state object through a _reducer_.

## Handling Actions/Reducers

- https://redux.js.org/basics/reducers#handling-actions

- A reducer is a pure function that takes the previous state and a action as its parameters and returns the next state.

It's very important that the reducer function stays pure with no side effects .DO NOT MUTATE THE ORIGINAL STATE, MAKE A COPY OF THE STATE AND CHANGE THE COPY! DO NOT PERFORM SIDE EFFECTS SUCH AS MAKING API CALLS OR ROUTING.

DO NOT CALL NON-PURE FUNCTIONS such as DATE.now() or MATH.random(). Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.

## Spltting Reducers

- https://redux.js.org/basics/reducers#splitting-reducers

- We can rewrite the main reducer as a function that calls the reducers managing parts of the state, and combines them into a single object.

- Note that each of these reducers is managing its own part of the global state. The state parameter is different for every reducer, and corresponds to the part of the state it manages.

- This is already looking good! When the app is larger, we can split the reducers into separate files and keep them completely independent and managing different data domains.

- Redux provides a utility called `combineReducers()`

- All `combineReducers()` does is generate a function that calls your reducers with the slices of state selected according to their keys, and combines their results into a single object again.

```js
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```

Note that this is equivalent to:

```js
export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```

## Store

- https://redux.js.org/basics/store

The state of your whole application is stored in an object tree within a single store.

The "store" is the object that brings together the actions (what happened) and the reducers (that update state based upon what happened).
