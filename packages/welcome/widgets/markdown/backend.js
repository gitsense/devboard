const fs = require("fs");
const { dirname } = require("path");

function getData(req) {
    const { path } = req.query;
    const devboard = dirname(dirname(dirname(dirname(__dirname))));
    const file = devboard+"/"+path;
    const readme = fs.readFileSync(file, "utf8");

    return {
        "status": "success",
        "data": readme
    }
}

module.exports = { getData };
