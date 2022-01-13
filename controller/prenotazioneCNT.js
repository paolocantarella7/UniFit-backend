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

/**
 * Nome metodo: getPrenotazioniByUtente
 * Descrizione: Metodo che permette di ottenere le prenotazioni effettuate da un utente
 * Parametri: idUtente
 * Return: Codice, lista prenotazioni, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.getPrenotazioniByUtente = async (req, res) =>{
    let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res.status(400).json({ code: 400, error: erroriValidazione.array(), success:false});}
    
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
  };



/**
 * Nome metodo: getFasceOrarie
 * Descrizione: Metodo che permette di ottenere le fasce orarie prenotabili
 * Parametri: idStruttura
 * Return: Codice, lista fasce, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.getFasceOrarie = async(req, res) =>{
    let erroriValidazione = validationResult(req);
  if (!erroriValidazione.isEmpty()) {
    return res.status(400).json({ code: 400, error: erroriValidazione.array(), success:false});}

    let listaFasce;
    await Struttura.findByPk(req.query.idStruttura, {
        attributes:["oraInizioMattina", "oraFineMattina", "oraInizioPomeriggio", "oraFinePomeriggio", "durataPerFascia"]
    }).then((result) =>{
        if(result){
            listaFasce = generatoreFasce.getListaFasce(result.oraInizioMattina, result.oraFineMattina, result.oraInizioPomeriggio, result.oraFinePomeriggio, result.durataPerFascia);
            res.status(200).json({code: 200, listaFasce: listaFasce, success:true});
        }
        else
         res.status(400).json({code:400, msg:"Struttura non trovata", success: false});
    }).catch((err) =>{
        res.status(400).json({code:400, msg:err, success: false});
    });
};


/**
 * Nome metodo: effettuaPrenotazione
 * Descrizione: Metodo che permette di effettuare una prenotazione
 * Parametri: informazioni prenotazione
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.effettuaPrenotazione = async(req, res) =>{
    let erroriValidazione = validationResult(req);
    let capacita, prezzo, postiOccupati;
  if (!erroriValidazione.isEmpty()) {
    return res.status(400).json({ code: 400, error: erroriValidazione.array(), success:false});}
    
    await Struttura.findByPk(req.body.idStruttura, {
        attributes:["capacitaPerFascia", "prezzoPerFascia"]
    }).then((result) =>{
        if(result){
            capacita = result.capacitaPerFascia;
            prezzo = result.prezzoPerFascia;
        }

    }).catch((err) =>{
        return res.status(400).json({code: 400, msg:err, success:false});
    });
    
    let fasciaOraria = req.body.fascia.split("-");
    await Prenotazione.count({where: {
        struttura: req.body.idStruttura,
        dataPrenotazione: req.body.dataPrenotazione,
        oraInizio: fasciaOraria[0],
        oraFine: fasciaOraria[1]
    }}).then((result) =>{
        postiOccupati = result;
    }).catch((err) =>{
        return res.status(400).json({code: 400, msg:err, success:false});
    });

    if(postiOccupati < capacita){
        let newPrenotazione = {
            dataPrenotazione:req.body.dataPrenotazione,
            oraInizio: fasciaOraria[0],
            oraFine: fasciaOraria[1], 
            totalePagato: prezzo,
            utente: req.body.idUtente,
            struttura: req.body.idStruttura
        };
        await Prenotazione.create(newPrenotazione)
        .then(async (result) =>{
            if(result){
            let nuovaFattura = {
                intestatario: req.body.intestatarioCarta,
                totalePagamento: result.totalePagato,
                dataRilascio: new Date(new Date().getTime()).toISOString().substring(0,10),
                statusFattura: "Pagata",
                prenotazione: result.idPrenotazione
            };
            await Fattura.create(nuovaFattura)
            .then( (reslt) =>{
                if(reslt)
                    return res.status(200).json({code: 200, msg:"Operazione effettuata con successo", success:true});
            })
            .catch((err) =>{
                return res.status(400).json({code: 400, msg:err, success:false});
            })
        }
        }).catch((error) =>{
            return res.status(400).json({code: 400, msg:error, success:false});
        });
    }
    else{
        return res.status(400).json({code: 400, msg:"Fascia oraria piena!", success:false});
    }
    

};







/**
 * Nome metodo: modificaPrenotazione
 * Descrizione: Metodo che permette di modificare una prenotazione
 * Parametri: nuovi dati prenotazione, idStruttura e idPrenotazione
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.modificaPrenotazione = async (req, res) =>{
    let erroriValidazione = validationResult(req);
    let capacita, postiOccupati;

    if (!erroriValidazione.isEmpty()) {
        return res.status(400).json({ code: 400, error: erroriValidazione.array(), success:false});}
        
    await Struttura.findByPk(req.query.idStruttura, {
        attributes:["capacitaPerFascia"]
    }).then((result) =>{
        if(result){
            capacita = result.capacitaPerFascia;
            
        }
        else
           return res.status(400).json({code: 400, msg:"Struttura non esistente", success:false});

    }).catch((err) =>{
        return res.status(400).json({code: 400, msg:err, success:false});
    });

    let fasciaOraria = req.query.fascia.split("-");
    await Prenotazione.count({where: {
        struttura: req.query.idStruttura,
        dataPrenotazione: req.query.dataPrenotazione,
        oraInizio: fasciaOraria[0],
        oraFine: fasciaOraria[1]
    }}).then((result) =>{
        postiOccupati = result;
    }).catch((err) =>{
        return res.status(400).json({code: 400, msg:err, success:false});
    });

    if(postiOccupati < capacita){
        await Prenotazione.update({
            oraInizio: fasciaOraria[0],
            oraFine: fasciaOraria[1]
        }, {
            where:{
                idPrenotazione: req.query.idPrenotazione
            }
        }).then((result) =>{
            return res.status(200).json({code: 200, msg:"Modifica effettuata con successo!", success:true});
        }).catch((err) =>{
            return res.status(400).json({code: 400, msg:err, success:false});
        })
    }
    else{
        return res.status(400).json({code: 400, msg:"Fascia oraria piena!", success:false});
    }
}

/**
 * Nome metodo: cancellaPrenotazione
 * Descrizione: Metodo che permette di cancellare una prenotazione
 * Parametri: email utente, idPrenotazione e importo
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

exports.cancellaPrenotazione = async (req, res) =>{
    let erroriValidazione = validationResult(req);
    let reslt;
    if (!erroriValidazione.isEmpty()) {
        return res.status(400).json({ code: 400, error: erroriValidazione.array(), success:false});}
    try{
        reslt = await Prenotazione.findByPk(req.query.idPrenotazione, {
            attributes:["totalePagato", "dataPrenotazione"]
        })
    }
    catch(err){
        return res.status(400).json({ code: 400, msg: err, success:false});
    }
    let dataP = new Date(reslt.dataPrenotazione);
    let dataO = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    if(dataP.toISOString().substring(0,10) != dataO.toISOString().substring(0,10)){
        effettuaRimborso(req.query.email, reslt.totalePagato);
    }

    await Prenotazione.destroy({
        where:{
            idPrenotazione: req.query.idPrenotazione
        }
    }).then((result) =>{
        if(result)
            return res.status(200).json({code: 200, msg:"Cancellazione avvenuta con successo!", success: true});
    }).catch((err)=>{
        return res.status(400).json({code: 400, msg:err, success:false});
    });
}

/**
 * Nome metodo: effettuaRimborso
 * Descrizione: Metodo che genere una email di rimborso
 * Parametri: email utente e importo
 * Return: Codice, messaggio, boolean true/false in base alla riuscita dell'operazione
 * Autore : Giuseppe Scafa
 */

let effettuaRimborso = async (email, importo) =>{
    try{
        await senderEmail.sendRimborsoEmail(email, importo);
        
    }
    catch(err){
        console.log(err);
    }
}