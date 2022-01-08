let express = require("express");
let router = express.Router();
let prenotazioneCNT = require("../controller/prenotazioneCNT");

router.get("/prenotazioniUtente", prenotazioneCNT.getPrenotazioniByUtente);

module.exports = router;