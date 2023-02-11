import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const loginDetails = ({email, password})
        console.log(loginDetails);
        axios.post('http://localhost:8000/api/user/login', loginDetails, {withCredentials:true}
        )
        .then(res => {
            console.log(res);
            console.log(res.data);
            navigate('/');
        })
        .catch((err) => {
            console.log(err)
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        });
    }

    return(
        <div className="full-container">
            <div className="login-container">
                <div className='login-header'>
                    <h1>Log In!</h1>
                    {errors.map((err, index) => <p key={index} className="error">{err}</p>)}
                </div>
                <form onSubmit={onSubmitHandler} className="login-form">
                    <div className='form-row'>
                        <label>Email</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='form-row'>
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <input type="submit" className='submit-btn'/>
                </form>
                <p className='bottom-txt'>Don't have an account? <span><Link to={"/signUp"}>Sign Up!</Link></span></p> 
            </div>
        </div>
    )
}
export default Login;