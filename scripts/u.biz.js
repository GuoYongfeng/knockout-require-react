( function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define(["jquery", "ko"], factory );
	} else {
		// Browser globals
		factory($, ko);
	}
}( function($, ko) {

	'use strict'
	
	var Class = function(o) {
		if (!(this instanceof Class) && isFunction(o)) {
			return classify(o)
		}
	}

// Create a new Class.
//
//  var SuperPig = Class.create({
//    Extends: Animal,
//    Implements: Flyable,
//    initialize: function() {
//      SuperPig.superclass.initialize.apply(this, arguments)
//    },
//    Statics: {
//      COLOR: 'red'
//    }
// })
//
	Class.create = function(parent, properties) {
		if (!isFunction(parent)) {
			properties = parent
			parent = null
		}

		properties || (properties = {})
		parent || (parent = properties.Extends || Class)
		properties.Extends = parent

		// The created class constructor
		function SubClass() {
			// Call the parent constructor.
			parent.apply(this, arguments)

			// Only call initialize in self constructor.
			if (this.constructor === SubClass && this.initialize) {
				this.initialize.apply(this, arguments)
			}
		}

		// Inherit class (static) properties from parent.
		if (parent !== Class) {
			mix(SubClass, parent, parent.StaticsWhiteList)
		}

		// Add instance properties to the subclass.
		implement.call(SubClass, properties)

		// Make subclass extendable.
		return classify(SubClass)
	}

	function implement(properties) {
		var key, value

		for (key in properties) {
			value = properties[key]

			if (Class.Mutators.hasOwnProperty(key)) {
				Class.Mutators[key].call(this, value)
			} else {
				this.prototype[key] = value
			}
		}
	}


	// Create a sub Class based on `Class`.
	Class.extend = function(properties) {
		properties || (properties = {})
		properties.Extends = this

		return Class.create(properties)
	}


	function classify(cls) {
		cls.extend = Class.extend
		cls.implement = implement
		return cls
	}


	// Mutators define special properties.
	Class.Mutators = {

		'Extends': function(parent) {
			var existed = this.prototype
			var proto = createProto(parent.prototype)

			// Keep existed properties.
			mix(proto, existed)

			// Enforce the constructor to be what we expect.
			proto.constructor = this

			// Set the prototype chain to inherit from `parent`.
			this.prototype = proto

			// Set a convenience property in case the parent's prototype is
			// needed later.
			this.superclass = parent.prototype
		},

		'Implements': function(items) {
			isArray(items) || (items = [items])
			var proto = this.prototype,
				item

			while (item = items.shift()) {
				mix(proto, item.prototype || item)
			}
		},

		'Statics': function(staticProperties) {
			mix(this, staticProperties)
		}
	}


	// Shared empty constructor function to aid in prototype-chain creation.
	function Ctor() {}

	// See: http://jsperf.com/object-create-vs-new-ctor
	var createProto = Object.__proto__ ?
		function(proto) {
			return {
				__proto__: proto
			}
		} :
		function(proto) {
			Ctor.prototype = proto
			return new Ctor()
		}


	// Helpers
	// ------------

	function mix(r, s, wl) {
		// Copy "all" properties including inherited ones.
		for (var p in s) {
			if (s.hasOwnProperty(p)) {
				if (wl && indexOf(wl, p) === -1) continue

				// 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
				if (p !== 'prototype') {
					r[p] = s[p]
				}
			}
		}
	}


	var toString = Object.prototype.toString

	var isArray = Array.isArray || function(val) {
		return toString.call(val) === '[object Array]'
	}

	var isFunction = function(val) {
		return toString.call(val) === '[object Function]'
	}

	var indexOf = Array.prototype.indexOf ?
		function(arr, item) {
			return arr.indexOf(item)
		} :
		function(arr, item) {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] === item) {
					return i
				}
			}
			return -1
		}

	// exports.Class = Class
;
	// var Class = $.Class

	var BaseComponent = Class.create({
		initialize: function(element, options, viewModel) {
			this.element = element
			this.id = options['id']
			this.options = options
			this.viewModel = viewModel
		},
		on: function(name, callback) {
			name = name.toLowerCase()
			this._events || (this._events = {})
			var events = this._events[name] || (this._events[name] = [])
			events.push({
				callback: callback
			})
			return this;
		},
		trigger: function(name) {
			name = name.toLowerCase()
			if (!this._events || !this._events[name]) return this;
			var args = Array.prototype.slice.call(arguments, 1);
			var events = this._events[name];
			for (var i = 0, count = events.length; i < count; i++) {
				events[i].callback.apply(this, args);
			}
			return this;

		},
		setEnable: function(enable){
			
		},

		Statics: {
			compName: '',
			EVENT_VALUE_CHANGE: 'valueChange',
			getName: function() {
				return this.compName
			}
		}
	})

	$.BaseComponent = BaseComponent

;
/**
 * 输入框基类，不可直接使用
 */
	var InputComp = $.BaseComponent.extend({ 
		initialize: function(element, options, viewModel) {
			InputComp.superclass.initialize.apply(this, arguments)
			this.dataModel = null
			this.hasDataTable = false
			this.parseDataModel()
			this.required = options['required']
			this.placement = options['placement']	
//			this.create()
		},
		create: function() {
			var self = this
			if (this.dataModel) {
				//处理数据绑定
				if (this.hasDataTable) {
					this.dataModel.ref(this.field).subscribe(function(value) {
							self.modelValueChange(value)
					})
					//处理只读
					this.dataModel.refEnable(this.field).subscribe(function(value){
						self.setEnable(value)
					})
					//处理必填
					this.dataModel.refMeta(this.field, "required").subscribe(function(value){
						self.required = self.required || value
					})					
					this.setEnable(this.dataModel.isEnable(this.field))
					//TODO 支持动态修改required
					this.required = this.required || this.dataModel.getMeta(this.field, "required")
				} else {
					this.dataModel.subscribe(function(value) {
						self.modelValueChange(value)
					})
				}
				this.modelValueChange(this.hasDataTable ? this.dataModel.getValue(this.field) : this.dataModel())
			}
			
			if (this.element.nodeName == 'INPUT' && $(this.element).attr("type") == 'text') {
				$(this.element).focusin(function(e) {
					self.setShowValue(self.getValue())
				})
				$(this.element).blur(function(e) {
					self.setValue(self.element.value)
				})
			}
			this.validdate = $(this.element).validate({required:this.required,validType:this.validType,placement:this.placement})

		},
		/**
		 * 模型数据改变
		 * @param {Object} value
		 */
		modelValueChange: function(value) {

		},

		parseDataModel: function() {
			if (!this.options || !this.options["data"]) return
			this.dataModel = this._getJSObject(this.viewModel, this.options["data"])
			if (this.dataModel instanceof $.DataTable) {
				this.hasDataTable = true
				this.field = this.options["field"]
			}
		},
		/**
		 * 设置模型值
		 * @param {Object} value
		 */
		setModelValue: function(value) {
			if (!this.dataModel) return
			if (this.hasDataTable) {
				this.dataModel.setValue(this.field, value)
			} else
				this.dataModel(value)
		},
		_getJSObject: function(viewModel, names) {
			if(!names) {
				return;
			}

			var nameArr = names.split('.')
			var obj = viewModel
			for (var i = 0; i < nameArr.length; i++) {
				obj = obj[nameArr[i]]
			}
			return obj
		},
		/**
		 * 设置控件值
		 * @param {Object} value
		 */
		setValue: function(value) {
		},
		/**
		 * 取控件的值
		 */
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
		},
		getShowValue: function() {
			return this.showValue
		},
		setEnable: function(enable){
			if(enable === true || enable === 'true'){
				this.enable = true
				$(this.element).removeAttr('readonly')
			}	
			else if(enable === false || enable === 'false'){	
				this.enable = true
				$(this.element).attr('readonly','readonly')	
			}	
		},

		Statics: {
		}
	})

	$.InputComp = InputComp

;
/* ========================================================================
 * UUI: dataTable.js v1.0.0
 *
 * ========================================================================
 * Copyright 2015 yonyou, Inc.
 * ======================================================================== */

	'use strict';
	
	var Events = function(){
	}
	
	Events.fn = Events.prototype
	/**
	 *绑定事件
	 */
	Events.fn.on = function(name, callback) {
		name = name.toLowerCase()
		this._events || (this._events = {})
		var events = this._events[name] || (this._events[name] = [])
		events.push({
			callback: callback
		})
		return this;
	}

	/**
	 * 触发事件
	 */
	Events.fn.trigger = function(name) {
		name = name.toLowerCase()
		if (!this._events || !this._events[name]) return this;
		var args =  Array.prototype.slice.call(arguments, 1);
		var events = this._events[name];
		for (var i = 0, count = events.length; i < count; i++) {
			events[i].callback.apply(this, args);
		}
		return this;
	}	
	
	
	Events.fn.getEvent = function(name){
		name = name.toLowerCase()
		this._events || (this._events = {})
		return this._events[name]
	}	
	
	/**===========================================================================================================
	 * 
	 * 数据模型   
	 * 
	 * ===========================================================================================================
	 */
	
	var DataTable = function(options){
		this.id = options['id']
		this.meta = options['meta']
//		this.currentMeta = ko.observable(mt)
		this.enable = options['enable'] || DataTable.DEFAULTS.enable
		this.pageSize = ko.observable(options['pageSize'] || DataTable.DEFAULTS.pageSize)
		this.pageIndex = ko.observable(options['pageIndex'] || DataTable.DEFAULTS.pageIndex)
		this.pageCache = DataTable.DEFAULTS.pageCache
		this.rows = ko.observableArray([])
//		this.currentRow = ko.observable()
		this.selectedIndices = []
		this.currSelectedIndex = -1 // ko.observable()
		this.cachedPages = []
		this.createDefaultEvents()
		this.metaChange = ko.observable(1)
		this.valueChange = ko.observable(1)
		this.enableChange = ko.observable(1)
		this.params = options['params'] || {}
	}
	
	DataTable.fn = DataTable.prototype = new Events()
	
	DataTable.DEFAULTS = {
		pageSize:20,
		pageIndex:0,
		pageCache:true,
		enable: true
	}
	
	//事件类型
	DataTable.ON_ROW_SELECT = 'select'
	DataTable.ON_ROW_UNSELECT = 'unSelect'
	DataTable.ON_ROW_ALLSELECT = 'allSelect'
	DataTable.ON_ROW_ALLUNSELECT = 'allUnselect'
	DataTable.ON_VALUE_CHANGE = 'valueChange'
