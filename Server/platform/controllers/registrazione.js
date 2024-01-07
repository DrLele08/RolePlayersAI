exports.PaginaRegistrazione = (req, ris)=> {
    if (req.session.idUtente == null) {
        ris.render("sing-up");
    } else {
        ris.render("index")
    }
};