'use strict';

define([
	'react', 
	'jsx!NameComponent', 
	'jsx!FormComponent'
], function(React, NameComponent, FormComponent){
	var initialize = function(){

		React.render( 
			<NameComponent />, 
			document.getElementById('app')
		);

		React.render( 
			<FormComponent />, 
			document.getElementById('dt')
		);
	}
	
	return {
		initialize: initialize
	}
});