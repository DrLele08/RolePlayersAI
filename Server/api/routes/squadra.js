module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/auth");
    const squadra=require("../controllers/squadra.js");

    router.get("/",middlewareAuth,squadra.GetById);

    app.use("/api/squadra",router);
};
