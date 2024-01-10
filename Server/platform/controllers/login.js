exports.PaginaLogin = (req, ris)=> {
    if (req.session.idUtente == null) {
        ris.render("login");
    } else {
        ris.redirect(process.env.BASE_URL + "/dashboard");
    }
};