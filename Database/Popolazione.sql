USE RolePlayersAI;

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
       (2, 'Foresta Incantata', 'percorso/a/foresta_immagine', 'Ambiente di una foresta incantata...', true, 'Ambiente', 'Altro'),

       (1, 'Willy Wonka', 'percorso/a/willywonka_immagine', 'Willy wonka è una figura straordinaria, un uomo eccentrico e dallo spirito creativo senza limiti. La sua apparizione è un mix di stravaganza e mistero, con un cappello a cilindro colorato, un abito viola sgargiante e un bastone d`oro a corredo. Il suo volto, di solito ornato da un sorriso enigmatico, trasmette un`aria di saggezza e intelligenza. Willy wonka è un genio creativo nel mondo della cioccolateria, affascinato dall`innovazione e dalla magia dei dolci.', true, 'Personaggio', 'Uomo'),
       (1, 'Umpa Lumpa', 'percorso/a/umpalumpa_immagine', 'Gli Umpa Lumpa sono piccoli e affascinanti esseri con pelle color pesca e capelli verdi. Le loro caratteristiche facciali sono distintive, con occhi scintillanti e sorrisi giocosi. Vestiti con abiti dai colori vivaci e scarpe piccole, gli Umpa Lumpa emanano un`aria di allegria. Con una statura bassa ma una personalità vibrante, sono noti per la loro abilità nella lavorazione del cioccolato e per le canzoni divertenti che cantano mentre svolgono i loro compiti nella Fabbrica di Cioccolato di Willy Wonka.', true, 'Personaggio', 'Uomo'),
       (1, 'Fabbrica di Cioccolato', 'percorso/a/fabbricacioccolato_immagine', 'La Fabbrica di Cioccolato è un luogo magico e surreale, con pareti rivestite di cioccolato scintillante e pavimenti che sembrano fatti di dolci. L`aria è pervasa dall`irresistibile profumo di cioccolato appena fatto. Macchine sofisticate e colorate, producono dolci incredibili e stravaganti. Le stanze sono piene di caramelle a perdita d`occhio. Fiumi di cioccolato, sale di lecca lecca giganti e giardini di caramelle sono solo alcune delle meraviglie di questo mondo incantato di golosità e divertimento.', true, 'Ambiente', 'Altro');

INSERT INTO Contesto(fkUtente, fkAmbiente, nome, descrizione, isPubblico)
VALUES (1, 3, 'Accademia di Magia', 'Una scuola per maghi...', true),
       (2, 3, 'Grotta Misteriosa', 'Una grotta misteriosa...', false),

       (1, 6, 'Visita Guidata', 'I visitatori, entusiasti ed eccitati, varcano l`ingresso dorato della Fabbrica di Cioccolato di Willy Wonka. La guida, un Umpa Lumpa con abito vivace, li accoglie con un sorriso e li conduce attraverso corridoi luminosi e aromatizzati di cioccolato fresco. Le pareti sono decorate con immagini di dolci fantastici mentre il ronzio delle macchine dolci riempie l`aria. I partecipanti si preparano a immergersi in un mondo magico di golosità e avventure zuccherate.', true);

INSERT INTO Sessione(fkUtente, fkContesto, titolo, dataCreazione, ultimoAvvio)
VALUES (1, 1, 'Lezioni di Magia', '2023-01-15 08:00:00', '2023-01-15 10:30:00'),
       (2, 2, 'Esplorazione Magica', '2023-02-01 14:00:00', '2023-02-01 15:45:00'),

       (1, 3, 'Visita Guidata', '2023-02-01 14:00:00', '2023-02-01 15:45:00');

INSERT INTO Conversazione(fkSessione, fkPersonaggio, dataAvvio, ultimoAvvio)
VALUES (1, 1, '2023-01-15 09:00:00', '2023-01-15 09:30:00'),
       (2, 2, '2023-02-01 14:30:00', '2023-02-01 15:15:00'),

       (3, 4, '2023-02-01 14:30:00', '2023-02-01 15:15:00'),
       (3, 5, '2023-02-01 14:30:00', '2023-02-01 15:15:00');

INSERT INTO Messaggio(fkConversazione, corpo, isUtente)
VALUES (1, 'Salve, compagni maghi!', true),
       (2, 'Quali segreti potrebbe custodire la grotta?', false);

INSERT INTO RelazionePersonaggi(fkContesto, fkPersonaggio1, fkPersonaggio2, descrizione)
VALUES (1, 1, 2, 'Il mago insegna alle creature della foresta la magia.'),

       (3, 4, 5, 'Willy Wonka e gli Umpa Lumpa condividono una relazione unica, basata sulla fiducia e sulla collaborazione. Wonka guida creativamente, mentre gli Umpa Lumpa portano la sua visione del cioccolato a vita facendogli da assistenti.');

INSERT INTO ContestoPersonaggio(idContesto, idPersonaggio)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (2, 2),

       (3, 4),
       (3, 5);

INSERT INTO InventarioContesto(idUtente, idContesto)
VALUES (1, 1),
       (2, 2),

       (1, 3);

INSERT INTO InventarioCreazione(idUtente, idCreazione)
VALUES (1, 1),
	   (1, 2),
       (1, 3),
       (2, 1),
       (2, 2),
       (2, 3),

       (1, 4),
       (1, 5),
       (1, 6);

