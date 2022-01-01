import React from 'react';

const Cart = (props) => {
    console.log(props)
    const cart = props.cart;
    const total = cart.reduce((total, pdt) => total + pdt.price, 0)

    let shipping = 7.99;
    if (cart.length === 0) {
        shipping = 0;
    }    
    else if(total>100){
        shipping = 0;
    }
    else if(total>50){
        shipping = 3.99;
    }

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
        </div>
    );
    };
export default Cart;