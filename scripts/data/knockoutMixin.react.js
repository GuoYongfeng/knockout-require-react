define(['ko'], function(ko){

	var KnockoutMixin = {

	    updateKnockout: function() {
	        this.__koTrigger(!this.__koTrigger());
	    },

	    componentDidMount: function() {
	        this.__koTrigger = ko.observable(true);
	        this.__koModel = ko.computed(function () {
	            this.__koTrigger(); 

	            return {
	                props: this.props,
	                state: this.state
	            };
	        }, this);

	        ko.applyBindings(this.__koModel, this.getDOMNode());
	    },

	    componentWillUnmount: function() {
	        ko.cleanNode(this.getDOMNode());
	    },

	    componentDidUpdate: function() {
	        this.updateKnockout();
	    }
	};
	
	return KnockoutMixin;
})