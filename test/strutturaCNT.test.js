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
let Struttura = require('../model/Struttura');

describe('Visualizza dettagli struttura', () => {
    it('Dovrebbe visualizzare i dettagli della struttura', (done) => {
        let id = 1;
        chai.request(server)
            .get('/admin/strutture/dettagliStruttura/' + id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Struttura non esistente', (done) => {
        let id = 1771;
        chai.request(server)
            .get('/admin/strutture/dettagliStruttura/' + id)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

describe('Visualizza prenotazioni struttura', () => {
    it('Dovrebbe visualizzare le prenotazioni di una struttura', (done) => {
        let id = 1;
        chai.request(server)
            .get('/admin/strutture/prenotazioniStruttura/' + id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Struttura non esistente', (done) => {
        let id = 1011212;
        chai.request(server)
            .get('/admin/strutture/prenotazioniStruttura/' + id)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

});

describe('Aggiungi struttura', () => {

    it('Dovrebbe aggiungere una struttura', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2069-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('Dovrebbe aggiungere una struttura', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2079-07-20',
            'oraInizioMattina': '07:15',
            'oraFineMattina': '12:15',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                done();
   
            });
    });

    it('Dovrebbe aggiungere una struttura', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2071-07-20',
            'oraInizioMattina': '07:45',
            'oraFineMattina': '13:45',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '20:00',
            'durataPerFascia': 2,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('Dovrebbe aggiungere una struttura', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2072-07-20',
            'oraInizioMattina': '07:45',
            'oraFineMattina': '13:45',
            'oraInizioPomeriggio': '14:45',
            'oraFinePomeriggio': '20:45',
            'durataPerFascia': 2,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                done();

            });
    });

    it('Dovrebbe aggiungere una struttura', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2073-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '13:00',
            'oraInizioPomeriggio': '13:30',
            'oraFinePomeriggio': '19:30',
            'durataPerFascia': 3,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('Formato nome non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato prezzo non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato capacita non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato data non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato data non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora inizio mattina non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora inizio mattina non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora inizio mattina non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora fine mattina non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora fine mattina non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Orari di mattina non coincidono logicamente con durata', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '09:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 2,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Orari di mattina non coincidono logicamente con durata', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '09:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '13:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 4,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Orari di mattina non coincidono logicamente con durata', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '09:15',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '13:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Orari di mattina non coincidono logicamente con durata', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '09:50',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '13:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 1,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora inizio pomeriggio non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora inizio pomeriggio non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora fine pomeriggio non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora fine pomeriggio non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Orari di pomeriggio non coincidono logicamente con durata', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '08:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 2,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Orari di pomeriggio non coincidono logicamente con durata', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '08:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:15',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 2,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Orari di pomeriggio non coincidono logicamente con durata', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '08:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '15:45',
            'oraFinePomeriggio': '21:00',
            'durataPerFascia': 2,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato date chiusura non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022c-12-25\", \"2022x-12-30\", \"20a22-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Orari di apertura non coincidono con durata fasce', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '13:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '19:00',
            'durataPerFascia': 2,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-30\", \"2022-12-31\"]  }'
        };
        
        chai.request(server)
            .post('/admin/strutture/aggiungistruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

});


describe('Modifica struttura', () => {

    it('Dovrebbe modificare una struttura', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };
        chai.request(server)
            .post('/admin/strutture/modificastruttura')  
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Struttura non trovata', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 523
        };
        chai.request(server)
            .post('/admin/strutture/modificastruttura')   .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato nome non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };

        chai.request(server)
            .post('/admin/strutture/modificastruttura')   .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato prezzo non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };

        chai.request(server)
            .post('/admin/strutture/modificastruttura')   .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato capacita non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };
        
        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato data non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };
        
        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato data non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };

        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora inizio mattina non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };
        
        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora inizio mattina non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };
        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora inizio mattina non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };
        
        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora fine mattina non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };

        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora fine mattina non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };
        
        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora inizio pomeriggio non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };

        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora inizio pomeriggio non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };
        
        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora fine pomeriggio non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };
        
        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato ora fine pomeriggio non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };
        
        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Formato date chiusura non corretto', (done) => {
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
            'dateChiusura': '{ \"dateChiusura\" : [\"2022c-12-25\", \"2022x-12-31\", \"20a22-12-31\"]  }',
            'idStruttura': 5
        };
        
        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Orari apertura non coincidono con durata fasce', (done) => {
        let data = {
            'nome': 'Campo da basket',
            'prezzoPerFascia': 20,
            'capacitaPerFascia': 30,
            'dataInizioDisponibilita': '2022-07-20',
            'oraInizioMattina': '07:00',
            'oraFineMattina': '12:00',
            'oraInizioPomeriggio': '14:00',
            'oraFinePomeriggio': '18:00',
            'durataPerFascia': 2,
            'dateChiusura': '{ \"dateChiusura\" : [\"2022-12-25\", \"2022-12-31\", \"2022-12-31\"]  }',
            'idStruttura': 5
        };

        chai.request(server)
            .post('/admin/strutture/modificastruttura')
            .send(data)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });


});

describe('Elimina struttura', () => {

    it('Struttura non esistente', (done) => {
        let data = {
            'idStrutt': 300
        };

        chai.request(server)
            .get('/admin/strutture/eliminastruttura')
            .query(data)   
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });


    it('Dovrebbe eliminare la struttura', (done) => {
        let data = {
            'idStrutt': 20
        };
        
        chai.request(server)
            .get('/admin/strutture/eliminastruttura')
            .query(data)
            .end((err, res) => {
                res.should.have.status(200);
                done();
                Struttura.update({isCancellata :0}, {where:{
                    idStruttura : data.idStrutt
                }});
            });
    });
});

describe('Visualizza strutture', () => {
    it('Dovrebbe visualizzare le strutture', (done) => {
        chai.request(server)
            .get('/admin/strutture/visualizzastrutture')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

