const express = require("express");
const router = express.Router();
const strutturaCNT = require("../controller/strutturaCNT");

router.get("/example-get", strutturaCNT.exampleGet);

module.exports = router;