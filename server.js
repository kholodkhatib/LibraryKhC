var port = process.env.PORT || 3000;


var express  = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app  = express();                               // create our app w/ express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// pull information from HTML POST (express4)
var cookieParser = require('cookie-parser');




app.use(express.static(__dirname ));                 // set the static files location /public/img will be /img for users

app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(cookieParser());



app.listen(port);
console.log("App listening on port " + port);

