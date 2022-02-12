import React, { useEffect, useState } from 'react';
import {deleteFromDb, getStoredCart} from '../../utilities/fakedb'
import fakeData from '../../fakeData/products.json'
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useNavigate } from 'react-router-dom';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [placeOrder, setPlaceOrder] = useState(false);
    const navigate = useNavigate()
    
    const handleCheckOut = () => {
        navigate('/shipment')
    }
    const removeProduct = (key) => {
        // console.log('product clicked', key)
        
        const newCart = cart.filter((pd) => pd.key !== key)
        setCart(newCart)
        deleteFromDb(key);
    }
    useEffect(() => {
        const savedCart = getStoredCart();
        const productKey = Object.keys(savedCart);
        
        const cartProducts = productKey.map( key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity = savedCart[key];
            return product
        })
        setCart(cartProducts);
    },[])

    let thankYou;
    if (placeOrder) {
        thankYou = <img src={happyImage} alt="" />
    };

    return (
        <div className='review-container'>
            <div className='review-product'>
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className='review-cart'>
                <Cart cart={cart}>
                    <button onClick={handleCheckOut} className='cart-btn'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;