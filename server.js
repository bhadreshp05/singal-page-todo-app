// Server.js

	/*==========  set up  ==========*/
	var express = require('express');
	var app 			= express();  					// create our app w/ express
	var mongoose 		= require('mongoose');			// mongoose for mongodb
	var morgan 			= require('morgan');  			// log requests to the console
	var bodyParser 		= require('body-parser');  		// pull information from HTML POST
	var methodOverride 	= require('method-override'); 	// simulate DELETE and PUT

	/*==========  configuration  ==========*/

	// connect to mongoDB database on mongolab.com
	mongoose.connect('mongodb://bhadresh:patel@ds061158.mongolab.com:61158/singaltodoapp');
	  
	// set the static files location /public/img will be /img for users
	app.use(express.static(__dirname + '/public'));

	// log every request to the console
	app.use(morgan('dev'));

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ 'extended': 'true' }));

	// parse application/json
	app.use(bodyParser.json());

	// parse application/vnd.api+json as jason
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

	app.use(methodOverride());

	/*==========  define model  ==========*/
	var Todo = mongoose.model('Todo', {
		text: String
	});

	/*==========  routes  ==========*/

		// api -------------------
		// get all todos
		app.get('/api/todos', function(req, res) {
			
			// use mongoose to get all todos in the database
			Todo.find(function(err, todos) {
				
				// if there is error retrieving, send the error. nothig after res.send(err) will execute
				if (err) {
					res.send(err);
				}
				res.json(todos); // return all todos in JSON format
			});
		});

		// create todo and send back all todos after creation
		app.post('/api/todos', function(req, res) {
			
			// create a todo, information comes from AJAX request from Angular
			Todo.create({
				text: req.body.text,
				done: false
			}, function(err, todo) {
				if (err) {
					res.send(err)
				}
				// get and return all todos after you create another
				Todo.find(function(err, todos) {
					if (err) {
						res.send(err);
					}
					res.json(todos);
				});
			});
		});

		// delete a todo
		app.delete('/api/todos/:todo_id', function(req, res) {
			Todo.remove({
				_id: req.params.todo_id
			}, function(err, todo) {
				if (err) {
					res.send(err);
				}
				// get and return all the todos after you delete one
				Todo.find(function(err, todos) {
					if (err) {
						res.send(err);
					}
					res.json(todos)
				});
			});
		});

	/*==========  application  ==========*/
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});


	/*==========  listen (start app with node server.js)  ==========*/
	app.listen(3000);
	console.log('App listening on port 3000');
	