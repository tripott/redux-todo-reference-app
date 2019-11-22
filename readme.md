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

- [7cab79a](https://github.com/tripott/redux-todo-reference-app/commit/7cab79ad0dbee3437422490639607406e4a280aa)

- https://redux.js.org/basics/reducers

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
