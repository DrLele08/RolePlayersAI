module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authPlatform");
    const profilo=require("../controllers/profilo");


    router.get("/", middlewareAuth([1,2,3]), profilo.GetAreaProfilo);

    app.use("/profilo",router);
};