//	DataTable.ON_AFTER_VALUE_CHANGE = 'afterValueChange'
//	DataTable.ON_ADD_ROW = 'addRow'
	DataTable.ON_INSERT = 'insert'
	DataTable.ON_UPDATE = 'update'
	DataTable.ON_DELETE = 'delete'
	DataTable.ON_DELETE_ALL = 'deleteAll'
	DataTable.ON_LOAD = 'load'
	
	DataTable.SUBMIT = {
		current: 'current',
		all:	'all',
		select:	'select',
		change: 'change'
	}
	
	
	DataTable.fn.createDefaultEvents = function(){
		//this.on()
	}
	
	DataTable.fn.addParam = function(key, value){
			this.params[key] = value
	}
	
	DataTable.fn.addParams = function(params){
		for(var key in params){
			this.params[key] = params[key]
		}
	}
	
	DataTable.fn.getParam = function(key){
		return this.params[key]
	}
	
	/**
	 * 获取meta信息，先取row上的信息，没有时，取dataTable上的信息
	 * @param {Object} fieldName
	 * @param {Object} key
	 * @param {Object} row
	 */
	DataTable.fn.getMeta = function(fieldName, key){
		if (arguments.length == 0)
			return this.meta
		return this.meta[fieldName][key]
	}
	
	DataTable.fn.setMeta = function(fieldName, key, value){
		this.meta[fieldName][key] = value
		this.metaChange(- this.metaChange())
	}
	
	DataTable.fn.setCurrentPage = function(pageIndex){
		this.pageIndex(pageIndex)
		var cachedPage = this.cachedPages[this.pageIndex()]
		if(cachedPage) {
			this.removeAllRows()
			this.setRows(cachedPage.rows)
			this.setRowsSelect(cachedPage.selectedIndcies)
		}
	}
	
	DataTable.fn.isChanged = function(){
		var rows = this.getAllRows()
		for (var i = 0; i < rows.length; i++){
			if (rows[i].status != Row.STATUS.NORMAL)
				return true
		}
		return false
	}
	
	
	/**
	 *设置数据
	 * {pageIndex:1,pageSize:10,rows:[{status:'nrm', data:['001','a','b']},{},{}]}
	 * 
	 */
	DataTable.fn.setData = function(data){
		var newIndex = data.pageIndex, 
			newSize = data.pageSize || this.pageSize(),
			type = data.type 
//		if (newSize != this.pageSize())
//			this.cacheRows = []
//		else if (this.pageCache)
//			this.cacheRows[this.pageIndex()] = this.rows()
				
		this.setRows(data.rows)
		this.pageIndex(newIndex)
		this.pageSize(newSize)
		this.updateSelectedIndices()

		
		// 加load事件传入参数为rows  lyk
		// 数组每一项中取data，data取每一项的value
//		this.trigger(DataTable.ON_LOAD,this.getData());
		//this.trigger(DataTable.ON_LOAD,this.rows._latestValue)
		
	}
	
	
	DataTable.fn.setRows = function(rows){
		for (var i = 0; i < rows.length; i++){
			var r = rows[i]
			if (!r.id)
				r.id = Row.getRandomRowId()
			if (r.status == Row.STATUS.DELETE){
				this.removeRowByRowId(r.id)
			}
			else{
				var row = this.getRowByRowId(r.id)
				if (row){
					row.updateRow(r)
					if (!$.isEmptyObject(row.data))
						this.trigger(DataTable.ON_UPDATE,{
							index:i,
							rows:[row]
						})		
				}	
				else{
					row = new Row({parent:this,id:r.id})
					row.setData(rows[i])
					this.addRow(row)
				}
			}
		}	
	}
	
	DataTable.fn.cacheCurrentPage = function(){
		if(this.pageCache) {
			this.cachedPages[this.pageIndex()] = {"rows":this.rows().slice(), "selectedIndcies":this.selectedIndices.slice()}
		}
	}
	
	DataTable.fn.hasPage = function(pageIndex){
		
		return (this.pageCache && this.cachedPages[pageIndex]) ? true : false
		
	}

	/**
	 *追加行 
	 */
	DataTable.fn.addRow = function(row){
		this.insertRow(this.rows.length, row)
	}
	
	DataTable.fn.insertRow = function(index, row){
		if(!row){
			row = new Row({parent:this})
		}
		this.insertRows(index, [row])
	}
	
	DataTable.fn.insertRows = function(index, rows){
//		if (this.onBeforeRowInsert(index,rows) == false)
//			return
		for ( var i = 0; i < rows.length; i++) {
			this.rows.splice(index + i, 0, rows[i])
			this.updateSelectedIndices(index + i, '+')
		}
		this.trigger(DataTable.ON_INSERT,{
			index:index,
			rows:rows
		})
	}
	
	/**
	 * 创建空行
	 */
	DataTable.fn.createEmptyRow = function(){
		var r = new Row({parent:this})
		this.addRow(r)
		return r
	}

	DataTable.fn.removeRowByRowId = function(rowId){
		var index = this.getIndexByRowId(rowId)
		if (index != -1)
			this.removeRow(index)
	}

	DataTable.fn.removeRow = function(index) {
		this.removeRows([ index ]);
	}
	
	DataTable.fn.removeAllRows = function(){
		this.rows([])
		this.selectedIndices = []
		this.trigger(DataTable.ON_DELETE_ALL)
	}
	
	DataTable.fn.removeRows = function(indices) {
		if (typeof indices == 'string' || typeof indices == 'number')
			indices = [indices]
		indices = indices.sort()
		var rowIds = []
		for (var i = indices.length - 1; i >= 0; i--) {
			var index = indices[i]
			var delRow = this.rows()[index];
			if (delRow == null) {
				continue;
			}
			rowIds.push(delRow.rowId)
			this.rows.splice(index, 1);
			this.updateSelectedIndices(index,'-')
		}	
		this.trigger(DataTable.ON_DELETE,{
			indices:indices,
			rowIds:rowIds
		})
	}
	
	/**
	 * 设置选中行，清空之前已选中的所有行
	 */
	DataTable.fn.setRowSelect = function(index){
		if (index instanceof Row){
			index = this.getIndexByRowId(index.rowId)
		}
		this.setRowsSelect([index])
	}	
	
	DataTable.fn.setRowsSelect = function(indices){
		this.setAllRowsUnSelect()
		this.selectedIndices = indices
		var index = this.getSelectedIndex()
//		this.currSelectedIndex = index
//		this.currentRow(this.rows()[index])
		this.setCurrentRow(index)
		var rowIds = this.getRowIdsByIndices(indices)
		this.trigger(DataTable.ON_ROW_SELECT, {
			indices:indices,
			rowIds:rowIds
		})
	}

	/**
	 * 添加选中行，不会清空之前已选中的行
	 */
	DataTable.fn.addRowsSelect = function(indices){
		for (var i=0; i< indices.length; i++){
			this.selectedIndices.push(indices[i])
		}
		var index = this.getSelectedIndex()
//		this.currSelectedIndex = index
//		this.currentRow(this.rows()[index])
		this.setCurrentRow(index)
		var rowIds = this.getRowIdsByIndices(indices)
		this.trigger(DataTable.ON_ROW_SELECT, {
			indices:indices,
			rowIds:rowIds
		})
	}
	
	DataTable.fn.getRowIdsByIndices = function(indices){
		var rowIds = []
		for(var i=0; i<indices.length; i++){
			rowIds.push(this.getRow(indices[i]).rowId)
		}
		return rowIds
	}
	
	/**
	 * 全部取消选中
	 */
	DataTable.fn.setAllRowsUnSelect = function(){
		this.selectedIndices = []
		this.trigger(DataTable.ON_ROW_ALLUNSELECT)
	}
	
	/**
	 * 取消选中
	 */
	DataTable.fn.setRowUnSelect = function(index){
		this.setRowsUnSelect(index)
	}	
	
	DataTable.fn.setRowsUnSelect = function(indices){
		while(indices.length > 0){
			var index = indices.shift()
			var pos = this.selectedIndices.indexOf(index)
			if (pos != -1)
				this.selectedIndices.splice(pos,1)
		}
		var rowIds = this.getRowIdsByIndices(indices)
		this.trigger(DataTable.ON_ROW_UNSELECT, {
			indices:indices,
			rowIds:rowIds
		})
	}
	
	/**
	 * 
	 * @param {Object} index 要处理的起始行索引
	 * @param {Object} type   增加或减少  + -
	 */
	DataTable.fn.updateSelectedIndices = function(index, type){
		if (this.selectedIndices == null || this.selectedIndices.length == 0)
			return
		for (var i = 0, count= this.selectedIndices.length; i< count; i++){
			if (type == '+'){
				if (this.selectedIndices[i] >= index)
					this.selectedIndices[i] = parseInt(this.selectedIndices[i]) + 1
			}
			else if (type == '-'){
				if (this.selectedIndices[i] == index)
					this.selectedIndices.splice(i,0)
				else if(this.selectedIndices[i] > index)
					this.selectedIndices[i] = this.selectedIndices[i] -1
			}
		}
		if (type == '+')
			this.selectedIndices.push(index)
		var currIndex = this.getSelectedIndex()
//		this.currSelectedIndex = currIndex
//		this.currentRow(this.rows()[currIndex])
		this.setCurrentRow(currIndex)
	}
	
	/**
	 * 获取选中行索引，多选时，只返回第一个行索引
	 */
	DataTable.fn.getSelectedIndex = function(){
		if (this.selectedIndices == null || this.selectedIndices.length == 0)
			return -1
		return this.selectedIndices[0]
	}
	
	DataTable.fn.getSelectedIndexs = function(){
		if (this.selectedIndices == null || this.selectedIndices.length == 0)
			return []
		return this.selectedIndices
	}
	
	/**
	 * 根据行号获取行索引
	 * @param {String} rowId
	 */
	DataTable.fn.getIndexByRowId = function(rowId){
		for (var i=0, count = this.rows().length; i< count; i++){
			if (this.rows()[i].rowId == rowId)
				return i
		}
		return -1
	}
	
	/**
	 * 获取所有行数据
	 */
	DataTable.fn.getAllDatas = function(){
		var rows = this.getAllRows()
		var datas = []
		for (var i=0, count = rows.length; i< count; i++)
			if (rows[i])
				datas.push(rows[i].getData())
		return datas
	}

	/**
	 * 获取当前页数据
	 */
	DataTable.fn.getData = function(){
		var datas = []
		for(var i = 0; i< this.rows().length; i++){
			datas.push(this.rows()[i].getData())
		}
		return datas
	}
	 
	DataTable.fn.getDataByRule = function(rule){
		var returnData = {},
			datas = null
		returnData.meta = this.meta
		returnData.params = this.params
		rule = rule || DataTable.SUBMIT.current
		if (rule == DataTable.SUBMIT.current){
			datas = []
			for (var i =0, count = this.rows().length; i< count; i++){
				if (i == this.currSelectedIndex)
					datas.push(this.rows()[i].getData())
				else
					datas.push(this.rows()[i].getEmptyData())
			}
		}
		else if (rule == DataTable.SUBMIT.all){
			datas = this.getData()	
		}
		else if (rule == DataTable.SUBMIT.select){
			datas = this.getSelectedDatas(true)
		}
		else if (rule == DataTable.SUBMIT.change){
			datas = this.getChangedDatas()
		}
		
		returnData.rows = datas
		returnData.select= this.getSelectedIndexs()
		returnData.current = this.getSelectedIndex()
		returnData.pageSize = this.pageSize()
		returnData.pageIndex = this.pageIndex()
		returnData.isChanged = this.isChanged()
		return returnData
	}

	/**
	 * 获取选中行数据
	 */
	DataTable.fn.getSelectedDatas = function(withEmptyRow){
		var datas = []
		var sIndices = []
		for(var i = 0, count=this.selectedIndices.length; i< count; i++){
			sIndices.push(this.selectedIndices[i])
		}	
		for(var i = 0, count=this.rows().length; i< count; i++){
			if (sIndices.indexOf(i) != -1)
				datas.push(this.rows()[i].getData())
			else if (withEmptyRow == true)
				datas.push(this.rows()[i].getEmptyData())
		}
		return datas
	}
	
	/**
	 * 绑定字段值
	 * @param {Object} fieldName
	 */
	DataTable.fn.ref = function(fieldName){
		return ko.pureComputed({
			read: function(){
				this.valueChange()
				var row = this.getCurrentRow()
				if (row) 
					return row.getValue(fieldName)
				else
					return ''
			},
			write: function(value){
				var row = this.getCurrentRow()
				if (row)
					row.setValue(fieldName,value)
			},
			owner: this
		})
	}
	

	/**
	 * 绑定字段属性
	 * @param {Object} fieldName
	 * @param {Object} key
	 */
	DataTable.fn.refMeta = function(fieldName, key){
		return ko.pureComputed({
			read: function(){
				this.metaChange()
				return this.getMeta(fieldName, key)
			},
			write: function(value){
				this.setMeta(fieldName, key, value)
			},
			owner: this
		})		
	}
	
	DataTable.fn.refEnable = function(fieldName){
		return ko.pureComputed({
			read: function(){
				this.enableChange()
				return this.enable || this.getMeta(fieldName, 'enable') || false
			},
			owner: this
		})		
	}
	
	DataTable.fn.isEnable = function(fieldName){
		return this.enable || this.getMeta(fieldName, 'enable') || false
	}
	
	DataTable.fn.refRowMeta = function(fieldName, key){
		return ko.pureComputed({
			read: function(){
				this.metaChange()
				var row = this.getCurrentRow()
				if (row) 
					return row.getMeta(fieldName, key)
				else
					return ''
			},
			write: function(value){
				var row = this.getCurrentRow()
				if (row)
					row.setMeta(fieldName,value)
			},
			owner: this
		})		
	}
	
	
	DataTable.fn.getValue = function(fieldName,row){
		row = row || this.getCurrentRow()
		if (row)
			return row.getValue(fieldName)
		else
		 	return ''
	}
	
	DataTable.fn.setValue = function(fieldName, value, row){
		row = row ? row : this.getCurrentRow()
		if (row)
			row.setValue(fieldName, value)
	}
	
	DataTable.fn.setEnable = function(enable){
		if (this.enable == enable) return
		this.enable = enable
		this.enableChange(- this.enableChange())
	}
	
	DataTable.fn.getCurrentRow = function(){
		if (this.currSelectedIndex == -1)
			return null
		else	
			return this.rows()[this.currSelectedIndex]
	}

	DataTable.fn.setCurrentRow = function(index){
		this.currSelectedIndex = index
		this.valueChange(- this.valueChange())
	}
	
	DataTable.fn.getRow = function(index){
		return this.rows()[index]
	}
	
	DataTable.fn.getAllRows = function(){
		return this.rows()
	}
	
	DataTable.fn.getRowByRowId = function(rowid){
		for(var i=0, count= this.rows().length; i<count; i++){
			if (this.rows()[i].rowId == rowid)
				return this.rows()[i]
		}
		return null
	}

	/**
	 * 获取变动的数据(新增、修改)
	 */
	DataTable.fn.getChangedDatas = function(withEmptyRow){
		var datas = []
		for (var i=0, count = this.rows().length; i< count; i++){
			if (this.rows()[i] && this.rows()[i].status != Row.STATUS.NORMAL){
				datas.push(this.rows()[i].getData())
			}
			else if (withEmptyRow == true){
				datas.push(this.rows()[i].getEmptyData())
			}
		}
		return datas
	}
	
	
	/**===========================================================================================================
	 * 
	 * 行模型  
	 * 
	 * {id:'xxx', parent:dataTable1}
	 * 
	 * data:{value:'v1',meta:{}}
	 * 
	 * ===========================================================================================================
	 */
	var Row = function(options){
		this.rowId = options['id'] || Row.getRandomRowId()
		this.status = Row.STATUS.NEW 
		this.parent = options['parent']
		this.initValue = null
		this.data = {}
		this.metaChange = ko.observable(1)
		this.valueChange = ko.observable(1)
		this.init()
	}
	
	Row.STATUS = {
		NORMAL: 'nrm',
		UPDATE: 'upd',
		NEW: 'new',
		DELETE: 'del'
	}
	
	Row.fn = Row.prototype = new Events()
	
	/**
	 * Row初始化方法
	 * @private
	 */
	Row.fn.init = function(){
		var meta = this.parent.meta
		//添加默认值
		for (var key in meta){
			this.data[key] = {}
			if (meta[key]['default']){
				var defaults = meta[key]['default']
				for (var k in defaults){
					if (k == 'value')
						this.data[key].value = defaults[k]
					else{
						this.data[key].meta = this.data[key].meta || {}
						this.data[key].meta[k] = defaults[k]
					}
				}
			}
		}
	}
	
	Row.fn.ref = function(fieldName){
		return ko.pureComputed({
			read: function(){
				this.valueChange()
				return this.data[fieldName]['value']
			},
			write: function(value){
				this.setValue(fieldName, value)
			},
			owner: this
		})
	}
	
	Row.fn.refMeta = function(fieldName, key){
		return ko.pureComputed({
			read: function(){
				this.metaChange()
				this.getMeta(fieldName, key)
			},
			write: function(value){
				this.setMeta(fieldName, key, value)
			},
			owner: this
		})		
	}
	
	/**
	 *获取row中某一列的值 
	 */
	Row.fn.getValue = function(fieldName){
		return this.data[fieldName]['value']
	}
	
	/**
	 *设置row中某一列的值 
	 */
	Row.fn.setValue = function(fieldName, value){
		var oldValue = this.getValue(fieldName) 
		this.data[fieldName]['value'] = value
		this.data[fieldName].changed = true
		if (this.status != Row.STATUS.NEW)
			this.status = Row.STATUS.UPDATE
		this.valueChange(- this.valueChange())
		if (this.parent.getCurrentRow() == this)
			this.parent.valueChange(- this.valueChange())
		this.parent.trigger(DataTable.ON_VALUE_CHANGE, {
			eventType:'dataTableEvent',
			dataTable:this.parent.id,
			rowId: this.rowId,
			field:fieldName,
			oldValue:oldValue,
			newValue:value
		})
		this.parent.trigger(fieldName + "." + DataTable.ON_VALUE_CHANGE, {
			eventType:'dataTableEvent',
			dataTable:this.parent.id,
			rowId: this.rowId,
			field:fieldName,
			oldValue:oldValue,
			newValue:value
		})		
	}

	/**
	 *获取row中某一列的属性
	 */
	Row.fn.getMeta = function(fieldName, key){
		if (arguments.length == 0){
			var mt = {}
			for (var k in this.data){
				mt[k] = this.data[k].meta ?  this.data[k].meta : {}
			}
			return mt
		}
		var meta = this.data[fieldName].meta
		if (meta && meta[key])
			return meta[key]
		else	
			return this.parent.getMeta(fieldName, key)
	}
	
	/**
	 *设置row中某一列的属性
	 */
	Row.fn.setMeta = function(fieldName, key,value){
		var meta = this.data[fieldName].meta
		if (!meta)
			meta = this.data[fieldName].meta = {}
		meta[key] = value
		this.metaChange(- this.metaChange())
		if (key == 'enable')
			this.enableChange(- this.enableChange())
	}

	/**
	 *设置Row数据
	 *
	 *  data.status
	 *	data.data {'field1': {value:10,meta:{showValue:1.0,precision:2}}}
	 */
	Row.fn.setData = function(data){
		this.status = data.status
		//this.rowId = data.rowId
		for(var key in data.data){
			if (this.data[key]){
				var valueObj = data.data[key]
				if (typeof valueObj == 'string' || typeof valueObj == 'number' || valueObj === null)
					this.data[key]['value'] = this.formatValue(key, valueObj)
//					this.setValue(key, valueObj)
				else{
//					this.setValue(key, valueObj.value)
					this.data[key]['value'] = this.formatValue(key, valueObj.value)
					for(var k in valueObj.meta){
						this.setMeta(key, k, valueObj.meta[k])
					}
				}
			}
		}
	}
	
	/**
	 * 格式化数据值
	 * @private
	 * @param {Object} field
	 * @param {Object} value
	 */
	Row.fn.formatValue = function(field, value){
		var type = this.parent.getMeta(field,'type')
		if (!type) return value
		if (type == 'date' || type == 'datetime'){
			return _formatDate(value)			
		}
		return value
	}
	
	Row.fn.updateRow = function(row){
		this.setData(row)
	}
	
	/**
	 * @private
	 * 提交数据到后台
	 */
	Row.fn.getData = function(){
		var data = ko.toJS(this.data)
		var meta = this.parent.getMeta()
		for (var key in meta){
			if (meta[key] && meta[key].type){
				if (meta[key].type == 'date' || meta[key].type == 'datetime'){
					data[key].value = _dateToUTCString(data[key].value)
				}
			}
		}
		return {'id':this.rowId ,'status': this.status, data: data}
	}
	
	Row.fn.getEmptyData = function(){
		return {'id':this.rowId ,'status': this.status, data: {}}
	}
	
	
	/*
	 * 生成随机行id
	 * @private
	 */
	Row.getRandomRowId = function() {
		return setTimeout(1);
	};
	
	var _formatDate = function(value){
		var date = new Date();
		date.setTime(value);		
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		if (parseInt(month)<10) month = "0" + month;
		var day = date.getDate();
		if (parseInt(day)<10) day = "0" + day;
		var hours = date.getHours();
		if (parseInt(hours)<10) hours = "0" + hours;
		var minutes = date.getMinutes();
		if (parseInt(minutes)<10) minutes = "0" + minutes;
		var seconds = date.getSeconds();
		if (parseInt(seconds)<10) seconds = "0" + seconds;
		var formatString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
		return formatString;		
	}
	
	var _dateToUTCString = function(date){
		if (date.indexOf("-") > -1)
			date = date.replace(/\-/g,"/");
		var utcString = Date.parse(date);
		if (isNaN(utcString)) return ""; 
		return utcString; 	
	}
	
