import React, { useState, useEffect } from 'react';
import Loader from './Loader.jsx';

import { closeSesion, getData, cambioDeToken, cancelTurno } from '../firebase/auth.js';

import './main.css';
import './showTurnos.css'
const Main = ({myUser, dni, setDni}) => {

  //console.log(myUser)
 
  const [ dataBase, setDataBase ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ idPaciente, setIdPaciente ] = useState(null);
  const [ isLoader, setIsLoader ] = useState(true);
  const [ isInputDni, setIsInputDni ] = useState(false)
  const [ token, setToken ] = useState(null);
  const [ turnos, setTurnos ] = useState(null);
  const [ isTurnos, setIsTurnos ] = useState(false);
  const [ isInfo, setIsInfo ] = useState(false);

  const [hover, setHover] = useState(false);

  // Genera un nuevo token
  const generarToken = () => {
    let numToken = Math.floor(Math.random() * (999 - 0 + 1)) + 0;
    if( numToken < 10 ) {
      numToken = `00${numToken}`;
    }else if ( numToken < 100 ){
      numToken = `0${numToken}`;
    }
    setToken(numToken)
    if(idPaciente) { 
      cambioDeToken(idPaciente, numToken) 
    } else {
      console.log('No tienes id de un paciente valido')
    }
  } 

  //Busca los usuarios de firebase
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setDataBase(data)
      setIsLoader(true)
    };  
    fetchData();    
  }, []);

  useEffect(() => {
    if (dni && dataBase) {
      getUser(dni);
      setIsInfo(true)
    }else{
      setUser(null);
      console.log('no hay dni guardado')
    }
  }, [dataBase, dni]);  

  // CUando vuelve a cargar la pagina, si hay un id de un paciente valido genera un nuevo token.
  useEffect(() => {
    if (idPaciente) {
      generarToken();
    }
  }, [idPaciente]);  

  // toma el dni del input y busca en los usuarios
  const getDni = (e) => {
    e.preventDefault();
    let $dni = Number(document.getElementById('dni').value);  
    localStorage.setItem('dni', $dni);
    getUser($dni);
    setDni($dni);
  }

  //Busca el usuario correspondiente al dni.
  const getUser = (userDni) => {
    if(!dataBase) return;
    const filter = dataBase.find(dniUser => dniUser.dni == userDni)
    if(filter){
      setUser(filter);
      setToken(filter.token);
      console.log(filter)
      setIdPaciente(filter.id);
    }
    setIsLoader(false)
  }

  useEffect(() => {
    if(user) {
      setTurnos(user.turnos);
    }
  },[user])

  useEffect(() => {
    console.log(turnos)
  },[turnos])

  // Si no hay un dni valido, pide que se ingrese uno para ubicar al usuario.
  const ShowInput = () => {
    setIsLoader(false)
    return (
      <div className="container-dni">
          <form onSubmit={getDni}>
            <p>Ingrese su DNI</p>
            <input type="text" id="dni" name="dni" autoFocus />
            <input type="submit" value="Cargar" />
          </form>
        </div>
    )
  };
  
  // Renderiza la informacion del usuario.
  const ShowInfo = () => {
    return (
      <div className="container-info">
        <div className="fotoPerfil">
          <img src={myUser.photoURL ? myUser.photoURL 
            :
            user.sexo === 'm' ? "/img/foto-perfil-m.jpg"
            :
            "/img/foto-perfil-f.jpg"
          } alt="foto de perfil" />
        </div>
        <section className='container-section-info'>
          <p>{user && user.apellido}, {user && user.nombre}</p>
          <p>DNI: {user && user.dni}</p>
          <p>Nº socio: {user && user.credencial}</p>
          <p>Token: {user && token}</p>
          <button className="btn" onClick={generarToken}>Nuevo token</button>
          <button className="btn" onClick={() => {
            setIsTurnos(true);
          }}>Ver turnos medicos</button>
        </section>
      </div>
    )
  };
  
  // renderiza los turnos del paciente.
  const ShowTurnos = () => {
    
    useEffect(() => {
      setIsInfo(false)
    },[]);

  // Cancelar un turno
  const filterCancelTurno = (idUsuario, index) => { 
    const eliminarTurno = turnos.find((t, i) => i === index);
    const nuevosTurnos = turnos.filter((_, i) => i !== index);
    setTurnos(nuevosTurnos);
    cancelTurno(idUsuario, eliminarTurno);
  };  
 
    return (
      <div className='container-turnos'>
        <h4>Tus turnos</h4>
        <nav className="nav-btn-salir">
          <button
            className="btn salir"
            onClick={() => {setIsTurnos(false); setHover(false); setIsInfo(true)}}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill={hover ? 'white' : 'black'}
            style={{ transform: hover ? 'scale(1.2)' : 'scale(1)', transition: '0.3s' }}
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
          </button>
        </nav>
        <div className="container-info-turnos">
        { turnos && 
           turnos.length > 0 ?
            turnos.map((t, index) => (
            <div className="turno" key={index}>
              <p><strong>Médico:</strong> {t.nombreMedico}</p>
              <p><strong>Especialidad:</strong> {t.especialidad}</p>
              <p><strong>Fecha:</strong> {t.fecha && t.fecha[0].toUpperCase() + t.fecha.slice(1) }</p>
              <p><strong>Hora:</strong>{t.hora} hs</p>
              <p><strong>Lugar:</strong> Clínica Central - Consultorio 2</p>
              <p><strong>Estado:</strong> <span className="estado">Confirmado</span></p>
              <p><strong>Observaciones:</strong> Traer estudios de sangre</p>
              <button className="cancelado" onClick={() => filterCancelTurno(user.id, index)  }>Cancelar turno</button>
            </div>
          ))
         :
         <h3 style={{color:'grey'}}>No hay turnos agendados</h3>
        }
        </div>
      </div>
    )
  }

  return (
    <section className="container-main">
      < header className="header-main">
        <h1>{ user ? `¡Hola, ${user.nombre}!` : '¡Hola! '}</h1>
        <button onClick={closeSesion}>Salir</button>
      </header>
      <main> 
        { isLoader && <Loader /> }        
        { !dni && <ShowInput /> }
        { isTurnos && <ShowTurnos /> }
        { isInfo &&  <ShowInfo />  } 
      </main>
      <footer>
        <p>MedicGroup App - 2025</p>
      </footer>
    </section>
  )
};
export default Main;