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

    // ?pageNumber=3&size=4 using find
    try{
            var pageNo = parseInt(request.query.pageNo)
            var size = parseInt(request.query.size)
            var query = {}//empty query

            // validating the page
            if(pageNo < 0 || pageNo === 0) {
                response = {"error" : true,"message" : "invalid page number, should start with 1"};
                return response.json(response)
            }

            // logic of skip and limit
            query.skip = size * (pageNo - 1)
            query.limit = size

            const user= node.find({},{},query);
            const note = await user.find({deleted: {$ne: true}}).sort({date: 'desc'});
            const msg= await response.json(note);
            return msg;
        /*//const query = {}; //empty query  

        //Handling query request
        const pagenum = parseInt(request.query.pagenum);
        const datasize = parseInt(request.query.datasize);
        const query = {}; //empty query  


        //invalid pageNO
        if (pagenum < 0 || pagenum ===0) {
            return response.json({ message: "Mentioned page number not found" });
        }

        //fetch pageNo and size
        query.skip = datasize * (pagenum - 1);
        query.limit = datasize;

        const users = await node.find({}, {}, query);
        const Node = await users.find({delete: {$ne: true}}).sort({date: 'desc'}); // if delete is not equal to true
        //const Node = await node.find().sort({date: 'desc'});
        const output = await response.json(Node);
        return output;*/
    }
    catch(err){
        response.status(500).json({
            message: "something went wrong",
            errmessage: err.toString()
        });
    }
};

//retrieve data from database by id
exports.retrievebyId = async(request, response) => {
    if(!request.params.id) {
        return resuest.status(404).json({
            message: "data not found with id " + request.params.id
        });            
    }

    try {
        const note = await node.findById(request.params.id);
        const product = await response.json(note);
        return product;
    }

    catch(err) {
        if(err.kind === 'ObjectId') {
            return response.status(404).json({
                message: "data not found with id "  + request.params.id
            });                
        }
        return response.status(500).json({
            message: "Error retrieving data with id "  + request.params.id,
            errmessage: err.toString() //error message to server 
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
                message: "Note not found with id " + request.params.id,
                errmessage: err.toString()
            });                
        }
        return response.status(500).send({
            message: "Error updating note with id " + request.params.id,
            errmessage: err.toString()
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
                message: "Note not found with id " + request.params.id,
                errmessage: err.toString()
            });                
        }
        return response.status(500).send({
            message: "data can't be deleted with id" + request.params.id,
            errmessage: err.toString()
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
        //note.delete =true;
        if (note.delete == false){
            note.delete = true;
        }
        else{
            note.delete = false;
        }

        //save the updated value
        const save = await note.save();
        const responses = await response.send({message: "changes are updated"});
    }
    catch(err){
        response.status(500).json({
            message: "something went wrong",
            errmessage: err.toString()
        });
    }
};