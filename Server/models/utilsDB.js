const utilsDB = {};


// Serve ad inizializzare tutte le associazioni tra i vari Models
utilsDB.SetRelationships = () => {
  const utente = require('./utente');
  const abbonamento = require('./abbonamento');
  const contesto = require('./contesto');
  const creazione = require('./creazione');
  const relazionePersonaggi = require('./relazionePersonaggi');
  const sessione = require('./sessione');
  const conversazione = require('./conversazione');
  const messaggio = require('./messaggio');
  // Utente --> Abbonamento
  utente.Utente.belongsTo(abbonamento.Abbonamento, {
    foreignKey: 'fkAbbonamento',
    as: 'Abbonamento',
  });
  abbonamento.Abbonamento.hasMany(utente.Utente, {
    foreignKey: 'fkAbbonamento',
    as: 'UtentiAbbonati',
  });

  // RelazionePersonaggi --> Contesto
  relazionePersonaggi.RelazionePersonaggi.belongsTo(contesto.Contesto, {
    foreignKey: 'fkContesto',
    as: 'Contesto',
  });
  contesto.Contesto.hasMany(relazionePersonaggi.RelazionePersonaggi, {
    foreignKey: 'fkContesto',
    as: 'RelazioniPersonaggi',
  });

  // RelazionePersonaggi --> Creazione (Personaggio1)
  relazionePersonaggi.RelazionePersonaggi.belongsTo(creazione.Creazione, {
    foreignKey: 'fkPersonaggio1',
    as: 'Personaggio1',
  });
  creazione.Creazione.hasMany(relazionePersonaggi.RelazionePersonaggi, {
    foreignKey: 'fkPersonaggio1',
    as: 'RelazioniPersonaggi1',
  });

  // RelazionePersonaggi --> Creazione (Personaggio2)
  relazionePersonaggi.RelazionePersonaggi.belongsTo(creazione.Creazione, {
    foreignKey: 'fkPersonaggio2',
    as: 'Personaggio2',
  });
  creazione.Creazione.hasMany(relazionePersonaggi.RelazionePersonaggi, {
    foreignKey: 'fkPersonaggio2',
    as: 'RelazioniPersonaggi2',
  });

  // Contesto --> Utente (Creatore del contesto)
  contesto.Contesto.belongsTo(utente.Utente, {
    foreignKey: 'fkUtente',
    as: 'Creatore',
  });
  utente.Utente.hasMany(contesto.Contesto, {
    foreignKey: 'fkUtente',
    as: 'ContestiCreati',
  });

  // Contesto --> Creazione (Ambiente)
  contesto.Contesto.belongsTo(creazione.Creazione, {
    foreignKey: 'fkAmbiente',
    as: 'Ambiente',
  });
  creazione.Creazione.hasMany(contesto.Contesto, {
    foreignKey: 'fkAmbiente',
    as: 'ContestiAmbiente',
  });

  // Creazione --> Utente (Creatore dell Ambiente / Personaggio)
  creazione.Creazione.belongsTo(utente.Utente, {
    foreignKey: 'fkUtente',
    as: 'Creatore',
  });
  utente.Utente.hasMany(creazione.Creazione, {
    foreignKey: 'fkUtente',
    as: 'CreazioniCreate',
  });

  // Sessione --> Utente
  sessione.Sessione.belongsTo(utente.Utente, {
    foreignKey: 'fkUtente',
    as: 'Utente',
  });
  utente.Utente.hasMany(sessione.Sessione, {
    foreignKey: 'fkUtente',
    as: 'Sessioni',
  });

  // Sessione --> Contesto
  sessione.Sessione.belongsTo(contesto.Contesto, {
    foreignKey: 'fkContesto',
    as: 'Contesto',
  });
  contesto.Contesto.hasMany(sessione.Sessione, {
    foreignKey: 'fkContesto',
    as: 'Sessioni',
  });

  // Conversazione --> Sessione
  conversazione.Conversazione.belongsTo(sessione.Sessione, {
    foreignKey: 'fkSessione',
    as: 'Sessione',
  });
  sessione.Sessione.hasMany(conversazione.Conversazione, {
    foreignKey: 'fkSessione',
    as: 'Conversazioni',
  });

  // Conversazione --> Creazione (Personaggio)
  conversazione.Conversazione.belongsTo(creazione.Creazione, {
    foreignKey: 'fkPersonaggio',
    as: 'Personaggio',
  });
  creazione.Creazione.hasMany(conversazione.Conversazione, {
    foreignKey: 'fkPersonaggio',
    as: 'Conversazioni',
  });

  // Messaggio --> Conversazione
  messaggio.Messaggio.belongsTo(conversazione.Conversazione, {
    foreignKey: 'fkConversazione',
    as: 'Conversazione',
  });
  conversazione.Conversazione.hasMany(messaggio.Messaggio, {
    foreignKey: 'fkConversazione',
    as: 'Messaggi',
  });

  contesto.Contesto.belongsToMany(creazione.Creazione, {
    through: 'ContestoPersonaggio',
    timestamps: false,
    foreignKey: 'idContesto',
  });
  creazione.Creazione.belongsToMany(contesto.Contesto, {
    through: 'ContestoPersonaggio',
    timestamps: false,
    foreignKey: 'idPersonaggio',
  });

  // Utente --> Creazione (M:N InventarioCreazione)
  utente.Utente.belongsToMany(creazione.Creazione, {
    through: 'InventarioCreazione',
    timestamps: false,
    foreignKey: 'idUtente',
  });
  creazione.Creazione.belongsToMany(utente.Utente, {
    through: 'InventarioCreazione',
    timestamps: false,
    foreignKey: 'idCreazione',
  });

  // Utente --> Contesto (M:N InventarioContesto)
  utente.Utente.belongsToMany(contesto.Contesto, {
    through: 'InventarioContesto',
    timestamps: false,
    foreignKey: 'idUtente',
  });
  contesto.Contesto.belongsToMany(utente.Utente, {
    through: 'InventarioContesto',
    timestamps: false,
    foreignKey: 'idContesto',
  });
};

module.exports = utilsDB;
