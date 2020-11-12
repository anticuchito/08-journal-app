import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:  process.env.REACT_APP_MSG_SENDER_ID,
    appId:  process.env.REACT_APP_APP_ID
  };

//   const firebaseConfigTesting = {
//     apiKey: "AIzaSyD0mpJd-hH9nQlk-w_GRcRRSAOrFkZVEPY",
//     authDomain: "sql-demos-69035.firebaseapp.com",
//     databaseURL: "https://sql-demos-69035.firebaseio.com",
//     projectId: "sql-demos-69035",
//     storageBucket: "sql-demos-69035.appspot.com",
//     messagingSenderId: "687609693162",
//     appId: "1:687609693162:web:060cb1a604d4a092492893"
//   };

//  // Initialize Firebase
// if(process.env.NODE_ENV === 'test') {
//   firebase.initializeApp(firebaseConfigTesting);
// }else{
//   firebase.initializeApp(firebaseConfig);
// }
firebase.initializeApp(firebaseConfig);

 


const db = firebase.firestore();
const googleAuthProvider= new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}