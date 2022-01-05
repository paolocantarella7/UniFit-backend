const express = require("express");
const router = express.Router();
const prenotazioneCNT = require("../controller/prenotazioneCNT");

router.get("/example-get", prenotazioneCNT.exampleGet);

module.exports = router;