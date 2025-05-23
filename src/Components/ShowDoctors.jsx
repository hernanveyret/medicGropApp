import React, { useState, useEffect } from 'react';
import './showDoctors.css';

const ShowDoctors = ({doc}) => {
  let fotoPerfil =  `./img/${doc.fotoPerfil}.jpg`
  return (
    
      <div className="card-doctor">
        <div className="foto-ferfil">
          { fotoPerfil && <img src={fotoPerfil} alt="Foto medico" /> }
        </div>
        <div className="info-doctor">
          <p>{doc.nombre}</p>
          <p>{doc.telefono}</p>
        </div>        
    </div>
  )
}
export default ShowDoctors;