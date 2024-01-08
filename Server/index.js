const express=require('express');
const app=express();
let session = require('express-session')

//Gestione directory statica accessibile
app.use(express.static('public'));

//Gestione variabili d'ambiente
require('dotenv').config();

//Gestione parsing JSON in chiamate HTTP POST di massimo 3mb
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'3mb'}));
app.use(bodyParser.urlencoded({
    extended: true
}));

//Gestione sessione
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
}))

//Gestione Handlebars per frontend
const expressHbs = require('express-handlebars');
app.engine('hbs', expressHbs.engine({
    layoutsDir:"./platform/views/layouts/",
    defaultLayout:"main-layout",
    extname:"hbs",
    helpers: require('./models/handlebars-helpers.js'),
    partialsDir: __dirname+"/platform/views/layouts/"
}));
app.set('view engine','hbs');
app.set('views','./platform/views');


//Gestione BASE_URL per assets
app.use((req,ris,next)=>{
    ris.locals.BASE_URL=process.env.BASE_URL;
    next();
});


//Attivazione routes per chiamate HTTP
require("./platform/routes/squadra.js")(app);
require("./platform/routes/pagamento")(app);
require("./platform/routes/pagamento.js")(app);

require("./api/routes/squadra.js")(app);

require("./api/routes/creazione.js")(app);
require("./api/routes/relazionePersonaggi.js")(app);
require("./api/routes/contesto.js")(app);
require("./api/routes/conversazione.js")(app);
require("./api/routes/registrazione")(app);
require("./api/routes/sessione")(app);

require("./platform/routes/registrazione")(app);


//Avvio del server
const port=process.env.PORT;
app.listen(port,()=>{
    console.log("Server RolePlayers AI avviato sulla porta "+port);
});
