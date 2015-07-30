'use strict';

define(['react', 'ko', 'name'], function(React, ko, name){

	return React.createClass({

		componentDidMount: function(){
			ko.applyBindings(new name(), document.getElementById('app'));
		},
		
		render: function(){
			return (
				<div>
					<h2>请输入：</h2>
					<p>姓氏: <input data-bind="value: firstName" /></p>  
					<p>名字: <input data-bind="value: lastName" /></p>  
					<h2>Hello, <span data-bind="text: fullName"></span>!</h2>
				</div>
			);
		}
	});
});