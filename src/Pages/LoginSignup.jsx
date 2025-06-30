import React from 'react'
import './CSS/LoginSignup.css'

export default function LoginSignup() {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Signup</h1>
        <div className='loginsignup-fields'>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder='Email Addresss' />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        <p className='loginsignup-login'>
          Already Have an Account ? <span>Login here</span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox"/>
          <p>
            By continuing, I agree Terms of use & privacy policy
          </p>
        </div>

      </div>
    </div>
  )
}
