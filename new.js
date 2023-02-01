const express = require("express");
const app = express();

const axios = require("axios");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
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
    url: "https://821c-149-34-244-178.eu.ngrok.io/webhooks/github",
    content_type: "json",
    secret: secret,
  },
  headers: {
    Authorization: `Token ${token}`,
  },
});

// Email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "adikpetohicham2001@gmail.com",
    pass: "pinhero2001"
  }
});

// Handle the webhook event
app.post("/webhook", (req, res) => {
  const signature = req.header("x-hub-signature");
  const hmac = crypto.createHmac("sha1", secret);
    const digest = "sha1=" + hmac.update(req.body).digest("hex");

    if (signature !== digest) {
        return res.status(403).send("Invalid signature");
    }

  // Send an email notification
  transporter.sendMail({
    from: "ronaldo.adikpeto@epitech.eu",
    to: email,
    subject: "GitHub push event",
    text: JSON.stringify(req.body)
  }, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });

  res.send("OK");
});

app.listen(3000, () => {
  console.log("Application is listening on port 3000");
});
