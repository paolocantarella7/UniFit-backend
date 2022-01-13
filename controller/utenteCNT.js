let Utente = require("../model/Utente");
let RichiestaTesseramento = require("../model/Richiesta_tesseramento");
let crypto = require("crypto");
let fs = require("fs");
let { validationResult } = require("express-validator");
let senderEmail = require("../utils/sendEmail");
let { Op } = require("sequelize");
let Fattura = require("../model/Fattura");
const { update } = require("../model/Fattura");

/**
 * Nome metodo: Login
 * Descrizione: Metodo che permette di effettuare il login
 * Parametri: email e password
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione e dati dell'utente
 * Autore : Giuseppe Scafa
 */
exports.login = async (req, res) => {
  //Check consistenza parametri richiesta
  let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res.status(400).json({code: 400, error: erroriValidazione.array(), success : false });
  }

  let pw = crypto.createHash("sha512").update(req.body.password).digest("hex");
  await Utente.findOne({ where: { email: req.body.email, password: pw } })
    .then((result) => {
      if (result && !result.isCancellato) {
        res.status(200).json({ code: 200, utente: result, success: true });
      } else {
        res
          .status(404)
          .json({ code: 404, msg: "Utente non trovato", success: false });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ code: 500, msg: "Qualcosa è andato storto...", success: false });
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
  let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res.status(400).json({ code: 400, error: erroriValidazione.array(), success : false });
  }
  let user;
  let { ...utenteDaRegistrare } = { ...req.body };

  try{
    user = await Utente.findOne({
    where:{
      codiceFiscale: utenteDaRegistrare.codiceFiscale,
      email: utenteDaRegistrare.email
    }})
  }
  catch(err){
    res.status(500).json({
      codice: 500,
      messaggio: "Qualcosa è andato storto...",
      success: false,
    });
  }

  if(user){
    await Utente.update({
      isCancellato: 0,
      password: utenteDaRegistrare.password,
      indirizzoResidenza: utenteDaRegistrare.indirizzoResidenza,
      numeroTelefono: utenteDaRegistrare.numeroTelefono,
    }, {individualHooks: true, where:{
      idUtente: user.idUtente
    }})
    .then((result) =>{
      if(result)
        res.status(201).json({
          codice: 201,
          messaggio: "Registrazione effettuata con successo",
          success: true,
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        codice: 500,
        messaggio: "Qualcosa è andato storto...",
        success: false,
      });
    });
  }

  else{
  await Utente.create(utenteDaRegistrare)
    .then((result) => {
      if (result) {
        res.status(201).json({
          codice: 201,
          messaggio: "Registrazione effettuata con successo",
          success: true,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        codice: 500,
        messaggio: "Qualcosa è andato storto...",
        success: false,
      });
    });
  }
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
    return res.status(400).json({ code: 400, error: erroriValidazione.array(), success : false});
  }

  let idUtente = req.body.idUtente;
  let passwordModificata = req.body.password;

  await Utente.update(
    { password: passwordModificata },
    { individualHooks: true, where: { idUtente: idUtente } }
  )
    .then((result) => {
      if (result) {
        res.status(201).json({
          codice: 201,
          messaggio: "Password modificata con successo",
          success: true,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        codice: 500,
        messaggio: "Qualcosa è andato storto...",
        success: false,
      });
    });
};

/**
 * Nome metodo: Cancella Account
 * Descrizione: Metodo che permette di cancellare l'account di un utente
 * Parametri: Id utente
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.cancellaAccount = async (req, res) => {
  let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res.status(400).json({ code: 400, error: erroriValidazione.array(), success : false });
  }

  await Utente.update(
    { isCancellato: 1 },
    { where: { idUtente: req.query.id } }
  )
    .then(
      res
        .status(200)
        .json({ code: 200, msg: "Cancellazione riuscita", success: true })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
    });
};

/**
 * Nome metodo: getUtenteByID
 * Descrizione: Metodo che permette di ottenere le informazioni di un utente
 * Parametri: Id utente
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione e dati dell'utente
 * Autore : Giuseppe Scafa
 */
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
      "nazionalita",
    ],
    where: {
      idUtente: req.query.id,
    },
  })
    .then((result) => {
      if (result) {
        res.status(200).json({ codice: 200, utente: result, success: true });
      } else {
        res
          .status(400)
          .json({ codice: 400, msg: "Utente non trovato", success: false });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ code: 500, msg: "Qualcosa è andato storto...", success: false });
    });
};

