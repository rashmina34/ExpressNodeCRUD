// Importing top level function of express
var express = require('express');
var route = require('./route/import');
var callbckRoute = require('./route/callBackImport');
var promise = require('./route/AsyncImport');
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
// creates an express application
var app = express();

// connecting to database in locally running instance of mongoDB 'datastore' database
mongoose.connect('mongodb://localhost/datastore');

//testing the connection
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection error:'));
db.once('open', () =>{
    console.log("connected!!!");
});

// parese request of content type -application/json
app.use(bodyparser.json());

// parse request of content type -appilication/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}));
app.use('/callback/',callbckRoute);
app.use('/api/', route);
app.use('/promises/', promise);

app.listen(4040, "localhost", () => {
    console.log("server working");
});
// defining a port number
/*const port = 2978;
// making app listen on the port number
app.listen(port, function(){
    console.log("The server listen on the http://localhost:" + port);
});*/
