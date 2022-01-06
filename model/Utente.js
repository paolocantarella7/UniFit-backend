let { DataTypes } = require("sequelize");
let singleton = require("../singleton/singleton");
let Prenotazione = require("./Prenotazione");
let Crypto = require("crypto");

let Utente = singleton.define("utente", {
  idUtente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  codiceFiscale: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cognome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataNascita: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  indirizzoResidenza: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nazionalita: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.TINYINT,
    allowNull: true,
    default: 0,
  },
  isCancellato: {
    type: DataTypes.TINYINT,
    allowNull: true,
    default: 0,
  },
  isTesserato: {
    type: DataTypes.TINYINT,
    allowNull: true,
    default: 0,
  },
  tokenRecuperoPassword: {
    type: DataTypes.STRING,
    allowNull: true,
    default: null,
  },
  dataScadenzaTokenRP: {
    type: DataTypes.STRING,
    allowNull: true,
    default: null,
  },
  numeroTelefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

let hashPassword = (password) => {
  return Crypto.createHash("sha512").update(password).digest("hex");
};

Utente.beforeCreate((user) => {
  user.password = hashPassword(user.password);
});

Utente.beforeUpdate((user) => {
  user.password = hashPassword(user.password);
});

Utente.hasMany(Prenotazione, { foreignKey: "utente", as: "listaPrenotazioni" });
Prenotazione.belongsTo(Utente, { foreignKey: "utente", as: "utentePrenotato" });

module.exports = Utente;