/**
 * Nome metodo: effettuaTesseramento
 * Descrizione: Metodo che permette di creare una richiesta di tesseramento
 * Parametri: dati dell'utente e file
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.effettuaTesseramento = async (req, res) => {

  let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res.status(400).json({ code: 400, error: erroriValidazione.array(), success : false });
  }

  let filePath = "/static/richieste_tesseramento/" + req.body.idUtente;
  let nuovaRichiesta = {
    dataRichiesta: new Date().toISOString().substring(0, 10),
    tipologiaTesseramento: req.body.tipologiaTesseramento,
    statusRichiesta: "Eseguita",
    certificatoAllegatoPath: filePath,
    utente: req.body.idUtente,
  };

  if (req.body.tipologiaTesseramento === "Interno")
    nuovaRichiesta.prezzoTesseramento = 12.00;
  else nuovaRichiesta.prezzoTesseramento = 20.00;

  await RichiestaTesseramento.create(nuovaRichiesta)
    .then((result) => {
      if (result) {
        fs.mkdir("." + filePath, (err) => {
          if (err) {
            return res.status(400).json({
              codice: 400,
              msg: "Errore nella creazione della directory",
              success: false,
            });
          } else {
            req.files.file.mv("." + filePath + "/certificato.pdf");
            let nuovaFattura = {
              intestatario: req.body.intestatarioCarta,
              totalePagamento: result.prezzoTesseramento,
              dataRilascio: new Date(new Date().getTime()).toISOString().substring(0,10),
              statusFattura: "Pagata",
              richiesta: result.idRichiesta_tesseramento
          };

           Fattura.create(nuovaFattura)
          .then((reslt) =>{
            if(reslt)
              return res.status(200).json({code: 200, msg:"Operazione effettuata con successo", success:true});
          })
          .catch((error) =>{
            console.log("bp2");
            console.log(error);
            return res.status(400).json({ codice: 400, msg: error, success: false });

          })

          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({ codice: 400, msg: err, success: false });
    });
};

/**
 * Nome metodo: recuperoPassword
 * Descrizione: Metodo che permette di effettuare una richiesta di recupero della password
 * Parametri: email utente
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.recuperoPassword = async (req, res) => {
  //Check consistenza parametri richiesta
  let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res.status(400).json({ code: 400, error: erroriValidazione.array(), success : false});
  }

  let emailRicevuta = req.body.email;
  let token = crypto
    .createHash("sha512")
    .update(emailRicevuta + new Date().toISOString())
    .digest("hex");

  Utente.update(
    //Il token dura 24h
    {
      tokenRecuperoPassword: token,
      dataScadenzaTokenRP: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .substring(0, 10),
    },
    { where: { email: emailRicevuta } }
  )
    .then(async (result) => {
      if (result) {
        try {
          await senderEmail.sendEmailWithToken(emailRicevuta, token);
          res
            .status(200)
            .json({
              code: 200,
              msg: "Invio email di recupero riuscito",
              success: true,
            })
            .end();
        } catch (err) {
          console.error(err);
          res.status(500).json({
            code: 500,
            msg: "Invio email di recupero NON riuscito",
            success: false,
          });
        }
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ code: 500, msg: err, success: false });
    });
};

/**
 * Nome metodo: resettaPasswordPerRecupero
 * Descrizione: Metodo che permette di resettare la password dopo aver chiesto il recupero
 * Parametri: password modificata
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.resettaPasswordPerRecupero = async (req, res) => {
  let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res.status(400).json({ code: 400, error: erroriValidazione.array(), success : false});
  }

  let token = req.params.token;
  let passwordModificata = req.body.password;

  await Utente.findOne({
    where: {
      tokenRecuperoPassword: token,
      dataScadenzaTokenRP: {
        [Op.gt]: new Date().toISOString().substring(0, 10),
      }, //Data Scadenza > DataOggi
    },
  })
    .then((result) => {
      if (!result) {
        res
          .status(400)
          .json({
            code: 400,
            msg: "Token scaduto o non valido",
            success: false,
          })
          .end();
      } else {
         Utente.update(
          {
            password: passwordModificata,
            tokenRecuperoPassword: null,
            dataScadenzaTokenRP: null,
          }, //rendo di nuovo recuperabile la password
          { individualHooks: true, where: { tokenRecuperoPassword: token } }
        )
          .then((result) => {
            if (result) {
              res.status(200).json({
                codice: 200,
                messaggio: "Password modificata con successo",
                success: true,
              });
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ code: 500, msg: "Qualcosa è andato storto..", success: false });
    });
};
