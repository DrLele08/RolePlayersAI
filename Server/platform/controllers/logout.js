exports.Logout = (req, res)=> {
    if (req.session.idUtente !== undefined) {
        req.session.destroy();

        res.clearCookie('idUtente');
        res.clearCookie('tokenAuth');

        res.redirect(process.env.BASE_URL + "/");
    } else {
        res.redirect(process.env.BASE_URL + "/");
    }
};