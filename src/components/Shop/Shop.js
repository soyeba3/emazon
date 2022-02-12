import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/products.json'
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart ] = useState([])

    useEffect(() => {
        const savedCart = getStoredCart();
        const productKey = Object.keys(savedCart);
        const previousKey = productKey.map(extKey => {
            const product = fakeData.find( (pd) => pd.key === extKey );
            product.quantity = savedCart[extKey];
            return product
        })
        setCart(previousKey);
    },[])

    const handleAddProduct = (product) => {
        // console.log(product);
        const addedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === addedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;   
            const others = cart.filter(pd => pd.key !== addedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart)
        addToDb(product.key, count)
    }
    return ( 
        <div className='shop-container'>
            <div className="product-container">

                {products.map(pd => 
                    <Product key={pd.key} showAddToCart={true} handleAddProduct = {handleAddProduct} product = {pd}>
                    </Product>)
                }
                
            </div>
            <div className="cart-container">
                <Cart cart= {cart}>
                    <Link to={'/review'}><button className='cart-btn'>Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;