USE RoleplayersAI;

INSERT INTO Abbonamento(nomeTier, prezzo, maxMsg)
VALUES ('Free', 0, 100),
       ('Base', 19.99, 500),
       ('Enterprise', 29.99, 1000);

INSERT INTO Utente(fkAbbonamento, username, nome, cognome, email, `password`, dataNascita, telefono, ruolo, msgRimanenti, scadenzaAbbonamento, authToken)
VALUES (1, 'utente1', 'Mario', 'Rossi', 'mario.rossi@example.com', 'hashed_password_1', '1990-01-01', '1234567890', 'Utente', 100, null, 'auth_token_1'),
       (2, 'utente2', 'Luca', 'Bianchi', 'luca.bianchi@example.com', 'hashed_password_2', '1985-05-15', '9876543210', 'Moderatore', 500, '2024-01-30', 'auth_token_2');

INSERT INTO Creazione(fkUtente, nome, immagine, descrizione, isPubblico, tipo, sesso)
VALUES (1, 'Mago', 'percorso/a/mago_immagine', 'Un potente personaggio magico...', true, 'Personaggio', 'Altro'),
       (1, 'Guerriero', 'percorso/a/guerriero_immagine', 'Un coraggioso guerriero...', true, 'Personaggio', 'Uomo'),
       (2, 'Foresta Incantata', 'percorso/a/foresta_immagine', 'Ambiente di una foresta incantata...', true, 'Ambiente', 'Altro');

INSERT INTO Contesto(fkUtente, fkAmbiente, nome, descrizione, isPubblico)
VALUES (1, 3, 'Accademia di Magia', 'Una scuola per maghi...', true),
       (2, 3, 'Grotta Misteriosa', 'Una grotta misteriosa...', false);

INSERT INTO Sessione(fkUtente, fkContesto, titolo, dataCreazione, ultimoAvvio)
VALUES (1, 1, 'Lezioni di Magia', '2023-01-15 08:00:00', '2023-01-15 10:30:00'),
       (2, 2, 'Esplorazione Magica', '2023-02-01 14:00:00', '2023-02-01 15:45:00');

INSERT INTO Conversazione(fkSessione, fkPersonaggio, dataAvvio, ultimoAvvio)
VALUES (1, 1, '2023-01-15 09:00:00', '2023-01-15 09:30:00'),
       (2, 2, '2023-02-01 14:30:00', '2023-02-01 15:15:00');

INSERT INTO Messaggio(fkConversazione, corpo, isUtente)
VALUES (1, 'Salve, compagni maghi!', true),
       (2, 'Quali segreti potrebbe custodire la grotta?', false);

INSERT INTO RelazionePersonaggi(fkContesto, fkPersonaggio1, fkPersonaggio2, descrizione)
VALUES (1, 1, 2, 'Il mago insegna alle creature della foresta la magia.');

INSERT INTO ContestoPersonaggio(idContesto, idPersonaggio)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (2, 2);

INSERT INTO InventarioContesto(idUtente, idContesto)
VALUES (1, 1),
       (2, 2);

INSERT INTO InventarioCreazione(idUtente, idCreazione)
VALUES (1, 1),
	   (1, 2),
       (1, 3),
       (2, 1),
       (2, 2),
       (2, 3);

