USE RolePlayersAI;

INSERT INTO Abbonamento(nomeTier, prezzo, maxMsg)
VALUES ('Free', 0, 100),
       ('Base', 19.99, 500),
       ('Enterprise', 29.99, 1000);

-- password: Password@1
INSERT INTO Utente(fkAbbonamento, username, nome, cognome, email, `password`, dataNascita, telefono, ruolo, msgRimanenti, scadenzaAbbonamento, authToken)
VALUES (1, 'utente1', 'Mario', 'Rossi', 'mario.rossi@example.com', 'nMPlq9+u4Zimt0uX6pHjBuF0Td9Jh209z2y5Nt/Vydc=', '1990-01-01', '1234567890', 'Utente', 100, null, 'auth_token_1'),
       (2, 'utente2', 'Luca', 'Bianchi', 'luca.bianchi@example.com', 'nMPlq9+u4Zimt0uX6pHjBuF0Td9Jh209z2y5Nt/Vydc=', '1985-05-15', '9876543210', 'Moderatore', 500, '2024-01-30', 'auth_token_2'),
       --  pw: Dario384!
       (3, 'dariofranchino', 'Dario', 'Franchino', 'dario.franchino@gmail.com', 'RUkWRPH86WOYVfM4SD1IoSB5WqaN5Our6sl4TtlJAbg=', '1999-08-22', '+399876659210', 'Utente', 100, '2024-09-30', 'auth_token_3'),
       -- pw: Elia!42
       (4, 'giacomino38', 'Giacomo', 'Elia', 'g.elia22@gmail.com', 'V8kivWNDCQ7zRDMm5RcbJuwaCwamUf7oXNJ6TBcNzGE=', '2000-04-12', '+399876053820', 'Utente', 100, '2024-05-10', 'auth_token_4'),
       --  pw: Lucy928!
       (5, 'Lucia03', 'Lucia', 'Terra', 'l.ter28@gmail.com', 'E9yno889PYj66+E5HjN2gvM069CWLp7edXscMdojThQ=', '1989-03-02', '+399126659210', 'Utente', 100, '2024-08-15', 'auth_token_5'),
       -- pw: Jj843!
       (6, 'jeremy21', 'Jeremy', 'Basso', 'j.basso21@gmail.com', 'b5Svv6bQF9K0rbvqKrQQw+ygJ3jrFFmkc0SaFv5LuFE=', '1999-08-22', '+399876659210', 'Utente', 100, '2024-09-30', 'auth_token_3');
       (7, 'NinoFra', 'Tonino', 'Frassica', 'frassi92@gmail.com', 'fnkTWkmfei93mcawjRdakoadmkw3dwINJasdlIlkasP=', '1992-07-17', '+393146820894', 'Utente', 1000, '2024-04-13', 'auth_token_7');
       -- pw: Br4h!
       (8, 'Ceck', 'Pino', 'Banfi', 'p.banfi@gmail.com', 'z0pvv6bP4VK0bjkqKrKLw+ig67jrFHmkc5SaHy6LuFE=', '1989-02-12', '+399257859210', 'Utente', 100, '2024-09-24', 'auth_token_8');
       -- pw: P3ret!
       (9, 'Gass', 'Gastani', 'Frinzi', 'fr.gasolino@gmail.com', 'p7Dmm9kHF9P0rasdKrRTf+ygH6tYdfQVc34aRn5UlXC=', '2001-08-02', '+389567734210', 'Utente', 500, '2024-09-11', 'auth_token_9');
       -- pw: Gle33!
       (10, 'veterano', 'Pietro', 'Smusi', 'ti.trollo12@gmail.com', 'b5Ass6iQF9O0ndipErLac+itT3aqUAdro0SaFv5LuFE=', '1989-06-12', '+399112359460', 'Utente', 1000, '2024-09-05', 'auth_token_10');
