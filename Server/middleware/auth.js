//TODO aggiustare il middleware (mandava in loop le richieste)
/*module.exports=(Ruoli)=> {
    return (req, ris, next) => {
        let ruolo = 


        next();
    };
};*/

module.exports=(req,ris,next)=> {
    console.log("Middleware in corso...");
    next();
}
