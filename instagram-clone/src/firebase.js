import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyBQ2zpHIpiOyOAGvndsdXzppvDf_CefX58",
	authDomain: "instagram-clone-react-92639.firebaseapp.com",
	databaseURL: "https://instagram-clone-react-92639.firebaseio.com",
	projectId: "instagram-clone-react-92639",
	storageBucket: "instagram-clone-react-92639.appspot.com",
	messagingSenderId: "976329671613",
	appId: "1:976329671613:web:e8af79cad09f60c02588d4",
	measurementId: "G-VKVJNJG5J4",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };

//export default db;
/*
    const firebaseConfig = {
    apiKey: "AIzaSyBQ2zpHIpiOyOAGvndsdXzppvDf_CefX58",
    authDomain: "instagram-clone-react-92639.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-92639.firebaseio.com",
    projectId: "instagram-clone-react-92639",
    storageBucket: "instagram-clone-react-92639.appspot.com",
    messagingSenderId: "976329671613",
    appId: "1:976329671613:web:e8af79cad09f60c02588d4",
    measurementId: "G-VKVJNJG5J4"
  };
*/
