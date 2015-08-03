define(['react', 'jsx!knockoutMixin'], function(React, KnockoutMixin){
	var ToDoList = React.createClass({
	    mixins: [ KnockoutMixin ],

	    propTypes: {
	        todos: React.PropTypes.array.isRequired
	    },

	    render: function() {
	        return (
	            <ul data-bind="foreach: props.todos">
	                <li data-bind="text: item"></li>
	            </ul>
	        );
	    }
	});

	return ToDoList;
})