const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const  https  =  require ( 'https' ) ;
// const  fs  =  require ( 'fs' ) ;

var fs = require('fs'); 

var options = { 
    key: fs.readFileSync(path.join(__dirname, 'certs/server-key.pem')), 
    cert: fs.readFileSync(path.join(__dirname, 'certs/server-cert.pem')), 
    
    requestCert: true, 
    rejectUnauthorized: true
};
https.createServer(options, function (req, res) { 
    res.writeHead(200); 
    res.end("hello world\n"); 
}).listen(443);


//Securization APP TLS


app.use(cors())
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
//app.use(express.urlencoded({extended: false}));
app.use(express.json())

// Routes
app.use(require('./routes/index'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
// prueba
module.exports = app;
