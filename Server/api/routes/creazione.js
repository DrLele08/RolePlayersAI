const middlewareAuth = require("../../middleware/auth");
const creazione = require("../controllers/creazione");

module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/auth");
    const creazione=require("../controllers/creazione");

    router.get("/:idCreazione",middlewareAuth,creazione.GetById);
    router.get("/:idCreazione",middlewareAuth,creazione.DeleteById);

    app.use("/api/creazione",router);
};