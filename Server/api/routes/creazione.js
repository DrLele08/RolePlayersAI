const middlewareAuth = require("../../middleware/auth");
const creazione = require("../controllers/creazione");


module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/auth");
    const creazione=require("../controllers/creazione");

    router.get("/:idCreazione",middlewareAuth,creazione.GetById);
    router.delete("/:idCreazione",middlewareAuth,creazione.DeleteById);
    router.get("/cerca",middlewareAuth,creazione.GetByFilter);

    router.post("/", middlewareAuth, creazione.CreateAmbiente);

    app.use("/api/creazione",router);
};