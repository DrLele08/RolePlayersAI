module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/auth");
    const contesto=require("../controllers/contesto");

    router.get("/:idContesto",middlewareAuth,contesto.GetById);
    router.get("/:idContesto",middlewareAuth,contesto.DeleteContesto);

    app.use("/api/contesto",router);
};