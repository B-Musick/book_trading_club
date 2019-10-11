let express  = require('express'),
    app      = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

/***************************** MODELS  ****************************************/ 
let User = require('./models/user');

/**************************PASSPORT CONFIGURATION *************************** */
app.use(require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// TELL EXPRESS APP TO USE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// AUTHENTICATE SOMEONE LOCALLY
passport.use(new LocalStrategy(User.authenticate()));

/* To serialize means converting objects contents into a small key that can then 
be deserialized into the original object. This allows us to know whos communicated 
with the server without having to send the authentication data like username and 
password at each request for a new page */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


let indexRoutes = require('./routes/index.js');

app.set('view engine', 'ejs'); // Dont have to add .ejs to files

/**************** PREVENTS ANY BACKLASH FROM DIRECTORY CHANGES *****************
- Allows stylesheets to be imported to header accessing '/stylesheets'
- Serve static assets
- express.static() is used to serve static assets (directories containing stylesheets, scripts, images, etc)
- So now all pages can access the stylesheets folder in /public by calling src="/stylesheets/.."
- The parameter is the absolute path to folder containing static assets
*/
app.use(express.static(__dirname + "/public"));

app.use('/',indexRoutes);

app.listen(3000,()=>{
    console.log('Server Started')
});