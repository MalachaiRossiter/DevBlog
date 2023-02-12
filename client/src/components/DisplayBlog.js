import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';

const DisplayBlog = (props) => {
    const {id} = useParams();
    const [loaded, setLoaded] = useState(false);

    const [creator, setCreator] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/blog/${id}`)
        .then((res) => {
            console.log(res.data);
            setCreator(res.data.creator);
            setTitle(res.data.title);
            setBody(res.data.body);
            setLoaded(true);
        })
        .catch((err) => console.log(err));
    }, []);

    return (
        <div className='display-container'>
            <div className='blog-container blog-single'>
                <h2>{creator}</h2>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        </div>
    )
}
export default DisplayBlog;