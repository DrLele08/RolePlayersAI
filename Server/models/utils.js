const utils={};

utils.checkParameter=(req,vettParam)=>{
    for(let i=0;i<vettParam.length;i++)
    {
        if(req[vettParam[i]] === undefined)
            return false;
    }
    return true;
};

//Controlla la validità dell`ID
utils.checkId=(id)=>{
    return id > 0;
}

utils.isValidDatiContesto=(dati)=>{
    if(!dati){
        return false;
    }

    const requiredFields = ['nome', 'descrizione', 'isPubblico', 'FkUtente', 'FkAmbiente'];
    for(const field of requiredFields){
        if(!(field in dati) || dati[field] === undefined || dati[field] === null){
            return false;
        }
    }

    return true;
}

module.exports=utils;
