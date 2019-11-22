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

## Step by Step

## Actions

- https://redux.js.org/basics/actions#actions

Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`.

Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed. Types should typically be defined as string constants. Once your app is large enough, you may want to move them into a separate module.

```js
const ADD_TODO = 'ADD_TODO'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

## Action Creators

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
