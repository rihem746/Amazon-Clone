import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import "./App.css";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { useEffect } from "react";
import {auth} from './firebase'
import {useStateValue} from './StateProvider'
import Payment from "./Payment"
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const promise= loadStripe(
  "pk_test_51KeJVVFAPR2LGbPBwVAjosx9z90pynU8grSgo453idtGm84ECAIVzdhTNMgUpDxgycHFpRdz67EWBztfn7d7VOr900iVRp78mE"
);


function App() {
  const [{},dispatch] = useStateValue()
  useEffect(() =>{
    //to keep track of the logged in user
    //will only run once when the app component loads
    //as soon as the app loads we attach the listener
    auth.onAuthStateChanged(authUser => {
      console.log(`The current user is ${authUser}`)
      if (authUser){//the user has just logged in
        dispatch({
          type:'SET_USER',
          user:authUser

        })
      }else{//the user is logged out 
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  },[])
  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route path="/login" element={<h1><Login/> </h1>} />
          <Route path="/checkout" element={<div><Header/><Checkout/></div>} />
          <Route path="/" element={<div><Header/><Home /></div>} />
          <Route path="/payment" element={<div><Header/><Elements stripe={promise}><Payment /></Elements></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
