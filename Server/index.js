const express=require('express');
const app=express();

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
    ris.locals.absoluteUrl=process.env.BASE_URL;
    next();
});


//Attivazione routes per chiamate HTTP
require("./platform/routes/squadra.js")(app);


require("./api/routes/squadra.js")(app);

require("./api/routes/creazione.js")(app);

//Avvio del server
const port=process.env.PORT;
app.listen(port,()=>{
    console.log("Server RolePlayers AI avviato sulla porta "+port);
});
