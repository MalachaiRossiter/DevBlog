import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const UserBlogs = (props) => {
    const [blogList, setBlogList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Gets creator blogs on page load
        axios.post('http://localhost:8000/api/blog/creator', {}, {withCredentials: true})
        .then(res => {
            setBlogList(res.data);
        })
        .catch((err) => {console.log(err);})
    }, []
    )

    const deleteBlog = (_id) => {
        // with the user blog id, deletes the user blog
        axios.delete(`http://localhost:8000/api/blog/${_id}`, {withCredentials: true})
        .then(res => {
            console.log(res);
            axios.post('http://localhost:8000/api/blog/creator', {}, {withCredentials: true})
            .then(res => {
                setBlogList(res.data);
            })
            .catch((err) => {console.log(err);})
        })
        .catch(err => {console.log(err)})
    }

    return (
        <div className="display-container">
            <div className="row">
                <div className="col-1">
                    <Link to={'/create'} className={'create-btn'}>Create A Post!</Link>
                </div>
                <div className="col-2">
                    {
                        blogList && blogList.map((blog, index) => (
                            <div key={index} className={'blog-container blog-main'}>
                                <div className='options-container'>
                                    <h2 className='creator'>{blog.creator}</h2>
                                    <Link to={`/blog/edit/${blog._id}`} className={'edit'}>Edit</Link>
                                    <Link onClick={(e) => {e.preventDefault(); deleteBlog(blog._id)}} className={"delete"}>Delete</Link>
                                </div>
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
export default UserBlogs;