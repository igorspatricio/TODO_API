const model = require('../model/TODOSModel.js')

const getAllTODOS = (req, res)=>{
    model.getData()
        .then((data) =>{
            return res.json(data);
        })    
};

const getTODOById = (req, res) =>{
    const id = Number(req.params.id);
    if (!id){
        return res.status(400).json({msg: "Invalid id type"})
    }

    model.getById(id)
        .then((todo) =>{
            if(!todo.length){
                return res.status(404).json({msg: "id not found"})
            }
            return res.json(...todo)
        })
    

}



module.exports =  {
    getAllTODOS,
    getTODOById
};