import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar className="nav-bar-class" />
      <Routes />
    </div>
  )
}

export default App
