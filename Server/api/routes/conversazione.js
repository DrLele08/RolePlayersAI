module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authApi");
    const conversazione=require("../controllers/conversazione.js");

    router.get("/:idConversazione", middlewareAuth([1,2,3]), conversazione.GetById);

    router.get("/getMessaggi/:idConversazione", middlewareAuth([1,2,3]), conversazione.GetMessages);

    router.post("/inviaMessaggio", middlewareAuth([1,2,3]), conversazione.InviaMessaggio);

    app.use("/api/conversazione",router);
};