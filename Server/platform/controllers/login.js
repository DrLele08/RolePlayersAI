exports.PaginaLogin = (req, ris)=> {
    if (req.session.idUtente === undefined) {
            if(req.cookies.idUtente !== undefined)
            {
               let idCookie = req.cookies.idUtente;
               let tokenCookie = req.cookies.tokenAuth;
               req.session.idUtente = idCookie;
               req.session.authToken = tokenCookie;
               ris.redirect(process.env.BASE_URL + "/dashboard");
            }
            else {
                ris.render("login");
            }

    } else {
        ris.redirect(process.env.BASE_URL + "/dashboard");
    }
};