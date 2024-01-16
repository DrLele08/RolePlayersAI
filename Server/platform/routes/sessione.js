module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authPlatform");
    const sessione=require("../controllers/sessione");

    router.get("/", middlewareAuth([1,2,3]), sessione.GetSessioni);

    router.get("/:idSessione", middlewareAuth([1,2,3]), sessione.GetConversazione);

    app.use("/sessione",router);
};