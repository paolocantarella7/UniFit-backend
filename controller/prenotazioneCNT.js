let Utente = require("../model/Utente");
let RichiestaTesseramento = require("../model/Richiesta_tesseramento");
let Prenotazione = require("../model/Prenotazione");
let Chiusura = require("../model/Chiusura");
let Struttura = require("../model/Struttura");
let Fattura = require("../model/Fattura");
let { Sequelize } = require("../singleton/singleton");
let senderEmail = require("../utils/sendEmail");
let { validationResult } = require("express-validator");
let generatoreFasce = require("../utils/generatoreFasce");
let moment = require("moment");

/**
 * Nome metodo: getPrenotazioniByUtente
 * Descrizione: Metodo che permette di ottenere le prenotazioni effettuate da un utente
 * Parametri: idUtente
 * Return: Codice, lista prenotazioni, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.getPrenotazioniByUtente = async (req, res) => {
  let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res
      .status(400)
      .json({ code: 400, error: erroriValidazione.array(), success: false });
  }

  await Prenotazione.findAll({
    include: {
      model: Struttura,
      as: "strutturaPrenotata",
      attributes: ["nome"],
    },
    where: { utente: req.query.idUtente },
  }).then((result) => {
    if (result)
      res.status(200).json({ code: 200, prenotazioni: result, success: true });
  });
};

/**
 * Nome metodo: getFasceOrarie
 * Descrizione: Metodo che permette di ottenere le fasce orarie prenotabili
 * Parametri: idStruttura
 * Return: Codice, lista fasce, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.getFasceOrarie = async (req, res) => {
  let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res
      .status(400)
      .json({ code: 400, error: erroriValidazione.array(), success: false });
  }

  let listaFasce;
  await Struttura.findByPk(req.query.idStruttura, {
    attributes: [
      "oraInizioMattina",
      "oraFineMattina",
      "oraInizioPomeriggio",
      "oraFinePomeriggio",
      "durataPerFascia",
    ],
  }).then((result) => {
    if (result) {
      listaFasce = generatoreFasce.getListaFasce(
        result.oraInizioMattina,
        result.oraFineMattina,
        result.oraInizioPomeriggio,
        result.oraFinePomeriggio,
        result.durataPerFascia
      );
      res
        .status(200)
        .json({ code: 200, listaFasce: listaFasce, success: true });
    }
  });
};

/**
 * Nome metodo: effettuaPrenotazione
 * Descrizione: Metodo che permette di effettuare una prenotazione
 * Parametri: informazioni prenotazione
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.effettuaPrenotazione = async (req, res) => {
  let erroriValidazione = validationResult(req);
  let capacita, prezzo, postiOccupati;
  if (!erroriValidazione.isEmpty()) {
    return res
      .status(400)
      .json({ code: 400, error: erroriValidazione.array(), success: false });
  }

  await Struttura.findByPk(req.body.idStruttura, {
    attributes: ["capacitaPerFascia", "prezzoPerFascia"],
  }).then((result) => {
    if (result) {
      capacita = result.capacitaPerFascia;
      prezzo = result.prezzoPerFascia;
    }
  });

  let fasciaOraria = req.body.fascia.split("-");
  await Prenotazione.count({
    where: {
      struttura: req.body.idStruttura,
      dataPrenotazione: req.body.dataPrenotazione,
      oraInizio: fasciaOraria[0],
      oraFine: fasciaOraria[1],
    },
  }).then((result) => {
    postiOccupati = result;
  });

  if (postiOccupati < capacita) {
    let newPrenotazione = {
      dataPrenotazione: req.body.dataPrenotazione,
      oraInizio: fasciaOraria[0],
      oraFine: fasciaOraria[1],
      totalePagato: prezzo,
      utente: req.body.idUtente,
      struttura: req.body.idStruttura,
    };
    await Prenotazione.create(newPrenotazione).then(async (result) => {
      if (result) {
        let nuovaFattura = {
          intestatario: req.body.intestatarioCarta,
          totalePagamento: result.totalePagato,
          dataRilascio: new Date(new Date().getTime())
            .toISOString()
            .substring(0, 10),
          statusFattura: "Pagata",
          prenotazione: result.idPrenotazione,
        };
        await Fattura.create(nuovaFattura).then((reslt) => {
          if (reslt)
            return res.status(200).json({
              code: 200,
              msg: "Operazione effettuata con successo",
              success: true,
            });
        });
      }
    });
  } else {
    return res
      .status(400)
      .json({ code: 400, msg: "Fascia oraria piena!", success: false });
  }
};

/**
 * Nome metodo: modificaPrenotazione
 * Descrizione: Metodo che permette di modificare una prenotazione
 * Parametri: nuovi dati prenotazione, idStruttura e idPrenotazione
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */
exports.modificaPrenotazione = async (req, res) => {
  let erroriValidazione = validationResult(req);
  let capacita, postiOccupati;

  if (!erroriValidazione.isEmpty()) {
    return res
      .status(400)
      .json({ code: 400, error: erroriValidazione.array(), success: false });
  }

  await Struttura.findByPk(req.body.idStruttura, {
    attributes: ["capacitaPerFascia"],
  }).then(async (result) => {
    capacita = result.capacitaPerFascia;
  });

  let fasciaOraria = req.body.fascia.split("-");
  await Prenotazione.count({
    where: {
      struttura: req.body.idStruttura,
      dataPrenotazione: req.body.dataPrenotazione,
      oraInizio: fasciaOraria[0],
      oraFine: fasciaOraria[1],
    },
  }).then(async (result) => {
    postiOccupati = result;

    if (postiOccupati < capacita) {
      await Prenotazione.update(
        {
          oraInizio: fasciaOraria[0],
          oraFine: fasciaOraria[1],
        },
        {
          where: {
            idPrenotazione: req.body.idPrenotazione,
          },
        }
      ).then(() => {
        return res.status(200).json({
          code: 200,
          msg: "Modifica effettuata con successo!",
          success: true,
        });
      });
    } else {
      return res
        .status(400)
        .json({ code: 400, msg: "Fascia oraria piena!", success: false });
    }
  });
};
/**
 * Nome metodo: cancellaPrenotazione
 * Descrizione: Metodo che permette di cancellare una prenotazione
 * Parametri: email utente, idPrenotazione e importo
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.cancellaPrenotazione = async (req, res) => {
  let erroriValidazione = validationResult(req);
  let reslt;
  if (!erroriValidazione.isEmpty()) {
    return res
      .status(400)
      .json({ code: 400, error: erroriValidazione.array(), success: false });
  }

  reslt = await Prenotazione.findByPk(req.body.idPrenotazione, {
    attributes: ["totalePagato", "dataPrenotazione", "oraInizio"],
  });

  let dataPrenotazione = moment(
    new Date(reslt.dataPrenotazione).setHours(
      reslt.oraInizio.split(":")[0],
      0,
      0,
      0
    )
  );
  let dataOggi = moment(new Date());
  let utentePerEmail;

  await Prenotazione.destroy({
    where: {
      idPrenotazione: req.body.idPrenotazione,
    },
  }).then(async (result) => {
    if (result) {
      utentePerEmail = await Utente.findByPk(req.body.idUtente, {
        attributes: ["email"],
      });

      if (
        dataPrenotazione.diff(dataOggi, "hours") > 24 //Rimborso soltanto se la data si differenzia di 24h dalla data prenotata
      ) {
        effettuaRimborso(utentePerEmail.email, reslt.totalePagato).then(() => {
          return res.status(200).json({
            code: 200,
            msg: "Cancellazione con rimborso avvenuta con successo!",
            success: true,
          });
        });
      } else {
        return res.status(200).json({
          code: 200,
          msg: "Cancellazione senza rimborso avvenuta con successo!",
          success: true,
        });
      }
    }
  });
};

/**
 * Nome metodo: effettuaRimborso
 * Descrizione: Metodo che genere una email di rimborso
 * Parametri: email utente e importo
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */
let effettuaRimborso = async (email, importo) => {
  await senderEmail.sendRimborsoEmail(email, importo);
};


/**
 * Nome metodo: getPrenotazioneById
 * Descrizione: Metodo che permette di ottenere i dettagli di una prenotazione
 * Parametri: idPrenotazione
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */
exports.getPrenotazioneById = async (req, res) =>{
  let idPrenotazione = req.query.idPrenotazione;
  Prenotazione.findByPk(idPrenotazione)
  .then((result) =>{
    res.status(200).json({code: 200, listaPrenotazioni: result, success: true});
  })
  .catch((err) =>{
    res.status(400).json({code:400, msg:"Errore", success: false});
  });
}