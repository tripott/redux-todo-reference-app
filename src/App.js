import React from 'react'
import { render } from 'react-dom'
import { Router, Link } from '@reach/router'
import Home from './Home.js'

const App = () => {
  return (
    <div>
      <Link to="/">
        <header>My App Title</header>
      </Link>
      <Router>
        <Home path="/" />
      </Router>
    </div>
  )
}

render(<App />, document.getElementById('root'))
