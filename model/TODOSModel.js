const { readFile, writeFile} = require('fs').promises;
const path  = require('path');

const getData = async ()=>{
    const TODOS =  await readFile(path.join(__dirname, "../data/TODOS.json"))
    return  JSON.parse(TODOS);
}

const getById = async (id) => {
    const TODOS = await getData();

    return TODOS.filter((TODO) =>{        
        return TODO.id === id;
    })
}
const getMaxId = (TODOS) =>{
    const arr = TODOS.map((todo) =>{ return todo.id}) 
    return Math.max(...arr);
}

//não a maneira mais eficiente mas o proposito não é aprender manipular json
const addTODO = async(newTODO)=>{
    let TODOS = await getData();

    newTODO.id = getMaxId(TODOS) + 1
    newTODO.completed = false

    TODOS.push(newTODO);
    await writeFile(
        path.join(__dirname, "../data/TODOS.json"),
        JSON.stringify(TODOS),
        'utf8');

    return TODOS[TODOS.length-1];
    
}

const attTODO = async (dataAtt)=>{
    let TODOS = await getData();

    if(!TODOS.filter((todo) => {return todo.id === dataAtt.id})){
        return 0;
    }

    TODOS = TODOS.map((todo) => {
        if (todo.id === dataAtt.id )
            todo.completed = dataAtt.completed;
        return todo;
    })

    await writeFile(
        path.join(__dirname, "../data/TODOS.json"),
        JSON.stringify(TODOS),
        'utf8');
    
    
    return TODOS.filter((todo) => {return todo.id === dataAtt.id})[0]
}

const removeTODO = async (id)=>{
    let TODOS = await getData();
    let todo = TODOS.filter((todo) => {return todo.id === id})
    if(!todo){
        return 0;
    }
    
    TODOS = TODOS.filter((todo) => {
        if (todo.id !== id )
            return todo;        
    })

    

    await writeFile(
        path.join(__dirname, "../data/TODOS.json"),
        JSON.stringify(TODOS),
        'utf8');
    
    
    return todo[0]
}

module.exports = {
    getData,
    getById,
    addTODO,
    attTODO,
    removeTODO
}