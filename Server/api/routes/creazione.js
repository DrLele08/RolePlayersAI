const middlewareAuth = require("../../middleware/auth");
const creazione = require("../controllers/creazione");

module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/auth");
    const creazione=require("../controllers/creazione");

    router.get("/:id",middlewareAuth,creazione.GetById);


    app.use("/api/creazione",router);
};