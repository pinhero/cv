const axios = require("axios");

const repository = ["cv"];

var commits = [];

const username = "pinhero";

async function get_hash() {
    var test = []
    for (var i = 0; i < repository.length; i++) {
        var url = `https://api.github.com/repos/${username}/${repository[i]}/branches`
        console.log(url)
        var rep = await axios.get(url)
        console.log(rep.data)
        var data = rep.data
        var commit = data[0].commit.sha
        console.log(commit)
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
                if (sh != shs)
                    console.log("ok")
            }
        }
    }
    console.log(commits)
};
const interval = setInterval(() => {
    get_hash();
}, 10 * 1000)