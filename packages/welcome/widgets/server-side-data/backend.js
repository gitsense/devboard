const { execSync } = require("child_process");

async function getData(context, opts={}) {
    let date = execSync("/bin/date").toString();
    return { date: date };
}

module.exports = { getData };
