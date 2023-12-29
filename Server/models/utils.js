const utils={};

/**
 * Verifica la validità dei dati forniti in base ai campi richiesti
 *
 * @function
 *
 * @param {Object} dati - Oggetto contenente i dati da verificare
 * @param {String[]} requiredFields - Array contenente i nomi dei campi richiesti
 * @return {boolean} - True se i dati sono validi, False altrimenti
 */
utils.checkParameter=(dati ,requiredFields)=>{
    if(!dati){
        return false;
    }

    for(const field of requiredFields){
        if(!(field in dati) || dati[field]===undefined || dati[field]===null){
            return false;
        }
    }

    return true;
};

/**
 * Verifica la validità dell`ID
 *
 * @param {Number} id - ID da verificare
 * @return {boolean} - True se l`ID è valido, False altrimenti
 */
utils.checkId=(id)=>{
    return id > 0;
}


//TODO eliminare questa funzione (anche nel service Contesto) e utilizzare checkParameter
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
