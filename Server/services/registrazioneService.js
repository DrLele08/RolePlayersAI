const utente = require("../models/utente");
const utils = require("../models/utils");
const randomString = require("randomstring");

const registrazioneService = {};
const requiredFields = ['username', 'nome', 'cognome', 'email', 'password', 'dataNascita', 'telefono'];

registrazioneService.createUtente = async(data) => {
    if (!utils.checkParameters(data, requiredFields))
        return Promise.reject("Dati non validi!");

    // Username formato da solo lettere e numeri e lunghezza compresa tra 4 e 25 caratteri.
    if (!data.username.match("^[a-zA-Z0-9]{4,25}$"))
        return Promise.reject("Formato username non valido!");

    // Nome formato da solo lettere e spazi (secondi nomi?) e lunghezza compresa tra 2 e 25 caratteri.
    if (!data.name.match("^[a-zA-Z\\s]{2,25}$"))
        return Promise.reject("Formato nome non valido!");

    // Cognome formato da solo lettere, apostrofi e spazi e lunghezza compresa tra 2 e 25 caratteri.
    if (!data.cognome.match("^[a-zA-Z\\s']{2,25}$"))
        return Promise.reject("Formato cognome non valido!");

    if (!data.email.match("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,10}$"))
        return Promise.reject("Formato email non valido!");

    if (!data.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
        return Promise.reject("Formato password non valido!");

    if (!data.dataNascita.match("^[0-9]{2}-[0-9]{2}-[0-9]{4}$"))
        return Promise.reject("Formato data di nascita non valido!");

    // Numero di telefono che inizia con un '+' (per il prefisso) seguito da tutti numeri e lunghezza compresa tra 13 e 14 caratteri.
    if (!data.telefono.match("^\\+\\d{13,14}$"))
        return Promise.reject("Formato numero di telefono non valido!");

    data.authToken = randomString.generate({
        length: 64,
        charset: 'alphanumeric'
    });

    return await utente.CreateUtente(data);
};

module.exports = registrazioneService;