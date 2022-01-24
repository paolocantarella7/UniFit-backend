let Utente = require("../model/Utente");
let RichiestaTesseramento = require("../model/Richiesta_tesseramento");
let { validationResult } = require("express-validator");
let fs = require("fs");



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
    }).then((result) => {
        res
            .status(200)
            .json({ code: 200, utentiRegistrati: result, success: true });
        
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
    await RichiestaTesseramento.findAll({
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
    }).then((result) => {
        
        res.status(200).json({ code: 200, richiesteTess: result, success: true });
        
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
        await RichiestaTesseramento.update(
            { statusRichiesta: "Accettata" },
            {
                where: { 'idRichiesta_tesseramento': idRichiestaTess, utente: idUtente },
                returning: true,
                plain: true,
            }
        ).then(() => {
            
            Utente.update(
                { isTesserato: 1 },
                { where: { idUtente: idUtente } }
            ).then(
                res.status(200).json({
                    code: 200,
                    msg: "Richiesta di tesseramento accettata con successo!",
                    success: true,
                })
            );
           
        }
        );
   
    } //rifiuto, la richiesta va cancellata
    else {
        await RichiestaTesseramento.destroy({
            where: { 'idRichiesta_tesseramento': idRichiestaTess, utente: idUtente },
        });

        //Cancello la cartella creata con il certificato "rifiutato" di quell'utente
        fs.rmdir("./static/richieste_tesseramento/" + idUtente, {
            recursive: true }, (err) => { console.log(err);});

        res.status(200).json({
            code: 200,
            msg: "Richiesta di tesseramento rifiutata con successo!",
            success: true,
        });

    }
};

/**
 * Nome metodo: downloadCertificato
 * Descrizione: Metodo che permette all'amministratore di scaricare il file in allegato nella richiesta
 * Parametri: ID Richiesta Tesseramento
 * Return: Codice, File/Messaggio d'errore, boolean true/false in base alla riuscita dell'operazione
 * Autore : Matteo Della Rocca
 */
exports.downloadCertificato = async (req, res) => {
    
    let idReq = Number(req.params.idReq).toString();
  
    await RichiestaTesseramento.findOne({
        where : {
            'idRichiesta_tesseramento': idReq
        }}).then((result) => {
        if(result){
            let certificato = fs.readFileSync('.'+result.certificatoAllegatoPath+"/certificato.pdf");
            res.status(200).contentType("application/pdf").send(certificato);
        }else{
            res.status(400).json({code: 400, msg: "Richiesta di tesseramento non trovata", success : false});
        }
        
    }
    );
  
};
