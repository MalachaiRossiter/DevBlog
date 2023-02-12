import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import NavBar from "./components/NavBar";
import SignUp from './components/SignUp';
import DisplayAll from './components/DisplayAll';
import Login from './components/Login';
import DisplayBlog from './components/DisplayBlog';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    axios.post('http://localhost:8000/api/user/loginCheck', {}, {withCredentials: true})
    .then(res => {
      console.log(res);
      if (res.status == 200){
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
            <Route element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} path="/Login"/>
            <Route element={<DisplayBlog/>} path="/blog/:id"/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
