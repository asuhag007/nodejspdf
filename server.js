// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var fs = require('fs');
var pdf = require('html-pdf');
var html2 = fs.readFileSync('./examplehtmlfile/contract.html', 'utf8');
var ejs=require('ejs');
//var people=['amit','neil','alex'];
//var supplies=	['mop', 'broom', 'duster'];
//var html=ejs.render(html2,{ supplies: supplies});
var options = { format: 'Letter' };

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });  
    User.find({"id":"3sdiis3dosdo34sdo"}).then((users)=>{
    	var html=ejs.render(html2,{ users: users});// we are using ejs for server side rendering of our content in html
         pdf.create(html, options).toFile('./generatedpdf/contract2.pdf', function(err, res) {
         if (err) return console.log(err);
            console.log(res); // { filename: '/app/contract.pdf' } 
            //res.download('/file.pdf', 'file:///tmp/file.pdf'); use res.download to send file to client side if we want
       }); 
    },(e)=>{
        res.status(400).send(e);
    }) 
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/pdf', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
// go to this link to check if pdf is created or nothttp://localhost:8080/pdf

 
