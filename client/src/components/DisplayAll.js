import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const DisplayAll = (props) => {
    const [blogList, setBlogList] = useState([]);
    const {loggedIn, setLoggedIn} = props;

    useEffect(() => {
        console.log(loggedIn);
        axios.get('http://localhost:8000/api/blog')
        .then(res => {
            setBlogList(res.data);
        })
        .catch((err) => console.log(err))
    }, []
    )


    return (
        <div className="display-container">
            <div className="row">
                <div className="col-1">
                {loggedIn ? (
                    <Link to={'/create'} className={'create-btn'}>Create A Post!</Link>
                    ) : (
                    <Link to={'/login'} className={'create-btn'}>Create A Post!</Link>
                )}
                </div>
                <div className="col-2">
                    {
                        blogList && blogList.map((blog, index) => (
                            <div key={index} className={'blog-container blog-main'}>
                                <h2>{blog.creator}</h2>
                                <h1><Link to={`/blog/${blog._id}`}>{blog.title}</Link></h1>
                                <p className='blog-main-p'>{blog.body}</p>
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