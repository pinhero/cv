const express = require("express");
const app = express();

const axios = require("axios");
const crypto = require("crypto");
const request = require('request');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// Your GitHub personal access token
const token = "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";

// The repository for which you want to receive notifications
const repository = "cv";

// The email address to receive notifications
const email = "ronaldo.adikpeto@epitech.eu";

// Webhook secret
const secret = "e5f2d4g6h8j0k2l4m6n8p0q";

// Create a webhook for the repository
axios.post(`https://api.github.com/repos/${repository}/hooks`, {
  name: "web",
  active: true,
  events: ["push"],
  config: {
    url: "https://localhost:3000/webhooks/github",
    content_type: "json",
    secret: secret,
  },
  headers: {
    Authorization: `Token ${token}`,
  },
});

// Send email function (for demonstration purposes only)
function sendEmail(to, subject, body) {
    console.log(`Sending email to ${to} with subject "${subject}" and body "${body}"`);
}

// Handle the webhook event
app.post("/webhook", (req, res) => {
  const signature = req.header("x-hub-signature");
  const hmac = crypto.createHmac("sha1", secret);
    const digest = "sha1=" + hmac.update(req.body).digest("hex");

    if (signature !== digest) {
        return res.status(403).send("Signature non valide");
    }

  // Send an email notification
  sendEmail(email, "GitHub push event", JSON.stringify(req.body));

  res.send("OK");
});

app.listen(3000, () => {
    console.log("L'application écoute sur le port 3000");
  });