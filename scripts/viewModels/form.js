define(['dataTable', 'ko', 'data'], function(dataTable, ko, data){
	var DataTable = dataTable.DataTable;

	return new DataTable(data);

});