//	if (exports){
		$.Row = Row
		$.DataTable = DataTable
//	}
//	else
//		return {
//			Row: Row,
//			DataTable: DataTable
//		}
//	

;
	"use strict";
	
	var CompManager = {
		plugs:{},
		apply : function(viewModel, dom){
			dom = dom || document.body
			$(dom).find('[u-meta]').each(function() {
				if ($(this).data('u-meta')) return
				if ($(this).parent('[u-meta]').length > 0) return 
				var options = JSON.parse($(this).attr('u-meta'))
				if(options && options['type']) {
					var comp = CompManager._createComp(this, options, viewModel)
//					var comp = new DataComponent(this, options, viewModel)
					if (comp)
						$(this).data('u-meta', comp)
				}
			})	
			ko.applyBindings(viewModel, dom)
		},
		addPlug: function(plug){
			var name = plug.getName()
			this.plugs || (this.plugs = {})
			if (this.plugs[name]){
				throw new Error('plug has exist:'+ name)
			}
			this.plugs[name] = plug
		},
		_createComp: function(element,options, viewModel){
			var type = options['type']
			var plug = this.plugs[type]
			if (!plug) return null
			return new plug(element, options, viewModel)
		}
	}
	
	var _getJSObject = function (viewModel, names){
		var nameArr = names.split('.')
		var obj = viewModel
		for (var i= 0; i< nameArr.length; i++){
			obj = obj[nameArr[i]]
		}
		return obj
	}
	
	$.compManager = CompManager
	
	
