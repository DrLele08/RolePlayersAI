CREATE DATABASE roleplayersDB;

USE roleplayersDB;

CREATE TABLE abbonamento(
	idAbbonamento BIGINT AUTO_INCREMENT,
    nomeTier VARCHAR(10) NOT NULL,
    prezzo DECIMAL(6, 2) NOT NULL,
    maxMsg INT NOT NULL,
    PRIMARY KEY (idAbbonamento)
);

CREATE TABLE utente(
	idUtente BIGINT AUTO_INCREMENT,
    fkAbbonamento BIGINT NOT NULL,
    username VARCHAR(25) NOT NULL,
    nome VARCHAR(25) NOT NULL,
    cognome VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL,
    `password` CHAR(255) NOT NULL,
    dataNascita DATE NOT NULL,
    telefono VARCHAR(10),
    ruolo ENUM('utente', 'moderatore', 'amministratore') NOT NULL,
    msgRimanenti INT NOT NULL,
    authToken CHAR(64) NOT NULL,
    PRIMARY KEY (idUtente),
    FOREIGN KEY (fkAbbonamento) REFERENCES abbonamento(idAbbonamento)
);

CREATE TABLE creazione(
	idCreazione BIGINT AUTO_INCREMENT,
    fkUtente BIGINT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    immagine VARCHAR(255) NOT NULL,
    descrizione VARCHAR(512) NOT NULL,
    isPubblico BOOLEAN NOT NULL,
    tipo ENUM('personaggio', 'ambiente') NOT NULL,
    sesso ENUM('uomo', 'donna', 'non specificato'),
    PRIMARY KEY (idCreazione),
    FOREIGN KEY (fkUtente) REFERENCES utente(idUtente)
);

CREATE TABLE contesto(
	idContesto BIGINT AUTO_INCREMENT,
    fkUtente BIGINT NOT NULL,
    fkAmbiente BIGINT NOT NULL,
    nome VARCHAR(25) NOT NULL,
    descrizione VARCHAR(512) NOT NULL,
    isPubblico BOOLEAN NOT NULL,
    PRIMARY KEY (idContesto),
    FOREIGN KEY (fkUtente) REFERENCES utente(idUtente),
    FOREIGN KEY (fkAmbiente) REFERENCES creazione(idCreazione)
);

CREATE TABLE sessione(
	idSessione BIGINT AUTO_INCREMENT,
    fkUtente BIGINT NOT NULL,
    fkContesto BIGINT NOT NULL,
    titolo VARCHAR(255) NOT NULL,
    dataCreazione DATETIME NOT NULL,
    ultimoAvvio DATETIME NOT NULL,
    PRIMARY KEY (idSessione),
    FOREIGN KEY (fkUtente) REFERENCES utente(idUtente),
    FOREIGN KEY (fkContesto) REFERENCES contesto(idContesto)
);

CREATE TABLE conversazione(
	idConversazione BIGINT AUTO_INCREMENT,
    fkSessione BIGINT NOT NULL,
    fkPersonaggio BIGINT NOT NULL,
    dataAvvio DATETIME NOT NULL,
    ultimoAvvio DATETIME NOT NULL,
    PRIMARY KEY (idConversazione),
    FOREIGN KEY (fkSessione) REFERENCES sessione(idSessione),
    FOREIGN KEY (fkPersonaggio) REFERENCES creazione(idCreazione)
);

CREATE TABLE messaggio(
	idMessaggio BIGINT AUTO_INCREMENT,
    fkConversazione BIGINT NOT NULL,
    corpo VARCHAR(512) NOT NULL,
    dataInvio DATETIME NOT NULL,
    isUtente BOOLEAN NOT NULL,
    PRIMARY KEY (idMessaggio),
    FOREIGN KEY (fkConversazione) REFERENCES conversazione(idConversazione)
);

CREATE TABLE relazionePersonaggi(
	idRelazionePersonaggi BIGINT AUTO_INCREMENT,
    fkContesto BIGINT NOT NULL,
    fkPersonaggio1 BIGINT NOT NULL,
    fkPersonaggio2 BIGINT NOT NULL,
    descrizione VARCHAR(255) NOT NULL,
    PRIMARY KEY (idRelazionePersonaggi),
    FOREIGN KEY (fkContesto) REFERENCES contesto(idContesto),
    FOREIGN KEY (fkPersonaggio1) REFERENCES creazione(idCreazione),
    FOREIGN KEY (fkPersonaggio2) REFERENCES creazione(idCreazione)
);

CREATE TABLE contestoPersonaggio(
	idContesto BIGINT,
    idPersonaggio BIGINT,
    PRIMARY KEY (idContesto, idPersonaggio),
    FOREIGN KEY (idContesto) REFERENCES contesto(idContesto),
    FOREIGN KEY (idPersonaggio) REFERENCES creazione(idCreazione)
);

CREATE TABLE inventarioContesto(
	idUtente BIGINT,
    idContesto BIGINT,
    PRIMARY KEY (idUtente, idContesto),
    FOREIGN KEY (idUtente) REFERENCES utente(idUtente),
    FOREIGN KEY (idContesto) REFERENCES contesto(idContesto)
);

CREATE TABLE inventarioCreazione(
	idUtente BIGINT,
    idCreazione BIGINT,
    PRIMARY KEY (idUtente, idCreazione),
    FOREIGN KEY (idUtente) REFERENCES utente(idUtente),
    FOREIGN KEY (idCreazione) REFERENCES creazione(idCreazione)
);
