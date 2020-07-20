import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: `AIzaSyA2S38idHcwIjDpQyuu59YkMDbQPGb02EE`,
  authDomain: process.env.FIREBASEAUTHDOMAIN,
  databaseURL: process.env.FIREBASEDATABASEURL,
  projectId: process.env.FIREBASEPROJECTID,
  storageBucket: "",
  messagingSenderId: process.env.FIREBASEMESSAGE,
  appId: process.env.FIREBASEAPPID
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;