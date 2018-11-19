// importing mongoose.modal from modal
var Note = require('./../modal/modal');

// Create and Save a new Note
exports.create = (request, response) => {
    
    // Validate request // the content below is the variable content which can't be empty
    if(!request.body.content) {
        return response.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        userName: request.body.userName, //|| "Untitled Note", 
        content: request.body.content
    });

    // Save Note in the database
    note.save()
    .then(data => {
        response.send(data);
    }).catch(err => {
        response.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (request, response) => {
    Note.find()
    .then(notes => {
        response.send(notes);
    }).catch(err => {
        response.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (request, response) => {
    // Validate Request
    if(!request.body.content) {
        return response.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(request.params.noteId, {
        userName: request.body.userName, //|| "Untitled Note",
        content: request.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });
        }
        response.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });                
        }
        return response.status(500).send({
            message: "Error updating note with id " + request.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
/*exports.delete = (request, response) => {
    Note.findByIdAndRemove(request.params.noteId)
    .then(note => {
        if(!note) {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });
        }
        response.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });                
        }
        return response.status(500).send({
            message: "Could not delete note with id " + request.params.noteId
        });
    });
};*/
exports.delete = (request, response) => {
    Note.findByIdAndRemove(request.params.noteId)
    .then(note => {
        if(!note) {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });
        }
        response.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            });                
        }
        return response.status(500).send({
            message: "Could not delete note with id " + request.params.noteId
        });
    });
};
/*const data = [{userName : "Rashmina Shrestha",
                userId : 80}];
exports.getfunction = function(request, response){
    
//response.json({FamilyName: 'Shrestha'});  //response method for json object
data.push ({userName : request.body.userName,
                userId : request.body.userId
});
response.json({message : "successful!!!"});
};

exports.postfunction = function(request, response){
response.json(data);
};*/
 