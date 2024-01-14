module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authPlatform");
    const dashboard=require("../controllers/dashboard");


    /**
     * Ottiene le informazioni necessarie per renderizzare la dashboard.
     *
     * @name GetDashboard
     * @route {GET} /dashboard
     * @group Dashboard - Operazioni relative alla dashboard
     * @param {Array<number>} middlewareAuth - Middleware per l'autenticazione (ruoli: [1, 2, 3]).
     * @controller dashboard.GetDashboard - Il controller responsabile di gestire la richiesta.
     * @function
     */
    router.get("/", middlewareAuth([1,2,3]), dashboard.GetDashboard);

    app.use("/dashboard",router);
};
