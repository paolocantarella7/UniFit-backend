let express = require("express");
let router = express.Router();
let prenotazioneCNT = require("../controller/prenotazioneCNT");
let strutturaCNT = require("../controller/strutturaCNT");
let Chiusura = require("../model/Chiusura");
let { query } = require("express-validator");
let { body } = require("express-validator");
let Prenotazione = require("../model/Prenotazione");
let Utente = require("../model/Utente");
let Struttura = require("../model/Struttura");
let generatoreFasce = require("../utils/generatoreFasce");
let moment = require("moment");

let validazione = {
    email: /[a-zA-Z0-9\._-]+[@][a-zA-Z0-9\._-]+[.][a-zA-Z]{2,6}/,
    nome: /[A-zÀ-ù ‘-]{2,45}$/,
    numeroCarta: /^([0-9]{16})$/,
    cvvCarta: /^[0-9]{3,4}$/,
    data: /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/,
    fasciaOraria: /^[0-9]+:[0-9]+-[0-9]+:[0-9]+$/,
};

router.post(
    "/checkPosti",
    [
        body("idUtente")
            .custom(async (value) => {
                await Utente.findByPk(value).then((result) => {
                    if (!result || (result && result.isCancellato))
                        throw new Error("Utente non esistente");
                    if (result && !result.isTesserato)
                        throw new Error("Utente non tesserato!");
                });
            })
            .bail(),
        body("idStruttura").custom(async (value) => {
            await Struttura.findByPk(value).then((result) => {
                if (!result || result.isCancellata)
                    throw new Error("Struttura non esistente");
            });
        }),
        body("fascia")
            .matches(validazione.fasciaOraria)
            .withMessage("Formato fascia oraria non valido!")
            .bail()
            .custom(async (value, { req }) => {
                let strut;

                strut = await Struttura.findByPk(req.body.idStruttura);

                let listaFasce = generatoreFasce.getListaFasce(
                    strut.oraInizioMattina,
                    strut.oraFineMattina,
                    strut.oraInizioPomeriggio,
                    strut.oraFinePomeriggio,
                    strut.durataPerFascia
                );
                if (!listaFasce.includes(value))
                    throw new Error("Fascia oraria non valida!");
            }).bail(),
        body("dataPrenotazione")
            .matches(validazione.data)
            .withMessage("Formato data prenotazione non valido")
            .bail()
            .custom(async (value, { req }) => {
                return await Chiusura.count({
                    where: {
                        struttura: req.body.idStruttura,
                        dataChiusura: value,
                    },
                }).then((result) => {
                    if (result > 0)
                        throw new Error("Struttura chiusa nel giorno selezionato!");
                });
            })
            .bail()
            .custom(async (value, { req }) => {
                let dataOggi = moment().format("YYYY-MM-DDTHH:mm:ssZ");
                let oraInizio = req.body.fascia.split("-")[0];
                let dataPrenotazione = moment(
                    new Date(value).setHours(
                        oraInizio.split(":")[0],
                        oraInizio.split(":")[1],
                        0,
                        0
                    )
                ).format("YYYY-MM-DDTHH:mm:ssZ");

                if (moment(dataPrenotazione).isBefore(dataOggi)) {
                    throw new Error("Data o fascia oraria non prenotabile!");
                }
            })
    ],
    prenotazioneCNT.checkPrenotazioneEffettuabile
);

router.get(
    "/prenotazioniUtente",
    [
        query("idUtente").custom(async (value) => {
            await Utente.findByPk(value).then((result) => {
                if (!result || result.isCancellato)
                    throw new Error("Utente non esistente!");
            });
        }),
    ],
    prenotazioneCNT.getPrenotazioniByUtente
);

router.get(
    "/getFasce",
    [
        query("idStruttura").custom(async (value) => {
            await Struttura.findByPk(value).then((result) => {
                if (!result || result.isCancellata)
                    throw new Error("Struttura non esistente");
            });
        }),
    ],
    prenotazioneCNT.getFasceOrarie
);

router.get(
    "/struttureDisponibili",
    strutturaCNT.visualizzaStruttureDisponibili
);

