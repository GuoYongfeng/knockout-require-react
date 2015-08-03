'use strict';

define(['jquery', 'react', 'ko', 'form'], function($, React, ko, form){

	return React.createClass({

		componentDidMount: function(){
			console.log(form);
			ko.applyBindings(form, document.getElementById('dt'));
		},
		
		render: function(){
			return (
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="panel panel-success">
								<div className="panel-heading">
									<h3 className="panel-title">个人信息</h3>
								</div>
								<div className="panel-body">
									<div data-bind="foreach: rows">
										<span data-bind="text: status"></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	});
});