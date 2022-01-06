let { DataTypes } = require("sequelize");
let singleton = require("../singleton/singleton");

let Fattura = singleton.define("fattura", {
  idFattura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  intestatario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalePagamento: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  dataRilascio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statusFattura: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Fattura;