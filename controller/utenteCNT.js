let Utente = require("../model/Utente");
let crypto = require("crypto");
let { validationResult } = require("express-validator");

exports.getAllUtenti = async (req, res) => {
  await Utente.findAll({
    /*include: [
     {
        model: Prenotazione,
        as: "listaPrenotazioni",
      },
      {
        model: RichiestaTesseramento,
        as: "dettagliTesseramento",
      }, 
    ],*/
  })
    .then((result) => {
      res.status(200).json({ utenti: result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.login = async (req, res) => {
   //Check consistenza parametri richiesta
   let erroriValidaizone = validationResult(req);
   if (!erroriValidaizone.isEmpty()) {
     return res.status(400).json({ error: erroriValidaizone.array() });
   }

  let pw = crypto.createHash("sha512").update(req.body.password).digest("hex");
  await Utente.findOne({ where: { email: req.body.email, password: pw } })
    .then((result) => {
      if (result && !result.isCancellato) {
        res.status(200).json({ code: 200, utente: result, success: true });
      } else {
        res.status(404).json({ code: 404, msg: "Utente non trovato", success: false });
      }
    })
    .catch((err) => {
      res.status(500).json({ code: 500, msg: err, success: false });
    });
};

/**
 * Nome metodo: Registrazione
 * Descrizione: Metodo che permette di effettuare la registrazione di un utente
 * Parametri: Informazioni utente
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.registrazione = async (req, res) => {
  //Check consistenza parametri richiesta
  let erroriValidaizone = validationResult(req);
  if (!erroriValidaizone.isEmpty()) {
    return res.status(400).json({ error: erroriValidaizone.array() });
  }

  let { ...utenteDaRegistrare } = { ...req.body };
  await Utente.create(utenteDaRegistrare)
    .then((result) => {
      if (result) {
        res.status(201).json({ codice: 201, messaggio: "Registrazione effettuata con successo", success: true});
      }
    })
    .catch((err) => {
      res.status(500).json({ codice: 500, messaggio: "Qualcosa è andato storto...", success: false});
    });
};

/**
 * Nome metodo: modificaPassword
 * Descrizione: Metodo che permette di effettuare la modifica della password di un utente
 * Parametri: Password modificata e ID Utente
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.modificaPassword = async (req, res) => {
  //Check consistenza parametri richiesta
  let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res.status(400).json({ error: erroriValidazione.array() });
  }

  let idUtente = req.body.idUtente;
  let passwordModificata = req.body.password;

  await Utente.update(
    { password: passwordModificata },
    { individualHooks: true, where: { idUtente: idUtente } }
  )
    .then((result) => {
      if (result) {
        res.status(201).json({ codice: 201, messaggio: "Password modificata con successo", success: true});
      }
    })
    .catch((err) => {
      res.status(500).json({ codice: 500, messaggio: "Qualcosa è andato storto...", success: false });
    });
};

exports.cancellaAccount = async (req, res) => {
  await Utente.update(
    { isCancellato: 1 },
    { where: { idUtente: req.query.id } }
  )
    .then(res.status(200).json({code : 200, msg : "Cancellazione riuscita", success: true}))
    .catch((err) => {
      res.status(500).json({code : 500, msg : err, success: false});
    });
};

exports.getUtenteByID = async (req, res) => {
  await Utente.findOne({
    attributes: [
      "nome",
      "cognome",
      "email",
      "codiceFiscale",
      "indirizzoResidenza",
      "numeroTelefono",
      "dataNascita",
      "nazionalita"
    ],
    where: {
      idUtente: req.query.id,
    },
  })
    .then((result) => {
      if (result) {
        res.status(200).json({ codice: 200, utente: result, success: true });
      } else {
        res.status(404).json({ codice: 404, msg: "Utente non trovato", success: false });
      }
    })
    .catch((err) => {
      res.status(500).json({ code: 500, msg: err, success: false });
    });
};
