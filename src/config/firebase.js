import * as firebase from "firebase";

// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDPxFtI369o27iMDAzCqpcwONuUJWe-byY",
  authDomain: "leish-app.firebaseapp.com",
  databaseURL: "https://leish-app.firebaseio.com",
  projectId: "leish-app",
  storageBucket: "",
  messagingSenderId: "495573899795",
  appId: "1:495573899795:web:8c45a6ad1ad4c937"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const SignUp = async (values) => {
  await firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then((auth) => {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: values.nome,
    }).then().catch();
    var db = firebase.firestore();
    delete values.email;
    delete values.password;
    db.collection("users").doc(user.uid).set(values).then(function () {
      alert("Cadastrado com sucesso!");
    }).catch(function (error) {
      alert("Erro ao criar perfil!");
    });
  }).catch((error) => {
    alert(error);
  });
}
export default firebase