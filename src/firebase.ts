import firebase from 'firebase';
import 'firebase/firestore';
import firebaeConfig from './constants/firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaeConfig);

const db = firebaseApp.firestore();

export { db };

export default firebaseApp;