INSERT INTO Creazione(fkUtente, nome, immagine, descrizione, isPubblico, tipo, sesso)
VALUES (1, 'Mago', 'http://localhost:3000/img/creazione/creazione_1.jpg', 'Un potente personaggio magico...', true, 'Personaggio', 'Altro'),
       (1, 'Guerriero', 'http://localhost:3000/img/creazione/creazione_2.jpg', 'Un coraggioso guerriero...', true, 'Personaggio', 'Uomo'),
       (2, 'Foresta Incantata', 'http://localhost:3000/img/creazione/creazione_3.jpg', 'Ambiente di una foresta incantata...', true, 'Ambiente', 'Altro'),

       (1, 'Willy Wonka', 'http://localhost:3000/img/creazione/creazione_4.jpg', 'Willy wonka è una figura straordinaria, un uomo eccentrico e dallo spirito creativo senza limiti. La sua apparizione è un mix di stravaganza e mistero, con un cappello a cilindro colorato, un abito viola sgargiante e un bastone d`oro a corredo. Il suo volto, di solito ornato da un sorriso enigmatico, trasmette un`aria di saggezza e intelligenza. Willy wonka è un genio creativo nel mondo della cioccolateria, affascinato dall`innovazione e dalla magia dei dolci.', true, 'Personaggio', 'Uomo'),
       (1, 'Umpa Lumpa', 'http://localhost:3000/img/creazione/creazione_5.jpg', 'Gli Umpa Lumpa sono piccoli e affascinanti esseri con pelle color pesca e capelli verdi. Le loro caratteristiche facciali sono distintive, con occhi scintillanti e sorrisi giocosi. Vestiti con abiti dai colori vivaci e scarpe piccole, gli Umpa Lumpa emanano un`aria di allegria. Con una statura bassa ma una personalità vibrante, sono noti per la loro abilità nella lavorazione del cioccolato e per le canzoni divertenti che cantano mentre svolgono i loro compiti nella Fabbrica di Cioccolato di Willy Wonka.', true, 'Personaggio', 'Uomo'),
       (1, 'Fabbrica di Cioccolato', 'http://localhost:3000/img/creazione/creazione_6.jpg', 'La Fabbrica di Cioccolato è un luogo magico e surreale, con pareti rivestite di cioccolato scintillante e pavimenti che sembrano fatti di dolci. L`aria è pervasa dall`irresistibile profumo di cioccolato appena fatto. Macchine sofisticate e colorate, producono dolci incredibili e stravaganti. Le stanze sono piene di caramelle a perdita d`occhio. Fiumi di cioccolato, sale di lecca lecca giganti e giardini di caramelle sono solo alcune delle meraviglie di questo mondo incantato di golosità e divertimento.', true, 'Ambiente', 'Altro'),

       (2, 'Gandalf', 'http://localhost:3000/img/creazione/creazione_7.jpg', 'Conosciuto anche come Mithrandir, Gandalf è un membro dell`Ordine dei Maghi e fa parte di un gruppo di cinque maghi inviati in Terra di Mezzo per aiutare le razze libere a resistere all`oscurità crescente. La sua personalità è complessa e affascinante, combinando una profonda saggezza e conoscenza con un grande senso dell`umorismo. La sua figura è spesso avvolta in un mantello grigio e un cappello a punta, e porta con sé un bastone magico', true, 'Personaggio', 'Uomo'),
       (2, 'Gimli', 'http://localhost:3000/img/creazione/creazione_8.jpg', 'Gimli è un nano robusto e muscoloso con una barba lunga e folta. Indossa un elmo a punta e un`armatura robusta, spesso brandisce un`ascia da battaglia a doppia lama. Gimli è noto per la sua determinazione, coraggio e orgoglio. È leale agli amici e alla sua razza, ma inizialmente ha una certa diffidenza verso gli elfi. Nel corso della sua avventura con la Compagnia dell`Anello, dimostra un cuore gentile e un forte senso di giustizia.', true, 'Personaggio', 'Uomo'),
       (2, 'Miniere di Moria', 'http://localhost:3000/img/creazione/creazione_9.jpg', 'Le Miniere di Moria, conosciute anche come Khazad-dûm, sono un vasto sistema di gallerie, sale, stanze e cunicoli sotterranei che si estendono sotto le Montagne Nebbiose nella Terra di Mezzo. Questo complesso sotterraneo fu originariamente scavato dai Nani come una delle loro più grandi e ricche città, dove estrassero minerali preziosi come l`adamantio e l`oro. La grandezza delle Miniere di Moria si rifletteva nella maestosità delle sue sale, colonne scolpite e scalinate intricate.', true, 'Ambiente', 'Altro'),

       (4, 'Micheal Jordan', 'http://localhost:3000/img/creazione/default.jpg', 'Il miglior giocatore di basket di tutti i tempi, conosciuto per aver vinto molti trofei e per il suo carattere: determinato e vincente', true, 'Personaggio', 'Uomo'),
       (5, 'Micheal Jordan', 'http://localhost:3000/img/creazione/default.jpg', 'Il miglior giocatore di basket di tutti i tempi, spocchioso e antipatico', false, 'Personaggio', 'Uomo'),
       (3, 'Zio Fernando', 'http://localhost:3000/img/creazione/default.jpg', 'Mio zio molto simpatico e appassionato di golf e libri, ama cantare canzoni pop', false, 'Personaggio', 'Uomo'),
       (4, 'Ada Lovelace', 'http://localhost:3000/img/creazione/default.jpg', ' nobildonna e matematica britannica, nota soprattutto per il suo contributo alla macchina analitica ideata da Charles Babbage. E una delle contributrici maggiori nel campo informatico', true, 'Personaggio', 'Donna');

       (3, 'Villagio Steampunk', 'http://localhost:3000/img/creazione/default.jpg', 'Viaggia nel tempo in questo villaggio steampunk. Strade lastricate, luci al vapore, e edifici in stile industriale ti fanno immergere in un era di ingegneria straordinaria. L aria è impregnata di un misto di odori di olio e metallo, mentre abiti eleganti richiamano uno stile di vita affascinante e retrò.', true, 'Ambiente', 'Altro' ),
       (5, 'Oasi Aliena', 'http://localhost:3000/img/creazione/default.jpg', 'Oasi aliena, dove piante luminescenti emanano bagliori iridescenti e creature extraterrestri fluttuano nell`aria. Il terreno alieno sotto i tuoi piedi offre una sensazione unica, mentre il cielo è illuminato da costellazioni alienigeni, creando uno scenario surreale e affascinante su questo pianeta misterioso.', false, 'Ambiente', 'Altro' ),
       (3, 'Spiaggia Paradisiaca', 'http://localhost:3000/img/creazione/default.jpg', 'Rilassati sulla sabbia dorata di questa spiaggia paradisiaca, dove le onde dolcemente accarezzano la costa. Palme ondeggiando al vento forniscono ombra, e la trasparenza delle acque permette di esplorare il mondo sottomarino. Il suono rassicurante delle onde completa questa fuga tropicale.', false, 'Ambiente', 'Altro' ),
       (4, 'Castello Medievale', 'http://localhost:3000/img/creazione/default.jpg', 'Trasportati indietro nel tempo in questo castello medievale. Le torri imponenti si ergono contro un cielo azzurro, mentre ponti levatoi e fossati creano una difesa impenetrabile. All interno, saloni sontuosi e cortili con pavimenti in lastricato ti immergono nell atmosfera ricca di storia e di avventure cavalleresche.', true, 'Ambiente', 'Altro' ),
       (3, 'Studio d`Arte', 'http://localhost:3000/img/creazione/default.jpg', 'Immergiti in uno studio d`arte, con tavolozze di colori, cavalletti e opere d`arte in progress. L`odore di vernice e la luce naturale filtrante dalle finestre contribuiscono a un ambiente creativo e ispirante. Artisti locali si dedicano alla loro arte, creando un`atmosfera di espressione e passione.', false, 'Ambiente', 'Altro' ),
       (5, 'Mercato del Quartiere', 'http://localhost:3000/img/creazione/default.jpg', 'Esplora il vivace mercato del quartiere, con bancarelle colorate piene di frutta fresca, prodotti locali e oggetti artigianali. Il vociferare degli ambulanti, i colori accesi e l`aroma di cibo appena cucinato si combinano per creare un`esperienza autentica e affascinante.', true, 'Ambiente', 'Altro' ),
       (4, 'Caffetteria Artistica', 'http://localhost:3000/img/creazione/default.jpg', 'Entra in una caffetteria artistica, dove le pareti sono adornate da opere d`arte locali e il profumo di caffè appena macinato pervade l`aria. Tavoli in legno consumato offrono uno spazio accogliente per gli artisti e gli scrittori locali, mentre il suono di sorsi e discussioni crea un`atmosfera vibrante.', true, 'Ambiente', 'Altro' ),
       (2, 'Ristorante Gourmet', 'http://localhost:3000/img/creazione/default.jpg', 'Delizia il palato in un ristorante gourmet, dove piatti prelibati e presentazioni artistiche creano un`esperienza culinaria sofisticata. Luci soffuse e arredi eleganti contribuiscono a un`atmosfera perfetta per una cena raffinata.', false, 'Ambiente', 'Altro' ),
       (2, 'Palestra', 'http://localhost:3000/img/creazione/default.jpg', 'Frequenta una palestra, dove attrezzi moderni e allenamenti su misura creano un ambiente di benessere e fitness. Il suono dei pesi che si scontrano e la musica motivante creano un`atmosfera energica e determinata.', true, 'Ambiente', 'Altro' ),
       (1, 'Birreria', 'http://localhost:3000/img/creazione/default.jpg', 'Goditi l`atmosfera conviviale di una birreria, con birre artigianali alla spina e stuzzichini deliziosi. Il suono di chiacchiere allegre, bicchieri che si scontrano e musica dal vivo crea un ambiente accogliente e informale.', false, 'Ambiente', 'Altro' );

       (7, 'Aula universitaria', 'http://localhost:3000/img/creazione/creazione_10.jpg', 'Aula di università generica, dove studenti possono seguire corsi non meglio specificati, spiegati da professori mediamente capaci nel loro lavoro', true, 'Ambiente', 'Altro')

