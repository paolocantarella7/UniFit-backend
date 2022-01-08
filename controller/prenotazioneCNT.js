let Utente = require("../model/Utente");
let RichiestaTesseramento = require("../model/Richiesta_tesseramento");
let Prenotazione = require("../model/Prenotazione");
let Struttura = require("../model/Struttura");
let { Sequelize } = require("../singleton/singleton");

/**
 * Nome metodo: getPrenotazioniByUtente
 * Descrizione: Metodo che permette di ottenere le prenotazioni effettuate da un utente
 * Parametri: idUtente
 * Return: Codice, lista prenotazioni, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.getPrenotazioniByUtente = async (req, res) =>{
    await Prenotazione.findAll(
      {
        include:{
          model:Struttura,
          as: "strutturaPrenotata",
          attributes:["nome"]
        },
        where:{utente: req.query.idUtente}

      }
    ).then((result) =>{
      if(result)
        res.status(200).json({code: 200, prenotazioni: result, success: true});
    })
    .catch((err) =>{
        res.status(400).json({code: 400, msg: err, success: false});
    })
  }


