import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, onSnapshot, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "./config";

const provider = new GoogleAuthProvider();

  export const createEmail = async (datosUser) => {
    console.log('crear cuenta')
    try {
      const result = await createUserWithEmailAndPassword(auth,datosUser.email, datosUser.password);
      const user = result.user;
      return user
    } catch (error) {
      console.log(`No se pudo crear la cuenta: ${datosUser} : ${error.code}`)
    }
  }

  //login con correo
  export const loginEmailAnPassword = async (datosUser) => {
    try {
      const userLogin = await signInWithEmailAndPassword(auth,datosUser.email, datosUser.password );
      const user = userLogin.user
      return { ok: true, usuario: user };
    } catch (error) {
        return { ok: false, usuario:user};
      console.log('No se pudo ingresar a la cuenta. ', error.code);
    }
  }

 // Login con google
 export const loginWhihtGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Usuario logeado: ', user);
    return user;
  } catch (error) {
    
    console.log('Error al iniciar session: ', error)
  }
 };

 //Cerrar sesion
 export const closeSesion = async () => {
  signOut(auth).then(() => { console.log('Sesion finalizada')})
 }

 //Busca info del usuario
 export const getData = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'usuarios'));
    const usuarios = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return usuarios;
  } catch (error) {
    console.log('Error al buscar usuario:', error);
    return [];
  }
};

export const cambioDeToken  = async (idPaciente, nuevoToken) => {
  //console.log('cambio de toquen:',idPaciente, nuevoToken )
  try {
    const docRef = doc(db, 'usuarios', idPaciente);
    await updateDoc(docRef, {
      token: nuevoToken
    })
    console.log("Se modifico el numero de token con exito.");
  } catch (error) {
    console.error("No se pudo modificar el token", error);
  }
}

export const cancelTurno = async (idPaciente, turnos) => {
  console.log(idPaciente)
  console.log(typeof turnos)
  try {
      const docRef = doc(db, 'usuarios', idPaciente);
      await updateDoc(docRef, {
        turnos: arrayRemove(turnos)
      })
      console.log("Turno eliminado ✅");
    } catch (error) {
      console.error("Error al agregar eliminar ❌", error);
    }
}
 /*
onAuthStateChanged(auth, (user) => {
  if(user) {
    console.log('Logeado')
  }else{
    console.log('No estas logeado')
  }
});
*/