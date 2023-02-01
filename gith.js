const nodemailer = require('nodemailer');
const axios = require("axios");

const repository = ["cv"];

var commits = [];

const username = "pinhero";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: "adikpetohicham2001@gmail.com",
        pass: "rlwygthnrnnwittg"
    },
});
transporter.verify().then(console.log).catch(console.error);

function send(from, to, subjects, text, html) {
    transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: subjects, // Subject line
        text: text, // plain text body
        html: html, // html body
      }).then(info => {
        console.log({info});
      }).catch(console.error);
}

async function get_hash() {
    var test = []
    for (var i = 0; i < repository.length; i++) {
        var url = `https://api.github.com/repos/${username}/${repository[i]}/branches`
        var rep = await axios.get(url)
        var data = rep.data
        var commit = data[0].commit.sha
        const tmp = {
            "repo": repository[i],
            "branch": data[0].name,
            "sha": commit
        }
        test.push(tmp)
    }
    if (commits.length == 0) {
        commits = test
    } else {
        for (var i = 0; i < test.length; i++) {
            var rep = test[i].repo
            var sh = test[i].sha
            var reps = commits[i].repo
            var shs = commits[i].sha
            if (rep == reps) {
                if (sh != shs) {
                    commits[i].sha = sh
                    send('adikpetohicham2001@gmail.com', "georggbess@gmail.com, ronaldo.adikpeto@epitech.eu", "Medium @edigleyssonsilva ✔",  "There is a new article. It's about sending emails, check it out!", "<b>There is a new article. It's about sending emails, check it out!</b>")
                }
            }
        }
    }
};
const interval = setInterval(() => {
    get_hash();
}, 10 * 1000)


/*transporter.sendMail({
    from: 'adikpetohicham2001@gmail.com', // sender address
    to: "georggbess@gmail.com, ronaldo.adikpeto@epitech.eu", // list of receivers
    subject: "Medium @edigleyssonsilva ✔", // Subject line
    text: "There is a new article. It's about sending emails, check it out!", // plain text body
    html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
  }).then(info => {
    console.log({info});
  }).catch(console.error);
*/