import React from 'react'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import LoginPage from './pages/LoginPage'

const App = () => {
  const { login } = useSelector((state) => state.auth)
  const { token } = login

  return token ? <Dashboard /> : <LoginPage />
}

export default App