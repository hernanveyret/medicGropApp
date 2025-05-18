import React, { useState, useEffect } from 'react';
import { loginEmailAnPassword } from '../firebase/auth.js'

import './createAccount.css';

const LoginEmail = ({setInitApp, setLoginWithEmail, setLogin, noUser}) => {
  const [ email, setEmail ] = useState(null);
  const [ password, setPassWord ] = useState(null);
  const [ visibilityPassword, setVisibilityPassword ] = useState('password')

  console.log(noUser)

  const loginEmail = async (e) => {
    e.preventDefault();
    if(email=== null || password === null){
      console.log('nombre y contraseña obligatorios');
      return;
    }
    const userAccount = {
      email,
      password
    }
    try {
      const result = await loginEmailAnPassword(userAccount);
      const user =  result.usuario
    console.log('Usuario : ',user)
    } catch (error) {
      
    }
    
    //setLoginWithEmail(false);
    //setInitApp(true);
  }

/*
const loginEmail = async (e) => {
   e.preventDefault();
    if(email=== null || password === null){
      console.log('nombre y contraseña obligatorios');
      return;
    }

    const userAccount = {
      email,
      password
    }

  const result = await loginEmailAnPassword({ email, password });

  if (result.ok) {
    const user = result.user;
    console.log('Usuario logueado:', user);
    // Aquí seguís con tu lógica de navegación o estado
  } else {
    switch (result.errorCode) {
      case 'auth/user-not-found':
        setAccountNotFound(true);
        break;
      case 'auth/wrong-password':
        setWrongPassword(true);
        break;
      case 'auth/invalid-email':
        setInvalidEmail(true);
        break;
      default:
        console.error('Error desconocido:', result.errorMessage);
        setGeneralError(true);
    }
  }
};
*/
  const visibilityTextPassword = () => {
    const id = document.getElementById('password');
    if(id.type === 'password'){
      setVisibilityPassword('text')
    }else{
      setVisibilityPassword('password')
    }
  }
  
  return (
    <div className="container-create-account">
      < header className="header-form">
      <h1>MediGroup</h1>
      <h2>App</h2>
    </header>
      <form className="form-create-account" onSubmit={loginEmail}> 
        <h3 style={{color:'#00695c', textAlign:'center'}}>Iniciar Sesión</h3>
        <button type="button" className="btn-back" title='Atras' onClick={() => { setLoginWithEmail(false); setLogin(true) }}>
          <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px"
           viewBox="0 -960 960 960" width="24px" 
           fill="#000000">
            <path d="m277.46-461.73 229.12 229.11L480-206.15 206.15-480 480-753.85l26.58 26.47-229.12 228.73h476.39v36.92H277.46Z"/>
          </svg>
        </button>
        <input type="email" name="email" id="email" placeholder='Ingrese un correo' onChange={(e) => {setEmail(e.target.value)}}/>
        <span className="contaner-buttons">
          <input type={visibilityPassword} name="password" id="password" placeholder='Ingrese una contraseña'onChange={(e) => {setPassWord(e.target.value)}}/>
            <button type="button" className="visibility" onClick={visibilityTextPassword}>
              { visibilityPassword === 'password' ? 
                <svg xmlns="http://www.w3.org/2000/svg"
                  height="24px" 
                  viewBox="0 -960 960 960" width="24px" 
                  fill="#333">
                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
                </svg>
              :
                <svg xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960" width="24px"
                  fill="#000000">
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                </svg>  
            }
            </button>
        </span>
        <input type="submit" value="Entrar"/>
      { noUser ? <p style={{color:'red', textAlign:'center', fontSize:'14px'}}>Usuario o correo no existente</p> : ''}
      </form>
    </div>
  )
};

export default LoginEmail;