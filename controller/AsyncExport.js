var node = require("./../modal/modal");
exports.createData = async (request, response) => {
    if(!request.body.content){
        return response.status(400).send({
            message : "node cannot be empty"
        });
    }

    // creating a data
    let Node = new node({
        userName : request.body.userName,
        content : request.body.content,
        delete :request.body.delete
    });
    
    //save node in DataBase
    try{
        const data = await Node.save();
        const success = await response.json({message :"successful!!"});
    }
    catch(err){
        response.status(500).json({
            message: "error occur"
        });
    }
};

//Retrieve data from dataBase
exports.retrieveData = async(request, response) =>{
    try{
        const Node = await node.find({delete: {$ne: true}}).sort({date: 'desc'});
        const output = await response.json(Node);
        return output;
    }
    catch(err){
        response.status(500).json({
            message: "something went wrong"
        });
    }
};

//updating data in database
exports.updateData = async(request, response) => {
    if(!request.body.content) {
        return response.status(400).send({
            message: "Node content can not be empty"
        });
    }
    try{
        const note = await node.findById(request.params.id);
        note.userName = await request.body.userName;
        note.content = await request.body.content;

        if(!node){
            return response.status(404).send({
                message: "data not found with id" + request.params.id
            });
        }
        const data = await note.save();
        const inform = await response.json({
            message: "updated successfully"
        });
    }
    catch(err){
        if(err.kind === 'ObjectId') {
            return response.status(404).send({
                message: "Note not found with id " + request.params.id
            });                
        }
        return response.status(500).send({
            message: "Error updating note with id " + request.params.id
        });
    }
};

//Delete a data from database
exports.deleteData = async(request, response) =>{
    if(!request.params.id){
        return response.status(404).json({message: "data not found"});
    }
    try{
        const datas = await node.findByIdAndRemove(request.params.id);
        const message = await response.send({message: "deleted"});
        //if(!node) {
          //  return response.status(404).send({
            //    message: "Note not found with id " + request.params.id
            //});
        }
        
        //const message = await response.json({
          //  message : "data deleted"
        //});
   // }
    catch(err){
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return response.status(404).send({
                message: "Note not found with id " + request.params.id
            });                
        }
        return response.status(500).send({
            message: "data can't be deleted with id" + request.params.id
        });
    }
};
// updating the exact value
exports.patch = async(request, response) => {
    try{
        const note = await node.findById(request.params.id);
        if(request.params.id){
            delete request.params.id;
        }
        note.delete =true;
        const save = await note.save();
        const responses = await response.send({message: "updated"});
    }
    catch(err){
        response.status(500).json({
            message: "something went wrong"
        });
    }
};