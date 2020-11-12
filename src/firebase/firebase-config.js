import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import dotenv from 'dotenv'
dotenv.config();
console.log(process.env)

const firebaseConfig = {
    apiKey: "AIzaSyCiErJ6dl2eXkrwOwlnYsNB84BWUD7BMs0",
    authDomain: "react-app-curso-bf3c4.firebaseapp.com",
    databaseURL: "https://react-app-curso-bf3c4.firebaseio.com",
    projectId: "react-app-curso-bf3c4",
    storageBucket: "react-app-curso-bf3c4.appspot.com",
    messagingSenderId: "431121096391",
    appId: "1:431121096391:web:04a7ebf300e0a1d21da8e2"
  };

  const firebaseConfigTesting = {
    apiKey: "AIzaSyD0mpJd-hH9nQlk-w_GRcRRSAOrFkZVEPY",
    authDomain: "sql-demos-69035.firebaseapp.com",
    databaseURL: "https://sql-demos-69035.firebaseio.com",
    projectId: "sql-demos-69035",
    storageBucket: "sql-demos-69035.appspot.com",
    messagingSenderId: "687609693162",
    appId: "1:687609693162:web:060cb1a604d4a092492893"
  };

 // Initialize Firebase
if(process.env.NODE_ENV === 'test') {
  firebase.initializeApp(firebaseConfigTesting);
}else{
  firebase.initializeApp(firebaseConfig);
}


 


const db = firebase.firestore();
const googleAuthProvider= new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}