import React, { useState, useEffect } from 'react';
import './createAccount.css';

const CreateAccount = ({createEmail, setInitApp, setCreateAccount}) => {

  const [ email, setEmail ] = useState(null);
  const [ password, setPassWord ] = useState(null);
  const [ visibilityPassword, setVisibilityPassword ] = useState('password')

  const getData = (e) => {
  e.preventDefault();
    if(email === null && password === null ){
      let campoUsuario = document.querySelector('.campo-usuario');
      campoUsuario.classList.remove('campo-usuario');
      campoUsuario.classList.add('error');

      let campoContraseña = document.querySelector('.campo-contraseña');
      campoContraseña.classList.remove('campo-contraseña');
      campoContraseña.classList.add('error');
      return
    } else if(email === null ) {      
      let campoUsuario = document.querySelector('.campo-usuario');
      campoUsuario.classList.remove('campo-usuario');
      campoUsuario.classList.add('error');
      return
    } else if (password === null){
      let campoUsuario = document.querySelector('.campo-contraseña');
      campoUsuario.classList.remove('campo-contraseña');
      campoUsuario.classList.add('error');
      return
    }
  const dateNewUser = {
    email,
    password
  }
  createEmail(dateNewUser);
  //setCreateAccount(false);
  //setInitApp(true);
  console.log('capturando datos', dateNewUser)
}

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
      <form className="form-create-account" onSubmit={getData}> 
        <h3 style={{color:'#00695c', textAlign:'center'}}>Crear Cuenta</h3>
        <button type="button" className="btn-back" onClick={() => { setCreateAccount(false); setInitApp(true) }} title='Atras'>
          <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px"
           viewBox="0 -960 960 960" width="24px" 
           fill="#000000">
            <path d="m277.46-461.73 229.12 229.11L480-206.15 206.15-480 480-753.85l26.58 26.47-229.12 228.73h476.39v36.92H277.46Z"/>
          </svg>
        </button>
        <input type="email" name="email" id="email" placeholder='Ingrese un correo' onChange={(e) => {setEmail(e.target.value)}}/>
        <p className="campo-usuario">*Campo Obligatorio</p>
        <span className="contaner-buttons">
          <input type={visibilityPassword} name="password" id="password" placeholder='Ingrese una contraseña'onChange={(e) => {setPassWord(e.target.value)}}/>
            <button type="button" className="visibility" onClick={visibilityTextPassword} title='Ver contraseña'>
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
        <p className="campo-contraseña">*Campo Obligatorio</p>
        <input type="submit" value="Crear" title='Crear cuenta'/>
      </form>
    </div>
  )
};

export default CreateAccount;

/*
ojo cerrado
<svg xmlns="http://www.w3.org/2000/svg"
  height="24px" 
  viewBox="0 -960 960 960" width="24px" 
  fill="#000000">
    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
</svg>
*/

/*
ojo abierto
<svg xmlns="http://www.w3.org/2000/svg"
 height="24px"
 viewBox="0 -960 960 960" width="24px"
 fill="#000000">
 <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
</svg>
*/