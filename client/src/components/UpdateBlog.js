import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = (props) => {
    
    const {id} = useParams();

    const {loggedIn} = props;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/blog/${id}`)
        .then((res) => {
            console.log(res.data);
            setTitle(res.data.title);
            setBody(res.data.body);
        })
        .catch((err) => console.log(err));
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (loggedIn) {
            axios.put(`http://localhost:8000/api/blog/${id}`, {title, body}, {withCredentials: true})
            .then( res => {
                console.log(res.data);
                navigate(`/blog/${id}`);
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
        } else {
            console.log(loggedIn);
            navigate('/login');
        }
    }

    return (
        <div className="display-container">
            <div className="blog-container blog-single">
                <h1>Update Your Blog!</h1>
                {errors.map((err, index) => <p key={index} className="error">{err}</p>)}
                <form onSubmit={onSubmitHandler} className="login-form">
                    <div className='form-row'>
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className='form-row'>
                        <label>Body</label>
                        <textarea rows="15" value={body} onChange={(e) => setBody(e.target.value)}/>
                    </div>
                    <input type="submit" className='submit-btn'/>
                </form>
            </div>
        </div>
    )
} 
export default UpdateBlog;