const express = require("express");
const router = express.Router();

router.get("/", (req, res) => { res.sendStatus(404).send("Missing API version"); });
router.use("/v0/widgets", require("./widgets/routes.js"));
router.get("/*", (req, res) => { res.sendStatus(404); });

module.exports = router;
