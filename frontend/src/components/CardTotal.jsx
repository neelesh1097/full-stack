import React, {useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CardTotal = () => {
    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);
    const cartAmount = getCartAmount();
    const shippingFee = cartAmount === 0 ? 0 : delivery_fee;
    return (
        <div className ='w-full'>
            <div className="text-2xl">
                <Title text1={'CART' } text2={'TOTALS'}/>
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{cartAmount.toFixed(2)}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping Fees</p>
                    <p>{currency} {shippingFee}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <b>TOTAL</b>
                    <b>{currency}{cartAmount === 0 ? "0.00" : (cartAmount + shippingFee).toFixed(2)}</b>
                </div>
               
            </div>
        </div>
    )
}

export default CardTotal