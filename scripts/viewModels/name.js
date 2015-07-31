define(['ko'], function(ko){
	
	var ViewModel = function(opt) {  
		
	  // this.firstName = ko.observable(first);
	  // this.lastName = ko.observable(last);
	  // this.fullName = ko.pureComputed(function() {

	  //     return this.firstName() + " " + this.lastName();

	  // }, this);
	  
	  	this.name = ko.observable("TJ"); 
		this.job = ko.observable("前端研发"); 

	};

	return ViewModel;

})