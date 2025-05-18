import React, { useState, useEffect } from 'react';
import './inicio.css'

const Inicio = ({setInitApp, setLogin, createEmail, setCreateAccount}) => {

return (
  <div className="container-form">
    < header className="header-form">
      <h1>MediGroup</h1>
      <h2>App</h2>
    </header>
      <div className="container-buttons">
        <button onClick={() => { setCreateAccount(true); setInitApp(false) }} >Crear cuenta</button>
        <button onClick={() => { setInitApp(false); setLogin(true) }}>Entrar</button>
      </div>
  </div>
)
}
export default Inicio;