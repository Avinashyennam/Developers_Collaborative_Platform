import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Connections from './pages/Connections';
import PendingConnections from './pages/PendingConn';
import UpdateProfile from './pages/UpdateProfile';
import Login from './pages/Login';
import Profile from './pages/Profile';
import BlogsPage from "./pages/Blogs";
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
          <Route path='/pendingconnections' element={<PendingConnections />} />
          <Route path='/login' element={<Login />} />
          <Route path='/updateprofile' element = {<UpdateProfile />} />
          <Route path='/profile' element = {<Profile />} />
          <Route path="/blogs" element = { <BlogsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
