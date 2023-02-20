import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';

import NavBar from "./components/NavBar";
import SignUp from './components/SignUp';
import DisplayAll from './components/DisplayAll';
import Login from './components/Login';
import DisplayBlog from './components/DisplayBlog';
import CreateBlog from './components/CreateBlog';
import UserBlogs from './components/UserBlogs';
import UpdateBlog from './components/UpdateBlog';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  // checks if the user is logged in to change states of items
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    axios.post('http://localhost:8000/api/user/loginCheck', {}, {withCredentials: true})
    .then(res => {
      console.log(res);
      if (res.status === 200){
        setLoggedIn(true);
        console.log(loggedIn);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoggedIn(false);
    });
  }, [loggedIn])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Routes>
          <Route path="/" element={<DisplayAll loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} default />
          <Route path="/signUp" element={<SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/blog/:id" element={<DisplayBlog/>} />

          {/* Protected routes using the Protected Route Component */}
          <Route path="/blog/edit/:id" element={<ProtectedRoute loggedIn={loggedIn}><UpdateBlog/></ProtectedRoute>}/>
          <Route path="/create" element={<ProtectedRoute loggedIn={loggedIn}><CreateBlog/></ProtectedRoute>}/>
          <Route path="/userBlogs" element={<ProtectedRoute loggedIn={loggedIn}><UserBlogs/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// node_modules react-router-dom, axios