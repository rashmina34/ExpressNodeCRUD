var express = require("express");
var router = express.Router();

// importing file promisesExorts from controller folder
const promise = require("../controller/AsyncExport");

//creating n new data
router.post("/promise", promise.createData);

// retrievening data from dataBase
router.get("/promiseGet", promise.retrieveData);

//updating data stored in dataBase
router.put("/promise/:id", promise.updateData);

//Deleting data from Datastore
router.delete("/promise/:id", promise.deleteData);

// impllementingpatch concept
router.patch("/promise/:id", promise.patch);    

//exporting 
module.exports = router;
