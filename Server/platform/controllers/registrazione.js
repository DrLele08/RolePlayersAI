exports.PaginaRegistrazione = (req, ris)=> {
    if (req.session.idUtente == null && req.cookies.idUtente == null) {
        ris.render("registrazione");
    } else {
        ris.redirect(process.env.BASE_URL + "/dashboard");
    }
};