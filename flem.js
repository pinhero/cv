const express = require("express");
const app = express();
const crypto = require("crypto");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Webhook secret
const secret = "e5f2d4g6h8j0k2l4m6n8p0q";


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
      return res.status(403).send("Invalid signature");
  }

  // Send an email notification
  sendEmail("adikpetohicham2001@gmail.com", "GitHub push event", JSON.stringify(req.body));

  res.send("OK");
});

app.listen(3000, () => {
  console.log("Application listening on port 3000");
});
