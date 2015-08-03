'use strict';

define([
	'react', 
	'jsx!NameComponent', 
	'jsx!FormComponent',
	'jsx!TodoListComponent'
], function(React, NameComponent, FormComponent, TodoList){
	var initialize = function(){

		React.render( 
			<NameComponent />, 
			document.getElementById('app')
		);

		React.render( 
			<FormComponent />, 
			document.getElementById('dt')
		);

		React.render(
			<TodoList todos={[{'item': 'React'}, {'item': 'fis3-uap'}, {'item': 'yeoman'}]} />,
			document.getElementById('todo')
		);
		
	}
	
	return {
		initialize: initialize
	}
});