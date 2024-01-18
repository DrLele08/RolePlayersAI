const utils = require("../models/utils");
const utente=require("../models/utente");
const randomString = require("randomstring");
const creazione = require("../models/creazione");

const utenteService={};
const requiredFields = ['username', 'nome', 'cognome', 'email', 'password', 'dataNascita', 'telefono'];
const ruoliValidi = ['utente', 'moderatore', 'amministratore'];

utenteService.getById = async (idUtente) =>{
    if(!utils.checkId(idUtente)){
        return Promise.reject("ID non valido");
    }

    let utenteCercato = await utente.getById(idUtente);
    if(utenteCercato !== null){
        return utenteCercato;
    }
    else{
        return Promise.reject("Utente non trovato");
    }
};

utenteService.Login = async (filters,password)=>{
    if(filters.username!== undefined)
    {
       filters.username=filters.username.trim();
       delete filters.email;
        if (!filters.username.match("^[a-zA-Z0-9]{4,25}$"))
            return Promise.reject("Formato username non valido!");
    }
    if(filters.email!== undefined)
    {
        delete filters.username;
        filters.email=filters.email.trim();
      if(!filters.email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"))
      {
          return Promise.reject("Formato email non valido!");
      }
    }

    if (password.match("^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$"))
        return Promise.reject("Formato password non valido!");

    let utenteTrovato = await utente.getByEmailorUsername(filters);

    if(utenteTrovato!==null)
    {
        if(utils.verify(password,utenteTrovato.password))
        {
            delete utenteTrovato.dataValues.password;
            return utenteTrovato;
        }
        else{
            return Promise.reject("Password non corretta");
        }

    }
    else{
        return Promise.reject("Email o username non corretti");
    }

}

utenteService.createUtente = async(data) => {
    if (!utils.checkParameters(data, requiredFields))
        return Promise.reject("Dati non validi!");

    // Username formato da solo lettere e numeri e lunghezza compresa tra 4 e 25 caratteri.
    if (!data.username.match("^[a-zA-Z0-9]{4,25}$"))
        return Promise.reject("Formato username non valido!");

    // Nome formato da solo lettere e spazi (secondi nomi?) e lunghezza compresa tra 2 e 25 caratteri.
    if (!data.nome.match("^[a-zA-Z\\s]{2,25}$"))
        return Promise.reject("Formato nome non valido!");

    // Cognome formato da solo lettere, apostrofi e spazi e lunghezza compresa tra 2 e 25 caratteri.
    if (!data.cognome.match("^[a-zA-Z\\s']{2,25}$"))
        return Promise.reject("Formato cognome non valido!");

    if (!data.email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"))
        return Promise.reject("Formato email non valido!");

    if (!data.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
        return Promise.reject("Formato password non valido!");

    if (!data.dataNascita.match("^[0-9]{2}-[0-9]{2}-[0-9]{4}$"))
        return Promise.reject("Formato data di nascita non valido!");

    // Numero di telefono che inizia con un '+' (per il prefisso) seguito da tutti numeri e lunghezza compresa tra 12 e 14 caratteri.
    if (!data.telefono.match("^\\+\\d{12,14}$"))
        return Promise.reject("Formato numero di telefono non valido!");

    data.authToken = randomString.generate({
        length: 64,
        charset: 'alphanumeric'
    });

    return utente.createUtente(data).catch(() => Promise.reject("Username e/o email già presenti!"));
};

utenteService.getActualAbbonamento = async (idUtente) =>{

    if(utils.checkId(idUtente)) {
        const abbonamento = await utente.getActualAbbonamento(idUtente);

        if (abbonamento) {
            return abbonamento;
        }
        else{
           return Promise.reject("Utente non Trovato")
        }
    }
    else{
        return Promise.reject("ID Utente non valido")
    }

}

utenteService.getByFilters = async(data) => {
    let fkAbbonamento = data.filters.fkAbbonamento;
    if (fkAbbonamento) {
        if (isNaN(fkAbbonamento) || fkAbbonamento < 1 || fkAbbonamento > 3)
            return Promise.reject("Filtro abbonamento non valido!");
    }

    if (data.filters.ruolo) {
        data.filters.ruolo = data.filters.ruolo.trim().toLowerCase();
        if (!ruoliValidi.includes(data.filters.ruolo))
            return Promise.reject("Filtro ruolo non valido!");
    }

    data.filters.username && (data.filters.username = data.filters.username.trim());

    return await utente.getByFilters(data.filters, data.pagina);
}

utenteService.setRuolo = async(data) => {
    const fields = ['idUtente', 'ruolo'];
    if (!utils.checkParameters(data, fields))
        return Promise.reject("Dati non validi!");

    if (!utils.checkId(data.idUtente))
        return Promise.reject("ID utente non valido!");

    let u = utente.getById(data.idUtente);
    if (!u)
        return Promise.reject("Utente non trovato!");

    data.ruolo = data.ruolo.trim().toLowerCase();
    if (!ruoliValidi.includes(data.ruolo))
        return Promise.reject("Ruolo non valido!");

    return await utente.setRuolo(data.idUtente, data.ruolo);
}

utenteService.getAll = async() =>{
    const utenti = await utente.getAll();
    return utenti;
}

utenteService.hasCreazione = async (idUtente, idCreazione)=>{
    if(utils.checkId(idUtente) && utils.checkId(idCreazione)){
        return utente.hasCreazione(idUtente, idCreazione);
    }
    else{
        return Promise.reject("ID non validi");
    }
}

utenteService.hasContesto = async (idUtente, idContesto)=>{
    if(utils.checkId(idUtente) && utils.checkId(idContesto)){
        return utente.hasContesto(idUtente, idContesto);
    }
    else{
        return Promise.reject("ID non validi");
    }
}

module.exports = utenteService;