const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connexio a la base de données
mongoose.connect('mongodb+srv://testUser:GoFullstackDb@cluster0.aldck.mongodb.net/go_fullstack?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB a échoué !"))

const app = express();
// const 