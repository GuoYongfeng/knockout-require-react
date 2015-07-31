'use strict';

define(['react', 'ko', 'name'], function(React, ko, name){

	return React.createClass({

		componentDidMount: function(){
			ko.applyBindings(new name(), document.getElementById('app'));
		},
		
		render: function(){
			return (
				<div>
					<p data-bind="text: name"></p> 
					<p data-bind="text: job"></p> 
					Your Name：<input data-bind="value: name"/><br />
					Your Position：<input data-bind="value: job"/> 
				</div>
			);
		}
	});
});