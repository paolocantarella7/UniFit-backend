let express = require("express");
let router = express.Router();
let prenotazioneCNT = require("../controller/prenotazioneCNT");
let Chiusura = require("../model/Chiusura");
let { query } = require("express-validator");
let { body } = require("express-validator");
let Prenotazione = require("../model/Prenotazione");
let Utente = require("../model/Utente");
let Struttura = require("../model/Struttura");
let generatoreFasce = require("../utils/generatoreFasce");

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

router.post("/effettuaPrenotazione", [
    body("idStruttura")
    .custom(async (value) =>{
        await Struttura.findByPk(value)
        .then((result) =>{
            if(!result)
                throw new Error("Struttura non esistente");
        })
    }),
    body("fascia")
    .matches(validazione.fasciaOraria)
    .withMessage("Formato fascia oraria non valido!").bail()
    .custom(async (value, { req }) =>{
        let strut;
        try{
            strut =  await Struttura.findByPk(req.body.idStruttura);
        }
        catch(err){
            console.log(err);
        }
        let listaFasce = generatoreFasce.getListaFasce(strut.oraInizioMattina, strut.oraFineMattina, strut.oraInizioPomeriggio, strut.oraFinePomeriggio, strut.durataPerFascia);
        if(!listaFasce.includes(value))
            throw new Error("Fascia oraria non valida!")
    }),
    body("idUtente")
    .custom(async (value) =>{
        await Utente.findByPk(value)
        .then((result) =>{
            if(!result)
                throw new Error("Utente non esistente");
        })
    }),
    body("intestatarioCarta")
    .matches(validazione.nome)
    .withMessage("Formato nome non valido"),
    body("numeroCarta")
    .matches(validazione.numeroCarta)
    .withMessage("Formato numero carta non valido"),
    body("cvvCarta")
    .matches(validazione.cvvCarta)
    .withMessage("Formato CVV non valido"),
    body("dataPrenotazione")
    .matches(validazione.data)
    .withMessage("Formato data prenotazione non valido").bail()
    .custom(async (value, { req }) =>{
        
        return await Chiusura.count({
            where:{
                struttura: req.body.idStruttura,
                dataChiusura:value
            }
        }).then((result) =>{
            if(result>0)
                throw new Error("Struttura chiusa nel giorno selezionato");
        })
    }).bail()
    .custom(async (value) =>{
        if(new Date(new Date().getTime()) > new Date(new Date(value))){
            throw new Error("Data prenotazione e' nel passato")
        }
    }),
    body("scadenzaCarta")
    .matches(validazione.data)
    .withMessage("Formato scadenza carta errato").bail()
    .custom(async(value) =>{
        
        if(new Date(new Date().getTime()) > new Date(new Date(value))){
            throw new Error("Carta scaduta!");
        }
    })
    
    
], prenotazioneCNT.effettuaPrenotazione);

router.get("/modificaPrenotazione", [
    query("dataPrenotazione")
    .matches(validazione.data)
    .withMessage("Formato data non vallido"),
    query("fascia")
    .matches(validazione.fasciaOraria)
    .withMessage("Formato fascia oraria non valido").bail()
    .custom(async (value, { req }) =>{
        let strut;
        try{
            strut =  await Struttura.findByPk(req.body.idStruttura);
        }
        catch(err){
            console.log(err);
        }
        let listaFasce = generatoreFasce.getListaFasce(strut.oraInizioMattina, strut.oraFineMattina, strut.oraInizioPomeriggio, strut.oraFinePomeriggio, strut.durataPerFascia);
        if(!listaFasce.includes(value))
            throw new Error("Fascia oraria non valida!")
    }),
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