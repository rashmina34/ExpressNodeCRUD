var calls = require('./../modal/modal');

// createing the data in database
exports.createData = function(request, response){
    var node = new calls(
        {
            userName: request.body.userName,
            content: request.body.content,
            date: request.body.date
        }
    );  
    node.save(function (err) {
        if (err) {
            return console.error(err);
        }
        response.json({"message":"Date is successfully inserted"});
    })
}; 

//retrieving data from database
exports.RetrieveData = function(request, response){
    calls.find(function (err, res){
        if (err){
            return console.error(err);
        }
        response.json(res);
    })
};

//updating data of database
exports.updateData = function(request, response){
    calls.findByIdAndUpdate( request.params.dataId, {$set: request.body}, function(err){
        if (err){
            return console.error(err);
        }
        response.json({"message":"updated!!!!"});
    })
};

//Deleting data in the database
exports.deleteData = function(request, response){
    calls.findByIdAndRemove(request.params.dataId, function(err){
        if(err){
            return console.log(err);
        }
        response.json({"message":"deleted!!!"});
    })
};