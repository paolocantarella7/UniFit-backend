let Struttura = require("../model/Struttura");
let Chiusura = require("../model/Chiusura");
let Prenotazione = require("../model/Prenotazione");
let Utente = require("../model/Utente");
let { validationResult } = require("express-validator");

/**
 * Nome metodo: visualizzaDettagliStruttura
 * Descrizione: Metodo che permette all'amministratore di visualizzare i dettagli di una struttura
 * Parametri: ID della struttura
 * Return: Codice, Struttura richiesta/Messaggio d'errore, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.visualizzaDettagliStruttura = async (req, res) => {
    let idStruttura = Number(req.params.id);

    await Struttura.findOne({
        where: { idStruttura: idStruttura.toString() },
        include : {
            model: Chiusura,
            as: "giorniChiusura"
        }
    }).then((result) => {
        if (result && result.length !== 0) {
            res.status(200).json({ code: 200, struttura: result, success: true });
        } else {
            res
                .status(400)
                .json({ code: 400, msg: "Struttura non trovata!", success: false });
        }
    });
   
};

/**
 * Nome metodo: visualizzaPrenotazioniStruttura
 * Descrizione: Metodo che permette all'amministratore di visualizzare la lista di prenotazioni di una struttura in particolare con utente associato
 * Parametri: ID della struttura
 * Return: Codice, Lista di prenotazioni della struttura richiesta/Messaggio d'errore, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.visualizzaPrenotazioniStruttura = async (req, res) => {
    let idStruttura =  Number(req.params.id);

    await Struttura.findOne({
        include: [
            {
                model: Prenotazione,
                as: "listaPrenotazioniStruttura",
                attributes: [
                    "idPrenotazione",
                    "dataPrenotazione",
                    "oraInizio",
                    "oraFine",
                    "totalePagato",
                ],
                include: [
                    {
                        model: Utente,
                        as: "utentePrenotato",
                        attributes: ["email", "nome", "cognome"],
                    },
                ],
            },
        ],
        where: { idStruttura: idStruttura.toString() },
    }).then((result) => {
        if (result && result.length !== 0) {
            res.status(200).json({ code: 200, struttura: result, success: true });
        } else {
            res
                .status(400)
                .json({ code: 400, msg: "Struttura non trovata!", success: false });
        }
    });
    
};

/**
 * Nome metodo: visualizzaStrutture
 * Descrizione: Metodo che permette all'amministratore di visualizzare la lista di strutture disponibili
 * Parametri: void
 * Return: Codice, lista strutture, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.visualizzaStrutture = async (req, res) => {
    await Struttura.findAll().then((result) => {
        res.status(200).json({ code: 200, strutture: result, success: true });
    
    });
    
};

/**
 * Nome metodo: visualizzaStruttureDisponibili
 * Descrizione: Metodo che permette all'utente di visualizzare la lista di strutture disponibili
 * Parametri: void
 * Return: Codice, lista strutture, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.visualizzaStruttureDisponibili = async (req, res) => {
    await Struttura.findAll({where : { isCancellata: 0}}).then((result) => {
        res.status(200).json({ code: 200, strutture: result, success: true });
    });
    
};

/**
 * Nome metodo: eliminaStruttura
 * Descrizione: Metodo che permette all'amministratore di cancellare (logicamente) una struttura dal db
 * Parametri: ID Struttura
 * Return: Codice, Messaggio successo/errore, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.eliminaStruttura = async (req, res) => {
    let erroriValidazione = validationResult(req);

    if (!erroriValidazione.isEmpty()) {
        return res
            .status(400)
            .json({ code: 400, error: erroriValidazione.array(), success: false });
    }

    let idStruttura = Number(req.query.idStrutt);

    await Struttura.update(
        { isCancellata: 1 },
        { where: { idStruttura: idStruttura.toString() }, returning: true, plain: true }
    ).then(() => {
       
            
        res.status(200).json({
            code: 200,
            msg: "Cancellazione struttura riuscita",
            success: true,
        });
        
    });
   
};

exports.aggiungiStruttura = async (req, res) => {
    let erroriValidazione = validationResult(req);
    let message = "";
    if (!erroriValidazione.isEmpty()) {
        return res
            .status(400)
            .json({ code: 400, error: erroriValidazione.array(), success: false });
    }

    let { ...strutturaDaCreare } = { ...req.body };
    let dateChiusura = JSON.parse(req.body.dateChiusura).dateChiusura;

    await Struttura.create(strutturaDaCreare).then((result) => {
        
        if (dateChiusura.length != 0) {
            message = "Struttura creata con successo";
            //Ci sono date chiusure da inserire nel DB

            dateChiusura.forEach((dataChiusura) => {
                let chiusura = {
                    dataChiusura: dataChiusura,
                    struttura: result.idStruttura,
                };
                Chiusura.create(chiusura);
            });
        }
        else //caso in cui non sono state inserite date di chiusura
            message = "Struttura creata con successo";
            

        res.status(201).json({
            code: 201,
            msg: message,
            success: true,
        });
       
    });
   
};

exports.modificaStruttura = async (req, res) => {
    let erroriValidazione = validationResult(req);
    if (!erroriValidazione.isEmpty()) {
        return res
            .status(400)
            .json({ code: 400, error: erroriValidazione.array(), success: false });
    }
    let { ...strutturaDaCreare } = { ...req.body };
    let dateChiusura = JSON.parse(req.body.dateChiusura).dateChiusura;
    let idStruttura = strutturaDaCreare.idStruttura;

    delete strutturaDaCreare.idStruttura;
    await Struttura.update(strutturaDaCreare, {
        where: { idStruttura: idStruttura },
        returning: true,
        plain: true,
    }).then(() => {
        Chiusura.destroy({ where: { struttura: idStruttura } });
        dateChiusura.forEach((dataChiusura) => {
            let chiusura = {
                dataChiusura: dataChiusura,
                struttura: idStruttura,
            };
            Chiusura.create(chiusura);
           
        });

        res.status(200).json({
            code: 200,
            msg: "Struttura modificata con successo",
            success: true,
        });
    });
    
};
