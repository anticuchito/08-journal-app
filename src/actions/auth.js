import { firebase, googleAuthProvider } from "../firebase//firebase-config";
import Swal from 'sweetalert2';
import { types } from "../types/types";

import { startLoading, finishLoading } from "./ui";
//funciones que combierten las peticiones async en sync
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading());
        Swal.fire('Error',e.message,'error');
      });
  };
};

export const startRegisterWhithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log(e);
        Swal.fire('Error',e.message,'error')
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      }).catch(e => {
        dispatch(finishLoading());
        Swal.fire('Error',e.message,'error')
      })
  };
};
//funcion base para poder hacer el guardado con el reducer
export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});


export const  startLogout = () =>{
  return async(dispatch) =>{
    await firebase.auth().signOut();

    dispatch(logout());
  }
}

export const logout = () =>({
  type:types.logout
})