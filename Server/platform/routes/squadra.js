module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authApi");
    const squadra=require("../controllers/squadra.js");


    router.get("/",squadra.Home)
    router.get("/:idSquadra",middlewareAuth,squadra.GetById);


    app.use("/squadra",router);
};
