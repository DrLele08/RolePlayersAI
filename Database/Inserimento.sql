CREATE DATABASE IF NOT EXISTS RolePlayersAI;

USE RolePlayersAI;

CREATE TABLE Abbonamento(
	idAbbonamento BIGINT AUTO_INCREMENT,
    nomeTier VARCHAR(10) NOT NULL,
    prezzo DECIMAL(6, 2) NOT NULL,
    maxMsg INT NOT NULL,
    PRIMARY KEY (idAbbonamento)
);

CREATE TABLE Utente(
	idUtente BIGINT AUTO_INCREMENT,
    fkAbbonamento BIGINT NOT NULL DEFAULT 1,
    username VARCHAR(25) UNIQUE NOT NULL,
    nome VARCHAR(25) NOT NULL,
    cognome VARCHAR(25) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password CHAR(255) NOT NULL,
    dataNascita DATE NOT NULL,
    telefono VARCHAR(10),
    ruolo ENUM('Utente', 'Moderatore', 'Amministratore') NOT NULL DEFAULT 'Utente',
    msgRimanenti INT NOT NULL DEFAULT 100,
    scadenzaAbbonamento DATE,
    authToken CHAR(64) NOT NULL,
    PRIMARY KEY (idUtente),
    FOREIGN KEY (fkAbbonamento) REFERENCES Abbonamento(idAbbonamento)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Creazione(
	idCreazione BIGINT AUTO_INCREMENT,
    fkUtente BIGINT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    immagine VARCHAR(255) NOT NULL,
    descrizione VARCHAR(512) NOT NULL,
    isPubblico BOOLEAN NOT NULL,
    tipo ENUM('Personaggio', 'Ambiente') NOT NULL,
    sesso ENUM('Uomo', 'Donna', 'Altro'),
    PRIMARY KEY (idCreazione),
    FOREIGN KEY (fkUtente) REFERENCES Utente(idUtente)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Contesto(
	idContesto BIGINT AUTO_INCREMENT,
    fkUtente BIGINT NOT NULL,
    fkAmbiente BIGINT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    descrizione VARCHAR(512) NOT NULL,
    isPubblico BOOLEAN NOT NULL,
    PRIMARY KEY (idContesto),
    FOREIGN KEY (fkUtente) REFERENCES Utente(idUtente)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (fkAmbiente) REFERENCES Creazione(idCreazione)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Sessione(
	idSessione BIGINT AUTO_INCREMENT,
    fkUtente BIGINT NOT NULL,
    fkContesto BIGINT NOT NULL,
    titolo VARCHAR(255) NOT NULL,
    dataCreazione DATETIME NOT NULL DEFAULT NOW(),
    ultimoAvvio DATETIME NOT NULL,
    PRIMARY KEY (idSessione),
    FOREIGN KEY (fkUtente) REFERENCES Utente(idUtente)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (fkContesto) REFERENCES Contesto(idContesto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Conversazione(
	idConversazione BIGINT AUTO_INCREMENT,
    fkSessione BIGINT NOT NULL,
    fkPersonaggio BIGINT NOT NULL,
    dataAvvio DATETIME NOT NULL DEFAULT NOW(),
    ultimoAvvio DATETIME NOT NULL,
    PRIMARY KEY (idConversazione),
    FOREIGN KEY (fkSessione) REFERENCES Sessione(idSessione)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (fkPersonaggio) REFERENCES Creazione(idCreazione)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Messaggio(
	idMessaggio BIGINT AUTO_INCREMENT,
    fkConversazione BIGINT NOT NULL,
    corpo VARCHAR(512) NOT NULL,
    dataInvio DATETIME NOT NULL DEFAULT NOW(),
    isUtente BOOLEAN NOT NULL,
    PRIMARY KEY (idMessaggio),
    FOREIGN KEY (fkConversazione) REFERENCES Conversazione(idConversazione)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE RelazionePersonaggi(
	idRelazionePersonaggi BIGINT AUTO_INCREMENT,
    fkContesto BIGINT NOT NULL,
    fkPersonaggio1 BIGINT NOT NULL,
    fkPersonaggio2 BIGINT NOT NULL,
    descrizione VARCHAR(255) NOT NULL,
    PRIMARY KEY (idRelazionePersonaggi),
    FOREIGN KEY (fkContesto) REFERENCES Contesto(idContesto)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (fkPersonaggio1) REFERENCES Creazione(idCreazione)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (fkPersonaggio2) REFERENCES Creazione(idCreazione)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ContestoPersonaggio(
	idContesto BIGINT,
    idPersonaggio BIGINT,
    PRIMARY KEY (idContesto, idPersonaggio),
    FOREIGN KEY (idContesto) REFERENCES Contesto(idContesto)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idPersonaggio) REFERENCES Creazione(idCreazione)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE InventarioContesto(
	idUtente BIGINT,
    idContesto BIGINT,
    PRIMARY KEY (idUtente, idContesto),
    FOREIGN KEY (idUtente) REFERENCES Utente(idUtente)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idContesto) REFERENCES Contesto(idContesto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE InventarioCreazione(
	idUtente BIGINT,
    idCreazione BIGINT,
    PRIMARY KEY (idUtente, idCreazione),
    FOREIGN KEY (idUtente) REFERENCES Utente(idUtente)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idCreazione) REFERENCES Creazione(idCreazione)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
