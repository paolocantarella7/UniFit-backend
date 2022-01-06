let { DataTypes } = require("sequelize");
let Utente = require("./Utente");
let Fattura = require("./Fattura")
let singleton = require("../singleton/singleton");

let RichiestaTesseramento = singleton.define("richiesta_tesseramento", {
  idRichiesta_tesseramento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  dataRichiesta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipologiaTesseramento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statusRichiesta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prezzoTesseramento: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  certificatoAllegatoPath: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Utente.hasOne(RichiestaTesseramento, {foreignKey: "utente", as: "dettagliTesseramento"});
RichiestaTesseramento.belongsTo(Utente, { foreignKey: "utente", as: "utenteRichiedente"});
RichiestaTesseramento.hasOne(Fattura, {foreignKey: "richiesta", as: "fatturaPagamento"});
Fattura.belongsTo(RichiestaTesseramento, { foreignKey: "richiesta", as: "richiestaRiferimento"});



module.exports = RichiestaTesseramento;
