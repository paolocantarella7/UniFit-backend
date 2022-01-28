let nodemailer = require("nodemailer");
let db = require('../singleton/credenziali_gmail.json');
let host = "http://ec2-44-202-26-53.compute-1.amazonaws.com"; //Aggiungere indirizzo EC2 amazon
let emailUniFit = db.gmail_user; //inserire email UniFit gmail
let passwordUniFit = db.gmail_password; //inserire password UniFit gmail

/**
 * Nome metodo: sendEmailWithToken
 * Descrizione: Metodo utile al recupero password che permette di inviare un'email col token
 * Parametri: email destinatario, token per link di recupero
 * Return:  Una Promise con eventuale errore da gestire
 * Autore : Matteo Della Rocca
 */
exports.sendEmailWithToken = (email, token) => {
  
    let mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailUniFit, // Inserire email UniFit
            pass: passwordUniFit // Inserire password UniFit
        }
    });
 
    let mailOptions = {
        from: db.gmail_user,
        to: email,
        subject: 'Reset Password Link - UniFit.it',
        html: '<p>Gentile Utente, <br>' 
        +'è stato richiesto un recupero della password, '+
        'usi questo <a href='+host+'/recovery/' + token + '">link</a> per resettare la password'+
        ' altrimenti <b>ignori</b> questa e-mail. <br>'+
        '<br>Cordiali saluti, <br> il team UniFit.</p>'
 
    };
 
    return mail.sendMail(mailOptions);
}


/**
 * Nome metodo: sendRimborsoEmail
 * Descrizione: Metodo che permette di inviare una email di avvenuto rimborso
 * Parametri: email destinatario e importo
 * Return:  Una Promise con eventuale errore da gestire
 * Autore : Giuseppe Scafa
 */
exports.sendRimborsoEmail = (email, importo) =>{
    let mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailUniFit, // Inserire email UniFit
            pass: passwordUniFit // Inserire password UniFit
        }
    });

    let mailOptions = {
        from: db.gmail_user,
        to: email,
        subject: 'Avviso di rimborso',
        html: '<p>Gentile Utente, <br>' 
        +'con la presente le avvisiamo che è stato effettuato un rimborso a suo carico della cifra di €'+ importo 
        
        +'<br>Cordiali saluti, <br> il team UniFit.</p>'
 
    };
 
    return mail.sendMail(mailOptions);
}