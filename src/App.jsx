import React from 'react'
import {BrowserRouter as Router, Switch, Route, HashRouter} from "react-router-dom";
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
import 'materialize-css'

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <HashRouter basename={process.env.PUBLIC_URL}>
        { isAuthenticated && <Navbar /> }
        <div className="container">
          {routes}
        </div>
        </HashRouter>
    </AuthContext.Provider>
  )
}

export default App