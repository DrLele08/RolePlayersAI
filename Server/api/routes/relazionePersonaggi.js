module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authApi");
    const relazionePersonaggi=require("../controllers/relazionePersonaggi.js");

    router.get("/:idRelazionePersonaggi", middlewareAuth, relazionePersonaggi.GetById);

    router.get("/contesto/:idContesto", middlewareAuth, relazionePersonaggi.GetByContesto);

    router.post("/", middlewareAuth, relazionePersonaggi.CreateRelazionePersonaggi);

    app.use("/api/relazionePersonaggi",router);
};