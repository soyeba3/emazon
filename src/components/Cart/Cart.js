import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart)
    const total = cart.reduce((total, pdt) => total + pdt.price * pdt.quantity, 0);
    const shipping = cart.reduce((shipping, pdt) => shipping + pdt.shipping , 0);

    const tax = total / 10;

    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
        
    
    return (
        <div>
            <h2>Oder Summery : {cart.length} </h2>
            <p>Product Price : {formatNumber(total)}</p>
            <p>Shipping Cost : {formatNumber(shipping)} </p>
            <p><small>Tax + Vat : {formatNumber(tax)} </small></p>
            <p>Total Price : {formatNumber(total + shipping + tax)} </p>
            {
                props.children
            }
        </div>
    );
    };
export default Cart;