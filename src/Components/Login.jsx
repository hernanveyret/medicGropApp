import Reatc, { useState, useEffect } from 'react';
import { loginWhihtGoogle } from '../firebase/auth.js'
import './login.css'
const Login = ({setLoginWithEmail, setLogin, setInitApp}) => {


  return (
    <div className="container-form">
    < header className="header-form">
      <h1>MediGroup</h1>
      <h2>App</h2>
    </header>
      <div className="container-buttons">        
        <button type="button" className="btn-back-login" onClick={() => { setLogin(false); setInitApp(true) }} title='Atras'>
          <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px"
           viewBox="0 -960 960 960" width="24px" 
           fill="#000000">
            <path d="m277.46-461.73 229.12 229.11L480-206.15 206.15-480 480-753.85l26.58 26.47-229.12 228.73h476.39v36.92H277.46Z"/>
          </svg>
        </button>
        <button className="btn-login" onClick={() => { setLoginWithEmail(true); setLogin(false) }}>Entrar con correo</button>
        <button className="btn-login" onClick={loginWhihtGoogle}>Entrar con google</button>
      </div>
  </div>
  )
};
export default Login;