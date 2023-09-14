const express = require('express');
const {MongoClient} = require('mongodb');

require('dotenv').config();
const router = express.Router();

const bases = process.env.DDBB
const nombreBase = 'Eps'
const monguito = require('mongodb').MongoClient;

router.get('/holi',async(req,res)=>{
    try {
        res.json('Somos Eps')
    } catch (error) {
        res.json('Estamos pailas')
    }
})


router.get('/ejercicio1', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db('Eps');
        const collection = db.collection('Usuarios');
        const unsortedResult = await collection.find({}).toArray();
        const result = unsortedResult.sort((a, b) => a.Nombre.localeCompare(b.Nombre));

        client.close();
        res.json(result);
    } catch (error) {
        res.status(404).json('No se encontro el dato');
    }
});


router.get('/ejercicio3', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db('Eps');
        const collection = db.collection('Medicos');
        const medicosDeEspecialidad = await collection.find({'especialidad':'Cardiologo'}).toArray();
        client.close();
        res.json(medicosDeEspecialidad);
    } catch (error) {
        res.status(404).json('No se encontro el dato');
    }
});

router.get('/ejercicio6', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db('Eps');
        const collection = db.collection('Citas');
        const medicosDeEspecialidad = await collection.find({'Fecha':''}).toArray();
        client.close();
        res.json(medicosDeEspecialidad);
    } catch (error) {
        res.status(404).json('No se encontro el dato');
    }
});






module.exports = router