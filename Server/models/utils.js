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
utils.checkParameters=(dati ,requiredFields)=>{
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

/**
 * Calcola l'hash SHA-256 di una stringa fornita.
 *
 * @param {string} pwd - La stringa da cui calcolare l'hash SHA-256.
 * @returns {string} - L'hash SHA-256 rappresentato in formato base64.
 */
utils.sha256 = (pwd) => {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(pwd).digest('base64');
}

module.exports=utils;
