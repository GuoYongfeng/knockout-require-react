( function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define(["jquery", "ko"], factory );
	} else {
		// Browser globals
		factory($ );
	}
}( function($, ko) {

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

	$.Row = Row
	$.DataTable = DataTable

}));
