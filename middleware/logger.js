const logger = (req, res, next) =>{
    console.log(req.method, "|", req.path);
    console.log("origin: ",req.get('host'))
    next();
}

module.exports = logger;