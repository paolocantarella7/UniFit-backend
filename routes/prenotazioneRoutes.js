let express = require("express");
let router = express.Router();
let prenotazioneCNT = require("../controller/prenotazioneCNT");
let { param } = require("express-validator");
let Chiusura = require("../model/Chiusura");
let { query } = require("express-validator");

let validazione = {
    email: /[a-zA-Z0-9\._-]+[@][a-zA-Z0-9\._-]+[.][a-zA-Z]{2,6}/,
    nome: /[A-zÀ-ù ‘-]{2,45}$/,
    numeroCarta: /^([0-9]{16})$/,
    cvvCarta: /^[0-9]{3,4}$/,
    data: /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/,
    dataLimite: new Date().toDateString(),
  };

router.get("/prenotazioniUtente", prenotazioneCNT.getPrenotazioniByUtente);
router.get("/getFasce", prenotazioneCNT.getFasceOrarie);

router.get("/effettuaPrenotazione", [
    query("intestatarioCarta")
    .matches(validazione.nome)
    .withMessage("Formato nome non valido"),
    query("numeroCarta")
    .matches(validazione.numeroCarta)
    .withMessage("Formato numero carta non valido"),
    query("cvvCarta")
    .matches(validazione.cvvCarta)
    .withMessage("Formato CVV non valido"),
    query("dataPrenotazione")
    .custom(async (value) =>{
        
        return await Chiusura.count({
            where:{
                struttura: 1,
                dataChiusura:value
            }
        }).then((result) =>{
            if(result>0)
                throw new Error("Struttura chiusa nel giorno selezionato!");
        })
    })

], prenotazioneCNT.effettuaPrenotazione);

router.get("/modificaPrenotazione", prenotazioneCNT.modificaPrenotazione);
router.get("/cancellaPrenotazione", [
    query("email")
    .matches(validazione.email)
    .withMessage("Formato email errato")
],
prenotazioneCNT.cancellaPrenotazione);
module.exports = router;