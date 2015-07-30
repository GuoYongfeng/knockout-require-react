require.config({
	baseUrl: "/",
	paths: {
		jquery: 'vendor/jquery/jquery-2.1.1.min',
		text: 'vendor/react/text',
		react: 'vendor/react/react-with-addons',
		JSXTransformer: 'vendor/react/JSXTransformer',
		jsx: 'vendor/react/jsx',
		dataTable: 'scripts/viewModels/dataTable',
		ko: 'vendor/knockout/knockout.debug',
		// u: 'scripts/u',
		biz: 'scripts/u.biz'
	},
	shim: {
		jquery: {
			exports: "$"
		},
		components: {
			deps: [
				'react'
			],
			exports: 'components'
		},
	},
	jsx: {
		fileExtension: '.jsx',
		harmony: true,
		stripTypes: true
	}
});

require(['jquery', 'ko', 'dataTable', 'biz'], function($, ko) {
	var viewModel = {
		dataTable0: new $.DataTable({
			meta: {
				'name': {},
				'birthtime': {},
				'company': {},
				'email': {},
				'phone': {}
			},
			pageSize:1,
			pageIndex:1
		})
	};


	var app = $.createApp();

	app.init(viewModel)

	var data = {
		"rows": [
			{
				"status": "nrm",
				"data": {
					"billnumber": "002",
					"datatime": "2015-5-15",
					"company": "用友网络科技股份有限公司",
					"department": "UAPweb",
					"person": "lixiao",
					"money": "60",
					"email": "li@yonyou.com",
					"phone": "18811437255",
					"landline": "62434235",
					"beardeparment": "UAP",
					"project": "默认项目"
				}
			}
		],
		"pageIndex": 1,
		"pageSize": 10
	};

	viewModel.dataTable0.setData(data);

});