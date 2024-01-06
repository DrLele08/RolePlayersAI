module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authApi");
    const messaggio=require("../controllers/conversazione.js");

    router.post("/inviaMessaggio", middlewareAuth([1,2,3]), messaggio.InviaMessaggio);

    app.use("/api/conversazione",router);
};