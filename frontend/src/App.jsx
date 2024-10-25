import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Matches from './pages/Matches';
import Connections from './pages/Connections';
import Pending from './PendingConn';
import Login from './pages/Login';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/matches' element={<Matches />} />
          <Route path='/connections' element={<Connections />} />
          <Route path='/pendingconnections' element={<Pending />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
