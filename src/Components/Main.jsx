import React, { useState, useEffect } from 'react';
import Loader from './Loader.jsx';
import ShowDoctors from './ShowDoctors.jsx';
import { closeSesion, getData, cambioDeToken, cancelTurno,searchSpecialties } from '../firebase/auth.js';
import './main.css';
import './showTurnos.css'
import { serverTimestamp } from 'firebase/firestore';
const Main = ({myUser, dni, setDni, isInfo, setIsInfo}) => {

  //console.log(myUser)
 
  const [ dataBase, setDataBase ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ idPaciente, setIdPaciente ] = useState(null);
  const [ isLoader, setIsLoader ] = useState(true);
  const [ isInputDni, setIsInputDni ] = useState(false)
  const [ token, setToken ] = useState(null);
  const [ turnos, setTurnos ] = useState(null);
  const [ isTurnos, setIsTurnos ] = useState(false);
  const [ medicos, setMedicos ] = useState(null)
  const [ especialidades, setEspecialidades ] = useState(null);
  const [ open, setOpen ] = useState(false)
  const [ isShowDoctors, setIsShowDoctors ] = useState(false);
  const [ filterDocs, setFilterDocs ] = useState(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      const getDoctors = await searchSpecialties(); // descaraga la los medicos.
      setMedicos(getDoctors)
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
      //console.log('no hay dni guardado')
    }
  }, [dataBase, dni]);

  // Crea lista de especialidaades
  useEffect(() => {
    if (medicos && medicos.length > 0) {
      const filtro = [...new Set(medicos.map(e => e.especialidad))].sort();
      setEspecialidades(filtro);
    }
  }, [medicos]);

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
          <button className="btn">Generar QR</button>
          <button className="btn" onClick={() => {
            setIsInfo(false);
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
        <div className="titulo">
          <h4>Tus turnos</h4>
           <button
            
            onClick={() => {setIsTurnos(false); setHover(false); setIsInfo(true)}}
            
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill='white'
            style={{ transform: hover ? 'scale(1.2)' : 'scale(1)', transition: '0.3s' }}
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
          </button>
        </div>
       
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
 
const openMenu = () => {
  setIsMenuOpen(true);
};

const closeMenu = () => {
  setIsMenuOpen(false);
};

const findEspecialitis = async () => {
const menu = document.querySelector('.esp-med');
  menu.classList.toggle('closed')
  menu.classList.toggle('open')  
  setOpen(!open)
}

const findDoctor = (e) => {
  const data = e.target.textContent.toLowerCase()
  console.log(data)
  const filter = medicos.filter(e => e.especialidad == data )
  setFilterDocs(filter)
  console.log(filter);
  setIsMenuOpen(false);
  setIsInfo(false);
  setIsShowDoctors(true);
  setIsTurnos(false);

  const menu = document.querySelector('.esp-med');
  menu.classList.toggle('closed')
  menu.classList.toggle('open')
  setOpen(!open)
}

  return (
    <section className="container-main">
      <nav className={`menu-bar ${isMenuOpen ? 'enter' : 'leave'}`}>

        <section className="nav-bar-btn">
          <button className="btn-salir-menu" onClick={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="#000000">
              <path d="M257.85-231.38 232-257.85 453.54-480 232-702.15l25.85-26.47L480-506.46l222.15-222.16L728-702.15 506.46-480 728-257.85l-25.85 26.47L480-453.54 257.85-231.38Z"/>
            </svg>
          </button>
        </section>
        <ul>
          <li><button className="btn-menu-bar">Eliminar cuanta</button></li>
          <li><button className="btn-menu-bar" onClick={findEspecialitis}>Especialidades

            {
              open ? 
                <svg xmlns="http://www.w3.org/2000/svg" 
                  height="24px" 
                  viewBox="0 -960 960 960" 
                  width="24px" 
                    fill="#000000"><path d="M256-454.81 230.81-480 480-729.58 729.58-480 704-454.81l-224-223-224 223Z"/>
                </svg>
                :
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 -960 960 960" 
                    width="24px" 
                    fill="#000000">
                  <path d="M480-374.77 271.38-583.38l26.47-25.85L480-427.08l182.15-182.15 26.47 25.85L480-374.77Z"/>
                </svg>
            }
            
            </button></li>
            <div className="esp-med">
              <ul>
                { 
                especialidades &&
                  especialidades.map((e, i) => (
                    <li key={i}><button className='btn-menu-bar' onClick={findDoctor}>{e[0].toUpperCase() + e.slice(1)}</button></li>
                  ))
                }
              </ul>
            </div>
        </ul>
      </nav>
      < header className="header-main">
        <h1>{ user ? `¡Hola, ${user.nombre}!` : '¡Hola! '}</h1>
        <button onClick={closeSesion} className="btn-salir">Salir</button>
        <button className="btn-menu" onClick={openMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" 
          height="24px" 
          viewBox="0 -960 960 960" 
          width="24px" 
          fill="white">
            <path d="M148.08-261.08v-55.96h663.84v55.96H148.08Zm0-191.34v-55.96h663.84v55.96H148.08Zm0-191.35v-55.96h663.84v55.96H148.08Z"/>
          </svg>
          </button>
      </header>
      <main> 
        { isLoader && <Loader /> }        
        { !dni && <ShowInput /> }
        { isTurnos && <ShowTurnos /> }
        { isInfo ?  <ShowInfo /> : ''  }
          
          {         
          isShowDoctors &&          
            <ShowDoctors              
              filterDocs={filterDocs}
              setIsShowDoctors={setIsShowDoctors}
              setIsInfo={setIsInfo}
            />     
        
        }
        
        
      </main>
      <footer>
        <p>MedicGroup App - 2025</p>
      </footer>
    </section>
  )
};
export default Main;

/*
  flecha arriba
<svg xmlns="http://www.w3.org/2000/svg" 
height="24px" 
viewBox="0 -960 960 960" 
width="24px" 
  fill="#000000"><path d="M256-454.81 230.81-480 480-729.58 729.58-480 704-454.81l-224-223-224 223Z"/>
</svg>

------------------------------------------------

  fecla abajo
<svg xmlns="http://www.w3.org/2000/svg" 
height="24px" 
viewBox="0 -960 960 960" 
width="24px" 
fill="#000000">
  <path d="M480-374.77 271.38-583.38l26.47-25.85L480-427.08l182.15-182.15 26.47 25.85L480-374.77Z"/>
</svg>
*/