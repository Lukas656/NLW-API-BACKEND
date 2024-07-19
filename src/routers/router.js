const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dataFunctions = require('../controller/addUser.js');
const router = express();

router.use(bodyParser.json());
router.use(cors());


// Criar Viagem 
router.post('/trips', async (req, res) => {
    try {
        const newUser = req.body;
        const result = await dataFunctions.criarUser(newUser);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});
// Alterar Local e Data;
router.put('/trips/:id', async (req, res) => {
    try {
        let tripID = req.params.id;
        let newTrips = req.body;
        let user = await dataFunctions.updateTrips(tripID, newTrips);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
// Pesquisa Usuário pelo ID ;
router.get('/trips/:id', async (req, res) => {
    try {
        let tripID = req.params.id;
        let user = await dataFunctions.getUserByID(tripID);
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
// Listar Atividades;
router.get('/trips/:id/activites', async (req, res) => {
    try {
        let tripID = req.params.id;
        let user = await dataFunctions.getActivities(tripID);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
// Exibir Convidados;
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
// Adicionar links importantes;
router.post('/trips/:id/links', async (req, res) => {
    try {
        const tripId  = req.params.id;
        const newLink = req.body;
        const updatedLinks = await dataFunctions.addLink(tripId, newLink);
        res.status(200).json(updatedLinks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Deletar links importantes;
router.delete('/trips/:id/links/:linkId', async (req, res) => {
    try {
        const tripId  = req.params.id;
        const linkId  = req.params.linkId;
        const updatedLinks = await dataFunctions.deleteLink(tripId, linkId);
        res.status(200).json(updatedLinks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Deletar Email de Convidados;
router.delete('/trips/:id/links/:linkId', async (req, res) => {
    try {
        const { tripId, linkId } = req.params;
        const updatedLinks = await dataFunctions.deleteLink(tripId, linkId);
        res.status(200).json(updatedLinks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Rota para adicionar um e-mail
router.post('/trips/:id/gests', async (req, res) => {
    try {
        const tripId  = req.params.id;
        const newEmail = req.body.email;
        const updatedEmails = await dataFunctions.addEmail(tripId, newEmail);
        res.status(200).json(updatedEmails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Rota para deletar um e-mail
router.delete('/trips/:id/gests/:emailId', async (req, res) => {
    try {
        const tripId = req.params.id;
        const emailId  = req.params.emailId;
        const updatedEmails = await dataFunctions.deleteEmail(tripId, emailId);
        res.status(200).json(updatedEmails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;