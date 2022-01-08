const express = require("express");
const router = express.Router();
const adminCNT = require("../controller/adminCNT");


router.get("/strutture/visualizzastrutture", adminCNT.visualizzaStrutture);
router.get("/strutture/dettagliStruttura/:id", adminCNT.visualizzaDettagliStruttura);
router.get("/strutture/prenotazioniStruttura/:id", adminCNT.visualizzaPrenotazioniStruttura);
router.get("/utenti/visualizzautenti", adminCNT.visualizzaUtentiRegistrati);
router.get("/reqtess/visualizzareqtess", adminCNT.visualizzaRichiesteTesseramento)


module.exports = router;
