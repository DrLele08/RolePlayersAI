exports.PaginaRegistrazione = (req, ris)=> {
    if (req.session.idUtente == null) {
        ris.render("sign-up");
    } else {
        ris.redirect(process.env.BASE_URL + "/dashboard");
    }
};