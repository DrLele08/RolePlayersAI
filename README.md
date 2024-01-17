
<img src="https://github.com/DrLele08/RolePlayersAI/blob/main/Server/public/assets/media/logos/logoAI.png?raw=true">

# Cos`è RolePlayers AI?
RolePlayers AI è una piattaforma web che consente agli utenti di creare personaggi e ambienti
con i quali poter definire dei contesti, ovvero delle situazioni iniziali in cui potranno essere
create anche eventuali relazioni tra personaggi.

Gli utenti avranno la possibilità di selezionare un contesto dal proprio inventario e avviare una sessione di roleplay.
All`interno della sessione sarà possibile conversare con i vari personaggi, i quali risponderanno
rispettando tutte le descrizioni fornite in fase di creazione. Le sessioni verranno salvate in modo automatico, 
quindi gli utenti potranno riprendere le varie conversazioni in qualsiasi momento.

RolePlayers AI offre anche una libreria pubblica in cui gli utenti potranno condividere le proprie creazioni.

# Requisiti
* <a href="https://nodejs.org/en">NodeJS</a>
* <a href="https://git-scm.com/downloads">Git</a>
* <a href="https://www.mysql.com/it/downloads/">MySQL</a>
* <a href="https://openai.com/product">OpenAI GPT API Key</a>

È consigliato l`utilizzo di un ambiente integrato per la gestione di database MySQL (es. <a href="https://dev.mysql.com/downloads/workbench/">MySQL Workbench</a>) 
e di un IDE che supporti i principali linguaggi per lo sviluppo web (es. <a href="https://www.jetbrains.com/webstorm/?var=1">JetBrains WebStorm</a>)

# Setup
STEP 1: Clonare la repository
```bash
git clone https://github.com/DrLele08/RolePlayersAI.git
```
STEP 2: Accedere alla directory principale del progetto e posizionarsi nella cartella Server
```bash
cd Server
```
STEP 3: Installare tutte le dipendenze
```bash
npm i
```

STEP 4: Accedere alla cartella Database, importare e avviare gli script presenti nella cartella per creare 
lo schema del Database e infine popolarlo
```
Script creazione: Inserimento.sql
Script popolazione: Popolazione.sql
```

STEP 5: Creare il file ```.env``` nella cartella Server e inserire le variabili d`ambiente necessarie, 
modificandone opportunamente i valori
```
DB_HOST=localhost
DB_USER=root
DB_PWD=1234
DB_NAME=RolePlayersAI
DEBUG_DB=0
BASE_URL=http://localhost:3000
PORT=3000
CHAT_GPT_KEY={{key}}
SESSION_KEY=rpai
NODE_ENV=PROD
```
NB: il valore ```{{key}}``` della variabile d`ambiente ```CHAT_GPT_KEY``` deve essere sostituito con una key valida
per l'API di ChaGPT.

STEP 6: posizionarsi nella cartella Server e avviare il server
```bash
node index.js
```

STEP Finale: Aprire il Browser alla pagina [http://localhost:3000](http://localhost:3000) e dare un`occhiata in giro!


# Testing
RolePlayers AI utilizza il framework Jest per effettuare il testing di unità. Per avviare i test basterà 
posizionarsi nella cartella Server e avviare il seguente script:

```bash
npm test
```
Non appena il testing sarà terminato, verrà creato automaticamente un file HTML chiamato
```test-report.html``` all`interno della cartella Server, il quale conterrà il report di tutti 
i test eseguiti.
