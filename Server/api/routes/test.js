module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/auth");
    const test=require("../controllers/test.js");

    router.get("/",middlewareAuth,test.Test1);

    app.use("/api/test",router);
};
