USE RolePlayersAI;

INSERT INTO Abbonamento(nomeTier, prezzo, maxMsg)
VALUES ('Free', 0, 100),
       ('Base', 19.99, 500),
       ('Enterprise', 29.99, 1000);

-- password: Password@1
INSERT INTO Utente(fkAbbonamento, username, nome, cognome, email, `password`, dataNascita, telefono, ruolo, msgRimanenti, scadenzaAbbonamento, authToken)
VALUES (1, 'utente1', 'Mario', 'Rossi', 'mario.rossi@example.com', 'nMPlq9+u4Zimt0uX6pHjBuF0Td9Jh209z2y5Nt/Vydc=', '1990-01-01', '1234567890', 'Utente', 100, null, 'auth_token_1'),
       (2, 'utente2', 'Luca', 'Bianchi', 'luca.bianchi@example.com', 'nMPlq9+u4Zimt0uX6pHjBuF0Td9Jh209z2y5Nt/Vydc=', '1985-05-15', '9876543210', 'Moderatore', 500, '2024-01-30', 'auth_token_2');

INSERT INTO Creazione(fkUtente, nome, immagine, descrizione, isPubblico, tipo, sesso)
VALUES (1, 'Mago', 'http://localhost:3000/img/creazione/creazione_1.jpg', 'Un potente personaggio magico...', true, 'Personaggio', 'Altro'),
       (1, 'Guerriero', 'http://localhost:3000/img/creazione/creazione_2.jpg', 'Un coraggioso guerriero...', true, 'Personaggio', 'Uomo'),
       (2, 'Foresta Incantata', 'http://localhost:3000/img/creazione/creazione_3.jpg', 'Ambiente di una foresta incantata...', true, 'Ambiente', 'Altro'),

       (1, 'Willy Wonka', 'http://localhost:3000/img/creazione/creazione_4.jpg', 'Willy wonka è una figura straordinaria, un uomo eccentrico e dallo spirito creativo senza limiti. La sua apparizione è un mix di stravaganza e mistero, con un cappello a cilindro colorato, un abito viola sgargiante e un bastone d`oro a corredo. Il suo volto, di solito ornato da un sorriso enigmatico, trasmette un`aria di saggezza e intelligenza. Willy wonka è un genio creativo nel mondo della cioccolateria, affascinato dall`innovazione e dalla magia dei dolci.', true, 'Personaggio', 'Uomo'),
       (1, 'Umpa Lumpa', 'http://localhost:3000/img/creazione/creazione_5.jpg', 'Gli Umpa Lumpa sono piccoli e affascinanti esseri con pelle color pesca e capelli verdi. Le loro caratteristiche facciali sono distintive, con occhi scintillanti e sorrisi giocosi. Vestiti con abiti dai colori vivaci e scarpe piccole, gli Umpa Lumpa emanano un`aria di allegria. Con una statura bassa ma una personalità vibrante, sono noti per la loro abilità nella lavorazione del cioccolato e per le canzoni divertenti che cantano mentre svolgono i loro compiti nella Fabbrica di Cioccolato di Willy Wonka.', true, 'Personaggio', 'Uomo'),
       (1, 'Fabbrica di Cioccolato', 'http://localhost:3000/img/creazione/creazione_6.jpg', 'La Fabbrica di Cioccolato è un luogo magico e surreale, con pareti rivestite di cioccolato scintillante e pavimenti che sembrano fatti di dolci. L`aria è pervasa dall`irresistibile profumo di cioccolato appena fatto. Macchine sofisticate e colorate, producono dolci incredibili e stravaganti. Le stanze sono piene di caramelle a perdita d`occhio. Fiumi di cioccolato, sale di lecca lecca giganti e giardini di caramelle sono solo alcune delle meraviglie di questo mondo incantato di golosità e divertimento.', true, 'Ambiente', 'Altro'),

       (2, 'Gandalf', 'http://localhost:3000/img/creazione/creazione_7.jpg', 'Conosciuto anche come Mithrandir, Gandalf è un membro dell`Ordine dei Maghi e fa parte di un gruppo di cinque maghi inviati in Terra di Mezzo per aiutare le razze libere a resistere all`oscurità crescente. La sua personalità è complessa e affascinante, combinando una profonda saggezza e conoscenza con un grande senso dell`umorismo. La sua figura è spesso avvolta in un mantello grigio e un cappello a punta, e porta con sé un bastone magico', true, 'Personaggio', 'Uomo'),
       (2, 'Gimli', 'http://localhost:3000/img/creazione/creazione_8.jpg', 'Gimli è un nano robusto e muscoloso con una barba lunga e folta. Indossa un elmo a punta e un`armatura robusta, spesso brandisce un`ascia da battaglia a doppia lama. Gimli è noto per la sua determinazione, coraggio e orgoglio. È leale agli amici e alla sua razza, ma inizialmente ha una certa diffidenza verso gli elfi. Nel corso della sua avventura con la Compagnia dell`Anello, dimostra un cuore gentile e un forte senso di giustizia.', true, 'Personaggio', 'Uomo'),
       (2, 'Miniere di Moria', 'http://localhost:3000/img/creazione/creazione_9.jpg', 'Le Miniere di Moria, conosciute anche come Khazad-dûm, sono un vasto sistema di gallerie, sale, stanze e cunicoli sotterranei che si estendono sotto le Montagne Nebbiose nella Terra di Mezzo. Questo complesso sotterraneo fu originariamente scavato dai Nani come una delle loro più grandi e ricche città, dove estrassero minerali preziosi come l`adamantio e l`oro. La grandezza delle Miniere di Moria si rifletteva nella maestosità delle sue sale, colonne scolpite e scalinate intricate.', true, 'Ambiente', 'Altro');

