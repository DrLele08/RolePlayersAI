module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/auth");
    const contesto=require("../controllers/contesto");

    router.get("/", middlewareAuth, contesto.GetAll);
    router.post("/", middlewareAuth, contesto.CreateContesto);
    router.get("/:idContesto",middlewareAuth,contesto.GetById);
    router.delete("/:idContesto",middlewareAuth,contesto.DeleteContesto);

    app.use("/api/contesto",router);
};