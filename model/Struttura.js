let { DataTypes } = require("sequelize");
let singleton = require("../singleton/singleton");
let Chiusura = require("./Chiusura");
let Prenotazione = require("./Prenotazione");

let Struttura = singleton.define("struttura", {
  idStruttura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prezzoPerFascia: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  durataPerFascia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacitaPerFascia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isCancellata: {
    type: DataTypes.TINYINT,
    allowNull: true,
    default: 0,
  },
  oraInizioMattina: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  oraFineMattina: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  oraInizioPomeriggio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  oraFinePomeriggio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataInizioDisponibilita: {
    type: DataTypes.STRING,
    allowNull: false,
  }  

});

Struttura.hasMany(Chiusura, {foreignKey: 'struttura', as: "giorniChiusura"});
Chiusura.belongsTo(Struttura, {foreignKey: 'struttura', as : "strutturaRiferimento"});
Struttura.hasMany(Prenotazione, {foreignKey: 'struttura', as: "listaPrenotazioniStruttura"});
Prenotazione.belongsTo(Struttura, {foreignKey: 'struttura', as : "strutturaPrenotata"});

module.exports = Struttura;