;

	var FloatComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			FloatComp.superclass.initialize.apply(this, arguments)
			this.precision = options['precision']
			this.validType = 'float'
			if (this.dataModel) {
				//处理数据精度
				if (this.hasDataTable) {
					this.dataModel.refMeta(this.field, "precision").subscribe(function(precision){
						self.setPrecision(precision)
					})							
					this.precision = this.dataModel.getMeta(this.field, "precision") || this.precision		
				}
			}	
			this.formater = new $.NumberFormater(this.precision);
			this.masker = new NumberMasker({
				type: 'number'
			});			
			this.create()
		},
		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			var formatValue = this.formater.format(this.trueValue)
			this.showValue = this.masker.format(formatValue).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = this.formater.format(value)
			this.showValue = this.masker.format(this.trueValue).value
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(FloatComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue
			this.element.value = showValue
		},
		getShowValue: function() {
			return this.showValue
		},
		/**
		 * 修改精度
		 * @param {Integer} precision
		 */
		setPrecision: function(precision){
			if (this.precision == precision) return
			this.precision =precision
			this.formater = new $.NumberFormater(this.precision)
 		},

		Statics: {
			compName: 'float'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(FloatComp)

;
	var Grid = function(element, options, viewModel) {
		// 初始options中包含grid的属性设置，还需要增加dataSource、columns、transMap以及事件处理
		var oThis = this;
		this.dataTable = _getJSObject(viewModel, options["data"]);
		this.element = element;
		this.$element = $(element);
		this.editComponentDiv = {};
		this.editComponent = {};
		this.id = options['id'];
		this.gridOptions = options;
		/*
		 * 处理column参数  
		 * div子项div存储column信息
		 */
		var columns = [];
		$("div",this.$element).each(function() {
			if(typeof(JSON) == "undefined")
				var column = eval("(" + $(this).attr('options')+")");
			else
				var column = JSON.parse($(this).attr('options'));
			// 处理精度，以dataTable的精度为准
			
			/*处理editType*/
			var eType = _getTrueValue(viewModel, column.editType);
			var rType = _getTrueValue(viewModel, column.renderType);
			var eOptions = {};
			if(column.editOptions){
				if(typeof(JSON) == "undefined")
					var eOptions = eval("(" + column.editOptions +")");
				else
					var eOptions = JSON.parse(column.editOptions);
			}
			// 默认按照string处理
			if(eType == '')
				eType = 'string';
			if(eType == 'string' || eType == 'checkbox' || eType == 'combobox' || eType == 'radio' || eType == 'float' || eType == 'datetime'|| eType == 'date'){
				if(eType == 'string'){
					var compDiv = $('<input type="text" style="width:100%;height:34px;margin:0px;min-height:20px;font-size:12px;color:#444">');
					var comp = new $.compManager.plugs.string(compDiv[0],eOptions);
					
				}else if(eType == 'checkbox'){
					var compDiv = $('<input type="checkbox">');
					var comp = new $.compManager.plugs.checkbox(compDiv[0],eOptions);
					
				}else if(eType == 'combobox'){
					var compDiv = $('<input type="text">');
					var comp = new $.compManager.plugs.combobox(compDiv[0],eOptions);
					
				}else if(eType == 'radio'){
					var compDiv = $('<input type="text">');
					var comp = new $.compManager.plugs.radio(compDiv[0],eOptions);
				}else if(eType == 'float'){
					var compDiv = $('<input type="text">');
					var comp = new $.compManager.plugs.float(compDiv[0],eOptions);
				}else if(eType == 'datetime'){
					var compDiv = $('<input type="text">');
					var comp = new $.compManager.plugs.datetime(compDiv[0],eOptions);
				}else if(eType == 'date'){
					/*var compDiv = $('<input type="text" style="width:100%;height:34px;margin:0px;min-height:20px;font-size:12px;color:#444">');
					var comp = new $.compManager.plugs.date(compDiv[0],eOptions);*/
				}
				
				/*if(column.editType == 'datetime'){
				column.editType = function(obj){
					var htmlStr = '<div class="input-group date" style="width:100%;" data-provide="datetimepicker" >';
					htmlStr += '<input type="text" class="form-control" style="min-height:20px;height:100%;">';
					htmlStr += '<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>';
					htmlStr += '</span>';
					htmlStr += '</div>';
					
					obj.element.innerHTML = htmlStr;
					$('input',$(obj.element)).on('blur',function(){
						$(obj.rowObj).attr(obj.field,this.value);
					});
				};
			}else if(column.editType == 'date'){
				column.editType = function(obj){
					var htmlStr = '<div class="input-group date" style="width:100%;" data-provide="datetimepicker" data-options="{&quot;format&quot;:&quot;YYYY-MM-DD&quot;}">';
					htmlStr += '<input type="text" class="form-control" style="min-height:20px;height:100%;">';
					htmlStr += '<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>';
					htmlStr += '</span>';
					htmlStr += '</div>';
					
					obj.element.innerHTML = htmlStr;
					$('input',$(obj.element)).on('blur',function(){
						$(obj.rowObj).attr(obj.field,this.value);
					});
				};
			}else */
				oThis.editComponentDiv[column.field] = compDiv;
				oThis.editComponent[column.field] = comp;
				
				
				column.editType = function(obj){
					obj.element.innerHTML = '';
					var $Div = $('<div class="u-grid-content-td-div" style="margin:0px;"></div>');
					$(obj.element).append($Div);
					$Div.append(oThis.editComponentDiv[column.field]);
					
					oThis.editComponent[column.field].modelValueChange(obj.value);
					// 添加监听 数据改变时
					oThis.editComponent[column.field].on('valueChange',function(value){
//						$(obj.rowObj).attr(obj.field,value);
						obj.gridObj.editValueChange(obj.field,value);
					});
				}
			}else if (typeof eType == 'function'){
				column.editType = eType;
			}
			
			if(rType == 'BooleanRender'){
				column.renderType = function(obj){
					var checkStr = '';
					if(obj.value == 'Y'){
						checkStr = 'checked';
					}
					var htmlStr = '<input type="checkbox" readOnly ' + checkStr +'>'
					obj.element.innerHTML = htmlStr;
				}
			}else if(rType == 'IntegerRender'){
				column.renderType = function(obj){
					
				}
			}else if(rType == 'DecimalRender'){
				column.renderType = function(obj){
					//需要处理精度
				}
			}else if(rType == 'ComboRender'){
				column.renderType = function(obj){
					//需要将key转化为name
				}
			}else if(rType == 'DateRender'){
				//通过grid的dataType为Date format处理
			}else if(rType == 'DateTimeRender'){
				//通过grid的dataType为DateTime format处理
			}else if (typeof rType == 'function'){
				column.renderType =  rType
			}
			
			columns.push(column);	
		});
		this.gridOptions.columns = columns;
		
		
		
		/*
		 * 处理viewModel与grid之间的绑定
		 * 
		 */
		var onRowSelectedFun = this.gridOptions.onRowSelected; 
		// 选中
		this.gridOptions.onRowSelected = function(obj) {
			if(oThis.grid.options.multiSelect){
				oThis.dataTable.addRowsSelect([obj.rowIndex]);
			}else{
				oThis.dataTable.setRowSelect(obj.rowIndex);
			}
			
			if(onRowSelectedFun){
				viewModel[onRowSelectedFun].call(oThis,obj);
			}
		};
		this.dataTable.on($.DataTable.ON_ROW_SELECT, function(event) {
			/*index转化为grid的index*/
			$.each(event.rowIds, function() {
				var index = oThis.grid.getRowIndexByValue('id',this);
				if(index > -1){
					oThis.grid.setRowSelect(parseInt(index));
				}
			});
		});
		
		// 反选
		var onRowUnSelectedFun = this.gridOptions.onRowUnSelected; 
		this.gridOptions.onRowUnSelected = function(obj) {
			oThis.dataTable.setRowUnSelect(obj.rowIndex);
			if(onRowUnSelectedFun){
				viewModel[onRowUnSelectedFun].call(oThis,obj);
			}
		};
		this.dataTable.on($.DataTable.ON_ROW_UNSELECT, function(event) {
			$.each(event.rowIds, function() {
				var index = oThis.grid.getRowIndexByValue('id',this);
				if(index > -1){
					oThis.grid.setRowUnselect(parseInt(index));
				}
			});
		});
		
		// 增行,只考虑viewModel传入grid
//		var onRowInsertFun = this.gridOptions.onRowInsert; 
//		this.gridOptions.onRowInsert = function(obj){
//			dataTable.insertRow(obj.index,obj.row);
//			if(onRowSelectedFun){
//				viewModel[onRowUnSelectedFun].call(grid,grid, row, rowindex);
//			}
//		};
		this.dataTable.on($.DataTable.ON_INSERT, function(event) {
			var gridRows = new Array();
			$.each(event.rows,function(){
				var row = this.data;
				var id = this.rowId;
				var gridRow = {};
				for(var filed in row){
					gridRow[filed] = row[filed].value;
				}
				gridRow['id'] = id;
				gridRows.push(gridRow); 
			})
			oThis.grid.addRows(gridRows,event.index);
		});
		
		this.dataTable.on($.DataTable.ON_UPDATE, function(event) {
			$.each(event.rows,function(){
				var row = this.data;
				var id = this.rowId;
				var gridRow = {};
				for(var filed in row){
					gridRow[filed] = row[filed].value;
				}
				gridRow['id'] = id;
				oThis.grid.updateRow(event.index,gridRow);
			})
			
		});		
		
		// 删除行,只考虑viewModel传入grid
//		this.gridOptions.onRowDelete = function(obj){
//			dataTable.removeRow(obj.index);
//		};
		this.dataTable.on($.DataTable.ON_DELETE, function(event) {
			/*index转化为grid的index*/
			var gridIndexs = new Array();
			$.each(event.rowIds, function() {
				var index = oThis.grid.getRowIndexByValue('id',this);
				gridIndexs.push(index);
			});
			oThis.grid.deleteRows(gridIndexs);
		});
		
		this.dataTable.on($.DataTable.ON_DELETE_ALL, function(event) {
			oThis.grid.setDataSource({})
		});		
		
		// 数据改变
		var onValueChangeFun = this.gridOptions.onValueChange; 
		this.gridOptions.onValueChange = function(obj) {
			var rowId =  $(oThis.grid.dataSourceObj.rows[obj.rowIndex].value).attr("id");
			var rowIndex = oThis.dataTable.getIndexByRowId(rowId);
			if(rowIndex > -1){
				var row = oThis.dataTable.getRow(rowIndex);
				if($.type(obj.newValue) == 'object') {
					row.setValue(obj.field, obj.newValue.trueValue);
					row.setMeta(obj.field, 'display', obj.newValue.showValue);
				} else {
					row.setValue(obj.field,obj.newValue);
				}
			}
			if(onValueChangeFun){
				viewModel[onValueChangeFun].call(oThis,obj);
			}
		};
		this.dataTable.on('valueChange', function(event) {
			var field = event.field,
				rowId = event.rowId,
				oldValue = event.oldValue,
				newValue = event.newValue;
			var rowIndex = oThis.grid.getRowIndexByValue('id',rowId);
			if(rowIndex > -1){
				oThis.grid.updateValueAt(rowIndex,field,newValue);	
			}
		});
		// 加载数据,只考虑viewModel传入grid
		this.dataTable.on($.DataTable.ON_LOAD, function(data) {
			if(data.length > 0){
				var values = new Array();
				
				$.each(data, function() {
					var value = {};
					var dataObj = this.data;
					var id = this.rowId;
					for(var p in dataObj){
						var v = dataObj[p].value;
						value[p] = v;
					} 
					value['id'] = id;
					values.push(value);
				});
				var dataSource = {};
				dataSource['values'] = values;
				oThis.grid.setDataSource(dataSource);
			}
		});
		
		
		// 创建grid
		this.grid = $(element).grid(this.gridOptions);
		this.grid.dataTable = this.dataTable
		
		//如果先插入数据再创建grid需要处理 load
		var data = this.dataTable.rows._latestValue; 
		if(data.length > 0){
			var values = new Array();
				
			$.each(data, function() {
				var value = {};
				var dataObj = this.data;
				var id = this.rowId;
				for(var p in dataObj){
					var v = dataObj[p].value;
					value[p] = v;
				} 
				value['id'] = id;
				values.push(value);
			});
			var dataSource = {};
			dataSource['values'] = values;
			oThis.grid.setDataSource(dataSource);
		}
		// 选中行
		var selectIndexs = this.dataTable.getSelectedIndexs();
		if(selectIndexs.length > 0){
			$.each(selectIndexs, function() {
				oThis.grid.setRowSelect(this);	
			});
		}
		
		return this;
	}
	
	
	var _getTrueValue = function(viewModel, val){
		if (!val) return val
		if (typeof viewModel[val] == 'function')
			return viewModel[val]
		else if (typeof window[val] == 'function')
			return window[val]
		else if (val.indexOf('.') != -1){
			var func = _getJSObject(viewModel, val)
			if (typeof func == 'function') return func
			func = _getJSObject(window, val)
			if (typeof func == 'function') return func
		}
		return val
	}
	
	var _getJSObject = function(parent, names) {
			if(!names) {
				return;
			}
			var nameArr = names.split('.')
			var obj = viewModel
			for (var i = 0; i < nameArr.length; i++) {
				obj = obj[nameArr[i]]
				if (!obj) return null
			}
			return obj
		}	

	//	Grid.fn = Grid.prototype

	//	Grid.fn

	Grid.getName = function() {
		return 'grid'
	}
	

	var _getJSObject = function (viewModel, names){
		if(!names) {
			return;
		}
		var nameArr = names.split('.')
		var obj = viewModel
		for (var i= 0; i< nameArr.length; i++){
			obj = obj[nameArr[i]]
		}
		return obj
	}


	if ($.compManager)
		$.compManager.addPlug(Grid)

;
	var Foreach = function(document, options, viewModel) {
		this.dataTable = _getJSObject(viewModel, options["data"])
		this.document = document
		if (!viewModel._after_foreach_add)
			viewModel._after_foreach_add = _afterRender
		$(this.document).attr('data-bind', 'foreach:{data: '+  options["data"] +'.rows, afterRender:_after_foreach_add}')
		$(this.document).find('[u-meta]').each(function(){
			$(this).attr('data-bind', "attr:{'mark':'a'}")
		})
	}

	Foreach.getName = function() {
		return 'foreach'
	}
	
	var _getJSObject = function (viewModel, names){
		if(!names) {
			return;
		}
		var nameArr = names.split('.')
		var obj = viewModel
		for (var i= 0; i< nameArr.length; i++){
			obj = obj[nameArr[i]]
		}
		return obj
	}
	
	var _afterRender = function(elements, data){
		for (var i= 0; i<elements.length; i++){
			if ($(elements[i]).attr('u-meta')){
				if ($(elements[i]).data('u-meta')) return
				var options = JSON.parse($(elements[i]).attr('u-meta'))
				if(options && options['type']) {
					var comp = $.compManager._createComp(elements[i], options, data)
					if (comp)
						$(elements[i]).data('u-meta', comp)
				}					
			}
			else{
				$(elements[i]).find('[u-meta]').each(function() {
					if ($(this).data('u-meta')) return
					var options = JSON.parse($(this).attr('u-meta'))
					if(options && options['type']) {
						var comp = $.compManager._createComp(this, options, data)
						if (comp)
							$(this).data('u-meta', comp)
					}				
				})
			}
		}
	}

	if ($.compManager)
		$.compManager.addPlug(Foreach)

;
	var Combobox = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			Combobox.superclass.initialize.apply(this, arguments)
			this.datasource = this._getJSObject(viewModel, options['datasource'])
			if(options['onselect'])
				this.onSelect = this._getJSObject(viewModel, options['onselect'])
			if ($(this.element).children().length > 0)
				this.comboEle = $(this.element).find('div')[0]
			else
				this.comboEle = this.element
			this.create()	
			$(this.comboEle).attr('contenteditable', true)
			this.comp = $(this.comboEle).Combobox({
				dataSource: this.datasource,
				onSelect: function(item) {
					self.setValue(item.pk)
					if (self.onSelect) {
						self.onSelect(item)
					}
				}
			})
		},
		modelValueChange: function(value) {
			if (this.slice) return
//			value = value || ""
			this.trueValue = value
			$(this.comboEle).val(value);			

		},
		setValue: function(value) {
			this.trueValue = value
			$(this.comboEle).val(value);			
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(Combobox.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue: function() {
			return this.trueValue
		},

		Statics: {
			compName: 'combo'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(Combobox)

;

	var StringComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			StringComp.superclass.initialize.apply(this, arguments)
			this.create()
			if (this.element.nodeName == 'INPUT') {
				$(this.element).focusin(function(e) {
					self.setShowValue(self.getValue())
				})
				$(this.element).blur(function(e) {
					self.setValue(self.element.value)
				})
			}			
		},

		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			this.showValue = value//this.masker.format(value).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = value//this.formater.format(value)
			this.showValue = value//this.masker.format(value).value
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(StringComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue
			this.element.value = showValue
		},
		getShowValue: function() {
			return this.showValue
		},

		Statics: {
			compName: 'string'
		}
	})
	
	$.StringComp = StringComp
	if ($.compManager)
		$.compManager.addPlug(StringComp)

