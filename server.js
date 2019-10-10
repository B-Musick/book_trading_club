let express = require('express'),
    app     = express();


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