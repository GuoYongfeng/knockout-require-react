require.config({
	baseUrl: "/",
	paths: {
		jquery: 'vendor/jquery/jquery-2.1.1.min',
		ko: 'vendor/knockout/knockout.debug',
		biz: 'vendor/uui/u.biz',
		
		text: 'vendor/react/text',
		react: 'vendor/react/react-with-addons',
		JSXTransformer: 'vendor/react/JSXTransformer',
		jsx: 'vendor/react/jsx',

		dataTable: 'scripts/viewModels/dataTable',
		name: 'scripts/viewModels/name',
		form: 'scripts/viewModels/form',
		data: 'scripts/data/data',

		index: 'scripts/views/index.react',

		NameComponent: 'scripts/components/NameComponent.react',
		FormComponent: 'scripts/components/FormComponent.react',
		TodoListComponent: 'scripts/components/TodoListComponent.react',
		knockoutMixin: 'scripts/data/knockoutMixin.react'
	},
	shim: {
		jquery: {
			exports: "$"
		}
	},
});

require(['jquery', 'ko', 'jsx!index'], function($, ko, index) {
	index.initialize();
});