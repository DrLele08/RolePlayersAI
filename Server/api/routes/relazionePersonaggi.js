module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/auth");
    const relazionePersonaggiController=require("../controllers/relazionePersonaggi.js");

    router.get("/:idRelazionePersonaggi", middlewareAuth, relazionePersonaggiController.GetById);

    router.get("/contesto/:idContesto", middlewareAuth, relazionePersonaggiController.GetByContesto);

    router.post("/", middlewareAuth, relazionePersonaggiController.CreateRelazionePersonaggi);

    app.use("/api/relazionePersonaggi",router);
};