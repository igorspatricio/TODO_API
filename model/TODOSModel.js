const { readFile, writeFile} = require('fs').promises;
const path  = require('path');

getData = async ()=>{
    console.log(path.join(__dirname, "./TODOS.json"))
    const TODOS =  await readFile(path.join(__dirname, "./TODOS.json"))
    return  JSON.parse(TODOS);
}

getById = async (id) => {
    const TODOS = await getData();
    return TODOS.filter((TODO) =>{        
        return TODO.id === id;
    })
}



module.exports = {
    getData,
    getById
}