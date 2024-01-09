module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authApi");
    const creazione=require("../controllers/creazione");
    const multer=require('multer');

    router.get( "/cerca",middlewareAuth([1,2,3]),creazione.GetByFilter);
    router.get("/:idCreazione",middlewareAuth([1,2,3]),creazione.GetById);
    router.delete("/:idCreazione",middlewareAuth([2,3]),creazione.DeleteById);

    router.post("/",multer().single("foto"), middlewareAuth([1,2,3]), creazione.CreateCreazione);

    app.use("/api/creazione",router);
};
