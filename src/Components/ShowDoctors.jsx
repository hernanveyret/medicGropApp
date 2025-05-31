import React, { useState, useEffect } from 'react';
import './showDoctors.css';

const ShowDoctors = ({filterDocs, setIsShowDoctors, setIsInfo}) => {
  console.log(filterDocs)
  
  return (
    <div className="container-docs">
      <div className="titulo">
        <h4>{filterDocs[0].especialidad[0].toUpperCase() + filterDocs[0].especialidad.slice(1)}</h4>
        <button onClick={() => { setIsShowDoctors(false); setIsInfo(true)}}>
          <svg xmlns="http://www.w3.org/2000/svg" 
           height="24px" 
           viewBox="0 -960 960 960" 
           width="24px" 
           fill="white">
             <path d="M257.85-231.38 232-257.85 453.54-480 232-702.15l25.85-26.47L480-506.46l222.15-222.16L728-702.15 506.46-480 728-257.85l-25.85 26.47L480-453.54 257.85-231.38Z"/>
          </svg>
        </button>
      </div>
      <section className="card-container">
        {
        filterDocs &&
          filterDocs.map(doc => (
            <div className="card-doctor" key={doc.id}>
              <div className="foto-ferfil">
                { doc.fotoPerfil && <img src={`./img/${doc.fotoPerfil}.jpg`} alt="Foto medico" /> }
              </div>
              <div className="info-doctor">
                <p>{doc.nombre}</p>
                <p>{doc.telefono}</p>
                <p></p>
              </div>        
            </div>
          ))
      }
      </section>
      
      
    </div>
  )
}
export default ShowDoctors;