;

	var CheckboxComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			CheckboxComp.superclass.initialize.apply(this, arguments)
			this.create()
    		$(this.element).on('click',function(){
    			var val = this.checked ? 'Y' : 'N'
    			self.setValue(val)
    		})
		},

		modelValueChange: function(val) {
			if (this.slice) return
			val = val || ""
			this.trueValue = val
			if (val == 'Y' || val == 'true') {
				this.showValue = true;
			} else if (val == 'N' || val == 'false') {
				this.showValue = false;
			} else {
				this.showValue = false;
			}
			this.setShowValue(this.showValue)
		},
		setValue: function(val) {
			this.trueValue = val
			if (val == 'Y' || val == 'true') {
				this.showValue = true;
			} else if (val == 'N' || val == 'false') {
				this.showValue = false;
			} else {
				this.showValue = false;
			}
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(CheckboxComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue: function() {
			return this.trueValue
		},
		setShowValue: function(showValue) {
			this.showValue = showValue
			this.element.checked = showValue
		},
		getShowValue: function() {
			return this.showValue
		},

		Statics: {
			compName: 'checkbox'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(CheckboxComp)

;
	var DateTime = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			DateTime.superclass.initialize.apply(this, arguments)
			this.format = options['format']
			this.formater = new $.DateFormater(this.format);
			this.masker = new DateTimeMasker({
				format: "yyyy-MM-dd hh:mm:ss",
				metaType: "DateTimeFormatMeta",
				speratorSymbol: "-"
			});			
			
			this.create()
			this.comp = $(this.element).datetimepicker(this.options)		
		},
		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			this.showValue = value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = value
			this.setShowValue(this.trueValue) //TODO fomat格式			
			this.slice = true
			this.setModelValue(value)
			this.slice = false
			this.trigger(DateTime.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue
			this.element.value = showValue
		},
		getShowValue: function() {
			return this.showValue
		},

		Statics: {
			compName: 'datetime'
		}
	})

	var DateComp = DateTime.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			DateTime.superclass.initialize.apply(this, arguments)
			this.format = options['format']
			this.formater = new $.DateFormater(this.format);
			this.masker = new DateMasker({
				format: this.format
			});			
			
			this.create()
			this.comp = $(this.element).datetimepicker(this.options)		
		},
