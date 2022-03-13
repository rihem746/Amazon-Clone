import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, title, image, price, rating }) {
    const [{basket}, dispath] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from the basket
        dispath({
            type: 'REMOVE_FROM_BASKET',
            id:id,
        })
    }

  return (
    <div className="checkoutProduct">
        <img className='checkoutProduct__image' src={image} alt="" />
        <div className="checkoutProduct__info">
            <p className='checkoutProduct__title'>{title}</p>
            <p className="checkoutProduct__price">
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className="checkoutProduct__rating">
                {Array(rating).fill().map((_, i) => (
                    <p>🌟</p>
                ))}
             </div>
             <button onClick={removeFromBasket}>Remove from Basket</button>
        </div>

  </div>
  )
}

export default CheckoutProduct