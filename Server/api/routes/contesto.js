module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authApi");
    const contesto=require("../controllers/contesto");

    router.get("/", middlewareAuth([1,2,3]), contesto.GetAll);
    router.post("/", middlewareAuth([1,2,3]), contesto.CreateContesto);
    router.get("/:idContesto",middlewareAuth([1,2,3]),contesto.GetById);
    router.delete("/:idContesto",middlewareAuth([2,3]),contesto.DeleteContesto);

    app.use("/api/contesto",router);
};