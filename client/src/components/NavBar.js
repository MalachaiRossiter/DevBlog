import {Link} from 'react-router-dom';

const NavBar = (props) => {
    return (
        <div className='navbar-container'>
            <div className='navbar'>
                <Link to={"/"} className='logo'><h2 className='text-2xl bold'>DevBlog</h2></Link>
                <div className='link-container'>
                    <Link to={"/login"} className='link-item'><h2>Login</h2></Link>
                    <Link to={"/signUp"} className='link-item signup'><h2>Create Account</h2></Link>
                </div>
            </div>
        </div>
    )
}
export default NavBar;