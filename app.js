let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let path = require('path');
let expressFileUpload = require("express-fileupload");
let cors = require('cors')
const adminRoute = require('./routes/adminRoutes');
const utenteRouter = require('./routes/utenteRoutes');
const prenotazioneRoute = require('./routes/prenotazioneRoutes');


let app = express();
let port = 5000;
app.use(expressFileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'docs')));
app.use(cookieParser());
app.use(cors())

app.use('/admin', adminRoute);
app.use('/prenotazione', prenotazioneRoute);
app.use('/user', utenteRouter);

app.get('/', (req, res) => {
    res.send('Benvenuto su UniFit!');
});

let server = app.listen(port, function () {
    let address = server.address().address;
    let port = server.address().port;
    console.log("Listening on " + address + ":" + port);
});

module.exports = app;