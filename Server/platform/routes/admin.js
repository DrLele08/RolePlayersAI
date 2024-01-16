module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authPlatform");
    const admin=require("../controllers/admin");

    router.get("/", middlewareAuth([1,2,3]), admin.GetAdminPage);

    app.use("/admin",router);
};
