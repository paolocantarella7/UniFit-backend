let express = require("express");
let router = express.Router();
let utenteController = require("../controller/UtenteCNT");
let Utente = require("../model/Utente");
let { body } = require("express-validator");

let validazione = {
  email: /[a-zA-Z0-9\._-]+[@][a-zA-Z0-9\._-]+[.][a-zA-Z]{2,6}/,
  password: /[A-Z0-9a-z.!@_-]{8,16}/,
  nome: /[A-zÀ-ù ‘-]{2,45}$/,
  codiceFiscale: /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/,
  indirizzo: /[0-9A-zÀ-ù ‘-]{2,30}$/,
  telefono: /\d{10}$/,
  cognome: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  data: /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/,
  dataLimite: new Date().toDateString(),
};

router.get("/all", utenteController.getAllUtenti);

/* ----------- Registrazione ------------*/
router.post(
  "/registrati",
  [
    body("email")
      .matches(validazione.email)
      .withMessage("Formato e-mail non valido")
      .custom(async (value) => {
        return await Utente.findOne({ where: { email: value } }).then(
          (user) => {
            if (user) {
              throw new Error("E-mail già in uso!");
            }
          }
        );
      }),
    body("codiceFiscale")
      .matches(validazione.codiceFiscale)
      .withMessage("Formato codice fiscale non valido")
      .custom(async (value) => {
        return await Utente.findOne({ where: { codiceFiscale: value } }).then(
          (user) => {
            if (user) {
              throw new Error("Codice fiscale già presente nel database!");
            }
          }
        );
      }),
    body("nome")
      .matches(validazione.nome)
      .withMessage("Formato nome non valido"),
    body("cognome")
      .matches(validazione.cognome)
      .withMessage("Formato cognome non valido"),
    body("password")
      .matches(validazione.password)
      .withMessage("Formato password non valido"),
    body("dataNascita")
      .matches(validazione.data)
      .withMessage("Formato data non valido, formato supportato yyyy-mm-gg")
      .isBefore(validazione.dataLimite)
      .withMessage(
        "Formato data di nascita non valido, viaggiatore nel tempo?"
      ),
    body("indirizzoResidenza")
      .matches(validazione.indirizzo)
      .withMessage("Formato indirizzo non valido"),
    body("nazionalita")
      .matches(validazione.nome)
      .withMessage("Formato nazionalità non valido"),
    body("numeroTelefono")
      .matches(validazione.telefono)
      .withMessage("Formato numero telefono non valido"),
  ],
  utenteController.registrazione
);

/* ----------- Modifica password -----------*/
router.post(
  "/modificaPassword",
  [
    body("password")
      .matches(validazione.password)
      .withMessage("Formato password non valido"),
    body("passwordConferma").custom(async (confirmPassword, { req }) => {
      let password = req.body.password;
      // Se le password non coincidono
      // la modifica non può andare a buon fine e si lancia un errore
      if (password !== confirmPassword) {
        throw new Error("Le password devono coincidere");
      }
    }),
  ],
  utenteController.modificaPassword
);

router.post(
  "/login",
  [
    body("email")
      .matches(validazione.email)
      .withMessage("Formato e-mail non valido"),
    body("password")
      .matches(validazione.password)
      .withMessage("Formato password non valido"),
  ],
  utenteController.login
);

router.get("/cancellaAccount", utenteController.cancellaAccount);
router.get("/datiPersonali", utenteController.getUtenteByID);
router.post("/effettuaTesseramento", utenteController.effettuaTesseramento);

module.exports = router;
