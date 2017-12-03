const express = require('express')
const app = express()
var firebase = require("firebase")

app.use(express.static('./public'))
app.get('/', (req, res) => res.sendFile('/index.html'))

app.listen(process.env.PORT ,process.env.IP, () => console.log('App started.'))


var config = {
    apiKey: "AIzaSyDigiT3cpa-qZL8lFQWA5dqRD_Q8W5cDos",
    authDomain: "project14-3.firebaseapp.com",
    databaseURL: "https://project14-3.firebaseio.com",
    storageBucket: "project14-3.appspot.com",
  };
  firebase.initializeApp(config);
  
   // Get a reference to the database service
  var database = firebase.database();
  
 