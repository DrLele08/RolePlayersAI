exports.PaginaRegistrazione = (req, ris)=> {
    if (req.session.idUtente == null) {
        ris.render("sign-up");
    } else {
        ris.render("index")
    }
};