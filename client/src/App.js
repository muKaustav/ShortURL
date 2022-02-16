import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Input from "./components/Input/Input"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={ <Input /> } />
        <Route path="*" element={ <Navigate replace to="/" /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