//		modelValueChange: function(value) {
//			if (this.slice) return
//			value = value || ""
//			this.trueValue = value
//			this.showValue = value
//			this.setShowValue(this.showValue)
//		},
//		setValue: function(value) {
//			this.slice = true
//			this.setModelValue(value)
//			this.slice = false
//			this.trigger(DateTime.EVENT_VALUE_CHANGE, this.trueValue)
//		},
//		getValue : function() {
//			return this.trueValue
//		},
//		setShowValue : function(showValue) {
//			this.showValue = showValue
//			this.element.value = showValue
//		},
//		getShowValue: function() {
//			return this.showValue
//		},

		Statics: {
			compName: 'date'
		}
	})

	if ($.compManager){
		$.compManager.addPlug(DateTime)
		$.compManager.addPlug(DateComp)
	}	

;

	var RadioComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			RadioComp.superclass.initialize.apply(this, arguments)
			this.create()
			$(this.element).parent().find(":radio[name='" + this.element.name + "']").each(function() {
				$(this).on('click', function() {
					if (this.checked) {
						self.setValue(this.value)
					}
				})
			})
		},

		modelValueChange: function(val) {
			if (this.slice) return
			val = val || ""
			this.trueValue = val
			$(this.element).parent().find(":radio[name='" + self.document.name + "']").each(function() {
				if (this.value == val) {
					this.checked = true;
				}
			})
		},
		setValue: function(val) {
			this.trueValue = val
			$(this.element).parent().find(":radio[name='" + self.document.name + "']").each(function() {
				if (this.value == val) {
					this.checked = true;
				}
			})
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(RadioComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue: function() {
			return this.trueValue
		},

		Statics: {
			compName: 'radio'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(RadioComp)

;

	var IntegerComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			IntegerComp.superclass.initialize.apply(this, arguments)
//			this.formater = new $.NumberFormater();
//			this.masker = new NumberMasker({
//				type: 'number'
//			});
			this.create()
			
		},
		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			this.showValue = value //this.masker.format(value).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = value //this.formater.format(value)
			this.showValue = value //this.masker.format(value).value
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(FloatComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue
			this.element.value = showValue
		},
		getShowValue: function() {
			return this.showValue
		},

		Statics: {
			compName: 'integer'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(IntegerComp)

;

	var Pagination = function(element, options, viewModel) {
		var oThis = this;
		this.dataTable = _getJSObject(viewModel, options["data"]);
		this.element = element;
		this.$element = $(element)
		
		this.pagination = this.$element.pagination(options);
		this.pagination.dataTable = this.dataTable
		
		this.$element.on('pageChange', function(event,pageIndex) {
			oThis.dataTable.cacheCurrentPage()
			viewModel['pageChange'](pageIndex-1)			
		})
		
	}
	
	Pagination.getName = function() {
		return 'pagination'
	}

	if ($.compManager)
		$.compManager.addPlug(Pagination)

;
	/**
	 * Class Editor
	 * @param {[type]} document  [description]
	 * @param {[type]} options   [description]
	 * @param {[type]} viewModel [description]
	 */
	var Editor = $.BaseComponent.extend({
		initialize: function(element, options, viewModel) {

			this.element = element;
			// this.id = options['id'];
			this.options = options;
			this.viewModel = viewModel;
			this.render(this.options);
		},
		
		render: function(data){
			var cols = data.cols || 80;
			var rows = data.rows || 10;

			var tpls = '<textarea cols="' + cols + '" id="editor" name="editor" rows="' + rows + '"></textarea>';
			
			this.element.append(tpls);
			$( '#editor' ).ckeditor(); 
		},

		getContent: function(){
			return $( '#editor' ).html();
		},

		setContent: function(txt){
			$( '#editor' ).html(txt);
		},

		Statics: {
			compName: 'editor'
		}
	});	

	// add plugin to compManager.
	if ($.compManager)
		$.compManager.addPlug(RadioComp);

	// global use.
	$.Editor = Editor;

;	
//+ function($, exports) {
	'use strict';
	var IWEB_VERSION = "1.0.0"
	var IWEB_THEME = "i_theme"
	var IWEB_LOCALE = "i_locale"
	var IWEB_USERCODE = "usercode"
	var LOG_Level = "ill"
	var systemTimeZoneOffset = -480; //TODO 目前默认即取东八区 -60*8 = -480
	var IWEB_CONTEXT_PATH = "contextpath"
	var iweb = {
		version: IWEB_VERSION
	};
	
	if (!window.getCookie){
		window.getCookie = function(sName) {
			var sRE = "(?:; )?" + sName + "=([^;]*);?";
			var oRE = new RegExp(sRE);
	
			if (oRE.test(document.cookie)) {
				return decodeURIComponent(RegExp["$1"]);
			} else
				return null;
		};			
	}
	
	/**
	 * 创建一个带壳的对象,防止外部修改
	 * @param {Object} proto
	 */
	window.createShellObject = function(proto) {
		var exf = function() {}
		exf.prototype = proto;
		return new exf();
	}	


	// 导出到window对象中

	//core context
	var f = function() {
		// 从Cookie中获取初始化信息
		var environment = {}

		/**
		 * client attributes
		 */
		var clientAttributes = {};
		
		var sessionAttributes = {};

		var fn = {}

		/**
		 * 获取环境信息
		 * @return {environment}
		 */
		fn.getEnvironment = function() {
			return createShellObject(environment);
		}

		/**
		 * 获取客户端参数对象
		 * @return {clientAttributes}
		 */
		fn.getClientAttributes = function() {
			var exf = function() {}
			return createShellObject(clientAttributes);
		}


		fn.setContextPath = function(contextPath){
			return 	environment[IWEB_CONTEXT_PATH] = contextPath
		}
		fn.getContextPath = function(contextPath){
			return 	environment[IWEB_CONTEXT_PATH] 
		}
		/**
		 * 设置客户端参数对象
		 * @param {Object} k 对象名称
		 * @param {Object} v 对象值(建议使用简单类型)
		 */
		fn.setClientAttribute = function(k, v) {
			clientAttributes[k] = v;
		}
		/**
		 * 获取会话级参数对象
		 * @return {clientAttributes}
		 */
		fn.getSessionAttributes = function() {
			var exf = function() {}
			return createShellObject(sessionAttributes);
		}

		/**
		 * 设置会话级参数对象
		 * @param {Object} k 对象名称
		 * @param {Object} v 对象值(建议使用简单类型)
		 */
		fn.setSessionAttribute = function(k, v) {
			sessionAttributes[k] = v;
			setCookie("ISES_"+k, v);
		}

		/**
		 * 移除客户端参数
		 * @param {Object} k 对象名称
		 */
		fn.removeClientAttribute = function(k) {
			clientAttributes[k] = null;
			execIgnoreError(function() {
				delete clientAttributes[k];
			})
		}

		/**
		 * 获取根组件
		 */
		fn.getRootComponent = function() {
			return this.rootComponet;
		}

		/**
		 * 设置根组件
		 * @param {Object} component
		 */
		fn.setRootComponent = function(component) {
			this.rootComponet = component
		}

		/**
		 * 获取主题名称
		 */
		fn.getTheme = function() {
			return this.getEnvironment().theme
		}

		/**
		 * 获取地区信息编码
		 */
		fn.getLocale = function() {
			return this.getEnvironment().locale
		}

		/**
		 * 收集环境信息(包括客户端参数)
		 * @return {Object}
		 */
		fn.collectEnvironment = function() {
			var _env = this.getEnvironment();
			var _ses = this.getSessionAttributes();
			 
			for(var i in clientAttributes){
				_ses[i] = clientAttributes[i];
			}
			_env.clientAttributes =_ses;
			return _env
		}

		fn.changeTheme = function(theme) {
			environment.theme = theme;
			setCookie(IWEB_THEME, theme)
			$(document).trigger("themeChange");
		}
		fn.changeLocale = function(locale) {
			econsoleconsolenvironment.locale = locale;
			setCookie(IWEB_LOCALE, locale)
			$(document).trigger("localeChange");
		}


		/**
		 * 注册系统时间偏移量
		 * @param {Object} offset
		 */
		fn.registerSystemTimeZoneOffset = function(offset) {
			systemTimeZoneOffset = offset;
		}

		/**
		 * 获取系统时间偏移量
		 */
		fn.getSystemTimeZoneOffset = function() {
			return systemTimeZoneOffset;
		};
		var device = {
			Android: function() {
				return /Android/i.test(navigator.userAgent);
			},
			BlackBerry: function() {
				return /BlackBerry/i.test(navigator.userAgent);
			},
			iOS: function() {
				return /iPhone|iPad|iPod/i.test(navigator.userAgent);
			},
			Windows: function() {
				return /IEMobile/i.test(navigator.userAgent);
			},
			any: function() {
				return (this.Android() || this.BlackBerry() || this.iOS() || this.Windows());
			},
			pc: function() {
				return !this.any();
			},
			Screen: {
				size: noop,
				direction: noop

			}
		}
		fn.getDevice = function() {
			return device;
		}


		environment.theme = getCookie(IWEB_THEME)
		environment.locale = getCookie(IWEB_LOCALE)
		environment.timezoneOffset = (new Date()).getTimezoneOffset()
		environment.usercode = getCookie(IWEB_USERCODE)
		//init session attribute
		document.cookie.replace(/ISES_(\w*)=([^;]*);?/ig,function(a,b,c){
			sessionAttributes[b] = c;
		})

		var Core = function() {}
		Core.prototype = fn;

		iweb.Core = new Core();

	}
	
	f();


	//console logger
	(function() {
		var consoleLog;
		var level = getCookie(IWEB_USERCODE)
		if (typeof Log4js != "undefined") {
			consoleLog = new Log4js.Logger("iweb");
			consoleLog.setLevel(Log4js.Level.ERROR);
			var consoleAppender = new Log4js.ConsoleAppender(consoleLog, true);
			consoleLog.addAppender(consoleAppender);
		} else {
			consoleLog = {
				LEVEL_MAP: {
					"OFF": Number.MAX_VALUE,
					"ERROR": 40000,
					"WARN": 30000,
					"INFO": 20000,
					"DEBUG": 10000,
					"TRACE": 5000,
					"ALL": 1
				},
				level: 40000,
				setLevel: function(level) {
					if (level) {
						var l = this.LEVEL_MAP[level.toUpperCase()]
						if (l) {
							this.level = l;
						}
					}

				},
				isDebugEnabled: function() {
					return (this.LEVEL_MAP.DEBUG >= this.level && console)
				},
				isTraceEnabled: function() {
					return (this.LEVEL_MAP.TRACE >= this.level && console)
				},
				isInfoEnabled: function() {
					return (this.LEVEL_MAP.INFO >= this.level && console)
				},
				isWarnEnabled: function() {
					return (this.LEVEL_MAP.WARN >= this.level && console)
				},
				isErrorEnabled: function() {
					return (this.LEVEL_MAP.ERROR >= this.level && console)
				},
				debug: function() {
					if (this.isDebugEnabled()) {
						console.debug.call(console, arguments)
					}
				},
				warn: function() {
					if (this.isWarnEnabled()) {
						console.debug.call(console, arguments)
					}
				},
				info: function() {
					if (this.isInfoEnabled()) {
						console.debug.call(console, arguments)
					}
				},
				trace: function() {
					if (this.isTraceEnabled()) {
						console.debug.call(console, arguments)
					}
				},
				error: function() {
					if (this.isErrorEnabled()) {
						console.debug.call(console, arguments)
					}
				}
			}
		}
		consoleLog.setLevel(level);
		iweb.log = consoleLog;
		iweb.debugMode = false;
	})();

	window.iweb = iweb;

	var noop = function() {}
	
;

	
	var App = function(){
		this.dataTables = {}
//		this.comps = {}
	}
	
	App.fn = App.prototype
	
	App.fn.init = function(viewModel, element){
		var self = this
		this.element = element || document.body
		$(this.element).find('[u-meta]').each(function() {
			if ($(this).data('u-meta')) return
			if ($(this).parents('[u-meta]').length > 0) return 
			var options = JSON.parse($(this).attr('u-meta'))
			if(options && options['type']) {
				if (self.adjustFunc)
					self.adjustFunc.call(self, options);
				var comp = $.compManager._createComp(this, options, viewModel)
				if (comp)
//					this.comps[comp.getId()] = comp
					$(this).data('u-meta', comp)
			}
		})	
		_getDataTables(this, viewModel)	
//		ko.cleanNode(this.element)
		try{
			ko.applyBindings(viewModel, this.element)
		}catch(e){
			iweb.log.error('already bindings!')
		}
	}
	
	App.fn.setAdjustMetaFunc = function(adjustFunc){
		this.adjustFunc = adjustFunc
	}
	
	App.fn.addDataTable = function(dataTable){
		this.dataTables[dataTable.id] = dataTable
		return this
	}
	App.fn.getDataTable = function(id){
		return this.dataTables[id]
	}
	
	App.fn.getDataTables = function(){
		return this.dataTables
	}
	
	App.fn.getComp = function(compId){
		var returnComp = null;
		$(this.element).find('[u-meta]').each(function() {
			if ($(this).data('u-meta')){
				var comp = $(this).data('u-meta')
				if (comp.id == compId){
					returnComp = comp;
					return false;
				}
				    
			}	
		})
		return returnComp;
	}
	
	/**
	 * 获取某区域中的所有控件
	 * @param {object} element
	 */
	App.fn.getComps = function(element){
		element = element ? element : this.element
		var returnComps = [];
		$(element).find('[u-meta]').each(function() {
			if ($(this).data('u-meta')){
				var comp = $(this).data('u-meta')
				if (comp)
					returnComps.push(comp);
			}	
		})
		return returnComps;		
	}
	
	/**
	 * 根据类型获取控件
	 * @param {String} type
	 * @param {object} element
	 */
	App.fn.getCompsByType = function(type,element){
		element = element ? element : this.element
		var returnComps = [];
		$(element).find('[u-meta]').each(function() {
			if ($(this).data('u-meta')){
				var comp = $(this).data('u-meta')
				if (comp && comp.type == type)
					returnComps.push(comp);
			}	
		})
		return returnComps;			
	}
	
	
	App.fn.getEnvironment = function(){
		return window.iweb.Core.collectEnvironment()
	}
	
	App.fn.setClientAttribute = function(k,v){
		window.iweb.Core.setClientAttribute(k,v)
	}
	
	App.fn.getClientAttribute = function(k){
		window.iweb.Core.getClientAttributes()[k]
	}
	
	App.fn.serverEvent = function(){
		return new ServerEvent(this)
	}
	
	App.fn.ajax = function(params){
		params = this._wrapAjax(params) 
		$.ajax(params)		
	}
	
	App.fn._wrapAjax = function(params){
		var self = this
		var orignSuccess =  params.success
		var orignError =  params.error
		var deferred =  params.deferred;
		if(!deferred || !deferred.resolve){
			deferred = {resolve:function(){},reject:function(){}}
		} 
		params.success = function(data,state,xhr){
			if(processXHRError(self,data,state,xhr)){
				orignSuccess.call(null, data)
				self._successFunc(data, deferred)
			}else{
				deferred.reject();
			}
		}
		params.error=function(data,state,xhr){
			if(processXHRError(self,data,state,xhr)){
				orignError.call(null, data)
				self._successFunc(data, deferred)
			}else{
				deferred.reject();
			}
		}
		if(params.data)
			params.data.environment=ko.toJSON(window.iweb.Core.collectEnvironment());
		else
			params.data = {environment:ko.toJSON(window.iweb.Core.collectEnvironment())}
		return params		
	}
	
	App.fn._successFunc = function(data, deferred){
		deferred.resolve();
	}
	
	
//	window.processXHRError  = function (rsl,state,xhr) {
//		if(xhr.getResponseHeader && xhr.getResponseHeader("X-Error")){
//			$.showMessageDialog({type:"info",title:"提示",msg: rsl["message"],backdrop:true});
//			if(rsl["operate"]){
//				eval(rsl["operate"]);
//			}
//			return false;
//		}
//		return true;
//	};		
//	
	App.fn.setUserCache = function(key,value){
		var userCode = this.getEnvironment().usercode;
		if(!userCode)return;
		localStorage.setItem(userCode+key,value);
	}
	
	App.fn.getUserCache = function(key){
		var userCode = this.getEnvironment().usercode;
		if(!userCode)return;
		return localStorage.getItem(userCode+key);
	}
	
	App.fn.removeUserCache = function(key){
		var userCode = this.getEnvironment().usercode;
		if(!userCode)return;
		localStorage.removeItem(userCode+key);
	}
	
	App.fn.setCache = function(key,value){
		localStorage.setItem(key,value);
	}
	
	App.fn.getCache = function(key){
	   return localStorage.getItem(key);
	}
	
	App.fn.removeCache = function(key){
		localStorage.removeItem(key)
	}
	
	App.fn.setSessionCache = function(key,value){
		sessionStorage.setItem(key,value)
	}
	
	App.fn.getSessionCache = function(key){
		return sessionStorage.getItem(key)
	}
	
	App.fn.removeSessionCache = function(key){
		sessionStorage.removeItem(key)
	}
	
	App.fn.setEnable = function(enable){
		$(this.element).find('[u-meta]').each(function() {
			if ($(this).data('u-meta')){
				var comp = $(this).data('u-meta')
				if (comp.setEnable)
					comp.setEnable(enable)
			}	
		})		
	}
	
	var ServerEvent = function(app){
		this.app = app
		this.datas = {}			
		this.params = {}
		this.event = null
		this.ent = window.iweb.Core.collectEnvironment()
		if (window.peko && iweb.debugMode == false)
			this.compression = true
	}
	
	ServerEvent.DEFAULT = {
		async: true,
		singleton: true,
		url: (iweb.Core.getContextPath() || '/iwebap') + '/evt/dispatch'
	}
	
	ServerEvent.fn = ServerEvent.prototype
	
	ServerEvent.fn.addDataTable = function(dataTableId, rule){
		var dataTable = this.app.getDataTable(dataTableId)
		this.datas[dataTableId] = dataTable.getDataByRule(rule)
		return this
	}
	
	ServerEvent.fn.setCompression = function(compression){
		if (!window.peko && compression == true)
			iweb.log.error("can't compression, please include  peko!")
		else	
			this.compression = compression
	}
	
	/**
	 * 
	 * @param {Object} dataTabels
	 * ['dt1',{'dt2':'all'}]
	 */
	ServerEvent.fn.addDataTables = function(dataTables){
		for(var i = 0; i<dataTables.length; i++){
			var dt = dataTables[i]
			if (typeof dt == 'string')
				this.addDataTable(dt)
			else{
				for (key in dt)
					this.addDataTable(key, dt[key])
			}
		}
		return this
	}
	
	ServerEvent.fn.addAllDataTables = function(rule){
		var dts = this.app.dataTables 
		for (var i = 0; i< dts.length; i++){
			this.addDataTable(dts[i].id, rule)
		}
	}
	
	
	ServerEvent.fn.addParameter = function(key,value){
		this.params[key] = value
		return this
	}
	
	ServerEvent.fn.setEvent = function(event){
		if (true)
			this.event = event
		else
			this.event = _formatEvent(event)
		return this	
	}
	
	var _formatEvent = function(event){
		return event
	}
	
	
//	app.serverEvent().fire({
//		ctrl:'CurrtypeController',
//		event:'event1',
//		success:
//		params:
//	})	
	ServerEvent.fn.fire = function(p){
		var self = this
//		params = $.extend(ServerEvent.DEFAULT, params);
		var data = this.getData()
		data.parameters = ko.toJSON(this.params)
		var params = {
			type:"POST",
			data: p.params || {},
			url: p.url || ServerEvent.DEFAULT.url,
			async: p.async || ServerEvent.DEFAULT.async,
			singleton: p.singleton || ServerEvent.DEFAULT.singleton,
			success: p.success,
			error: p.error
		}
		params.data.ctrl = p.ctrl
		params.data.method = p.method
        if (this.event)
			params.data.event = ko.toJSON(this.event)
		var preSuccess = params.preSuccess || function(){}	
		var orignSuccess =  params.success || function(){}
		var orignError = params.error || function(){}
		this.orignError = orignError
		var deferred =  params.deferred;
		if(!deferred || !deferred.resolve){
			deferred = {resolve:function(){},reject:function(){}}
		} 
		params.success = function(data,state,xhr){
			if(processXHRError(self, data,state,xhr)){
				preSuccess.call(null, data)
				self._successFunc(data, deferred)
				orignSuccess.call(null, data.custom)
				deferred.resolve();
			}else{
				deferred.reject();
			}
		}
		params.error=function(data,state,xhr){
			if(processXHRError(self, data,state,xhr)){
				orignError.call(null, data.custom)
//				self._successFunc(data, deferred)
			}else{
				deferred.reject();
			}
		}
		params.data = $.extend(params.data,data);
		$.ajax(params)
		
	}
	
	ServerEvent.fn.getData = function(){
		var envJson = ko.toJSON(this.app.getEnvironment()),
			datasJson = ko.toJSON(this.datas);

		if (this.compression){
			envJson = window.peko.gzip(envJson)
			datasjson = window.peko.gzip(datasjson)
		}
		return 	{
			environment: envJson,
			dataTables: datasjson,
			compression: this.compression
		}
	}
	
	ServerEvent.fn._successFunc = function(data, deferred){
		var dataTables = data.dataTables
		var dom = data.dom
		if (dom)
			this.updateDom(JSON.parse(dom))
		if (dataTables)
			this.updateDataTables(dataTables, deferred)
	}
	
	ServerEvent.fn.updateDataTables = function(dataTables, deferred){
		for (var key in dataTables){
			var dt = this.app.getDataTable(key)
			if (dt)
				dt.setData(dataTables[key])
		}
	}
	
	ServerEvent.fn.setSuccessFunc = function(func){
		this._successFunc = func
	}
	
	ServerEvent.fn.updateDom = function(){
		$.each( dom, function(i, n){
		 	var vo = n.two
			var $key = $(n.one)
			_updateDom($key, vo)
		});
	}
	
	function _updateDom($key, vos){
		for (var i in vos){
			var vo = vos[i]
			for (var key in vo){
				var props = vo[key]
				if (key == 'trigger'){
					$key.trigger(props[0])	
				}
				else{
					if ($.isArray(props)){
						$.each(props, function(i, n){
						  	$key[i](n)		
						});
					}
					else
						try{
							$key[i](vo)
						}catch(error){
							$key[i](vo[i])
						}
				}
			}
		}
	}
		
	var processXHRError  = function (self, rsl,state,xhr) {
		if(typeof rsl ==='string')
			rsl = JSON.parse(rsl)
		if(xhr.getResponseHeader && xhr.getResponseHeader("X-Error")){
			if (self.orignError)
				self.orignError.call(self,rsl,state,xhr)
			else{
				$.showMessageDialog({type:"info",title:"提示",msg: rsl["message"],backdrop:true});
				if(rsl["operate"]){
					eval(rsl["operate"]);
				}
				return false;
			}
		}
		return true;
	};	
	
	$.createApp = function(){
		var app = new App()
		return app
	}

	var _getDataTables = function(app, viewModel){
		for(var key in viewModel){
			if (viewModel[key] instanceof $.DataTable){
				viewModel[key].id = key
				app.addDataTable(viewModel[key])
			}	
		}
	}
	
	
;}));