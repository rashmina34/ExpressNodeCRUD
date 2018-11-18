var express = require("express");
var route = express.Router();

//module.exports = (route) => {
const notes = require('../controller/export');

    // Create a new Note
    route.post('/notes', notes.create);

    // Retrieve a single Note with noteId
    route.get('/notes/:noteId', notes.findAll);

    // Update a Note with oteId
    route.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    route.delete('/notes/:noteId', notes.delete);

    module.exports = route;
//
/*// importing export file from controller folder
var pass = require('./../controller/export');

//'/show' will call the get function
router.get('/show', pass.getfunction);

// '/method' call the post function
router.post('/method', pass.postfunction);

//exporting router
module.exports = router;*/