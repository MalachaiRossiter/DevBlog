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


function App() {

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
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <Routes>
            <Route element={<DisplayAll loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} path="/" default/>
            <Route element={<SignUp  loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} path="/signUp"/>
            <Route element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} path="/login"/>
            <Route element={<DisplayBlog/>} path="/blog/:id"/>
            <Route element={<UpdateBlog loggedIn={loggedIn}/>} path="/blog/edit/:id"/>
            <Route element={<CreateBlog  loggedIn={loggedIn}/>} path="/create"/>
            <Route element={<UserBlogs loggedIn={loggedIn}/>} path="/userBlogs"/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
