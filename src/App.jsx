import { useState } from 'react'
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Nav from './components/Nav.jsx'
import Tavern from './pages/Tavern'
import About from './pages/About'
import Resume from './pages/Resume'
import './App.css'



export default function App() {
  const location = useLocation()
  useEffect(() => {window.scrollTo(0,0)},[location.pathname])

  return (
    <div style={{ minHeight: '100vh',position:'relative'}}>
      {location.pathname !== '/' && <Nav />}
      <Routes>
        <Route path = "/" element={<Tavern />} />
        <Route path = "/about" element={<About />} />
        <Route path = "/Resume" element={<Resume />} />
      </Routes>
    </div>
  )
}