router.post(
    "/effettuaPrenotazione",
    [
        body("idUtente")
            .custom(async (value) => {
                await Utente.findByPk(value).then((result) => {
                    if (!result || (result && result.isCancellato))
                        throw new Error("Utente non esistente");
                    if (result && !result.isTesserato)
                        throw new Error("Utente non tesserato!");
                });
            })
            .bail(),
        body("idStruttura").custom(async (value) => {
            await Struttura.findByPk(value).then((result) => {
                if (!result || result.isCancellata)
                    throw new Error("Struttura non esistente");
            });
        }),
        body("fascia")
            .matches(validazione.fasciaOraria)
            .withMessage("Formato fascia oraria non valido!")
            .bail()
            .custom(async (value, { req }) => {
                let strut;

                strut = await Struttura.findByPk(req.body.idStruttura);

                let listaFasce = generatoreFasce.getListaFasce(
                    strut.oraInizioMattina,
                    strut.oraFineMattina,
                    strut.oraInizioPomeriggio,
                    strut.oraFinePomeriggio,
                    strut.durataPerFascia
                );
                if (!listaFasce.includes(value))
                    throw new Error("Fascia oraria non valida!");
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
            .withMessage("Formato data prenotazione non valido")
            .bail()
            .custom(async (value, { req }) => {
                return await Chiusura.count({
                    where: {
                        struttura: req.body.idStruttura,
                        dataChiusura: value,
                    },
                }).then((result) => {
                    if (result > 0)
                        throw new Error("Struttura chiusa nel giorno selezionato");
                });
            })
            .bail()
            .custom(async (value, { req }) => {
                let dataOggi = moment().format("YYYY-MM-DDTHH:mm:ssZ");
                let oraInizio = req.body.fascia.split("-")[0];
                let dataPrenotazione = moment(
                    new Date(value).setHours(
                        oraInizio.split(":")[0],
                        oraInizio.split(":")[1],
                        0,
                        0
                    )
                ).format("YYYY-MM-DDTHH:mm:ssZ");

                if (moment(dataPrenotazione).isBefore(dataOggi)) {
                    throw new Error("Data o fascia oraria non prenotabile!");
                }
            }),
        body("scadenzaCarta")
            .matches(validazione.data)
            .withMessage("Formato scadenza carta errato")
            .bail()
            .custom(async (value) => {
                if (new Date(new Date().getTime()) > new Date(new Date(value))) {
                    throw new Error("Carta scaduta!");
                }
            }),
    ],
    prenotazioneCNT.effettuaPrenotazione
);

router.post(
    "/modificaPrenotazione",
    [
        body("idStruttura").custom(async (value) => {
            await Struttura.findOne({
                where: {
                    idStruttura: value,
                },
            }).then((result) => {
                if (!result) throw new Error("Prenotazione non esistente");
            });
        }),
        body("dataPrenotazione")
            .matches(validazione.data)
            .withMessage("Formato data non vallido"),
        body("fascia")
            .matches(validazione.fasciaOraria)
            .withMessage("Formato fascia oraria non valido")
            .bail()
            .custom(async (value, { req }) => {
                let strut;
                strut = await Struttura.findByPk(req.body.idStruttura);
                let listaFasce = generatoreFasce.getListaFasce(
                    strut.oraInizioMattina,
                    strut.oraFineMattina,
                    strut.oraInizioPomeriggio,
                    strut.oraFinePomeriggio,
                    strut.durataPerFascia
                );
                if (!listaFasce.includes(value))
                    throw new Error("Fascia oraria non valida!");
            }).bail()
            .custom(async (value, { req }) => {
                let dataOggi = moment().format("YYYY-MM-DDTHH:mm:ssZ");
                let oraInizio = value.split("-")[0];
                let dataPrenotazione = moment(
                    new Date(req.body.dataPrenotazione).setHours(
                        oraInizio.split(":")[0],
                        oraInizio.split(":")[1],
                        0,
                        0
                    )
                ).format("YYYY-MM-DDTHH:mm:ssZ");

                if (moment(dataPrenotazione).isBefore(dataOggi)) {
                    throw new Error("Data o fascia oraria non prenotabile!");
                }
            }),
        body("idPrenotazione").custom(async (value, { req }) => {
            await Prenotazione.findOne({
                where: {
                    idPrenotazione: value,
                    dataPrenotazione: req.body.dataPrenotazione,
                    struttura: req.body.idStruttura,
                },
            }).then((result) => {
                if (!result) throw new Error("Prenotazione non esistente");

                let oraInizio = result.oraInizio;
                let dataPrenotazione = new Date(
                    new Date(result.dataPrenotazione).setHours(
                        oraInizio.split(":")[0],
                        0,
                        0,
                        0
                    )
                );
                let dataOggi = new Date();
                if (result && Date.parse(dataPrenotazione) < Date.parse(dataOggi)) {
                    throw new Error("Prenotazione scaduta!");
                }
            });
        }),
    ],
    prenotazioneCNT.modificaPrenotazione
);

router.post(
    "/cancellaPrenotazione",
    [
        body("idUtente").custom(async (value) => {
            await Utente.findByPk(value).then((result) => {
                if (!result || (result && result.isCancellato))
                    throw new Error("Utente non esistente");
                if (result && !result.isTesserato)
                    throw new Error("Utente non tesserato!");
            });
        }),
        body("idPrenotazione").custom(async (value) => {
            await Prenotazione.findByPk(value).then((result) => {
                if (!result) throw new Error("Prenotazione non esistente");

                let oraInizio = result.oraInizio;
                let dataPrenotazione = new Date(
                    new Date(result.dataPrenotazione).setHours(
                        oraInizio.split(":")[0],
                        0,
                        0,
                        0
                    )
                );
                let dataOggi = new Date();
                if (result && Date.parse(dataPrenotazione) < Date.parse(dataOggi)) {
                    throw new Error("Prenotazione scaduta!");
                }
            });
        }),
    ],
    prenotazioneCNT.cancellaPrenotazione
);

router.get("/dettagliPrenotazione", prenotazioneCNT.getPrenotazioneById);

module.exports = router;
