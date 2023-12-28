const contesto = require("../models/contesto");
const utils = require("../models/utils");

const contestoService = {};

contestoService.getById = async(idContesto) =>{
    if(utils.checkId(idContesto))
    {
        let contestoCercato = await contesto.getById(idContesto);
        if(contestoCercato !== null)
        {
            return contestoCercato;
        }
        else
        {
            return Promise.reject("Contesto non trovato");
        }
    }
    else
    {
        return Promise.reject("ID minore di 0");
    }
};




module.exports=contestoService;