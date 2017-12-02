const express = require('express')
var firebase = require("firebase")
const app = express()
console.log("test")
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT ,process.env.IP, () => console.log('Example app listening on port 3000!'))

var config = {
    apiKey: "AIzaSyDigiT3cpa-qZL8lFQWA5dqRD_Q8W5cDos",
    authDomain: "project14-3.firebaseapp.com",
    databaseURL: "https://project14-3.firebaseio.com",
    storageBucket: "project14-3.appspot.com",
  };
  firebase.initializeApp(config);
  
   // Get a reference to the database service
  var database = firebase.database();