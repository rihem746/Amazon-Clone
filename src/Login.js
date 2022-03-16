import React, { useState } from 'react'
import './Login.css'
import amazonLogo from './assets/Amazon-logo.png'
import { Link, useNavigate} from 'react-router-dom' 
import {auth} from './firebase'

function Login() {
  // old version import {useHistory} from 'react-router-dom'
  // old version -- const history = useHistory()
    const navigate = useNavigate()
    //automatically change the url after the login -- forwarding
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const changeEmail =(event) => {
      setEmail(event.target.value)
    }
    const changePassword =(event) => {
      setPassword(event.target.value)
    }
    const register = (event) => {
        event.preventDefault()
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((auth) => {
            //in case it succesfully created a new user with the email and password
            console.log(auth)
            if (auth){
              //old version -- history.push('/')
              navigate('/') // forcing redirection
            }
        })
        .catch(error => alert(error.message))
    }
    const signIn = (event) => {
        event.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .then(auth=> {
          navigate('/')
        }).catch(error => alert (error.message))
    }
    
  return (
    <div className='login'>
        <Link to='/'>
        <img className='Login_logo'
         src={amazonLogo}/>
         </Link>
         <div className='login__container'>
             <h1>Sign-in</h1>
             <form>

                 <h5>E-mail</h5>
                 <input type='text' value={email}
                 onChange={changeEmail} />

                 <h5>Password</h5>
                 <input type='password' value={password} 
                 onChange={changePassword}/>

                 <button className='login__signInButton'
                 type='submit' onClick={signIn}>Sign In</button>
                 
                 <p className='notice'>By signing in, you are agreeing 
                     to AMAZON FAKE CLONE 's Conditions of use and 
                     sale. Please check our privacy notice, 
                     our cookies' notice and our Interest-Based
                     Ads Notice</p>
                 
                 <button className='login__registerButton'
                 onClick={register}>Create you Amazon clone account</button>
             </form>
         </div>
        </div>
  )
}

export default Login