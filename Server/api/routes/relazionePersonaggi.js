module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authApi");
    const relazionePersonaggi=require("../controllers/relazionePersonaggi.js");

    /**
     * Ottiene i dettagli di una relazione dato l`ID.
     *
     * @route {GET} /api/relazionePersonaggi/:idRelazionePersonaggi
     * @group RelazionePersonaggi - Operazioni relative alle relazioni tra personaggi
     * @param {Array<number>} middlewareAuth - Array contenente i ruoli consentiti per l'autenticazione API (1=Utente, 2=Moderatore, 3=Amministratore).
     * @param {Number} idRelazionePersonaggi - ID della relazione richiesta
     * @return {Object} - Restituisce un oggetto contente i dettagli della relazione
     */
    router.get("/:idRelazionePersonaggi", middlewareAuth([1,2,3]), relazionePersonaggi.GetById);

    /**
     * Ottiene tutte le relazioni di un contesto
     *
     * @route {GET} /api/relazionePersonaggi/contesto/:idContesto
     * @group RelazionePersonaggi - Operazioni relative alle relazioni tra personaggi
     * @param {Array<number>} middlewareAuth - Array contenente i ruoli consentiti per l'autenticazione API (1=Utente, 2=Moderatore, 3=Amministratore).
     * @param {Number} idContesto- ID del contesto
     * @return {Object} - Restituisce un oggetto contente i dettagli di tutte le relazioni appartenenti al contesto
     */
    router.get("/contesto/:idContesto", middlewareAuth([1,2,3]), relazionePersonaggi.GetByContesto);

    /**
     * Ottiene tutte le relazioni di un contesto
     *
     * @route {POST} /api/relazionePersonaggi
     * @group RelazionePersonaggi - Operazioni relative alle relazioni tra personaggi
     * @param {Array<number>} middlewareAuth - Array contenente i ruoli consentiti per l'autenticazione API (1=Utente, 2=Moderatore, 3=Amministratore).
     * @return {Object} - Restituisce un oggetto contente i dettagli della relazione appena creata
     */
    router.post("/", middlewareAuth([1,2,3]), relazionePersonaggi.CreateRelazionePersonaggi);

    app.use("/api/relazionePersonaggi",router);
};