INSERT INTO Contesto(fkUtente, fkAmbiente, nome, descrizione, isPubblico)
VALUES (1, 3, 'Accademia di Magia', 'Una scuola per maghi...', true),
       (2, 3, 'Grotta Misteriosa', 'Una grotta misteriosa...', false),

       (1, 6, 'Visita Guidata', 'I visitatori, entusiasti ed eccitati, varcano l`ingresso dorato della Fabbrica di Cioccolato di Willy Wonka. La guida, un Umpa Lumpa con abito vivace, li accoglie con un sorriso e li conduce attraverso corridoi luminosi e aromatizzati di cioccolato fresco. Le pareti sono decorate con immagini di dolci fantastici mentre il ronzio delle macchine dolci riempie l`aria. I partecipanti si preparano a immergersi in un mondo magico di golosità e avventure zuccherate.', true),
       (2, 9, 'Spedizione a Moria', 'La notizia della misteriosa riscoperta di un antico manoscritto in una biblioteca segreta di Rivendell ha attirato l`attenzione di Gandalf, il saggio mago, e Gimli, il fiero nano. Il manoscritto contiene indizi sulla presunta presenza di tesori nascosti nelle Miniere di Moria, un luogo in gran parte dimenticato e considerato pericoloso. Così i due si sono avventurati verso le miniere di Moria e dopo aver attraversato le porte sono giunti al salone principale...', true),

       (4, 6, 'Periodo natalizio', 'Luci scintillanti, alberi addobbati, profumo di cannella, famiglia riunita, gioia contagiosa.',true),
       (5,3,'Estate','Sole cocente, mare cristallino, sabbia dorata, sorrisi spensierati, vacanza indimenticabile.',false);

       (7,5,'Giornata di esame','Mattinata in aula, piena di studenti raggruppati qua e là che ansiosamente aspettano che il professore arrivi mentre loro ripetono, chi consapevole di aver studiato abbastanza e chi sa già che dovrà fare un altro tentativo.',true);

       (10,5,'Giornata a Unisa','Mattinata in aula alle 9 del mattino con sveglia alle 7, 5 minuti per riprendere conoscenza e 5 minuti per capire chi sei.Aula piena di studenti raggruppati qua e là a fare casino perchè nessuno vuole fare questo esame che andrà male. Fai caciara e vai al bar. Sei felice.',true);
       (9,1,'Birra gratis','Niente di meglio di una birra gratis per rallegrare la giornata. Di tutti i gusti con stuzzichini annessi, il paradiso.',true);

INSERT INTO Sessione(fkUtente, fkContesto, titolo, dataCreazione, ultimoAvvio)
VALUES (1, 1, 'Lezioni di Magia', '2023-01-15 08:00:00', '2023-01-15 10:30:00'),
       (2, 2, 'Esplorazione Magica', '2023-02-01 14:00:00', '2023-02-01 15:45:00'),

       (1, 3, 'Visita Guidata', '2023-02-01 14:00:00', '2023-02-01 15:45:00'),
       (2, 4, 'Spedizione a Moria', '2023-02-01 14:00:00', '2023-02-01 15:45:00');

       (5, 7, 'Esame', '2023-10-24 15:23:35', '2023-10-25 16:30:52');

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

       (6, 5);

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