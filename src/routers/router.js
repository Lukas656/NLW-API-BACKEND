const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dataFunctions = require('../controller/addUser.js');
const router = express();

router.use(bodyParser.json());
router.use(cors());


// Exibe mensagem se esta funcionando a conexao
router.get('/', async (req, res) => {
    res.status(200).send({ success: true, message: "Sistema Funcionando!!!" })
});

// pega destino, data , convidados e nome e emal do adm;
router.get('/trips/:id', async (req, res) => {
    try {
        let tripID = req.params.id;
        let user = await dataFunctions.getUserByID(tripID);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
// Exibe participantes;
router.get('/trips/:id/gests', async (req, res) => {
    try {
        let tripID = req.params.id;
        let user = await dataFunctions.getParticipans(tripID);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
// Exibe links importantes;
router.get('/trips/:id/links', async (req, res) => {
    try {
        let tripID = req.params.id;
        let user = await dataFunctions.getlinks(tripID);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
// Exibe Atividades;
router.get('/trips/:id/activites', async (req, res) => {
    try {
        let tripID = req.params.id;
        let user = await dataFunctions.getActivities(tripID);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
// Criar Atividades;
router.post('/trips/:id/activites', async (req, res) => {
    try {
        let tripID = req.params.id;
        let activities = req.body;
        let user = await dataFunctions.createActiviies(tripID, activities);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// pega destino, data , convidados e nome e emal do adm;
router.post('/trips', async (req, res) => {
    try {
        const newUser = req.body;
        const result = await dataFunctions.criarUser(newUser);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});




module.exports = router;