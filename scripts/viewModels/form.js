define(['dataTable', 'ko'], function(dataTable, ko){
	var DataTable = dataTable.DataTable;
	
	var data = {
		"pageIndex": 1,
		"pageSize": 10,
	};

	return new DataTable(data);

});