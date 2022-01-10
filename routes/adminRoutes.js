const express = require("express");
const router = express.Router();
const adminCNT = require("../controller/adminCNT");
let { body } = require("express-validator");
let moment = require("moment");

let validazione = {
  nomeStruttura: /[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  prezzo: /^\d{0,8}[.]?\d{1,2}$/,
  capacita: /^\b([1-9]|[1-9][0-9]|100)\b/,
  orario: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
  data: /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/,
  dataLimite: new Date().setHours(0, 0, 0, 0),
  orarioMattinaLimite: new Date().setHours(7, 0, 0, 0), //07:00:00
  orarioPomeriggioLimite: new Date().setHours(21, 0, 0, 0), //21:00:00
};

router.get("/strutture/visualizzastrutture", adminCNT.visualizzaStrutture);
router.get(
  "/strutture/dettagliStruttura/:id",
  adminCNT.visualizzaDettagliStruttura
);
router.get(
  "/strutture/prenotazioniStruttura/:id",
  adminCNT.visualizzaPrenotazioniStruttura
);
router.get("/utenti/visualizzautenti", adminCNT.visualizzaUtentiRegistrati);
router.get(
  "/reqtess/visualizzareqtess",
  adminCNT.visualizzaRichiesteTesseramento
);
router.post("/reqtess/validatesseramento", adminCNT.validaTesseramento);
router.get("/strutture/eliminastruttura", adminCNT.eliminaStruttura);

router.post(
  "/strutture/aggiungistruttura",
  [
    body("nome")
      .matches(validazione.nomeStruttura)
      .withMessage("Formato nome struttura non valido")
      .isLength({ max: 35 })
      .withMessage("Formato nome struttura non valido!"),
    body("prezzoPerFascia")
      .matches(validazione.prezzo)
      .withMessage("Formato prezzo non valido"),
    body("capacitaPerFascia")
      .matches(validazione.capacita)
      .withMessage("Formato capacita non valido"),
    body("durataPerFascia")
      .matches(validazione.orario)
      .withMessage("Formato durata non valido"),
    body("dataInizioDisponibilita")
      .matches(validazione.data)
      .bail()
      .withMessage("Formato data non valido, formato supportato yyyy-mm-gg")
      .custom(async (dataInizioDisponibilita) => {
        if (
          !moment(dataInizioDisponibilita).isValid() ||
          Date.parse(dataInizioDisponibilita) <
            Date.parse(new Date(validazione.dataLimite))
        ) {
          throw new Error("Formato data non valido!");
        }
      }),
    body("oraInizioMattina")
      .matches(validazione.orario)
      .withMessage("Formato ora non valido")
      .custom(async (oraInizioMattina, { req }) => {
        let oraIMatt = new Date().setHours(
          oraInizioMattina.split(":")[0],
          oraInizioMattina.split(":")[1],
          0,
          0
        );
        let oraFineMattina = new Date().setHours(
          req.body.oraFineMattina.split(":")[0],
          req.body.oraFineMattina.split(":")[1],
          0,
          0
        );

        if (oraIMatt < validazione.orarioMattinaLimite) {
          throw new Error("Le strutture aprono dopo le 07:00");
        } else if (oraIMatt >= oraFineMattina) {
          throw new Error(
            "'Ora inizio mattina' non può essere più grande di 'Ora fine mattina'!"
          );
        }
      }),
    body("oraFineMattina")
      .matches(validazione.orario)
      .withMessage("Formato ora non valido")
      .custom(async (oraFineMattina, { req }) => {
        let oraFMatt = new Date().setHours(
          oraFineMattina.split(":")[0],
          oraFineMattina.split(":")[1],
          0,
          0
        );
        let oraInizioPomeriggio = new Date().setHours(
          req.body.oraInizioPomeriggio.split(":")[0],
          req.body.oraInizioPomeriggio.split(":")[1],
          0,
          0
        );

        if (oraFMatt >= oraInizioPomeriggio) {
          throw new Error(
            "'Ora Fine Mattina' non può essere >= di 'Ora Inizio Pomeriggio'!"
          );
        }
      })
      .bail(),
    body("oraInizioPomeriggio")
      .matches(validazione.orario)
      .withMessage("Formato ora non valido")
      .custom(async (oraInizioPomeriggio, { req }) => {
        let oraIPom = new Date().setHours(
          oraInizioPomeriggio.split(":")[0],
          oraInizioPomeriggio.split(":")[1],
          0,
          0
        );
        let oraFineMattina = new Date().setHours(
          req.body.oraFineMattina.split(":")[0],
          req.body.oraFineMattina.split(":")[1],
          0,
          0
        );
        let oraFinePomeriggio = new Date().setHours(
          req.body.oraFinePomeriggio.split(":")[0],
          req.body.oraFinePomeriggio.split(":")[1],
          0,
          0
        );

        if (oraIPom <= oraFineMattina) {
          throw new Error(
            "'Ora Inizio Pomeriggio' non può essere <= di 'Ora Fine Mattina'!"
          );
        } else if (oraIPom >= oraFinePomeriggio) {
          throw new Error(
            "'Ora Inizio Pomeriggio' non può essere >= di 'Ora Fine Pomeriggio'!"
          );
        }
      })
      .bail(),
    body("oraFinePomeriggio")
      .matches(validazione.orario)
      .withMessage("Formato ora non valido")
      .custom(async (oraFinePomeriggio) => {
        let oraFPom = new Date().setHours(
          oraFinePomeriggio.split(":")[0],
          oraFinePomeriggio.split(":")[1],
          0,
          0
        );
        if (validazione.orarioPomeriggioLimite < oraFPom) {
          throw new Error("Le strutture chiudono alle 21!");
        }
      })
      .bail(),
    body("dateChiusura").custom(async (dateChiusura) => {
      let dateChiusuraArray = JSON.parse(dateChiusura).dateChiusura;
      dateChiusuraArray.forEach((dataChiusura) => {
        if (
          !dataChiusura.match(validazione.data) ||
          !moment(dataChiusura).isValid() ||
          Date.parse(dataChiusura) <
            Date.parse(new Date(validazione.dataLimite))
        ) {
          throw new Error("Formato data chiusura non valido!");
        }
      });
    }),
  ],
  adminCNT.aggiungiStruttura
);

router.post(
  "/strutture/modificastruttura/:idStruttura",
  [
    body("nome")
      .matches(validazione.nomeStruttura)
      .withMessage("Formato nome struttura non valido"),
    body("prezzoPerFascia")
      .matches(validazione.prezzo)
      .withMessage("Formato prezzo non valido"),
    body("capacitaPerFascia")
      .matches(validazione.capacita)
      .withMessage("Formato capacita non valido"),
    body("durataPerFascia")
      .matches(validazione.orario)
      .withMessage("Formato durata non valido"),
    body("dataInizioDisponibilita")
      .matches(validazione.data)
      .withMessage("Formato data non valido, formato supportato yyyy-mm-gg")
      .custom(async (dataInizioDisponibilita) => {
        if (
          !moment(dataInizioDisponibilita).isValid() ||
          Date.parse(dataInizioDisponibilita) <
            Date.parse(new Date(validazione.dataLimite))
        ) {
          throw new Error("Formato data non valido!");
        }
      }),
    body("oraInizioMattina")
      .matches(validazione.orario)
      .withMessage("Formato ora non valido")
      .custom(async (oraInizioMattina, { req }) => {
        let oraIMatt = new Date().setHours(
          oraInizioMattina.split(":")[0],
          oraInizioMattina.split(":")[1],
          0,
          0
        );
        let oraFineMattina = new Date().setHours(
          req.body.oraFineMattina.split(":")[0],
          req.body.oraFineMattina.split(":")[1],
          0,
          0
        );

        if (oraIMatt < validazione.orarioMattinaLimite) {
          throw new Error("Le strutture aprono dopo le 07:00");
        } else if (oraIMatt >= oraFineMattina) {
          throw new Error(
            "'Ora inizio mattina' non può essere più grande di 'Ora fine mattina'!"
          );
        }
      }),
    body("oraFineMattina")
      .matches(validazione.orario)
      .withMessage("Formato ora non valido")
      .custom(async (oraFineMattina, { req }) => {
        let oraFMatt = new Date().setHours(
          oraFineMattina.split(":")[0],
          oraFineMattina.split(":")[1],
          0,
          0
        );
        let oraInizioPomeriggio = new Date().setHours(
          req.body.oraInizioPomeriggio.split(":")[0],
          req.body.oraInizioPomeriggio.split(":")[1],
          0,
          0
        );

        if (oraFMatt >= oraInizioPomeriggio) {
          throw new Error(
            "'Ora Fine Mattina' non può essere >= di 'Ora Inizio Pomeriggio'!"
          );
        }
      })
      .bail(),
    body("oraInizioPomeriggio")
      .matches(validazione.orario)
      .withMessage("Formato ora non valido")
      .custom(async (oraInizioPomeriggio, { req }) => {
        let oraIPom = new Date().setHours(
          oraInizioPomeriggio.split(":")[0],
          oraInizioPomeriggio.split(":")[1],
          0,
          0
        );
        let oraFineMattina = new Date().setHours(
          req.body.oraFineMattina.split(":")[0],
          req.body.oraFineMattina.split(":")[1],
          0,
          0
        );
        let oraFinePomeriggio = new Date().setHours(
          req.body.oraFinePomeriggio.split(":")[0],
          req.body.oraFinePomeriggio.split(":")[1],
          0,
          0
        );

        if (oraIPom <= oraFineMattina) {
          throw new Error(
            "'Ora Inizio Pomeriggio' non può essere <= di 'Ora Fine Mattina'!"
          );
        } else if (oraIPom >= oraFinePomeriggio) {
          throw new Error(
            "'Ora Inizio Pomeriggio' non può essere >= di 'Ora Fine Pomeriggio'!"
          );
        }
      })
      .bail(),
    body("oraFinePomeriggio")
      .matches(validazione.orario)
      .withMessage("Formato ora non valido")
      .custom(async (oraFinePomeriggio) => {
        let oraFPom = new Date().setHours(
          oraFinePomeriggio.split(":")[0],
          oraFinePomeriggio.split(":")[1],
          0,
          0
        );

        if (validazione.orarioPomeriggioLimite < oraFPom) {
          throw new Error("Le strutture chiudono alle 21!");
        }
      })
      .bail(),
    body("dateChiusura").custom(async (dateChiusura) => {
      let dateChiusuraArray = JSON.parse(dateChiusura).dateChiusura;

      dateChiusuraArray.forEach((dataChiusura) => {
        if (
          !dataChiusura.match(validazione.data) ||
          !moment(dataChiusura).isValid() ||
          Date.parse(dataChiusura) <
            Date.parse(new Date(validazione.dataLimite))
        ) {
          throw new Error("Formato data chiusura non valido!");
        }
      });
    }),
  ],
  adminCNT.modificaStruttura
);

module.exports = router;
