let express = require("express");
let router = express.Router();
let prenotazioneCNT = require("../controller/prenotazioneCNT");
let Chiusura = require("../model/Chiusura");
let { query } = require("express-validator");
const Prenotazione = require("../model/Prenotazione");

let validazione = {
    email: /[a-zA-Z0-9\._-]+[@][a-zA-Z0-9\._-]+[.][a-zA-Z]{2,6}/,
    nome: /[A-zÀ-ù ‘-]{2,45}$/,
    numeroCarta: /^([0-9]{16})$/,
    cvvCarta: /^[0-9]{3,4}$/,
    data: /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/,
    fasciaOraria: /^[0-9]+:[0-9]+-[0-9]+:[0-9]+$/
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
    .matches(validazione.data)
    .withMessage("Formato data prenotazione non valido")
    .custom(async (value) =>{
        
        return await Chiusura.count({
            where:{
                struttura: 1,
                dataChiusura:value
            }
        }).then((result) =>{
            if(result>0)
                throw new Error("Struttura chiusa nel giorno selezionato");
        })
    }),
    query("scadenzaCarta")
    .matches(validazione.data)
    .withMessage("Formato scadenza carta errato")
    .custom(async(value) =>{
        
        if(new Date(new Date().getTime()) > new Date(new Date(value))){
            throw new Error("Carta scaduta!")
        }
    }),
    query("fascia")
    .matches(validazione.fasciaOraria)
    .withMessage("Formato fascia oraria non valido!")

], prenotazioneCNT.effettuaPrenotazione);

router.get("/modificaPrenotazione", [
    query("dataPrenotazione")
    .matches(validazione.data)
    .withMessage("Formato data non vallido"),
    query("fascia")
    .matches(validazione.fasciaOraria)
    .withMessage("Formato fascia oraria non valido"),
    query("idPrenotazione")
    .custom(async (value) =>{
        await Prenotazione.findByPk(value)
        .then((result) =>{
            if(!result)
                throw new Error("Prenotazione non esistente");
        })
    })
], prenotazioneCNT.modificaPrenotazione);


router.get("/cancellaPrenotazione", [
    query("email")
    .matches(validazione.email)
    .withMessage("Formato email errato")
],
prenotazioneCNT.cancellaPrenotazione);
module.exports = router;