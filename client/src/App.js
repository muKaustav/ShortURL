import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import './App.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={ <Home /> } />
        <Route path="*" element={ <Navigate replace to="/" /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
