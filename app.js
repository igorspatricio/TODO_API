const express = require('express');
const app = express()

const PORT = process.env.PORT || 3000;

//middleware
const logger = require('./middleware/logger.js');
const cors = require('cors')
const path = require('path')

app.use(cors(require('./config/corsOptions.js')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(logger);

//routes
app.use('/', require('./routes/root.js'));
app.use('/todos', require('./routes/TODOS'));

app.all('*', (req, res) =>{
    res.status(404)

    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', 'error404.html'))
    }else if (req.accepts('json')){
        res.json({error: '404 not found'})
    }else{
        res.send('404 not found')
    }    
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
module.exports = app;