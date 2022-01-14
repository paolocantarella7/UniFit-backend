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
let fs = require("fs");

describe("Meotod che permette di effettuare il login", function () {
  it("Login utente (non admin) riuscito", (done) => {
    let utente = {
      email: "dellarocca16@gmail.com",
      password: "filofilo",
    };

    chai
      .request(server)
      .post("/user/login")
      .send(utente)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Login utente (Admin) riuscito", (done) => {
    let utente = {
      email: "lina@gmail.com",
      password: "adminadmin",
    };

    chai
      .request(server)
      .post("/user/login")
      .send(utente)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Login non riuscito  (utente che ha effettuato la cancellazione)", (done) => {
    let utente = {
      email: "deleeeeeel@gmail.com",
      password: "filofilo",
    };

    chai
      .request(server)
      .post("/user/login")
      .send(utente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato email non valido", (done) => {
    let utente = {
      email: "sdsdsd",
      password: "filofilo",
    };

    chai
      .request(server)
      .post("/user/login")
      .send(utente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato password non valido", (done) => {
    let utente = {
      email: "dellarocca16@gmail.com",
      password: "asad",
    };

    chai
      .request(server)
      .post("/user/login")
      .send(utente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato email e password non valido", (done) => {
    let utente = {
      email: "sdsad",
      password: "asad",
    };

    chai
      .request(server)
      .post("/user/login")
      .send(utente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato email non valido", (done) => {
    let utente = {
      email: "105 OR 1=1",
      password: "asdsad",
    };

    chai
      .request(server)
      .post("/user/login")
      .send(utente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato email e password non valido", (done) => {
    let utente = {
      email: "105 OR 1=1",
      password: "105 OR 1=1",
    };

    chai
      .request(server)
      .post("/user/login")
      .send(utente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("Meotod che permette di cancellare un utente", function () {
  it("Cancellazione riuscita", (done) => {
    let idUtente = 10;

    chai
      .request(server)
      .get("/user/cancellaAccount?idUtente=" + idUtente)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Cancellazione non riuscita (Utente non trovato", (done) => {
    let idUtente = 2133123;

    chai
      .request(server)
      .get("/user/cancellaAccount?idUtente=" + idUtente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Cancellazione non riuscita (Utente non trovato", (done) => {
    let idUtente = "";

    chai
      .request(server)
      .get("/user/cancellaAccount?idUtente=" + idUtente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Cancellazione non riuscita (Utente non trovato", (done) => {
    let idUtente = "105 OR 1=1";

    chai
      .request(server)
      .get("/user/cancellaAccount?idUtente=" + idUtente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Cancellazione non riuscita (Utente non trovato - già cancellato)", (done) => {
    let idUtente = "10";

    chai
      .request(server)
      .get("/user/cancellaAccount?idUtente=" + idUtente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("Metodo che permette di visualizzare i dati di un utente", function () {
  it("Visualizzazione dati riuscita", (done) => {
    let idUtente = 4;

    chai
      .request(server)
      .get("/user/datiPersonali?id=" + idUtente)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Visualizzazione dati NON riuscita (Utente non trovato)", (done) => {
    let idUtente = "";

    chai
      .request(server)
      .get("/user/datiPersonali?id=" + idUtente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Visualizzazione dati NON riuscita (Utente non trovato)", (done) => {
    let idUtente = "dsadasdsad";

    chai
      .request(server)
      .get("/user/datiPersonali?id=" + idUtente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Visualizzazione dati NON riuscita (Utente non trovato)", (done) => {
    let idUtente = "105 OR 1=1";

    chai
      .request(server)
      .get("/user/datiPersonali?id=" + idUtente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Visualizzazione dati NON riuscita (Utente cancellato quindi non trovato)", (done) => {
    let idUtente = "10";

    chai
      .request(server)
      .get("/user/datiPersonali?id=" + idUtente)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("Metodo che permette di effettuare una richiesta di tesseramento", function () {
  it("Richiesta di tesseramento riuscita da interno", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Interno",
      idUtente: 14,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf" //Aggiungere path relativo qui
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Richiesta di tesseramento riuscita da esterno", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 13,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf" //Aggiungere path relativo qui
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Tipologia tesseramento non valida ", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Insalata",
      idUtente: 11,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Tipologia tesseramento non valida ", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Booba",
      idUtente: 11,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Tipologia tesseramento non valida ", (done) => {
    let richiesta = {
      tipologiaTesseramento: "",
      idUtente: 11,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Utente non trovato", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 2132,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Utente non trovato", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: "sdasdsad",
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Utente non trovato", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: -213213,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Utente già richiedente di tesseramento", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 11,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato numero carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "123412341234123",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato numero carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "asasasasa",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato numero carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "515aw1d5wad1wa61sa65s1d6",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato numero carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "",
      intestatarioCarta: "Luca Boffetta",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato numero carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "123412341234123",
      intestatarioCarta: "",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato Intestatario carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "a15sd615ds15d",
      cvvCarta: "123",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato CVV carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "a15sd615ds15d",
      cvvCarta: "13",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato CVV carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "a15sd615ds15d",
      cvvCarta: "",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato CVV carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "a15sd615ds15d",
      cvvCarta: "asbregafoi",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  
  it("Formato CVV carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "a15sd615ds15d",
      cvvCarta: "12",
      scadenzaCarta: "2023-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato Data scadenza carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "a15sd615ds15d",
      cvvCarta: "123",
      scadenzaCarta: "2023/12/10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato Data scadenza carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "a15sd615ds15d",
      cvvCarta: "123",
      scadenzaCarta: "2023-12/10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  
  it("Formato Data scadenza carta non valido (Carta scaduta)", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "a15sd615ds15d",
      cvvCarta: "123",
      scadenzaCarta: "2022-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato Data scadenza carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "a15sd615ds15d",
      cvvCarta: "123",
      scadenzaCarta: "10'12/2398",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato Data scadenza carta non valido", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "a15sd615ds15d",
      cvvCarta: "123",
      scadenzaCarta: "10/12/2398",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato File non valido (Campo obbligatorio)", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Matteo Scafa",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/CERTIFICATO.pdf"
        ),
        "" //Invio niente
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato File non valido (Solo .pdf) ", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Matteo Scafa",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/LICENZESOFTWARE.ppt"
        ),
        "LICENZESOFTWARE.ppt"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato File non valido (Solo .pdf) ", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Matteo Scafa",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/siringa.png"
        ),
        "siringa.png"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  
  it("Formato File non valido (Solo .pdf) ", (done) => {
    let richiesta = {
      tipologiaTesseramento: "Esterno",
      idUtente: 4,
      numeroCarta: "1234123412341234",
      intestatarioCarta: "Matteo Scafa",
      cvvCarta: "123",
      scadenzaCarta: "2030-12-10",
    };

    chai
      .request(server)
      .post("/user/effettuaTesseramento")
      .field(richiesta)
      .attach(
        "file",
        fs.readFileSync(
          "C:/Users/della/Desktop/UniFit-backend/test/testupload/RAD.docx"
        ),
        "RAD.docx"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

});
