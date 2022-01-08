const express = require("express");
const router = express.Router();
const adminCNT = require("../controller/adminCNT");


router.get("/strutture/visualizzastrutture", adminCNT.visualizzaStrutture);
router.get("/strutture/dettagliStruttura/:id", adminCNT.visualizzaDettagliStruttura);
router.get("/strutture/prenotazioniStruttura/:id", adminCNT.visualizzaPrenotazioniStruttura);
router.get("/utenti/visualizzautenti", adminCNT.visualizzaUtentiRegistrati);
router.get("/reqtess/visualizzareqtess", adminCNT.visualizzaRichiesteTesseramento)
router.post("/reqtess/validatesseramento", adminCNT.validaTesseramento)
router.get("/strutture/eliminastruttura", adminCNT.eliminaStruttura)

module.exports = router;
