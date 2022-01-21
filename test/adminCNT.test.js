process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-unused-vars
let expect  = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let randomstring = require("randomstring");
let server = require('../app');
// eslint-disable-next-line no-unused-vars
let should = chai.should();
chai.use(require('chai-match'));
chai.use(chaiHttp);
let RichiestaTesseramento = require('../model/Richiesta_tesseramento');
let fs = require("fs");

describe('Valida tesseramento', ()=>{

    it('Azione sconosciuta', (done) =>{
        let data = {
            "idUtente": 1,
            "idReqTess": 5,
            "azione": "grsr" 
        };

        chai.request(server)
        .post('/admin/reqtess/validatesseramento')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });


    it('Richiesta di tesseramento non trovata', (done) =>{
            let data = {
                "idUtente": 1,
                "idReqTess": 100,
                "azione": "accetta" 
            };

            chai.request(server)
            .post('/admin/reqtess/validatesseramento')
            .send(data)
            .end((err, res) =>{
                res.should.have.status(400);
                done();
            })
        });

    it('Dovrebbe validare il tesseramento', (done) =>{
        let data = {
            "idUtente": 1,
            "idReqTess": 5,
            "azione": "accetta" 
        };

        chai.request(server)
        .post('/admin/reqtess/validatesseramento')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(200);
            done();
            RichiestaTesseramento.update({statusRichiesta: 'Effettuata'}, {
                where:{
                    idRichiesta_tesseramento: 5
                }
            });       
        });
    });

});

describe('Rifiuta tesseramento', ()=>{

    it('Azione sconosciuta', (done) =>{
        let data = {
            "idUtente": 1,
            "idReqTess": 5,
            "azione": "grsr" 
        };

        chai.request(server)
        .post('/admin/reqtess/validatesseramento')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });


    it('Richiesta di tesseramento non trovata', (done) =>{
            let data = {
                "idUtente": 3,
                "idReqTess": 13,
                "azione": "rifiuta" 
            };

            chai.request(server)
            .post('/admin/reqtess/validatesseramento')
            .send(data)
            .end((err, res) =>{
                res.should.have.status(400);
                done();
            })
        });

    it('Dovrebbe rifiutare il tesseramento', (done) =>{
        let data = {
            "idUtente": 4,
            "idReqTess": 13,
            "azione": "rifiuta" 
        };
        
        let nuovaRichiesta = {
            'idRichiesta_tesseramento': 13,
            'dataRichiesta': '2022-01-07',
            'tipologiaTesseramento': "Interno",
            'statusRichiesta': 'Effettuata',
            'prezzoTesseramento': 12.00,
            'certificatoAllegatoPath': '/',
            'utente': 4
          };

          RichiestaTesseramento.create(nuovaRichiesta);
          fs.mkdirSync("./static/richieste_tesseramento/4",{recursive: true}, (err) =>{
              console.log(err);
          });

        chai.request(server)
        .post('/admin/reqtess/validatesseramento')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(200);
            done();
            RichiestaTesseramento.create(nuovaRichiesta);
            fs.mkdirSync("./static/richieste_tesseramento/4",{recursive: true}, (err) =>{
                console.log(err);
            });
        });
    });

});

describe('Metodo che permette di visualizzare le richieste di tesseramento non ancora accettate', ()=>{

    it('Dovrebbe mostrare le richieste di tesseramento non accettate', (done) =>{

        chai.request(server)
        .get('/admin/reqtess/visualizzareqtess')
        .end((err, res) =>{
            res.should.have.status(200);
            done();
        })
    });
});

describe('Metodo che permette di visualizzare gli utenti registrati (NON ADMIN)', ()=>{

    it('Dovrebbe mostrare la lista di utenti registrati (NON ADMIN)', (done) =>{

        chai.request(server)
        .get('/admin//utenti/visualizzautenti')
        .end((err, res) =>{
            res.should.have.status(200);
            done();
        })
    });
});

