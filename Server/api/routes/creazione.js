const middlewareAuth = require("../../middleware/authApi");
const creazione = require("../controllers/creazione");


module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authApi");
    const creazione=require("../controllers/creazione");

    router.get("/:idCreazione",middlewareAuth([1,2,3]),creazione.GetById);
    router.delete("/:idCreazione",middlewareAuth([2,3]),creazione.DeleteById);
    router.get("/cerca",middlewareAuth([1,2,3]),creazione.GetByFilter);

    router.post("/", middlewareAuth([1,2,3]), creazione.CreateCreazione);

    app.use("/api/creazione",router);
};
