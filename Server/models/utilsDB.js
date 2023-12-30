const utilsDB={};

//TODO: Completare tutte le associazioni quando vengono fatti i model necessari
//Serve ad inizializzare tutte le associazioni tra i vari Models
utilsDB.SetRelationships=()=>{
    const utente=require("./utente");
    const abbonamento=require("./abbonamento");
    const contesto=require("./contesto");
    const creazione=require("./creazione");
    const relazionePersonaggi=require("./relazionePersonaggi");


    //Utente --> Abbonamento
    utente.Utente.belongsTo(abbonamento.Abbonamento, {
        foreignKey: 'fkAbbonamento',
        as: 'Abbonamento'
    });
    abbonamento.Abbonamento.hasMany(utente.Utente, {
        foreignKey: 'fkAbbonamento',
        as: 'UtentiAbbonati'
    });



    //RelazionePersonaggi --> Contesto
    relazionePersonaggi.RelazionePersonaggi.belongsTo(contesto.Contesto, {
        foreignKey: 'fkContesto',
        as: 'Contesto'
    });
    contesto.Contesto.hasMany(relazionePersonaggi.RelazionePersonaggi,{
        foreignKey: 'fkContesto',
        as: 'RelazioniPersonaggi'
    });

    //RelazionePersonaggi --> Creazione (Personaggio1)
    relazionePersonaggi.RelazionePersonaggi.belongsTo(creazione.Creazione, {
        foreignKey: 'fkPersonaggio1',
        as: 'Personaggio1'
    });
    creazione.Creazione.hasMany(relazionePersonaggi.RelazionePersonaggi,{
        foreignKey: 'fkPersonaggio1',
        as: 'RelazioniPersonaggi1'
    })

    //RelazionePersonaggi --> Creazione (Personaggio2)
    relazionePersonaggi.RelazionePersonaggi.belongsTo(creazione.Creazione, {
        foreignKey: 'fkPersonaggio2',
        as: 'Personaggio2'
    });
    creazione.Creazione.hasMany(relazionePersonaggi.RelazionePersonaggi,{
        foreignKey: 'fkPersonaggio2',
        as: 'RelazioniPersonaggi2'
    })



    //Contesto --> Utente (Creatore del contesto)
    contesto.Contesto.belongsTo(utente.Utente, {
        foreignKey: 'fkUtente',
        as: 'Creatore'
    });
    utente.Utente.hasMany(contesto.Contesto, {
        foreignKey: 'fkUtente',
        as: 'ContestiCreati'
    });

    //Contesto --> Creazione (Ambiente)
    contesto.Contesto.belongsTo(creazione.Creazione, {
        foreignKey: 'fkAmbiente',
        as: 'Ambiente'
    });
    creazione.Creazione.hasMany(contesto.Contesto, {
       foreignKey: 'fkAmbiente',
       as: 'ContestiAmbiente'
    });



    //Creazione --> Utente (Creatore dell Ambiente / Personaggio)
    creazione.Creazione.belongsTo(utente.Utente, {
        foreignKey: 'fkUtente',
        as: 'Creatore'
    });
    utente.Utente.hasMany(creazione.Creazione, {
       foreignKey: 'fkUtente',
       as: 'CreazioniCreate'
    });

};

module.exports=utilsDB;