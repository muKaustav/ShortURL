import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Input from "./components/Input/Input"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Input /> } />
        <Route path='*' component={ () => 'ERROR 404 NOT FOUND' } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
