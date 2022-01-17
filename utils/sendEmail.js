let nodemailer = require("nodemailer");

let host = "http://localhost:3000";
let emailUniFit = ""; //inserire email UniFit gmail
let passwordUniFit = ""; //inserire password UniFit gmail

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
        from: 'unifit2022@gmail.com',
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