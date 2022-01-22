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
let RichiestaTesseramento = require("../model/Richiesta_tesseramento");
let Utente = require("../model/Utente");

describe("Recupero password", () => {
  it("Dovrebbe iniziare la procedura di recupero passowrd", (done) => {
    let data = {
      email: "dellarocca16@gmail.com",
    };

    chai
      .request(server)
      .post("/user/recupero-password")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        done();
        Utente.update({tokenRecuperoPassword: "123456789"},{where: {email: "dellarocca16@gmail.com"}})
      });
  });

  it("Formato email non valido", (done) => {
    let data = {
      email: "erminio75.it",
    };

    chai
      .request(server)
      .post("/user/recupero-password")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Email non associata a nessun account", (done) => {
    let data = {
      email: "giancarlo23@gmail.com",
    };

    chai
      .request(server)
      .post("/user/recupero-password")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("Metodo che permette di effettuare il login", function () {
  it("Login utente (non admin) riuscito", (done) => {
    let utente = {
      email: "jovelak228@whecode.com",
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
      email: "annaf@munnez.it",
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

describe("Metodo che permette di cancellare un utente", function () {
  
  it("Riattivazione post cancellazione", (done) => {
    let data = {
      codiceFiscale: "CVLDNT86S12K865G",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "donato@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("Cancellazione riuscita", (done) => {
    let idUtente = 5;

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
    let idUtente = 20;

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
    let idUtente = 20;

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
          __dirname + "/testupload/CERTIFICATO.pdf" //Aggiungere path relativo qui
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(200);
        done();
        RichiestaTesseramento.destroy({
          where: { utente: 14 },
        });
        fs.rm("./static/richieste_tesseramento/14", {
          recursive: true }, (err) =>{ console.log(err)})
        
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
          __dirname + "/testupload/CERTIFICATO.pdf" //Aggiungere path relativo qui
        ),
        "CERTIFICATO.pdf"
      )
      .end((err, res) => {
        res.should.have.status(200);
        done();
        RichiestaTesseramento.destroy({
          where: { utente: 13 }
        });
        fs.rm("./static/richieste_tesseramento/13", {
          recursive: true}, (err) =>{ console.log(err);})
        
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
      idUtente: 1,
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/CERTIFICATO.pdf"),
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
        fs.readFileSync(__dirname + "/testupload/LICENZESOFTWARE.ppt"),
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
        fs.readFileSync(__dirname + "/testupload/siringa.png"),
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
        fs.readFileSync(__dirname + "/testupload/RAD.docx"),
        "RAD.docx"
      )
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});


describe("Registrazione", () => {
  it("Formato email non valido", (done) => {
    let data = {
      codiceFiscale: "DVDGST80A01A509R",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "fonzino.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Email gia in uso", (done) => {
    let data = {
      codiceFiscale: "DVDGST80A01A509R",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "erminio@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Email già in uso e CF non combaciante", (done) => {
    let data = {
      codiceFiscale: "DVDGST80A01A509K",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "erminio@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato codice fiscale non valido", (done) => {
    let data = {
      codiceFiscale: "FWRNKE",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "fonzino@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Codice fiscale gia presente", (done) => {
    let data = {
      codiceFiscale: "TTORMN80C20G039H",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "fonzino@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato nome non valido", (done) => {
    let data = {
      codiceFiscale: "DVDGST80A01A509R",
      nome: "Gi.a1233",
      cognome: "Bottiglieri",
      email: "fonzino@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato cognome non valido", (done) => {
    let data = {
      codiceFiscale: "DVDGST80A01A509R",
      nome: "Gianni Alfonso",
      cognome: "B.12x",
      email: "fonzino@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato password non valido", (done) => {
    let data = {
      codiceFiscale: "DVDGST80A01A509R",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "fonzino@gmail.com",
      password: "hf",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato data nascita non valido", (done) => {
    let data = {
      codiceFiscale: "DVDGST80A01A509R",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "fonzino@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "19cj",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Data non valida", (done) => {
    let data = {
      codiceFiscale: "DVDGST80A01A509R",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "fonzino@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "2100-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato indirizzo non valido", (done) => {
    let data = {
      codiceFiscale: "DVDGST80A01A509R",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "fonzino@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Vx12",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato nazionalita non valido", (done) => {
    let data = {
      codiceFiscale: "DVDGST80A01A509R",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "fonzino@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "it21.a",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato numero di telefono non valido", (done) => {
    let data = {
      codiceFiscale: "DVDGST80A01A509R",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "fonzino@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "xxx222",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Dovrebbe completare la registrazione", (done) => {
    let data = {
      codiceFiscale: "CSTMRZ40B23H703S",
      nome: "Gianni Alfonso",
      cognome: "Bottiglieri",
      email: "fonzino@gmail.com",
      password: "Ciaociao.1",
      dataNascita: "1990-12-12",
      indirizzoResidenza: "Via Palmieri, 22",
      nazionalita: "Italia",
      numeroTelefono: "3333333333",
    };

    chai
      .request(server)
      .post("/user/registrati")
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        done();
        Utente.destroy({where : { email: data.email}})
      });
  });
});

describe("Modifica password", () => {
  it("Dovrebbe modificare la password", (done) => {
    let data = {
      password: "Ciaociao.1",
      passwordConferma: "Ciaociao.1",
      idUtente: 4,
    };

    chai
      .request(server)
      .post("/user/modificaPassword")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Utente non trovato", (done) => {
    let data = {
      password: "Ciaociao.1",
      passwordConferma: "Ciaociao.1",
      idUtente: 4233,
    };

    chai
      .request(server)
      .post("/user/modificaPassword")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Utente non trovato (cancellato)", (done) => {
    let data = {
      password: "Ciaociao.1",
      passwordConferma: "Ciaociao.1",
      idUtente: 20,
    };

    chai
      .request(server)
      .post("/user/modificaPassword")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Formato password non valido", (done) => {
    let data = {
      password: "as",
      passwordConferma: "Ciaociao.1",
      idUtente: 3,
    };

    chai
      .request(server)
      .post("/user/modificaPassword")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Le password non coincidono", (done) => {
    let data = {
      password: "Ciaociao.1",
      passwordConferma: "Ciaociao.12x",
      idUtente: 3,
    };

    chai
      .request(server)
      .post("/user/modificaPassword")
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});


describe("Reset password", () => {
  
  let tokenScaduto = "f912d68dad4a6174afcf488c96304dee7159ac8b9a31cab9895b62f5ef353d964b1d4a4f7a372057e51d5e53931cbbb9b9aec2f3ae729879aa0488f603c952c9";
  let tokenBuono = "123456789"; //prova

  it("Formato password non corretto", (done) => {
    let data = {
      password: "ghh",
      passwordConferma: "Ciaociao.1",
    };
    let token = tokenBuono;

    chai
      .request(server)
      .post("/user/reset-password/" + token)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Le password non coincidono", (done) => {
    let data = {
      password: "Ciaociao.1",
      passwordConferma: "Ciaociao.15d",
    };
    let token = tokenBuono;

    chai
      .request(server)
      .post("/user/reset-password/" + token)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Token scaduto o non valido", (done) => {
    let data = {
      password: "Ciaociao.1",
      passwordConferma: "Ciaociao.1",
    };
    let token = "gyugiulhlò";

    chai
      .request(server)
      .post("/user/reset-password/" + token)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Token scaduto o non valido", (done) => {
    let data = {
      password: "Ciaociao.1",
      passwordConferma: "Ciaociao.1",
    };
    let token = tokenScaduto;

    chai
      .request(server)
      .post("/user/reset-password/" + token)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Dovrebbe resettare la password", (done) => {
    let data = {
      password: "MatteoMatteo",
      passwordConferma: "MatteoMatteo",
    };
    
    let token = tokenBuono;

    chai
      .request(server)
      .post("/user/reset-password/" + token)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});




