import firebase from "firebase";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAXh3ssbWAClL5yDej4DjIuitsws1WN-DM",
    authDomain: "golfing-d7ec6.firebaseapp.com",
    databaseURL: "https://golfing-d7ec6.firebaseio.com",
    projectId: "golfing-d7ec6",
    storageBucket: "golfing-d7ec6.appspot.com",
    messagingSenderId: "283699390719"
};

const fire = firebase.initializeApp(config);

export default fire;