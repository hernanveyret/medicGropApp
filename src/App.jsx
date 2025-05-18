import { useState, useEffect } from 'react'
import Inicio from './Components/Inicio';
import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount.jsx';
import LoginEmail from './Components/LoginEmail.jsx';
import Main from './Components/Main';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config.js';
import { createEmail, loginEmailAnPassword } from './firebase/auth.js'


//import { login } from './firebase/auth';
import './App.css'

function App() {
   let isInLocalStorageDni = localStorage.getItem('dni')
    
  const [ dni, setDni ] = useState(isInLocalStorageDni ? isInLocalStorageDni : null);
  const [ initApp, setInitApp] = useState(true);
  const [ createAccount, setCreateAccount ] = useState(false);
  const [ login, setLogin ] = useState(false);
  const [ loginWithEmail, setLoginWithEmail ] = useState(false);
  const [ mainMenu, setMainMenu ] = useState(false);
  const [ myUser, setMyUser ] = useState(null);
  const [ noUser, setNoUser ] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        console.log('Estas logeado', user);        
        setInitApp(false);
        setLogin(false);
        setMainMenu(true);
        setCreateAccount(false);
        setLoginWithEmail(false);
        setMyUser(user)
      } else if(user === null ) {
        console.log('no existe el usuario')}
        else {

        console.log('No estas logeado.');
        console.log(user)
        setInitApp(true);
        setLogin(false);
        setMainMenu(false);
        setNoUser(false)        
      }
    });
    return () => unsuscribe();
  },[]);

  return (
    <div className="container">
      { initApp && <Inicio 
          setInitApp={setInitApp}
          setLogin={setLogin}
          setMainMenu={setMainMenu}
          createEmail={createEmail}
          setCreateAccount={setCreateAccount}
        />
      }
      { login && <Login 
          setLoginWithEmail={setLoginWithEmail}
          setLogin={setLogin}
          setInitApp={setInitApp}
        /> }
      { createAccount && <CreateAccount 
          createEmail={createEmail}  
          setInitApp={setInitApp}
          setCreateAccount={setCreateAccount}          
        />
      }
      {
        loginWithEmail && <LoginEmail
          setInitApp={setInitApp}
          setLoginWithEmail={setLoginWithEmail}
          setLogin={setLogin}
          noUser={noUser}
        />
      }
      { mainMenu && <Main 
        myUser={myUser}
        dni={dni}  
        setDni={setDni}      
        /> 
      }
    </div>
  )
}

export default App
