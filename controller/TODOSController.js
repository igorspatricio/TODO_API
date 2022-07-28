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
        return res
            .status(400)
            .json({msg: "Invalid id type"})
    }

    model.getById(id)
        .then((todo) =>{
            if(!todo.length){
                return res
                    .status(404)
                    .json({msg: "id not found"})
            }
            return res.json(...todo)
        })
    

}
const postTODO = (req, res) =>{
    const {name} = req.body;
    if(typeof name !== typeof " "){
        return res
                .status(422)
                .json({msg: "Invalid TODO"})
    }

    model.addTODO({name})
        .then((result) =>{
            return res
                .status(201)
                .json(result)
        })

}

const putTODO = (req, res) =>{
    const attData = {
        id: Number(req.params.id),
        completed: req.body.completed,
    }
    model.attTODO(attData).then(result =>{
        res.status(200).json(result)
    })
}

 


module.exports =  {
    getAllTODOS,
    getTODOById,
    postTODO,
    putTODO
};