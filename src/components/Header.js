import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../App';
import logo from '../images/logo.png';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    return (
        <div className='header'>
            <Link to="/shop"><img src={logo} alt="" /></Link>
            <nav className='navbar'>
                <Link to={"/shop"}>Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <span>{loggedInUser.name}</span>
                <Link onClick={() => setLoggedInUser({})} to="/login">{loggedInUser.email ? 'Sign out' : 'Sign in'}</Link>
            </nav>
        </div>
    );
};

export default Header;