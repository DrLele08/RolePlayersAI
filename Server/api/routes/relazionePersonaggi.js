module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/auth");
    const relazionePersonaggiController=require("../controllers/relazionePersonaggi.js");

    //Route per gestire richieste di una specifica relazione tra personaggi passando l`id
    router.get("/:idRelazione", middlewareAuth, relazionePersonaggiController.GetById);

    app.use("/api/relazionePersonaggi",router);
};