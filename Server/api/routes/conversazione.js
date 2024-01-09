const middlewareAuth = require("../../middleware/authApi");
const conversazione = require("../controllers/conversazione");
module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authApi");
    const conversazione=require("../controllers/conversazione.js");

    router.get("/getMessaggi", middlewareAuth([1,2,3]), conversazione.GetMessages);
    router.get("/:idConversazione", middlewareAuth([1,2,3]), conversazione.GetById);

    router.post("/inviaMessaggio", middlewareAuth([1,2,3]), conversazione.InviaMessaggio);

    app.use("/api/conversazione",router);
};