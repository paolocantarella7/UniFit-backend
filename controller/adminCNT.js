let Struttura = require("../model/Struttura");
let Chiusura = require("../model/Chiusura");
let Prenotazione = require("../model/Prenotazione");
let Utente = require("../model/Utente");
let Richiesta_tesseramento = require("../model/Richiesta_tesseramento");
let { validationResult } = require("express-validator");

/**
 * Nome metodo: visualizzaStrutture
 * Descrizione: Metodo che permette all'amministratore di visualizzare la lista di strutture disponibili
 * Parametri: void
 * Return: Codice, lista strutture, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.visualizzaStrutture = async (req, res) => {
  await Struttura.findAll()
    .then((result) => {
      if (result) {
        res.status(200).json({ code: 200, strutture: result, success: true });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
    });
};

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
    },
    where: { idStruttura: idStruttura },
  })
    .then((result) => {
      if (result) {
        res.status(200).json({ code: 200, struttura: result, success: true });
      } else {
        res
          .status(404)
          .json({ code: 404, msg: "Struttura non trovata!", success: false });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
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
  })
    .then((result) => {
      if (result) {
        res.status(200).json({ code: 200, struttura: result, success: true });
      } else {
        res
          .status(404)
          .json({ code: 404, msg: "Struttura non trovata!", success: false });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
    });
};

/**
 * Nome metodo: visualizzaUtentiRegistrati
 * Descrizione: Metodo che permette all'amministratore di visualizzare la lista di utenti registrati
 * Parametri: void
 * Return: Codice, lista utenti, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.visualizzaUtentiRegistrati = async (req, res) => {
  await Utente.findAll({
    attributes: [
      "idUtente",
      "nome",
      "cognome",
      "email",
      "isCancellato",
      "isTesserato",
    ],
    where: { isAdmin: 0 }, //solo utenti registrati
  })
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ code: 200, utentiRegistrati: result, success: true });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        code: 500,
        msg: "Qualcosa è andato storto...",
        success: false,
      });
    });
};

/**
 * Nome metodo: visualizzaRichiesteTesseramento
 * Descrizione: Metodo che permette all'amministratore di visualizzare la lista delle richieste di tesseramento DA VALIDARE
 * Parametri: void
 * Return: Codice, lista utenti, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.visualizzaRichiesteTesseramento = async (req, res) => {
  await Richiesta_tesseramento.findAll({
    attributes: [
      "idRichiesta_tesseramento",
      "tipologiaTesseramento",
      "dataRichiesta",
      "statusRichiesta",
      "certificatoAllegatoPath",
    ],
    include: {
      model: Utente,
      as: "utenteRichiedente",
      attributes: [
        "idUtente",
        "nome",
        "cognome",
        "email",
        "isCancellato",
        "isTesserato",
      ],
    },
    where: { statusRichiesta: "Eseguita" }, //solo le richiesta da valutare
  })
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ code: 200, richiesteTess: result, success: true });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        code: 500,
        msg: "Qualcosa è andato storto...",
        success: false,
      });
    });
};

/**
 * Nome metodo: validaTesseramento
 * Descrizione: Metodo che permette all'amministratore di validare(accettare o rifiutare) la richiesta di tesseramento di un utente
 * Parametri: ID Utente, ID Richiesta Tesseramento e azione scelta (rifiuto, accettazione)
 * Return: Codice, Messaggio successo/errore, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.validaTesseramento = async (req, res) => {
  let erroriValidazione = validationResult(req);

  if (!erroriValidazione.isEmpty()) {
    return res
      .status(400)
      .json({ code: 400, error: erroriValidazione.array(), success: false });
  }

  let idUtente = req.body.idUtente;
  let idRichiestaTess = req.body.idReqTess;
  let azione = req.body.azione;

  if (azione === "accetta") {
    //caso di accettazione richiesta
    await Richiesta_tesseramento.update(
      { statusRichiesta: "Accettata" },
      {
        where: { idRichiesta_tesseramento: idRichiestaTess, utente: idUtente },
        returning: true,
        plain: true,
      }
    )
      .then((result) => {
        if (result[1]) {
          Utente.update({ isTesserato: 1 }, { where: { idUtente: idUtente } })
            .then(
              res.status(200).json({
                code: 200,
                msg: "Richiesta di tesseramento accettata con successo!",
                success: true,
              })
            )
            .catch((err) => {
              console.error(err);
              res.status(500).json({
                code: 500,
                msg: "Qualcosa è andato storto...",
                success: false,
              });
            });
        } else {
          res.status(400).json({
            code: 400,
            msg: "Richiesta di tesseramento NON validata!",
            success: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          code: 500,
          msg: "Qualcosa è andato storto...",
          success: false,
        });
      });
  } //rifiuto, la richiesta va cancellata
  else {
    await Richiesta_tesseramento.destroy({
      where: { idRichiesta_tesseramento: idRichiestaTess, utente: idUtente },
    })
      .then(
        res.status(200).json({
          code: 200,
          msg: "Richiesta di tesseramento rifiutata con successo!",
          success: true,
        })
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          code: 500,
          msg: "Qualcosa è andato storto...",
          success: false,
        });
      });
  }
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
  )
    .then((result) => {
      if (result[1]) {
        //result contiene un campo che è 1 quando la riga è modificata, 0 altrimenti
        res.status(200).json({
          code: 200,
          msg: "Cancellazione struttura riuscita",
          success: true,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        code: 500,
        msg: "Qualcosa è andato storto...",
        success: false,
      });
    });
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

  await Struttura.create(strutturaDaCreare)
    .then((result) => {
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
      } else {
        res
          .status(400)
          .json({ code: 400, msg: "Struttura NON creata", success: false });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
    });
};

exports.modificaStruttura = async (req, res) => {
  let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res
      .status(400)
      .json({ code: 400, error: erroriValidazione.array(), success: false });
  }
  let idStruttura = req.params.idStruttura;
  let { ...strutturaDaCreare } = { ...req.body };
  let dateChiusura = JSON.parse(req.body.dateChiusura).dateChiusura;

  await Struttura.update(strutturaDaCreare, {
    where: { idStruttura: idStruttura },
    returning: true,
    plain: true,
  })
    .then(() => {
      Chiusura.destroy({ where: { struttura: idStruttura } });
      dateChiusura.forEach((dataChiusura) => {
        let chiusura = {
          dataChiusura: dataChiusura,
          struttura: idStruttura,
        };
        Chiusura.create(chiusura).catch((err) => {
          console.error(err);
          res.status(500).json({
            code: 500,
            msg: "Qualcosa è andato storto..",
            success: false,
          });
        });
      });

      res.status(201).json({
        code: 201,
        msg: "Struttura modificata con successo",
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
    });
};
