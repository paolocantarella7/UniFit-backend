process.env.NODE_ENV = 'test';

// eslint-disable-next-line no-unused-vars
let expect  = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let randomstring = require("randomstring");
let server = require('../app');
// eslint-disable-next-line no-unused-vars
let  should = chai.should();
chai.use(require('chai-match'));
chai.use(chaiHttp);

describe('Visualizza dettagli struttura', () =>{
    it('Dovrebbe visualizzare i dettagli della struttura', (done) =>{
        let id = 1;
        chai.request(server)
        .get('/admin/strutture/dettagliStruttura/' + id)
        .end((err, res) =>{
            res.should.have.status(200);
            done();
        })
    });

    it('Struttura non esistente', (done) =>{
        let id = 10;
        chai.request(server)
        .get('/admin/strutture/dettagliStruttura/' + id)
        .end((err, res) =>{
            res.should.have.status(404);
            done();
        })
    });
});

describe('Visualizza prenotazioni struttura', ()=>{
    it('Dovrebbe visualizzare le prenotazioni di una struttura', (done) =>{
        let id = 1;
        chai.request(server)
        .get('/admin/strutture/prenotazioniStruttura/' + id)
        .end((err, res) =>{
            res.should.have.status(200);
            done();
        })
    });

    it('Struttura non esistente', (done) =>{
        let id = 10;
        chai.request(server)
        .get('/admin/strutture/prenotazioniStruttura/' + id)
        .end((err, res) =>{
            res.should.have.status(404);
            done();
        })
    });

});

describe('Aggiungi struttura', () =>{
    it('Dovrebbe aggiungere una struttura', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(201);
            done();
        })
    });

    it('Formato nome non corretto', (done) =>{
        let data = {
            'nome': 'Ciao.',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato prezzo non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': '20t',
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato capacita non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': '30t',
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato data non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022x-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato data non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '1969-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora inizio mattina non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07x:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora inizio mattina non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '06:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora inizio mattina non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '12:00',
            'oraFineMattina': '10:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora fine mattina non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12x:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora fine mattina non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '15:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora inizio pomeriggio non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14x:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora inizio pomeriggio non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '11:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora fine pomeriggio non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21x:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora fine pomeriggio non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '11:00',
            'oraFinePomeriggio': '22:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato date chiusura non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '11:00',
            'oraFinePomeriggio': '22:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022c-12-25\", \"2022x-12-31\", \"20a22-12-31\"]  }'
        };
        
        chai.request(server)
        .post('/admin/strutture/aggiungistruttura')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

});


describe('Modifica struttura', () =>{

    it('Dovrebbe modificare una struttura', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(201);
            done();
        })
    });

    it('Formato nome non corretto', (done) =>{
        let data = {
            'nome': 'Ciao.',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato prezzo non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': '20t',
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato capacita non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': '30t',
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato data non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022x-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato data non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '1969-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora inizio mattina non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07x:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora inizio mattina non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '06:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora inizio mattina non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '12:00',
            'oraFineMattina': '10:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora fine mattina non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12x:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora fine mattina non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '15:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora inizio pomeriggio non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14x:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora inizio pomeriggio non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '11:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora fine pomeriggio non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21x:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato ora fine pomeriggio non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '11:00',
            'oraFinePomeriggio': '22:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });

    it('Formato date chiusura non corretto', (done) =>{
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '11:00',
            'oraFinePomeriggio': '22:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022c-12-25\", \"2022x-12-31\", \"20a22-12-31\"]  }'
        };
        
        let id = 12;
        chai.request(server)
        .post('/admin/strutture/modificastruttura/' + id)
        .send(data)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    });


});

describe('Elimina struttura', () =>{

    it('Struttura non esistente', (done) =>{
        let data = {
            'idStrutt': 300
        };

        chai.request(server)
        .get('/admin/strutture/eliminastruttura')
        .query(data)   
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    })

    it('Dovrebbe eliminare la struttura', (done) =>{
        let data = {
            'idStrutt': 11
        };

        chai.request(server)
        .get('/admin/strutture/eliminastruttura')
        .query(data)
        .end((err, res) =>{
            res.should.have.status(200);
            done();
        })
    })
});

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
        })
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
            "idUtente": 3,
            "idReqTess": 13,
            "azione": "rifiuta" 
        };

        chai.request(server)
        .post('/admin/reqtess/validatesseramento')
        .send(data)
        .end((err, res) =>{
            res.should.have.status(200);
            done();
        })
    });




});
   

