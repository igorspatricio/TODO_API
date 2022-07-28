const { readFile, writeFile} = require('fs').promises;
const path  = require('path');

getData = async ()=>{
    console.log(path.join(__dirname, "./TODOS.json"))
    const data =  await readFile(path.join(__dirname, "./TODOS.json"))
    return  JSON.parse(data);
}

module.exports = {
    getData
}