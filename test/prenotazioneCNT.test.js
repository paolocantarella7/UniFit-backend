process.env.NODE_ENV = "test";

// eslint-disable-next-line no-unused-vars
let expect = require("chai").expect;
let chai = require("chai");
let chaiHttp = require("chai-http");
let randomstring = require("randomstring");
let server = require("../app");
// eslint-disable-next-line no-unused-vars
let should = chai.should();
chai.use(require("chai-match"));
chai.use(chaiHttp);

// Test - getPrenotazioniByUtente
describe("Metodo che permette di visualizzare le prenotazioni di un utente", () => {
  it("Dovrebbe ritornare le prenotazioni dell'utente richieste", (done) => {
    let idUtente = 2;
    chai
      .request(server)
      .get("/prenotazione/prenotazioniUtente?idUtente=" + idUtente)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Utente non trovato", (done) => {
    let idUtente = 3123;
    chai
      .request(server)
      .get("/prenotazione/prenotazioniUtente?idUtente=" + idUtente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Utente non trovato", (done) => {
    let idUtente = "";
    chai
      .request(server)
      .get("/prenotazione/prenotazioniUtente?idUtente=" + idUtente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

//Test- effettuaPrenotazione
describe("Metodo che permette di effettuare una prenotazione di un struttura", () => {
  it("Dovrebbe poter effettuare la prenotazione dell'utente richiesta", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2022-04-30",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Struttura non trovata", (done) => {
    let parametri = {
      idStruttura: "1323",
      dataPrenotazione: "2022-04-30",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data prenotazione non valida (nel passato)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-02-10",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data prenotazione non valida (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021/02/10",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data prenotazione non valida (Struttura chiusa in quella data)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data prenotazione non valida (Struttura chiusa in quella data)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato intestatario non valido", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Numero carta non valido", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "123",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("CVV carta non valido", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "1",
      scadenzaCarta: "2030-12-20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("CVV carta non valido", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "",
      scadenzaCarta: "2030-12-20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data scadenza carta non valido (Carta scaduta)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2020-12-20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data scadenza carta non valido (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2025/12/20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data scadenza carta non valido (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2025/12/20",
      fascia: "10:00-11:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2025-12-20",
      fascia: "pollo",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2025-12-20",
      fascia: "1000-1035",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (Slot non esistente)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2025-12-20",
      fascia: "10:00-13:00",
      idUtente: "3",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (Slot pieno)", (done) => {
    let parametri = {
      idStruttura: "3",
      dataPrenotazione: "2022-02-25",
      intestatarioCarta: "Matteo scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-20",
      fascia: "18:00-19:00",
      idUtente: "11",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Utente non trovato", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2025-12-20",
      fascia: "10:00-11:00",
      idUtente: "3212",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Utente non trovato", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2025-12-20",
      fascia: "10:00-11:00",
      idUtente: "ssdad",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Utente non trovato", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      intestatarioCarta: "Matteo Scafa",
      numeroCarta: "1234567891234567",
      cvvCarta: "123",
      scadenzaCarta: "2025-12-20",
      fascia: "10:00-11:00",
      idUtente: "",
    };

    chai
      .request(server)
      .post("/prenotazione/effettuaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

//Test- getFasce
describe("Metodo che permette di generare le fasce di una struttura", () => {
  it("Dovrebbe poter generare le fasce della struttura richiesta", (done) => {
    let idStruttura = "1";

    chai
      .request(server)
      .get("/prenotazione/getFasce?idStruttura=" + idStruttura)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Struttura non trovata", (done) => {
    let idStruttura = "awewaewa";

    chai
      .request(server)
      .get("/prenotazione/getFasce?idStruttura=" + idStruttura)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Struttura non trovata", (done) => {
    let idStruttura = "";

    chai
      .request(server)
      .get("/prenotazione/getFasce?idStruttura=" + idStruttura)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Struttura non trovata", (done) => {
    let idStruttura = "1588888";

    chai
      .request(server)
      .get("/prenotazione/getFasce?idStruttura=" + idStruttura)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// Test - modificaPrenotazione
describe("Metodo che permette di modificare la prenotazione di una struttura", () => {
  it("Modifica prenotazione riuscita", (done) => {
    let parametri = {
      idStruttura: 3,
      dataPrenotazione: "2022-04-30",
      fascia: "18:00-19:00",
      idPrenotazione: 115,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Struttura non trovata", (done) => {
    let parametri = {
      idStruttura: "12312311",
      dataPrenotazione: "2022-04-30",
      fascia: "12:00-13:00",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Struttura non trovata", (done) => {
    let parametri = {
      idStruttura: "",
      dataPrenotazione: "2022-04-30",
      fascia: "12:00-13:00",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data prenotazione non valida (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2022/04/30",
      fascia: "12:00-13:00",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data prenotazione non valida (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "30/04/2020",
      fascia: "12:00-13:00",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data prenotazione non valida (Data nel passato)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2020-08-08",
      fascia: "12:00-13:00",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data prenotazione non valida (Struttura chiusa)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2021-12-25",
      fascia: "12:00-13:00",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2022-02-25",
      fascia: "1200-13:00",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2022-02-25",
      fascia: "1200-130",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2022-02-25",
      fascia: "12;00-13;00",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2022-02-25",
      fascia: "",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2022-02-25",
      fascia: "abcdefghhreerewre",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (FORMATO)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2022-02-25",
      fascia: "-1212121212",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (Slot non esistente)", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2022-02-25",
      fascia: "11:30-12:30",
      idPrenotazione: 21,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Fascia oraria non valida (Slot pieno)", (done) => {
    let parametri = {
      idStruttura: "3",
      dataPrenotazione: "2022-04-30",
      fascia: "11:00-:12:00",
      idPrenotazione: 115,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Prenotazione non esistente", (done) => {
    let parametri = {
      idStruttura: "3",
      dataPrenotazione: "2022-02-25",
      fascia: "17:00-18:00",
      idPrenotazione: 33424,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Prenotazione non esistente", (done) => {
    let parametri = {
      idStruttura: "3",
      dataPrenotazione: "2023-02-25",
      fascia: "17:00-18:00",
      idPrenotazione: 31,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Prenotazione non esistente", (done) => {
    let parametri = {
      idStruttura: "3",
      dataPrenotazione: "2023-02-25",
      fascia: "17:00-18:00",
      idPrenotazione: "",
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Prenotazione non esistente", (done) => {
    let parametri = {
      idStruttura: "3",
      dataPrenotazione: "2023-02-25",
      fascia: "17:00-18:00",
      idPrenotazione: 921939239,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Prenotazione scaduta", (done) => {
    let parametri = {
      idStruttura: "1",
      dataPrenotazione: "2022-01-14",
      fascia: "17:00-18:00",
      idPrenotazione: 75,
    };
    chai
      .request(server)
      .post("/prenotazione/modificaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("Metodo che permette di cancellare la prenotazione di una struttura", () => {
  it("Cancellazione prenotazione riuscita con rimborso", (done) => {
    let parametri = {
      idPrenotazione: 152,
      idUtente: 11,
    };
    chai
      .request(server)
      .post("/prenotazione/cancellaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Cancellazione prenotazione riuscita senza rimborso", (done) => {
    let parametri = {
      idPrenotazione: 153, //Scegliere prenotazione con la data di oggi e ora inizio < 24 
      idUtente: 11,
    };
    chai
      .request(server)
      .post("/prenotazione/cancellaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Prenotazione non trovata", (done) => {
    let parametri = {
      idPrenotazione: 2523213,
      idUtente: 11,
    };
    chai
      .request(server)
      .post("/prenotazione/cancellaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  
  it("Prenotazione scaduta", (done) => {
    let parametri = {
      idPrenotazione: 75, //Inserire prenotazione già consumata (nel passato)
      idUtente: 11,
    };
    chai
      .request(server)
      .post("/prenotazione/cancellaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Prenotazione non trovata", (done) => {
    let parametri = {
      idPrenotazione: "",
      idUtente: 11,
    };
    chai
      .request(server)
      .post("/prenotazione/cancellaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Prenotazione non trovata", (done) => {
    let parametri = {
      idPrenotazione: "12313as",
      idUtente: 11,
    };
    chai
      .request(server)
      .post("/prenotazione/cancellaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Prenotazione non trovata poichè scaduta", (done) => {
    let parametri = {
      idPrenotazione: 35,
      idUtente: 11,
    };
    chai
      .request(server)
      .post("/prenotazione/cancellaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Utente non trovata", (done) => {
    let parametri = {
      idPrenotazione: 28,
      idUtente: 1123123,
    };
    chai
      .request(server)
      .post("/prenotazione/cancellaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Utente non trovato", (done) => {
    let parametri = {
      idPrenotazione: 28,
      idUtente: "dsasdsa",
    };
    chai
      .request(server)
      .post("/prenotazione/cancellaPrenotazione")
      .send(parametri)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});


