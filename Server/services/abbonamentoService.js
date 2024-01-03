const abbonamento = require("../models/contesto");
const utils = require("../models/utils");



const abbonamentoService = {};

abbonamentoService.getById = async(idAbbonamento) => {
    if(utils.checkId(idAbbonamento))
    {
        let abbonamentoCercato = await abbonamento.getById(idAbbonamento);
        if(abbonamentoCercato !== null){
            return abbonamentoCercato;
        }
        else{
            return Promise.reject("Abbonamento non trovato");
        }
    }
}

abbonamentoService.getAll = async()=>{
    let listaAbbonamenti = abbonamento.getAll();

    if(listaAbbonamenti !== null){
        return listaAbbonamenti;
    }
    else{
        return Promise.reject("Lista degli Abbonamenti vuota");
    }
}
