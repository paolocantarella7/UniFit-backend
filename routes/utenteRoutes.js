const express = require("express");
const router = express.Router();
const utenteCNT = require("../controller/utenteCNT");

router.get("/example-get", utenteCNT.exampleGet);

module.exports = router;