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
const Product = require('./models/Product');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

pp.use(bodyParser.json());

app.post('/api/products', (req, res, next) => {
    delete req.body._id;
    const Product = new Product({
        ...req.body
    });

    Product.save()
        .then((product) => res.status(201).json({product}))
        .catch(error => res.status(400).json({ error }))
})

app.get('/api/products', (req, res) => {
    Product.find()
        .then(products => res.status(200).json({products}))
        .catch(error => res.status(400).json({error}))
})

app.get('/api/products/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.status(200).json({product}))
        .catch(error => res.status(404).json({error}))
})

app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Modified!" }))
        .catch(error => res.status(400).json({error}))
})

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Deleted!" }))
        .catch(error => res.status(400).json({error}))
})

module.exports = app