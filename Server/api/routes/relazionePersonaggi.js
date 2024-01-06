module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authApi");
    const relazionePersonaggi=require("../controllers/relazionePersonaggi.js");

    router.get("/:idRelazionePersonaggi", middlewareAuth([1,2,3]), relazionePersonaggi.GetById);

    router.get("/contesto/:idContesto", middlewareAuth([1,2,3]), relazionePersonaggi.GetByContesto);

    router.post("/", middlewareAuth([1,2,3]), relazionePersonaggi.CreateRelazionePersonaggi);

    app.use("/api/relazionePersonaggi",router);
};