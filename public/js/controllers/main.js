// js/controllers/main.js

	angular.module('todoController', [])

		.controller('mainController', function($scope, $http, Todos) {
			$scope.formData = {};

			/*==========  GET  ==========*/
			// when landing on the page, get all the todos and show them
			// use the service to get all the todos
			Todos.get()
				.success(function(data) {
					$scope.todos = data;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});

			/*==========  CREATE  ==========*/
			// when submitting the add form, send the text to the node API
			$scope.createTodo = function() {

				// validate the formData to make sure that something is there
				// if form is empty, nothing will happen
				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)
					.success(function(data) {
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
				
			};

			/*==========  DELETE  ==========*/
			// delete a todo after checking it
			$scope.deleteTodo = function(id) {
				Todos.delete(id)
					.success(function(data) {
						$scope.todos = data;
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			};
		})