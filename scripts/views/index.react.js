'use strict';

define(['react', 'jsx!NameComponent'], function(React, NameComponent){
	var initialize = function(){
		React.render( 
			<NameComponent />, 
			document.getElementById('app')
		);
	}
	
	return {
		initialize: initialize
	}
});