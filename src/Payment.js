import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from 'react-router-dom';
import {CardElement, useStripe ,useElements} from "@stripe/react-stripe-js";
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from "./reducer";
import { useEffect } from 'react';
import axios from './axios';


function Payment() {
    const navigate = useNavigate();
   const [{basket , user} ,dispatch]=useStateValue();
   
   const stripe=useStripe();
   const elements=useElements();

   const [succeeded, SetSucceeded]=useState(false);
   const[processing , setProcessing]= useState("");
   const [error,setError]=useState(null);
   const [disabled,setDisabled]= useState(true);
   const [clientSecret , setClientSecret]=useState(true);

   useEffect(()=>{
       //generate the special stripe secret which allows us to charge a customer

       const getClientSecret = async() => {
           const response= await axios({
               method: 'post',
               url:`payments/create?total=${getBasketTotal(basket)*100}`
           });
           setClientSecret(response.data.clientSecret)
       }
       getClientSecret();
   },[basket])
   
   console.log('THE SECRET IS >>>', clientSecret)

   const handleSubmit = async (event) => {
       //do all here :
       event.preventDefault();
       setProcessing(true);

       const payload=await stripe.confirmCardPayment(clientSecret,{
           payment_method:{
               card: elements.getElement(CardElement)
           }
       }).then(({paymentIntent}) =>{
         //payment confirmation:
        
         SetSucceeded(true);
         setError(false);
         setProcessing(false);

         dispatch({
            type: 'EMPTY_BASKET'
        })

         navigate('/orders')
       })
   }

   const handleChange = event => {
       //listen for changes in the CardElement
       //and display any errors as the customer types
       setDisabled(event.empty);
       setError(event.error ? event.error.message:"");

   }


    return ( 
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout(
            <Link to="/Checkout">{basket?.length} items</Link>
            )</h1>

          <div className="payment__section">
              {/*Payement section - delivery address*/}
              <div className="payment__title">
                  <h3>Delivery Address</h3>
              </div>
              <div className="payment__address">
                  <p>{user?.email}</p>
                  <p>123 React Lane</p>
                  <p>Los Angeles ,CA</p>
              </div>
          </div>

          <div className="payment__section">
              {/*Payement section - Review items*/}
              <div className="payment__title">
                  <h3>Review items and delivery</h3>
              </div>
              <div className="payment__items">
                  {basket.map(item=>(
                     <CheckoutProduct 
                       id={item.id}
                       title={item.title}
                       image={item.image}
                       price={item.price}
                       rating={item.rating} 
                    />
                  ))}
              </div>
          </div>

          <div className="payment__section">
              {/*Payement section - Payment Method*/}
              <div className="payment__title">
                  <h3>Payment Method</h3>
              </div>
              <div className="payment__details">
                  {/*ejawww*/}
                  <form onSubmit={handleSubmit}>
                      <CardElement onChange={handleChange}
                     />
                     <div className="payement__priceContainer1">
                        <CurrencyFormat 
                          renderText={(value)=>(
                              <>
                               <h3>Order Total: {value}</h3>

                              </>
                          )}
                          decimalScale={2}
                          value={getBasketTotal(basket)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        /> 
                        <button disabled={processing || disabled || succeeded}>
                            <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                        </button>
                     </div>
                  </form>
              </div>
          </div>


      </div>   
    </div> 
    
    );
}
 
export default Payment;