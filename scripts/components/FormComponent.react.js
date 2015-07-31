'use strict';

define(['react', 'ko', 'form'], function(React, ko, form){

	return React.createClass({

		componentDidMount: function(){
			ko.applyBindings(form, document.getElementById('dt'));
		},
		
		render: function(){
			return (
				<dd>
					<dt>DataTable中的pageSize和pageIndex</dt>
					<dl>pageSize：<h3 data-bind="text: pageSize"></h3></dl>
					<dl>pageIndex：<h3 data-bind="text: pageIndex"></h3></dl>
				</dd>
			);
		}
	});
});