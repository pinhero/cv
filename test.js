const Octonode = require('octonode');
const request = require('request');
const express = require('express')
const app = express()
app.use(express.json())
const PORT = 8000
const TEAMS_WEBHOOK_URL = 'https://outlook.office.com/webhook/https://9952-197-234-221-157.eu.ngrok.io'

app.post('/webhook', (req, res) => {
    if (req.headers['x-github-event'] === 'push') {
        const repo = req.body.repository.name;
        const sender = req.body.sender.login;
        const message = `${sender} a poussé sur ${repo}`;
        request.post(TEAMS_WEBHOOK_URL, { json: { text: message } });
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

