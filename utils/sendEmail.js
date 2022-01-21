let nodemailer = require("nodemailer");


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
            user: '', // Inserire email UniFit
            pass: '' // Inserire password UniFit
        }
    });
 
    let mailOptions = {
        from: 'unifit2022@gmail.com',
        to: email,
        subject: 'Reset Password Link - UniFit.it',
        html: '<p>Gentile Utente, <br>' 
        +'è stato richiesto un recupero della password, '+
        'usi questo <a href="http://localhost:3000/user/reset-password/' + token + '">link</a> per resettare la password'+
        ' altrimenti <b>ignora</b> questa e-mail. <br>'+
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
        from: 'unifit2022@gmail.com',
        to: email,
        subject: 'Avviso di rimborso',
        html: '<p>Gentile Utente, <br>' 
        +'con la presente le avvisiamo che è stato effettuato un rimborso a suo carico della cifra di €'+ importo 
        
        +'<br>Cordiali saluti, <br> il team UniFit.</p>'
 
    };
 
    return mail.sendMail(mailOptions);
}