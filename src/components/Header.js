import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../App';
import logo from '../images/logo.png';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const user = localStorage ? localStorage.getItem('email') : ''
    const data = user ? JSON.parse(user) : {};
    const handleClick = () => {
        if(localStorage){
            localStorage.removeItem('email')
        }
        if(loggedInUser){
            setLoggedInUser({})
        }
        
    }
    // console.log(data.name)
    return (
        <div className='header'>
            <Link to="/shop"><img src={logo} alt="" /></Link>
            <nav className='navbar'>
                <Link to={"/shop"}>Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <span>{(data || loggedInUser) ? (data.name || loggedInUser.name) : '' }</span>
                <Link onClick={handleClick} to="/login">
                    {(loggedInUser.email || data.email) ? 'Sign out' : 'Sign in'}</Link>
            </nav>
        </div>
    );
};

export default Header;