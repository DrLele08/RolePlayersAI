module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/auth");
    const test=require("../controllers/test.js");

    router.get("/:idSquadra",middlewareAuth,test.Test);

    app.use("/",router);
};
