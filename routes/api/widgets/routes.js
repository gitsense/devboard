const { dirname } = require("path");
const express = require("express");
const router = express.Router();
const { widgets, configs } = require("../../../libs/widgets.js");

router.get("/:package", (req, res) => {
    const { package } = req.params;
    const config = configs[package];  

    if ( config ) 
        res.json(config);
    else 
        res.send(404);
});

router.get("/:package/:name", (req, res) => {
    const { package, name } = req.params;
    const fullName = getFullname(package, name);
    const config = configs[fullName];

    if ( config ) 
        res.json(config);
    else 
        res.send(404);
});

router.get("/:package/:name/static/:filename", async (req, res) => {
    const { package, name, filename } = req.params;

    // "../" and multi-level directories not allowed
    if ( filename.match(/\.\.\//) || filename.match(/\//) ) {
        res.send(404);
        return;
    }

    const base = dirname(dirname(dirname(__dirname)));
    const file = `${base}/packages/${package}/widgets/${name}/static/${filename}`;
    res.sendFile(file);
});

router.get("/:package/:name/data", async (req, res) => {
    const { package, name } = req.params;
    const fullName = getFullname(package, name);
    const widget = widgets[fullName];

    if ( widget === undefined ) {
        res.status(404);
        return;
    }

    if ( !widget.getData ) {
        res.sendStatus(405);
        return;
    }

    try {
        const data = await widget.getData(req);

        if ( data == null )
            res.sendStatus(500);
        else
            res.send(data);
    } catch ( e ) {
        console.trace(e); 
        res.sendStatus(500);
    }
});

router.post("/:package/:name/data", async (req, res) => {
    const { package, name } = req.params;
    const fullName = getFullname(package, name);
    const widget = widgets[fullName];

    if ( widget === undefined ) {
        res.status(404);
        return;
    }

    if ( !widget.postData ) {
        res.status(405);
        return;
    }

    try {
        const result = await widget.postData(req);

        if ( result == null )
            res.send(500);
        else
            res.send(result);
    } catch ( e ) {
        console.trace(e); 
        res.sendStatus(500);
    }
});

router.get("/*", (req, res) => {
    res.sendStatus(404);
});

function getFullname(package, name) {
    return `${package}.${name}`;
}

module.exports = router;
