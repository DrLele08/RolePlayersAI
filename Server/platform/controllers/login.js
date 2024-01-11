exports.PaginaLogin = (req, ris)=> {
    if (req.session.idUtente === undefined) {
        {
            if(req.cookie.idUtente !== undefined)
            {
               let idCookie = req.cookie.idUtente;
               let tokenCookie = req.cookie.tokenAuth;
               req.session.idUtente = idCookie;
               req.session.authToken = tokenCookie;
               ris.redirect(process.env.BASE_URL + "/dashboard");
            }
            else {
                ris.render("login");
            }
        }
    } else {
        ris.redirect(process.env.BASE_URL + "/dashboard");
    }
};