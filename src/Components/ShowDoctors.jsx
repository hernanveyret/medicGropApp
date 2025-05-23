import React, { useState, useEffect } from 'react';
import './showDoctors.css';

const ShowDoctors = ({filterDocs}) => {
  console.log(filterDocs)
  //let fotoPerfil =  `./img/${filterDocs.fotoPerfil}.jpg`
  return (
    <div className="container-docs">
      {
        filterDocs &&
          filterDocs.map(doc => (
            <div className="card-doctor" key={doc.id}>
              <div className="foto-ferfil">
                { doc.fotoPerfil && <img src={`./img/${doc.fotoPerfil}.jpg`} alt="Foto medico" /> }
              </div>
              <div className="info-doctor">
                <p>{doc.nombre}</p>
                <p></p>
              </div>        
            </div>
          ))
      }
      
    </div>
  )
}
export default ShowDoctors;