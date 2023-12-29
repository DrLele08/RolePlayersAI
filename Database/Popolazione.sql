USE roleplayersDB;

INSERT INTO abbonamento(nomeTier, prezzo, maxMsg)
VALUES ('Free', 9.99, 100),
       ('Base', 19.99, 500),
       ('Enterprise', 29.99, 1000);

INSERT INTO utente(fkAbbonamento, username, nome, cognome, email, `password`, dataNascita, telefono, ruolo, msgRimanenti, authToken)
VALUES (1, 'utente1', 'Mario', 'Rossi', 'mario.rossi@example.com', 'hashed_password_1', '1990-01-01', '1234567890', 'utente', 100, 'auth_token_1'),
       (2, 'utente2', 'Luca', 'Bianchi', 'luca.bianchi@example.com', 'hashed_password_2', '1985-05-15', '9876543210', 'moderatore', 500, 'auth_token_2');

INSERT INTO creazione(fkUtente, nome, immagine, descrizione, isPubblico, tipo, sesso)
VALUES (1, 'Mago', 'percorso/a/mago_immagine', 'Un potente personaggio magico...', true, 'personaggio', 'non specificato'),
       (1, 'Guerriero', 'percorso/a/guerriero_immagine', 'Un coraggioso guerriero...', true, 'personaggio', 'uomo'),
       (2, 'Foresta Incantata', 'percorso/a/foresta_immagine', 'Ambiente di una foresta incantata...', true, 'ambiente', 'non specificato');

INSERT INTO contesto(fkUtente, fkAmbiente, nome, descrizione, isPubblico)
VALUES (1, 3, 'Accademia di Magia', 'Una scuola per maghi...', true),
       (2, 3, 'Grotta Misteriosa', 'Una grotta misteriosa...', false);

INSERT INTO sessione(fkUtente, fkContesto, titolo, dataCreazione, ultimoAvvio)
VALUES (1, 1, 'Lezioni di Magia', '2023-01-15 08:00:00', '2023-01-15 10:30:00'),
       (2, 2, 'Esplorazione Magica', '2023-02-01 14:00:00', '2023-02-01 15:45:00');

INSERT INTO conversazione(fkSessione, fkPersonaggio, dataAvvio, ultimoAvvio)
VALUES (1, 1, '2023-01-15 09:00:00', '2023-01-15 09:30:00'),
       (2, 2, '2023-02-01 14:30:00', '2023-02-01 15:15:00');

INSERT INTO messaggio(fkConversazione, corpo, dataInvio, isUtente)
VALUES (1, 'Salve, compagni maghi!', '2023-01-15 09:05:00', true),
       (2, 'Quali segreti potrebbe custodire la grotta?', '2023-02-01 15:00:00', false);

INSERT INTO relazionePersonaggi(fkContesto, fkPersonaggio1, fkPersonaggio2, descrizione)
VALUES (1, 1, 2, 'Il mago insegna alle creature della foresta la magia.');

INSERT INTO contestoPersonaggio(idContesto, idPersonaggio)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (2, 2);

INSERT INTO inventarioContesto(idUtente, idContesto)
VALUES (1, 1),
       (2, 2);

INSERT INTO inventarioCreazione(idUtente, idCreazione)
VALUES (1, 1),
	   (1, 2),
       (1, 3),
       (2, 1),
       (2, 2),
       (2, 3);

