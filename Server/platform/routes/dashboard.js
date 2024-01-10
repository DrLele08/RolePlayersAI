module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authPlatform");
    const dashboard=require("../controllers/dashboard");


    router.get("/", middlewareAuth([1,2,3]), dashboard.GetDashboard);

    app.use("/dashboard",router);
};
