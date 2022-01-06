let { DataTypes } = require("sequelize");
let singleton = require("../singleton/singleton");
let Fattura = require("../model/Fattura");

let Prenotazione = singleton.define("prenotazione", {
  idPrenotazione: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  dataPrenotazione: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  oraInizio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  oraFine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalePagato: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  }
});

Prenotazione.hasOne(Fattura, { foreignKey: "prenotazione", as: "fatturaPagamento"});
Fattura.belongsTo(Prenotazione, { foreignKey: "prenotazione", as: "prenotazioneRiferimento"});

module.exports = Prenotazione;
