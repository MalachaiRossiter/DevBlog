import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from "./components/NavBar";
import SignUp from './components/SignUp';
import DisplayAll from './components/DisplayAll';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route element={<DisplayAll/>} path="/" default/>
            <Route element={<SignUp/>} path="/signUp"/>
            <Route element={<Login/>} path="/Login"/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
