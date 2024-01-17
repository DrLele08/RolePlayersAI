module.exports = app => {
    const router = require("express").Router();
    const middlewareAuth=require("../../middleware/authPlatform");
    const abbonamentoController = require("../controllers/abbonamento");

    router.get("/", middlewareAuth([1,2,3]),abbonamentoController.PaginaAbbonamenti);

    app.use("/abbonamento", router);
}