INSERT INTO Contesto(fkUtente, fkAmbiente, nome, descrizione, isPubblico)
VALUES (1, 3, 'Accademia di Magia', 'Una scuola per maghi...', true),
       (2, 3, 'Grotta Misteriosa', 'Una grotta misteriosa...', false),

       (1, 6, 'Visita Guidata', 'I visitatori, entusiasti ed eccitati, varcano l`ingresso dorato della Fabbrica di Cioccolato di Willy Wonka. La guida, un Umpa Lumpa con abito vivace, li accoglie con un sorriso e li conduce attraverso corridoi luminosi e aromatizzati di cioccolato fresco. Le pareti sono decorate con immagini di dolci fantastici mentre il ronzio delle macchine dolci riempie l`aria. I partecipanti si preparano a immergersi in un mondo magico di golosità e avventure zuccherate.', true),
       (2, 9, 'Spedizione a Moria', 'La notizia della misteriosa riscoperta di un antico manoscritto in una biblioteca segreta di Rivendell ha attirato l`attenzione di Gandalf, il saggio mago, e Gimli, il fiero nano. Il manoscritto contiene indizi sulla presunta presenza di tesori nascosti nelle Miniere di Moria, un luogo in gran parte dimenticato e considerato pericoloso. Così i due si sono avventurati verso le miniere di Moria e dopo aver attraversato le porte sono giunti al salone principale...', true);

INSERT INTO Sessione(fkUtente, fkContesto, titolo, dataCreazione, ultimoAvvio)
VALUES (1, 1, 'Lezioni di Magia', '2023-01-15 08:00:00', '2023-01-15 10:30:00'),
       (2, 2, 'Esplorazione Magica', '2023-02-01 14:00:00', '2023-02-01 15:45:00'),

       (1, 3, 'Visita Guidata', '2023-02-01 14:00:00', '2023-02-01 15:45:00'),
       (2, 4, 'Spedizione a Moria', '2023-02-01 14:00:00', '2023-02-01 15:45:00');

INSERT INTO Conversazione(fkSessione, fkPersonaggio, dataAvvio, ultimoAvvio)
VALUES (1, 1, '2023-01-15 09:00:00', '2023-01-15 09:30:00'),
       (2, 2, '2023-02-01 14:30:00', '2023-02-01 15:15:00'),

       (3, 4, '2023-02-01 14:30:00', '2023-02-01 15:15:00'),
       (3, 5, '2023-02-01 14:30:00', '2023-02-01 15:15:00'),

       (4, 7, '2023-02-01 14:30:00', '2023-02-01 15:15:00'),
       (4, 8, '2023-02-01 14:30:00', '2023-02-01 15:15:00');


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
       (3, 5),

       (4, 7),
       (4, 8);

INSERT INTO InventarioContesto(idUtente, idContesto)
VALUES (1, 1),
       (2, 2),

       (1, 3),
       (2, 4);

INSERT INTO InventarioCreazione(idUtente, idCreazione)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 1),
       (2, 2),
       (2, 3),

       (1, 4),
       (1, 5),
       (1, 6),

       (2, 7),
       (2, 8),
       (2, 9);