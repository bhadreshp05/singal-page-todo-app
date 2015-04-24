// Server.js

	/*==========  set up  ==========*/
	var express = require('express');
	var app 			= express();  					// create our app w/ express
	var mongoose 		= require('mongoose');			// mongoose for mongodb
	var port			= process.env.PORT || 3000;     // set the port
	var database 		= require('./config/database');        // load the database config
	var morgan 			= require('morgan');  			// log requests to the console
	var bodyParser 		= require('body-parser');  		// pull information from HTML POST
	var methodOverride 	= require('method-override'); 	// simulate DELETE and PUT

	/*==========  configuration  ==========*/

	mongoose.connect(database.url); 								// connect to mongoDB database on mongolab.com
	app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({ 'extended': 'true' })); 		// parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); 									// parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as jason
	app.use(methodOverride());

	/*==========  routes  ==========*/
	require('./app/routes')(app);
	
	/*==========  listen (start app with node server.js)  ==========*/
	app.listen(3000);
	console.log('App listening on port 3000');
	