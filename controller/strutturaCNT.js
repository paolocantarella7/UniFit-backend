let Struttura = require("../model/Struttura");
let Chiusura = require("../model/Chiusura");
let Prenotazione = require("../model/Prenotazione");
let Utente = require("../model/Utente");
let { validationResult } = require("express-validator");

/**
 * Nome metodo: visualizzaDettagliStruttura
 * Descrizione: Metodo che permette all'amministratore di visualizzare i dettagli di una struttura compreso giorni di chiusura
 * Parametri: ID della struttura
 * Return: Codice, Struttura richiesta/Messaggio d'errore, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
 exports.visualizzaDettagliStruttura = async (req, res) => {
    let idStruttura = req.params.id;
  
    await Struttura.findOne({
      include: {
        model: Chiusura,
        as: "giorniChiusura",
        attributes: {
          exclude: ['idChiusura', 'struttura'] 
        }
      },
      where: { idStruttura: idStruttura },
    }).then((result) => {
      if (result) {
        res.status(200).json({ code: 200, struttura: result, success: true });
      } else {
        res
          .status(400)
          .json({ code: 400, msg: "Struttura non trovata!", success: false });
      }
    });
    /* .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
      });*/
  };

  
/**
 * Nome metodo: visualizzaPrenotazioniStruttura
 * Descrizione: Metodo che permette all'amministratore di visualizzare la lista di prenotazioni di una struttura in particolare con utente associato
 * Parametri: ID della struttura
 * Return: Codice, Lista di prenotazioni della struttura richiesta/Messaggio d'errore, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
 exports.visualizzaPrenotazioniStruttura = async (req, res) => {
    let idStruttura = req.params.id;
  
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
      where: { idStruttura: idStruttura },
    }).then((result) => {
      if (result) {
        res.status(200).json({ code: 200, struttura: result, success: true });
      } else {
        res
          .status(400)
          .json({ code: 400, msg: "Struttura non trovata!", success: false });
      }
    });
    /*  .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
      });*/
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
      if (result) {
        res.status(200).json({ code: 200, strutture: result, success: true });
      }
    });
    /* .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
      });*/
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
  
    let idStruttura = req.query.idStrutt;
  
    await Struttura.update(
      { isCancellata: 1 },
      { where: { idStruttura: idStruttura }, returning: true, plain: true }
    ).then((result) => {
      if (result[1]) {
        //result contiene un campo che è 1 quando la riga è modificata, 0 altrimenti
        res.status(200).json({
          code: 200,
          msg: "Cancellazione struttura riuscita",
          success: true,
        });
      }
    });
    /* .catch((err) => {
        console.error(err);
        res.status(500).json({
          code: 500,
          msg: "Qualcosa è andato storto...",
          success: false,
        });
      });*/
  };
  
  exports.aggiungiStruttura = async (req, res) => {
    let erroriValidazione = validationResult(req);
    if (!erroriValidazione.isEmpty()) {
      return res
        .status(400)
        .json({ code: 400, error: erroriValidazione.array(), success: false });
    }
  
    let { ...strutturaDaCreare } = { ...req.body };
    let dateChiusura = JSON.parse(req.body.dateChiusura).dateChiusura;
  
    await Struttura.create(strutturaDaCreare).then((result) => {
      if (result) {
        if (dateChiusura !== []) {
          //Ci sono date chiusure da inserire nel DB
  
          dateChiusura.forEach((dataChiusura) => {
            let chiusura = {
              dataChiusura: dataChiusura,
              struttura: result.idStruttura,
            };
  
            Chiusura.create(chiusura);
          });
        }
  
        res.status(201).json({
          code: 201,
          msg: "Struttura creata con successo",
          success: true,
        });
      } /*else {
          res
            .status(400)
            .json({ code: 400, msg: "Struttura NON creata", success: false });
        }*/
    });
    /* .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
      });*/
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
          struttura: idStruttura
        };
        Chiusura.create(chiusura);
        /* .catch((err) => {
            console.error(err);
            res.status(500).json({
              code: 500,
              msg: "Qualcosa è andato storto..",
              success: false,
            });
          });*/
      });
  
      res.status(200).json({
        code: 200,
        msg: "Struttura modificata con successo",
        success: true,
      });
    });
    /*.catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
      });*/
  };
  