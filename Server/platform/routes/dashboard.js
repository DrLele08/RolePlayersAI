module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authPlatform");
    const dashboard=require("../controllers/dashboard");


    router.get("/username",middlewareAuth([1,2,3]), dashboard.GetUsername);

    app.use("/dashboard",router);
};
