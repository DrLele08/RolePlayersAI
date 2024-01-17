module.exports = app => {
    const router = require("express").Router();
    const middlewareAuth=require("../../middleware/authPlatform");
    const contenutoController = require("../controllers/contenuto");

    router.get("/", middlewareAuth([1,2,3]),contenutoController.PaginaContenuti);

    app.use("/contenuto", router);
}