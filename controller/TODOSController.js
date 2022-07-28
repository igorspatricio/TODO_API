const model = require('../model/TODOSModel.js')

const getAllTODOS = (req, res)=>{
    model.getData()
        .then((data) =>{
            res.json(data);
        })    
};



module.exports =  {
    getAllTODOS
};