const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

//parse
app.use(express.urlencoded({ extended: false }))
//parse json
app.use(express.json())

app.get('/todos', (req,res)=>{
    res.status(200).send([{name: 'algo', completed: true}])
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;