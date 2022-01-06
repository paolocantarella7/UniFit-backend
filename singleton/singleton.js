let Sequelize = require('sequelize');
let db = require('./db.json');

let sequelize = new Sequelize('unifit', db.username, db.password, {
    host : db.host,
    dialect: 'mysql',
    define: {
        timestamps: false, //utile per non permenttere l'aggiunta di info inutili nelle entità
        freezeTableName: true                                                                                                                                                                                   
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false, //per evitare il log delle query nella console
    operatorsAliases: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Connessione al DB riuscita!');
    })
    .catch(err => {
        console.error('Impossibile connettersi al DB:', err);
    });


module.exports = sequelize;