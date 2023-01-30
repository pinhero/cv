const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

// parse the incoming request body as JSON
app.use(bodyParser.json());

// create a route for the webhook
app.post('/webhook', (req, res) => {
  // check if the event is a push event
  if (req.body.event === 'push') {
    // extract the commit message from the payload
    const commitMessage = req.body.payload.commits[0].message;

    // send a message to Microsoft Teams
    axios.post('https://outlook.office.com/webhook/https://b6d5-149-34-244-178.eu.ngrok.io', {
      text: `New push to repository: "${commitMessage}"`
    });
  }

  // return a success status code
  res.sendStatus(200);
});

// start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});
