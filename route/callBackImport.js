var express = require("express");
var call = express.Router();

// importing callBackExport file from controller folder
var Callback = require("../callbackController/callBackExport");

// Create a new node
call.post('/post', Callback.createData);

// Retrieve Data from DataBase
call.get('/get', Callback.RetrieveData);

//Updating data from database
call.put('/put/:dataId', Callback.updateData);

//Deleting data from dataBase
call.delete('/patch/:dataId',Callback.deleteData);

module.exports = call;