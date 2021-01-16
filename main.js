// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI17p94WD34LzKUtT0B6vbozn4kD35G_o",
  authDomain: "user-172ac.firebaseapp.com",
  databaseURL: "https://user-172ac-default-rtdb.firebaseio.com",
  projectId: "user-172ac",
  storageBucket: "user-172ac.appspot.com",
  messagingSenderId: "163518660074",
  appId: "1:163518660074:web:7d44589c06476e455b0693",
  measurementId: "G-QPJDGV1X7M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
let users = [];

// FIREBASE SETUP
function writeUserData(userId, username, email, address, phone) {
  firebase.database().ref('users/' + userId).set({
    username,
    email,
    address,
    phone
  });
}

function readUserData() {
  firebase.database().ref('users/').once('value').then((res) => {
    users = convertToArray(res.val());
    renderInHtml();
  });
}

const renderInHtml = () => {
  const html = users.map(user => `
    <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.address}</td>
        <td>${user.phone}</td> 
        <td onclick="deleteUser(${user.userId})"> <i class="material-icons" title="Delete">&#xE872;</i> </td> 
    </tr>`)

  $('#tableContent').html(html);
}

const deleteUser = (userId) => {
  firebase.database().ref('users/' + userId).set(null)
    .then(() => readUserData());
}

const convertToArray = (users) => {
  return users ? Object.keys(users).map(user => {
    return {
      userId: user,
      username: users[user].username,
      email: users[user].email,
      address: users[user].address,
      phone: users[user].phone
    }
  }) : [];
}
// APLICACION

const formData = new FormData(document.querySelector('form'));

const onInit = () => {
  readUserData();
}

const addNewUser = () => {
  const formData = getFormValues();
  writeUserData(Date.now(), formData.username, formData.email, formData.address, formData.phone)
}

const getFormValues = () => {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;

  return informacion = {
    username,
    email,
    address,
    phone
  };
}

onInit();