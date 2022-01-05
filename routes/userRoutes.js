const express = require("express");
const router = express.Router();
const userCNT = require("../controller/userCNT");

router.get("/example-get", userCNT.exampleGet);

module.exports = router;