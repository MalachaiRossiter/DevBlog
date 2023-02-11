import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const DisplayAll = (props) => {
    const [blogList, setBlogList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/blog')
        .then(res => {
            console.log(res.data);
            setBlogList(res.data);
        })
        .catch((err) => console.log(err))
    }, [])


    return (
        <div className="display-container">
            <div className="row">
                <div className="col-1">

                </div>
                <div className="col-2">
                    {
                        blogList && blogList.map((blog, index) => (
                            <div key={index} className={'blog-container'}>
                                <h2>{blog.creator}</h2>
                                <h1><Link to={`/blog/${blog._id}`}>{blog.title}</Link></h1>
                                <p>{blog.body}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="col-3">

                </div>
            </div>
        </div>
    )
}
export default DisplayAll;