// + function($) {
// 	"use strict";
	
// 	if($.i18n || i18n) {
// 		var scriptPath = $("script").last().attr("src"),
// 				_temp = scriptPath.substr(0, scriptPath.lastIndexOf('/')),
// 				__FOLDER__ = _temp.substr(0, _temp.lastIndexOf('/'))
// 		window.uuii18n = $.uuii18n = $.extend(true, {}, $.i18n || i18n)
// 		$.uuii18n.init({
// 			getAsync: false,
// 	        ns: { namespaces: ['uui-trans']},
// 	        resGetPath: __FOLDER__ + '/locales/__lng__/__ns__.json' 
// 	    })

// 	    window.trans = $.trans = function(key, dftValue) {
// 			return $.i18n ? $.i18n.t('uui-trans:'+key) : dftValue
// 		}
// 	}
			
	
// }(window.jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';
  $.showMessage = function(op) {
        var msgdiv = $('<div class="alert alert-'+op.type+' alert-dismissible"></div>');
        var closebtn = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        msgdiv.append(closebtn).append(op.msg);
        
        msgdiv.css({'position':'fixed', 'display':'block'});
        if(op.pos) {
          if(op.pos.top && op.pos.left) {
            msgdiv.css({'top':op.pos.top, 'left':op.pos.left});
          } else if(op.pos.top && op.pos.right) {
            msgdiv.css({'top':op.pos.top, 'right':op.pos.right});
          } else if(op.pos.bottom && op.pos.left) {
            msgdiv.css({'bottom':op.pos.bottom, 'left':op.pos.left});
          } else if(op.pos.bottom && op.pos.right) {
            msgdiv.css({'bottom':op.pos.bottom, 'right':op.pos.right});
          } else if(op.pos.top) {
            msgdiv.css({'left':op.pos.left, 'top':10});
          } else if(op.pos.bottom) {
            msgdiv.css({'bottom':op.pos.bottom, 'left':10});
          } else if(op.pos.left) {
            msgdiv.css({'left':op.pos.left, 'top':10});
          } else if(op.pos.right) {
            msgdiv.css({'right':op.pos.right, 'top':10});
          }
        } else {
          msgdiv.css({'bottom':10, 'right':10});
        }
        msgdiv.css('z-index',99);
        setTimeout(function() {
          msgdiv.fadeOut('slow');
        }, 3000);

        $(document.body).append(msgdiv);
    }

    $.showMessageDialog = function(op) {
     var msgdiv = $('<div class="alert alert-'+op.type+' alert-dismissible alert-dialog"></div>');
        var btndiv,headpic='';
		if(op.headpic){
			headpic='<span class="glyphicons glyphicons-warning-sign"></span>'
		}
		 var closebtn = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        var titlediv = $('<h4>'+headpic+op.title+'</h4>');
        var contentdiv = $('<p>'+op.msg+'</p>')
        if(op.type == 'danger' || op.type == 'warning') {
          btndiv = $('<div class="alert-dialog-footer"><div class="col-md-6" ><button type="button" data-role="okbtn" data-dismiss="alert" class="btn btn-danger btn-block">确定</button></div><div class="col-md-6"><button type="button" data-dismiss="alert" data-role="cancelbtn" class="btn btn-default btn-block">取消</button></div></div>');
        } else {
          btndiv = $('<div class="alert-dialog-footer"><div class="col-md-12" ><button type="button" data-role="okbtn" data-dismiss="alert" class="btn btn-primary btn-block ">确定</button></div></div>');
        }

        msgdiv.append(closebtn).append(titlediv).append(contentdiv).append(btndiv);

        if(op.backdrop) {
          //添加遮罩层
          $(document.body).append('<div class="alert-backdrop" role="alert-dialog-backdrop"></div>');
          msgdiv.on('close.bs.alert', function() {
             $('.alert-backdrop[role="alert-dialog-backdrop"]').remove();
          });
        }

        msgdiv.find('[data-role="okbtn"]').on('click.alert.ok', op.okfn);
        
        if(op.cancelfn && typeof op.cancelfn == 'function'){
        	
           msgdiv.find('[data-role="cancelbtn"]').on('click', op.cancelfn);
           msgdiv.find('[aria-hidden="true"]').on('click', op.cancelfn);
        	
        }
       

        msgdiv.css('z-index',99);
       
        $(document.body).append(msgdiv);

    }

    $.showWaiting = function(op) {
      $(document.body).append('<div class="alert alert-waiting"><i class="fa fa-spinner fa-spin"></i></div>')
                      .append('<div class="alert-backdrop" role="waiting-backdrop"></div>');
    }

    $.removeWaiting = function() {
      var tmp;
      (tmp = $('.alert.alert-waiting')).length && tmp.remove();
      (tmp = $('.alert-backdrop[role="waiting-backdrop"]')).length && tmp.remove();
    }


}(jQuery);





+ function($) { 
  $.fn.selectText = function(){
     var doc = document;
     var element = this[0];
     if (doc.body.createTextRange) {
         var range = document.body.createTextRange();
         range.moveToElementText(element);
         range.select();
     } else if (window.getSelection) {
         var selection = window.getSelection();        
         var range = document.createRange();
         range.selectNodeContents(element);
         selection.removeAllRanges();
         selection.addRange(range);
     }
  };
}(jQuery);

//+function( factory ) {
//	if ( typeof define === "function" && define.amd ) {
//
//		// AMD. Register as an anonymous module.
//		define([
//			"jquery"
//		], factory );
//	} else {
//
//		// Browser globals
//		factory( jQuery );
//	}
//}(
+ function($) {
	'use strict';

	//jQuery.autocomplete = function(input, options) {
	//
	//}




	var Autocomplete = function(element, options) {
		this.$input = $(element)
		this.options = $.extend({}, Autocomplete.DEFAULTS, options)
		this.requestIndex = 0
		this.pending = 0
		// Create a link to self
		var me = this;

		// Create jQuery object for input element
		//	var $input = $(input).attr("autocomplete", "off");

		// Apply inputClass if necessary
		if (this.options.inputClass) this.$input.addClass(this.options.inputClass);

		// Create results
		var results = document.createElement("div");
		// Create jQuery object for results
		this.$results = $(results);
		this.$results.hide().addClass(this.options.resultsClass).css("position", "absolute");
		if (this.options.width > 0) this.$results.css("width", this.options.width);

		// Add to body element
		$("body").append(results);

		//	input.autocompleter = me;

		this.timeout = null;
		this.prev = "";
		this.active = -1;
		this.cache = {};
		this.keyb = false;
		this.hasFocus = false;
		this.lastKeyPressCode = null;

		// flush cache
//		this.flushCache();
		this._initSource();

//		// if there is a data array supplied
//		if (this.options.data != null) {
//			var sFirstChar = "",
//				stMatchSets = {},
//				row = [];
//
//			// no url was specified, we need to adjust the cache length to make sure it fits the local data store
//			if (typeof this.options.url != "string") this.options.cacheLength = 1;
//
//			// loop through the array and create a lookup structure
//			for (var i = 0; i < this.options.data.length; i++) {
//				// if row is a string, make an array otherwise just reference the array
//				row = ((typeof this.options.data[i] == "string") ? [this.options.data[i]] : this.options.data[i]);
//
//				// if the length is zero, don't add to list
//				if (row[0].length > 0) {
//					// get the first character
//					sFirstChar = row[0].substring(0, 1).toLowerCase();
//					// if no lookup array for this character exists, look it up now
//					if (!stMatchSets[sFirstChar]) stMatchSets[sFirstChar] = [];
//					// if the match is a string
//					stMatchSets[sFirstChar].push(row);
//				}
//			}
//
//			// add the data items to the cache
//			for (var k in stMatchSets) {
//				// increase the cache size
//				this.options.cacheLength++;
//				// add to the cache
//				this.addToCache(k, stMatchSets[k]);
//			}
//		}

		this.$input.keydown(function(e) {
				// track last key pressed
				me.lastKeyPressCode = e.keyCode;
				switch (e.keyCode) {
					case 38: // up
						e.preventDefault();
						me.moveSelect(-1);
						break;
					case 40: // down
						e.preventDefault();
						me.moveSelect(1);
						break;
					case 9: // tab
					case 13: // return
						if (me.selectCurrent()) {
							// make sure to blur off the current field
							me.$input.get(0).blur();
							e.preventDefault();
						}
						break;
					default:
						me.active = -1;
						if (me.timeout) clearTimeout(me.timeout);
						me.timeout = setTimeout(function() {
							me.onChange();
						}, me.options.delay);
						break;
				}
			})
			.focus(function() {
				// track whether the field has focus, we shouldn't process any results if the field no longer has focus
				me.hasFocus = true;
			})
			.blur(function() {
				// track whether the field has focus
				me.hasFocus = false;
				me.hideResults();
			});

		this.hideResultsNow();


		//  this.update(this.options)
	}

	Autocomplete.DEFAULTS = {
		inputClass: "ac_input",
		resultsClass: "ac_results",
		lineSeparator: "\n",
		cellSeparator: "|",
		minChars: 1,
		delay: 400,
		matchCase: 0,
		matchSubset: 1,
		matchContains: 0,
		cacheLength: 1,
		mustMatch: 0,
		extraParams: {},
		loadingClass: "ac_loading",
		selectFirst: false,
		selectOnly: false,
		maxItemsToShow: -1,
		autoFill: false,
		width: 0,
		source:null,
		select: null
	}

	Autocomplete.fn = Autocomplete.prototype;

	// flush cache
	Autocomplete.fn.flushCache = function() {
		this.cache = {};
		this.cache.data = {};
		this.cache.length = 0;
	};

	Autocomplete.fn._initSource = function() {
		var array, url, me = this;
		if ( $.isArray( this.options.source ) ) {
			array = this.options.source;
			this.source = function( request, response ) {
//				response( $.ui.autocomplete.filter( array, request.term ) );
				response(me.filterData(request.term, array));
			};
		} else if ( typeof this.options.source === "string" ) {
			url = this.options.source;
			this.source = function( request, response ) {
				if ( me.xhr ) {
					me.xhr.abort();
				}
				me.xhr = $.ajax({
					url: url,
					data: request,
					dataType: "json",
					success: function( data ) {
						response( data );
					},
					error: function() {
						response([]);
					}
				});
			};
		} else {
			this.source = this.options.source;
		}
	}
	
	Autocomplete.fn._response = function() {
		var index = ++this.requestIndex;

		return $.proxy(function( content ) {
			if ( index === this.requestIndex ) {
				this.__response( content );
			}

			this.pending--;
			if ( !this.pending ) {
//				this.element.removeClass( "ui-autocomplete-loading" );
			}
		}, this );
	}

	Autocomplete.fn.__response = function( content ) {
		if ( content ) 
//			content = this._normalize( content );
//		}
//		this._trigger( "response", null, { content: content } );
//		if ( !this.options.disabled && content && content.length && !this.cancelSearch ) {
//			this._suggest( content );
//			this._trigger( "open" );
			this.receiveData2(content);
			this.showResults();
//		} else {
//			// use ._close() instead of .close() so we don't cancel future searches
//			this._close();
//		}
	}
	



	Autocomplete.fn.onChange = function() {
		// ignore if the following keys are pressed: [del] [shift] [capslock]
		if (this.lastKeyPressCode == 46 || (this.lastKeyPressCode > 8 && this.lastKeyPressCode < 32)) return this.$results.hide();
		var v = this.$input.val();
		if (v == this.prev) return;
		this.prev = v;
		if (v.length >= this.options.minChars) {
			this.$input.addClass(this.options.loadingClass);
//			this.requestData(v);
			this.pending++;
			this.source( { term: v }, this._response() );
		} else {
			this.$input.removeClass(this.options.loadingClass);
			this.$results.hide();
		}
	};

	Autocomplete.fn.moveSelect = function(step) {
		var lis = $("li", this.$results[0]);
		if (!lis) return;

		this.active += step;

		if (this.active < 0) {
			this.active = 0;
		} else if (this.active >= lis.size()) {
			this.active = lis.size() - 1;
		}

		lis.removeClass("ac_over");

		$(lis[this.active]).addClass("ac_over");
	};

	Autocomplete.fn.selectCurrent = function() {
		var li = $("li.ac_over", this.$results[0])[0];
		if (!li) {
			var $li = $("li", this.$results[0]);
			if (this.options.selectOnly) {
				if ($li.length == 1) li = $li[0];
			} else if (this.options.selectFirst) {
				li = $li[0];
			}
		}
		if (li) {
			this.selectItem(li);
			return true;
		} else {
			return false;
		}
	};

	Autocomplete.fn.selectItem = function(li) {
		var me = this;
		if (!li) {
			li = document.createElement("li");
//			li.extra = [];
			li.selectValue = "";
		}
		var v = $.trim(li.selectValue ? li.selectValue : li.innerHTML);
		this.lastSelected = v;
		this.prev = v;
		this.$results.html("");
		this.$input.val(v);
		this.hideResultsNow();
		if (this.options.select) setTimeout(function() {
			me.options.select(li._item)
		}, 1);
	};

	// selects a portion of the input string
	Autocomplete.fn.createSelection = function(start, end) {
		// get a reference to the input element
		var field = this.$input.get(0);
		if (field.createTextRange) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart("character", start);
			selRange.moveEnd("character", end);
			selRange.select();
		} else if (field.setSelectionRange) {
			field.setSelectionRange(start, end);
		} else {
			if (field.selectionStart) {
				field.selectionStart = start;
				field.selectionEnd = end;
			}
		}
		field.focus();
	};

	// fills in the input box w/the first match (assumed to be the best match)
	Autocomplete.fn.autoFill = function(sValue) {
		// if the last user key pressed was backspace, don't autofill
		if (this.lastKeyPressCode != 8) {
			// fill in the value (keep the case the user has typed)
			this.$input.val(this.$input.val() + sValue.substring(this.prev.length));
			// select the portion of the value not typed by the user (so the next character will erase)
			this.createSelection(this.prev.length, sValue.length);
		}
	};

	Autocomplete.fn.showResults = function() {
		// get the position of the input field right now (in case the DOM is shifted)
		var pos = findPos(this.$input[0]);
		// either use the specified width, or autocalculate based on form element
		var iWidth = (this.options.width > 0) ? this.options.width : this.$input.width();
		// reposition
		if('100%'===this.options.width){
			this.$results.css({
				top: (pos.y + this.$input[0].offsetHeight) + "px",
				left: pos.x + "px"
			}).show();
		}else{
			this.$results.css({
				width: parseInt(iWidth) + "px",
				top: (pos.y + this.$input[0].offsetHeight) + "px",
				left: pos.x + "px"
			}).show();
		}
	};

	Autocomplete.fn.hideResults = function() {
		var me = this;
		if (this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(function() {
			me.hideResultsNow();
		}, 200);
	};

	Autocomplete.fn.hideResultsNow = function() {
		if (this.timeout) clearTimeout(this.timeout);
		this.$input.removeClass(this.options.loadingClass);
		//if (this.$results.is(":visible")) {
			this.$results.hide();
		//}
		if (this.options.mustMatch) {
			var v = this.$input.val();
			if (v != this.lastSelected) {
				this.selectItem(null);
			}
		}
	};

	Autocomplete.fn.receiveData = function(q, data) {
		if (data) {
			this.$input.removeClass(this.options.loadingClass);
			this.$results.html('');

			// if the field no longer has focus or if there are no matches, do not display the drop down
			if (!this.hasFocus || data.length == 0) return this.hideResultsNow();

			//			if ($.u.IS_IE) {
			// we put a styled iframe behind the calendar so HTML SELECT elements don't show through
			//				this.$results.append(document.createElement('iframe'));
			//			}
			this.$results.append(this.dataToDom(data));
			// autofill in the complete box w/the first match as long as the user hasn't entered in more data
			if (this.options.autoFill && (this.$input.val().toLowerCase() == q.toLowerCase())) this.autoFill(data[0][0]);
			this.showResults();
		} else {
			this.hideResultsNow();
		}
	};
	
	Autocomplete.fn.filterData = function(v, items) {
		if (!v) return items;
		var _items = [];
		for (var i =0, count = items.length; i< count; i++){
			var label = items[i].label;
			if (label.indexOf(v) == 0)
				_items.push(items[i]);
		}
		return _items;
	};
	
	
	Autocomplete.fn.receiveData2 = function(items) {
		if (items) {
			this.$input.removeClass(this.options.loadingClass);
			this.$results.html('');

			// if the field no longer has focus or if there are no matches, do not display the drop down
			if (!this.hasFocus || items.length == 0) return this.hideResultsNow();

			//			if ($.u.IS_IE) {
			// we put a styled iframe behind the calendar so HTML SELECT elements don't show through
			//				this.$results.append(document.createElement('iframe'));
			//			}
			this.$results.append(this.dataToDom2(items));
			// autofill in the complete box w/the first match as long as the user hasn't entered in more data
//			if (this.options.autoFill && (this.$input.val().toLowerCase() == q.toLowerCase())) this.autoFill(data[0][0]);
			this.showResults();
		} else {
			this.hideResultsNow();
		}		
	}
	Autocomplete.fn.dataToDom2 = function(items) {
		var ul = document.createElement("ul");
		var num = items.length;
		var me = this;

		// limited results to a max number
		if ((this.options.maxItemsToShow > 0) && (this.options.maxItemsToShow < num)) num = this.options.maxItemsToShow;

		for (var i = 0; i < num; i++) {
			var item = items[i];
			if (!item) continue;
			var li = document.createElement("li");
			if (this.options.formatItem) 
				li.innerHTML = this.options.formatItem(item, i, num);
			else 
				li.innerHTML = item.label;
			li.selectValue = item.label;
			li._item = item;
			ul.appendChild(li);
			$(li).hover(
				function() {
					$("li", ul).removeClass("ac_over");
					$(this).addClass("ac_over");
					me.active = indexOf($("li", ul), $(this).get(0));
				},
				function() {
					$(this).removeClass("ac_over");
				}
			).mousedown(function(e) {
				e.preventDefault();
				e.stopPropagation();
				me.selectItem(this)
			});
		}
		return ul;
	};	

	Autocomplete.fn.parseData = function(data) {
		if (!data) return null;
		var parsed = [];
		var rows = data.split(this.options.lineSeparator);
		for (var i = 0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				parsed[parsed.length] = row.split(this.options.cellSeparator);
			}
		}
		return parsed;
	};

	Autocomplete.fn.dataToDom = function(data) {
		var ul = document.createElement("ul");
		var num = data.length;
		var me = this;

		// limited results to a max number
		if ((this.options.maxItemsToShow > 0) && (this.options.maxItemsToShow < num)) num = this.options.maxItemsToShow;

		for (var i = 0; i < num; i++) {
			var row = data[i];
			if (!row) continue;
			var li = document.createElement("li");
			if (this.options.formatItem) {
				li.innerHTML = this.options.formatItem(row, i, num);
				li.selectValue = row[0];
			} else {
				li.innerHTML = row[0];
				li.selectValue = row[0];
			}
			var extra = null;
			if (row.length > 1) {
				extra = [];
				for (var j = 1; j < row.length; j++) {
					extra[extra.length] = row[j];
				}
			}
			li.extra = extra;
			ul.appendChild(li);
			$(li).hover(
				function() {
					$("li", ul).removeClass("ac_over");
					$(this).addClass("ac_over");
					me.active = indexOf($("li", ul), $(this).get(0));
				},
				function() {
					$(this).removeClass("ac_over");
				}
			).click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				me.selectItem(this)
			});
		}
		return ul;
	};

	Autocomplete.fn.requestData = function(q) {
		var me = this;
		if (!this.options.matchCase) q = q.toLowerCase();
		var data = this.options.cacheLength ? this.loadFromCache(q) : null;
		// recieve the cached data
		if (data) {
			this.receiveData(q, data);
			// if an AJAX url has been supplied, try loading the data now
		} else if ((typeof this.options.url == "string") && (this.options.url.length > 0)) {
			$.get(this.makeUrl(q), function(data) {
				data = me.parseData(data);
				me.addToCache(q, data);
				me.receiveData(q, data);
			});
			// if there's been no data found, remove the loading class
		} else {
			this.$input.removeClass(this.options.loadingClass);
		}
	};

	Autocomplete.fn.makeUrl = function(q) {
		var url = this.options.url + "?q=" + encodeURI(q);
		for (var i in this.options.extraParams) {
			url += "&" + i + "=" + encodeURI(this.options.extraParams[i]);
		}
		return url;
	};

	Autocomplete.fn.loadFromCache = function(q) {
		if (!q) return null;
		if (this.cache.data[q]) return this.cache.data[q];
		if (this.options.matchSubset) {
			for (var i = q.length - 1; i >= this.options.minChars; i--) {
				var qs = q.substr(0, i);
				var c = this.cache.data[qs];
				if (c) {
					var csub = [];
					for (var j = 0; j < c.length; j++) {
						var x = c[j];
						var x0 = x[0];
						if (this.matchSubset(x0, q)) {
							csub[csub.length] = x;
						}
					}
					return csub;
				}
			}
		}
		return null;
	};

	Autocomplete.fn.matchSubset = function(s, sub) {
		if (!this.options.matchCase) s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (i == -1) return false;
		return i == 0 || this.options.matchContains;
	};

	Autocomplete.fn.addToCache = function(q, data) {
		if (!data || !q || !this.options.cacheLength) return;
		if (!this.cache.length || this.cache.length > this.options.cacheLength) {
			this.flushCache();
			this.cache.length++;
		} else if (!this.cache[q]) {
			this.cache.length++;
		}
		this.cache.data[q] = data;
	};

	function findPos(obj) {
		var curleft = obj.offsetLeft || 0;
		var curtop = obj.offsetTop || 0;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
		return {
			x: curleft,
			y: curtop
		};
	}

	function indexOf($element, e) {
		for (var i = 0; i < $element.length; i++) {
			if ($element[i] == e) return i;
		}
		return -1;
	};



	function Plugin(option) {
		if (this.length != 1) return;
		var $this = $(this)
		var data = $this.data('u.autocomplete')
		var options = typeof option == 'object' && option

		if (!data) $this.data('u.autocomplete', (data = new Autocomplete(this, options)))
			//	else data.update(options);
		return data;
	}

	var old = $.fn.autocomplete

	$.fn.autocomplete = Plugin
	$.fn.autocomplete.Constructor = Autocomplete



	$.fn.autocomplete.noConflict = function() {
		$.fn.autocomplete = old
		return this
	}


}(jQuery);
/* ========================================================================
 * UUI: backtop.js v0.0.1
 *
 * ========================================================================
 * Copyright 2014 yonyou, Inc.
 * Licensed under MIT ()
 * ======================================================================== */


+ function($) {
	'use strict';

	var BackTop = function(element, options) {
		var me = this;
		this.$element = $(element)
		this.options = $.extend({}, BackTop.DEFAULTS, options);

		$(window).scroll(function(e) {
			if($(document).scrollTop() > me.options.toggleHeight) {
				me.$element.addClass("active");
			} else {
				me.$element.removeClass("active");
			}
		});
		this.$element.click(function() {
			$(document).scrollTop(0);
		});
		

	}

	BackTop.DEFAULTS = {
		toggleHeight : 100

	}

	BackTop.fn = BackTop.prototype

	function Plugin(option) {
		if (this.length != 1) return;
		var $this = $(this)
		var data = $this.data('u.backtop')
		var options = typeof option == 'object' && option

		if (!data) $this.data('u.backtop', (data = new BackTop(this, options)))
		return data;
	}

	var old = $.fn.backtop

	$.fn.backtop = Plugin
	$.fn.backtop.Constructor = BackTop



	$.fn.backtop.noConflict = function() {
		$.fn.backtop = old
		return this
	}


}(jQuery);
//+ function(factory) {
//	if (typeof define === "function" && define.amd) {
//		// AMD. Register as an anonymous module.
//		define([
//			"jquery",
//			"./core"
//		], factory);
//	} else {
//
//		// Browser globals
//		factory(jQuery);
//	}
//}(
+function($) {
	'use strict';

	function NumberFormater(precision) {
		this.precision = precision;
	};

	NumberFormater.prototype.update = function(precision) {
		this.precision = precision;
	}


	NumberFormater.prototype.format = function(value) {
		if(!$.isNumeric(value)) return "";

		// 以0开头的数字将其前面的0去掉
		while ((value + "").charAt(0) == "0" && value.length > 1) {
			value = value.substring(1);
		}
		var result = value;
		if($.isNumeric(this.precision)) {
			var digit = parseFloat(value);
			// 解决toFixed四舍五入问题，如1.345 
			result = (Math.round(digit* Math.pow(10, this.precision)) / Math.pow(10, this.precision)).toFixed(this.precision);
			if (result == "NaN")
				return "";
		}

		
		return result;
	};

	function DateFormater(pattern) {
		this.pattern = pattern;
	};

	DateFormater.prototype.update = function(pattern) {
		this.pattern = pattern;
	}


	DateFormater.prototype.format = function(value) {
		return moment(value).format(this.pattern)
	};

  	window.DataPlugins = window.DataPlugins ? window.DataPlugins :  {};

  	window.DataPlugins.formater = {
		getter:function(options){

		},
		setter:function(options, value){
			var json = JSON.parse($(this).attr('data-plugin'));
			var formater = window.DataPlugins.formater[options.type];
			if(options.type == 'number') {
				formater = formater ? formater.update(json.formater.precision) : new NumberFormater(json.formater.precision);
			} else if(options.type == 'date') {
				formater = formater ? formater.update(json.formater.pattern) : new DateFormater(json.formater.pattern);
			}
			this.showValue = formater.format(value);
			this.trueValue = this.showValue;
		}
	}
	
	$.NumberFormater = NumberFormater
	$.DateFormater = DateFormater
	
}(jQuery);
//+ function(factory) {
//	if (typeof define === "function" && define.amd) {
//		// AMD. Register as an anonymous module.
//		define([], factory);
//	} else {
//
//		// Browser globals
//		factory(jQuery);
//	}
//}(
+ function($) {
	'use strict';

	/**
	 * 字符串去掉左右空格
	 */
	String.prototype.trim = function() {
		return this.replace(/^\s*(\b.*\b|)\s*$/, "$1");
	};

	/**
	 * 字符串替换
	 */
	String.prototype.replaceStr = function(strFind, strRemp) {
		var tab = this.split(strFind);
		return new String(tab.join(strRemp));
	};

	/**
	 * 获得字符串的字节长度
	 */
	String.prototype.lengthb = function() {
		//	var str = this.replace(/[^\x800-\x10000]/g, "***");
		var str = this.replace(/[^\x00-\xff]/g, "**");
		return str.length;
	};

	/**
	 * 将AFindText全部替换为ARepText
	 */
	String.prototype.replaceAll = function(AFindText, ARepText) {
		//自定义String对象的方法
		var raRegExp = new RegExp(AFindText, "g");
		return this.replace(raRegExp, ARepText);
	};

	/**
	 * 按字节数截取字符串 例:"e我是d".nLen(4)将返回"e我"
	 */
	String.prototype.substrCH = function(nLen) {
		var i = 0;
		var j = 0;
		while (i < nLen && j < this.length) { // 循环检查制定的结束字符串位置是否存在中文字符
			var charCode = this.charCodeAt(j);
			if (charCode > 256 && i == nLen - 1) {
				break;
			}
			//		else if(charCode >= 0x800 && charCode <= 0x10000){
			//			i = i + 3;
			//		}
			else if (charCode > 256) { // 返回指定下标字符编码，大于265表示是中文字符
				i = i + 2;
			} //是中文字符，那计数增加2
			else {
				i = i + 1;
			} //是英文字符，那计数增加1
			j = j + 1;
		};
		return this.substr(0, j);
	};

	/**
	 * 校验字符串是否以指定内容开始
	 */
	String.prototype.startWith = function(strChild) {
		return this.indexOf(strChild) == 0;
	};

	/**
	 * 判断字符串是否以指定参数的字符串结尾
	 *
	 * @param strChild
	 */
	String.prototype.endWith = function(strChild) {
		var index = this.indexOf(strChild);
		if (index == -1)
			return;
		else
			return index == this.length - strChild.length;
	};

	String.prototype.format = function(data) {
		if (data != null) {
			var string = this;
			for (var key in data) {
				var reg = new RegExp('\\<\\#\\=' + key + '\\#\\>', 'gi');
				string = string.replace(reg, data[key] ? (data[key] == 'null' ? "" : data[key]) : "");
			}
		}
		return string;
	}

	function patch(element) {
		if (element.toString().length > 1) {
			return element.toString();
		} else {
			return "0" + element.toString();
		}
	}
	Date.prototype.format = function(format) {
		var year = this.getFullYear(),
			month = this.getMonth() + 1,
			day = this.getDate(),
			hour = this.getHours(),
			minute = this.getMinutes(),
			second = this.getSeconds();
		format = format || "yyyy-MM-dd hh:mm:ss";
		return format.replace(/yyyy/, year).replace(/yy/, year.toString().substr(2, 2))
			.replace(/MM/, patch(month)).replace(/M/, month)
			.replace(/dd/, patch(day)).replace(/d/, day)
			.replace(/hh/, patch(hour)).replace(/h/, hour)
			.replace(/mm/, patch(minute)).replace(/m/, minute)
			.replace(/ss/, patch(second)).replace(/s/, second);
	};

	/**
	 * 获取AAAAMMJJ类型字符串
	 */
	Date.prototype.getAAAAMMJJ = function() {
		//date du jour
		var jour = this.getDate();
		if (jour < 10)
			(jour = "0" + jour);
		var mois = this.getMonth() + 1;
		if (mois < 10)
			(mois = "0" + mois);
		var annee = this.getYear();
		return annee + "" + mois + "" + jour;
	};

	/**
	 * 获取YYYY-MM-DD类型字符串
	 */
	Date.prototype.getFomatDate = function() {
		var year = this.getFullYear();
		var month = this.getMonth() + 1;
		if (month < 10)
			month = "0" + month;
		var day = this.getDate();
		if (day < 10)
			day = "0" + day;
		return year + "-" + month + "-" + day;
	};

	/**
	 * 获取YYYY-MM-DD HH:MM:SS类型字符串
	 */
	Date.prototype.getFomatDateTime = function() {
		var year = this.getFullYear();
		var month = this.getMonth() + 1;
		if (month < 10)
			month = "0" + month;
		var day = this.getDate();
		if (day < 10)
			day = "0" + day;
		var hours = this.getHours();
		if (hours < 10)
			hours = "0" + hours;
		var minutes = this.getMinutes();
		if (minutes < 10)
			minutes = "0" + minutes;
		var seconds = this.getSeconds();
		if (seconds < 10)
			seconds = "0" + seconds;
		return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
	};

	/**
	 * 返回obj在数组中的位置
	 */
	Array.prototype.indexOf = function(obj) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == obj)
				return i;
		}
		return -1;
	};

	/**
	 * 按照index remove
	 */
	Array.prototype.remove = function(index) {
		if (index < 0 || index > this.length) {
			alert("index out of bound");
			return;
		}
		this.splice(index, 1);
	};

	/**
	 * 按照数组的元素remove
	 */
	Array.prototype.removeEle = function(ele) {
		for (var i = 0, count = this.length; i < count; i++) {
			if (this[i] == ele) {
				this.splice(i, 1);
				return;
			}
		}
	};
	/**
	 * 生成UUID
	 */
	Math.UUID = function() {
		return ((new Date()).getTime() + "").substr(9);
	};
	String.UUID = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	};

	/**
	 * 将指定值ele插入到index处
	 */
	Array.prototype.insert = function(index, ele) {
		if (index < 0 || index > this.length) {
			alert("index out of bound");
			return;
		}
		this.splice(index, 0, ele);
	};

	/**
	 * 得到和索引相对应的数组中的值
	 */
	Array.prototype.values = function(indices) {
		if (indices == null)
			return null;
		var varr = new Array();
		for (var i = 0; i < indices.length; i++) {
			varr.push(this[indices[i]]);
		}
		return varr;
	};

	/**
	 * 清空数组
	 */
	Array.prototype.clear = function() {
		this.splice(0, this.length);
	};

	window.getRequest = function(url) {
		if (!url)
			url = document.location.search;
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substring(url.indexOf("?") + 1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	};

	window.setCookie = function(sName, sValue, oExpires, sPath, sDomain, bSecure) {
		var sCookie = sName + "=" + encodeURIComponent(sValue);
		if (oExpires)
			sCookie += "; expires=" + oExpires.toGMTString();
		if (sPath)
			sCookie += "; path=" + sPath;
		if (sDomain)
			sCookie += "; domain=" + sDomain;
		if (bSecure)
			sCookie += "; secure=" + bSecure;
		document.cookie = sCookie;
	};

	window.getCookie = function(sName) {
		var sRE = "(?:; )?" + sName + "=([^;]*);?";
		var oRE = new RegExp(sRE);

		if (oRE.test(document.cookie)) {
			return decodeURIComponent(RegExp["$1"]);
		} else
			return null;
	};

	window.deleteCookie = function(sName, sPath, sDomain) {
		setCookie(sName, "", new Date(0), sPath, sDomain);
	};
	window.execIgnoreError = function(a, b, c) {
		try {
			a.call(b, c);
		} catch (e) {
			//TODO handle the exception
		}
	}

}(jQuery);
/**
 * 抽象格式化类
 */
function AbstractMasker() {};

AbstractMasker.prototype.format = function(obj) {
	if (obj == null)
		return null;

	var fObj = this.formatArgument(obj);
	return this.innerFormat(fObj);
};

/**
 * 统一被格式化对象结构
 *
 * @param obj
 * @return
 */
AbstractMasker.prototype.formatArgument = function(obj) {

};

/**
 * 格式化
 *
 * @param obj
 * @return
 */
AbstractMasker.prototype.innerFormat = function(obj) {

};

/**
 * 拆分算法格式化虚基类
 */
AbstractSplitMasker.prototype = new AbstractMasker;

function AbstractSplitMasker() {};
AbstractSplitMasker.prototype.elements = new Array;
AbstractSplitMasker.prototype.format = function(obj) {
	if (obj == null)
		return null;

	var fObj = this.formatArgument(obj);
	return this.innerFormat(fObj);
};

/**
 * 统一被格式化对象结构
 *
 * @param obj
 * @return
 */
AbstractSplitMasker.prototype.formatArgument = function(obj) {
	return obj;
};

/**
 * 格式化
 *
 * @param obj
 * @return
 */
AbstractSplitMasker.prototype.innerFormat = function(obj) {
	if (obj == null || obj == "")
		return new FormatResult(obj);
	this.doSplit();
	var result = "";
	//dingrf 去掉concat合并数组的方式，换用多维数组来实现 提高效率
	result = this.getElementsValue(this.elements, obj);
	//	for(var i = 0; i < this.elements.length ; i++){
	//		if(i != undefined){
	//			var element = this.elements[i];
	//			var elementValue = element.getValue(obj);
	//			if(elementValue != undefined)
	//				result = result + elementValue;
	//		}
	//	}
	return new FormatResult(result);
};

/**
 * 合并多维数组中的elementValue
 * @param {} element
 * @param {} obj
 * @return {}
 */
AbstractSplitMasker.prototype.getElementsValue = function(element, obj) {
	var result = "";
	if (element instanceof Array) {
		for (var i = 0; i < element.length; i++) {
			result = result + this.getElementsValue(element[i], obj);
		}
	} else {
		if (element.getValue)
			result = element.getValue(obj);
	}
	return result;
};

AbstractSplitMasker.prototype.getExpress = function() {

};

AbstractSplitMasker.prototype.doSplit = function() {
	var express = this.getExpress();
	if (this.elements == null || this.elements.length == 0)
		this.elements = this.doQuotation(express, this.getSeperators(), this.getReplaceds(), 0);
};


/**
 * 处理引号
 *
 * @param express
 * @param seperators
 * @param replaced
 * @param curSeperator
 * @param obj
 * @param result
 */
AbstractSplitMasker.prototype.doQuotation = function(express, seperators, replaced, curSeperator) {
	if (express.length == 0)
		return null;
	var elements = new Array();
	var pattern = new RegExp('".*?"', "g");
	var fromIndex = 0;
	var result;
	do {
		result = pattern.exec(express);
		if (result != null) {
			var i = result.index;
			var j = pattern.lastIndex;
			if (i != j) {
				if (fromIndex < i) {
					var childElements = this.doSeperator(express.substring(fromIndex, i), seperators, replaced, curSeperator);
					if (childElements != null && childElements.length > 0) {
						//						elements = elements.concat(childElements);
						elements.push(childElements);
					}
				}
			}
			elements.push(new StringElement(express.substring(i + 1, j - 1)));
			fromIndex = j;
		}
	}
	while (result != null);

	if (fromIndex < express.length) {
		var childElements = this.doSeperator(express.substring(fromIndex, express.length), seperators, replaced, curSeperator);
		if (childElements != null && childElements.length > 0)
		//			elements = elements.concat(childElements);
			elements.push(childElements);
	}
	return elements;
};

/**
 * 处理其它分隔符
 *
 * @param express
 * @param seperators
 * @param replaced
 * @param curSeperator
 * @param obj
 * @param result
 */
AbstractSplitMasker.prototype.doSeperator = function(express, seperators, replaced, curSeperator) {
	if (curSeperator >= seperators.length) {
		var elements = new Array;
		elements.push(this.getVarElement(express));
		return elements;
	}

	if (express.length == 0)
		return null;
	var fromIndex = 0;
	var elements = new Array();
	var pattern = new RegExp(seperators[curSeperator], "g");
	var result;
	do {
		result = pattern.exec(express);
		if (result != null) {
			var i = result.index;
			var j = pattern.lastIndex;
			if (i != j) {
				if (fromIndex < i) {
					var childElements = this.doSeperator(express.substring(fromIndex, i), seperators, replaced, curSeperator + 1);
					if (childElements != null && childElements.length > 0)
					//						elements = elements.concat(childElements);
						elements.push(childElements);
				}

				if (replaced[curSeperator] != null) {
					elements.push(new StringElement(replaced[curSeperator]));
				} else {
					elements.push(new StringElement(express.substring(i, j)));
				}
				fromIndex = j;
			}
		}
	}
	while (result != null);

	if (fromIndex < express.length) {
		var childElements = this.doSeperator(express.substring(fromIndex, express.length), seperators, replaced, curSeperator + 1);
		if (childElements != null && childElements.length > 0)
		//			elements = elements.concat(childElements);
			elements.push(childElements);
	}
	return elements;
};


/**
 * 地址格式
 */
AddressMasker.prototype = new AbstractSplitMasker;

function AddressMasker(formatMeta) {
	this.update(formatMeta);
};

AddressMasker.prototype.update = function(formatMeta) {
	this.formatMeta = $.extend({}, AddressMasker.DefaultFormatMeta, formatMeta)
}

AddressMasker.prototype.getExpress = function() {
	return this.formatMeta.express;
};

AddressMasker.prototype.getReplaceds = function() {
	return [this.formatMeta.separator];
};

AddressMasker.prototype.getSeperators = function() {
	return ["(\\s)+?"];
};

AddressMasker.prototype.getVarElement = function(express) {
	var ex = {};

	if (express == ("C"))
		ex.getValue = function(obj) {
			return obj.country;
		};


	if (express == ("S"))
		ex.getValue = function(obj) {
			return obj.state;
		};


	if (express == ("T"))
		ex.getValue = function(obj) {
			return obj.city;
		};


	if (express == ("D"))
		ex.getValue = function(obj) {
			return obj.section;
		};


	if (express == ("R"))
		ex.getValue = function(obj) {
			return obj.road;
		};

	if (express == ("P"))
		ex.getValue = function(obj) {
			return obj.postcode;
		};

	if (typeof(ex.getValue) == undefined)
		return new StringElement(express);
	else
		return ex;
};

AddressMasker.prototype.formatArgument = function(obj) {
	return obj;
};

/**
 * <b> 数字格式化  </b>
 *
 * <p> 格式化数字
 *
 * </p>
 *
 * Create at 2009-3-20 上午08:50:32
 *
 * @author bq
 * @since V6.0
 */
NumberMasker.prototype = new AbstractMasker;
NumberMasker.prototype.formatMeta = null;

/**
 *构造方法
 */
function NumberMasker(formatMeta) {
	this.update(formatMeta);
};

NumberMasker.prototype.update = function(formatMeta) {
	this.formatMeta = $.extend({}, NumberMasker.DefaultFormatMeta, formatMeta)
}

/**
 *格式化对象
 */
NumberMasker.prototype.innerFormat = function(obj) {
	var dValue, express, seperatorIndex, strValue;
	dValue = obj.value;
	if (dValue > 0) {
		express = this.formatMeta.positiveFormat;
		strValue = dValue + '';
	} else if (dValue < 0) {
		express = this.formatMeta.negativeFormat;
		strValue = (dValue + '').substr(1, (dValue + '').length - 1);
	} else {
		express = this.formatMeta.positiveFormat;
		strValue = dValue + '';
	}
	seperatorIndex = strValue.indexOf('.');
	strValue = this.setTheSeperator(strValue, seperatorIndex);
	strValue = this.setTheMark(strValue, seperatorIndex);
	var color = null;
	if (dValue < 0 && this.formatMeta.isNegRed) {
		color = "FF0000";
	}
	return new FormatResult(express.replaceAll('n', strValue), color);

};
/**
 *设置标记
 */
NumberMasker.prototype.setTheMark = function(str, seperatorIndex) {
	var endIndex, first, index;
	if (!this.formatMeta.isMarkEnable)
		return str;
	if (seperatorIndex <= 0)
		seperatorIndex = str.length;
	first = str.charCodeAt(0);
	endIndex = 0;
	if (first == 45)
		endIndex = 1;
	index = seperatorIndex - 3;
	while (index > endIndex) {
		str = str.substr(0, index - 0) + this.formatMeta.markSymbol + str.substr(index, str.length - index);
		index = index - 3;
	}
	return str;
};
NumberMasker.prototype.setTheSeperator = function(str, seperatorIndex) {
	var ca;
	if (seperatorIndex > 0) {
		ca = NumberMasker.toCharArray(str);
		//ca[seperatorIndex] = NumberMasker.toCharArray(this.formatMeta.pointSymbol)[0];
		ca[seperatorIndex] = this.formatMeta.pointSymbol;
		str = ca.join('');
	}
	return str;
};
/**
 * 将字符串转换成char数组
 * @param {} str
 * @return {}
 */
NumberMasker.toCharArray = function(str) {
	var str = str.split("");
	var charArray = new Array();
	for (var i = 0; i < str.length; i++) {
		charArray.push(str[i]);
	}
	return charArray;
};


/**
 *默认构造方法
 */
NumberMasker.prototype.formatArgument = function(obj) {
	var numberObj = {};
	numberObj.value = obj;
	return numberObj;
};

/**
 * 货币格式
 */
CurrencyMasker.prototype = new NumberMasker;
CurrencyMasker.prototype.formatMeta = null;

function CurrencyMasker(formatMeta) {
	this.update(formatMeta);
};

CurrencyMasker.prototype.update = function(formatMeta) {
	this.formatMeta = $.extend({}, CurrencyMasker.DefaultFormatMeta, formatMeta)
}

/**
 * 重载格式方法
 * @param {} obj
 * @return {}
 */
CurrencyMasker.prototype.innerFormat = function(obj) {
	if(!obj.value) {
		return {value: ""};
	}
	var fo = (new NumberMasker(this.formatMeta)).innerFormat(obj);
	//fo.value = fo.value.replace("$", this.formatMeta.curSymbol);
	return fo;
};

DateTimeMasker.prototype = new AbstractSplitMasker;

DateTimeMasker.prototype.formatMeta = null;

function DateTimeMasker(formatMeta) {
	this.update(formatMeta);
};

DateTimeMasker.prototype.update = function(formatMeta) {
	this.formatMeta = $.extend({}, DateTimeMasker.DefaultFormatMeta, formatMeta)
}

/**
 * 英文短日期
 */
DateTimeMasker.enShortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/**
 * 英文长日期
 */
DateTimeMasker.enLongMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


DateTimeMasker.prototype.doOne = function(express) {
	if (express.length == 0)
		return new "";
	var obj = new Object;
	if (express == "yyyy") {
		obj.getValue = function(o) {
			return DateTimeMasker.getyyyy(o);
		};
	}
	if (express == "yy") {
		obj.getValue = function(o) {
			return DateTimeMasker.getyy(o);
		};
	}
	if (express == "MMMM") {
		obj.getValue = function(o) {
			return DateTimeMasker.getMMMM(o);
		};
	}

	if (express == "MMM") {
		obj.getValue = function(o) {
			return DateTimeMasker.getMMM(o);
		};
	}

	if (express == "MM") {
		obj.getValue = function(o) {
			return DateTimeMasker.getMM(o);
		};
	}

	if (express == "M") {
		obj.getValue = function(o) {
			return DateTimeMasker.getM(o);
		};
	}

	if (express == "dd") {
		obj.getValue = function(o) {
			return DateTimeMasker.getdd(o);
		};
	}

	if (express == "d") {
		obj.getValue = function(o) {
			return DateTimeMasker.getd(o);
		};
	}

	if (express == "hh") {
		obj.getValue = function(o) {
			return DateTimeMasker.gethh(o);
		};
	}

	if (express == "h") {
		obj.getValue = function(o) {
			return DateTimeMasker.geth(o);
		};
	}

	if (express == "mm") {
		obj.getValue = function(o) {
			return DateTimeMasker.getmm(o);
		};
	}

	if (express == "m") {
		obj.getValue = function(o) {
			return DateTimeMasker.getm(o);
		};
	}

	if (express == "ss") {
		obj.getValue = function(o) {
			return DateTimeMasker.getss(o);
		};
	}

	if (express == "s") {
		obj.getValue = function(o) {
			return DateTimeMasker.gets(o);
		};
	}

	if (express == "HH") {
		obj.getValue = function(o) {
			return DateTimeMasker.getHH(o);
		};
	}

	if (express == "H") {
		obj.getValue = function(o) {
			return DateTimeMasker.getH(o);
		};
	}
	if (express == "t") {
		obj.getValue = function(o) {
			return DateTimeMasker.gett(o);
		};
	}

	if (express == "st") {
		obj.getValue = function(o) {
			return DateTimeMasker.gets(o) + DateTimeMasker.gett(o);
		};
	}

	if (express == "mt") {
		obj.getValue = function(o) {
			return DateTimeMasker.getm(o) + DateTimeMasker.gett(o);
		};
	}

	if (express == "yyyyMMdd") {
		obj.getValue = function(o) {
			return DateTimeMasker.getyyyy(o) + DateTimeMasker.getMM(o) + DateTimeMasker.getdd(o);
		};
	}

	if (typeof(obj.getValue) == "undefined") {
		obj.getValue = function(o) {
			return DateTimeMasker.getyyyy(o) + "-" + DateTimeMasker.getMM(o) + "-" + DateTimeMasker.getdd(o);
		};
	}

	return obj;
};

DateTimeMasker.getyyyy = function(date) {
	return date.getFullYear();
};

DateTimeMasker.getyy = function(date) {
	return ("" + date.getFullYear()).substring(2);
};

DateTimeMasker.getM = function(date) {
	return "" + (date.getMonth() + 1);
};

DateTimeMasker.getMM = function(date) {
	var month = date.getMonth() + 1;
	if (month < 10)
		return "0" + month;
	return month;
};

DateTimeMasker.getMMM = function(date) {
	return this.enShortMonth[date.getMonth()];
};

DateTimeMasker.getMMMM = function(date) {
	return this.enLongMonth[date.getMonth()];
};

DateTimeMasker.getdd = function(date) {
	var day = date.getDate();
	if (day < 10)
		return "0" + day;
	return date.getDate() + "";
};

DateTimeMasker.getd = function(date) {
	return date.getDate() + "";
};

DateTimeMasker.gethh = function(date) {
	var hh = date.getHours();
	if (hh < 10)
		return "0" + hh;

	return (date.getHours()) + "";
};

DateTimeMasker.geth = function(date) {
	return (date.getHours()) + "";
};

DateTimeMasker.getHH = function(date) {
	var HH = date.getHours();

	if (HH >= 12)
		HH = HH - 12;

	if (HH < 10)
		return "0" + HH;
	return (HH) + "";
};

DateTimeMasker.getH = function(date) {
	var HH = date.getHours();

	if (HH >= 12)
		HH = HH - 12;

	return (HH) + "";
};

DateTimeMasker.getmm = function(date) {
	var mm = date.getMinutes();
	if (mm < 10)
		return "0" + mm;

	return (date.getMinutes()) + "";
};

DateTimeMasker.getm = function(date) {
	return "" + (date.getMinutes());
};

DateTimeMasker.getss = function(date) {
	var ss = date.getSeconds();
	if (ss < 10)
		return "0" + ss;

	return (ss) + "";
};

DateTimeMasker.gets = function(date) {
	return (date.getSeconds()) + "";
};

DateTimeMasker.gett = function(date) {
	var hh = date.getHours();
	if (hh <= 12)
		return "AM";
	else
		return "PM";
};

DateTimeMasker.prototype.getExpress = function() {
	return this.formatMeta.format;
};

DateTimeMasker.prototype.getReplaceds = function() {
	return [" ", this.formatMeta.speratorSymbol, ":"];
};

DateTimeMasker.prototype.getSeperators = function() {
	return ["(\\s)+?", "-", ":"];
};

DateTimeMasker.prototype.getVarElement = function(express) {
	return this.doOne(express);
};

DateTimeMasker.prototype.formatArgument = function(obj) {
	if (obj == 0) return "";
	if (obj == null || obj == "")
		return obj;
	if ((typeof obj) == "string") {
		var dateArr = obj.split(" ");
		if (dateArr.length > 0) {
			var arr0 = dateArr[0].split("-");
			var date = new Date();
			//先把日期设置为1日，解决bug:当前日期为2011-08-31时，选择日期为2011-09-X，会把日期格式化为2011-10-X
			date.setDate(1);
			date.setFullYear(parseInt(arr0[0], 10));
			date.setMonth(parseInt(arr0[1], 10) - 1);
			date.setDate(parseInt(arr0[2], 10));
			if (dateArr.length == 2 && dateArr[1] != undefined) {
				var arr1 = dateArr[1].split(":");
				date.setHours(parseInt(arr1[0], 10));
				date.setMinutes(parseInt(arr1[1], 10));
				date.setSeconds(parseInt(arr1[2], 10));
				if (arr1.length > 3)
					date.setMilliseconds(parseInt(arr1[3], 10));
			}
		}
		return date;
	}
	return (obj);
};

/**
 * 日期格式化
 */
DateMasker.prototype = new DateTimeMasker;

DateMasker.DefaultFormatMeta = $.extend({}, DateTimeMasker.DefaultFormatMeta, {
	format: "yyyy-MM-dd"
})

function DateMasker(formatMeta) {
	this.update(formatMeta);
};

DateMasker.prototype.update = function(formatMeta) {
	this.formatMeta = $.extend({}, DateMasker.DefaultFormatMeta, formatMeta)
}


/**
 * 时间格式化
 */
TimeMasker.prototype = new DateTimeMasker;

TimeMasker.DefaultFormatMeta = $.extend({}, DateTimeMasker.DefaultFormatMeta, {
	format: "hh:mm:ss"
})

function TimeMasker(formatMeta) {
	this.update(formatMeta);
};

TimeMasker.prototype.update = function(formatMeta) {
	this.formatMeta = $.extend({}, TimeMasker.DefaultFormatMeta, formatMeta)
}

PrecentMasker.prototype = new AbstractMasker;

function PrecentMasker() {

};


PrecentMasker.prototype.formatArgument = function(obj) {
	return obj;
};

PrecentMasker.prototype.innerFormat = function(obj) {
	var val = "";
	if (obj != "") {
		// 获取obj保留几位小数位,obj小数位-2为显示小数位
		var objStr = String(obj);
		var objPrecision = objStr.length - objStr.indexOf(".") - 1;
		var showPrecision = objPrecision - 2;
		if (showPrecision < 0) {
			showPrecision = 0;
		}
		val = parseFloat(obj) * 100;
		val = (val * Math.pow(10, showPrecision) / Math.pow(10, showPrecision)).toFixed(showPrecision);
		val = val + "%";
	}
	return {
		value: val
	};
};


/**
 * 将结果输出成HTML代码
 * @param {} result
 * @return {String}
 */
function toColorfulString(result) {
	var color;
	if (!result) {
		return '';
	}
	if (result.color == null) {
		return result.value;
	}
	color = result.color;
	return '<font color="' + color + '">' + result.value + '<\/font>';
};

/**
 * 格式解析后形成的单个格式单元
 * 适用于基于拆分算法的AbstractSplitFormat，表示拆分后的变量单元
 */
StringElement.prototype = new Object();

function StringElement(value) {
	this.value = value;
};
StringElement.prototype.value = "";

StringElement.prototype.getValue = function(obj) {
	return this.value;
};
/**
 *格式结果
 */
FormatResult.prototype = new Object;
/**
 *默认构造方法
 */
function FormatResult(value, color) {
	this.value = value;
	this.color = color;
};

NumberMasker.DefaultFormatMeta = {
	isNegRed: true,
	isMarkEnable: true,
	markSymbol: ",",
	pointSymbol: ".",
	positiveFormat: "n",
	negativeFormat: "-n"
}

CurrencyMasker.DefaultFormatMeta = $.extend({}, NumberMasker.DefaultFormatMeta, {
	//curSymbol: "",
	positiveFormat: "n",
	negativeFormat: "-n"
})


AddressMasker.defaultFormatMeta = {
	express: "C S T R P",
	separator: " "
};

DateTimeMasker.DefaultFormatMeta = {
	format: "yyyy-MM-dd hh:mm:ss",
	speratorSymbol: "-"
}
/* ========================================================================
 * UUI: mdlayout.js v0.0.1
 *
 * ========================================================================
 * Copyright 2015 yonyou, Inc.
 * Licensed under MIT ()
 * ======================================================================== */


+ function($) {
	'use strict';

	var MDLayout = function(element, options) {
		this.browser = _getBrowserInfo();
		var me = this;
		this.$element = $(element)
		this.options = $.extend({}, MDLayout.DEFAULTS, options)
		this.$element.css('position','relative').css('width','100%').css('height','100%').css('overflow','hidden')
		this.$master =  this.$element.find('[data-role="master"]')
		this.$detail =  this.$element.find('[data-role="detail"]')
		
		this.$master.css('float','left').css('height','100%')
		this.$detail.css('height','100%').css('overflow','hidden').css('position','relative');
		
		this.masterWidth = this.$master.width() 
		this.detailWidth = this.$detail.width()
		if (me.browser.ie && me.browser.ie < 9){
			this.$master.find('[data-role="page"]').css('position','absolute').css('height','100%').css('width','100%').hide().eq(0).show()
			this.$detail.find('[data-role="page"]').css('position','absolute').css('height','100%').css('width','100%').hide().eq(0).show()
		}
		else{
			this.$master.find('[data-role="page"]').css('position','absolute').css('transform','translate3d('+ this.masterWidth +'px,0,0)')
				.css('height','100%').css('width','100%').eq(0).css('transform','translate3d(0,0,0)')
			this.$detail.find('[data-role="page"]').css('position','absolute').css('left','0px').css('transform','translate3d('+ this.detailWidth +'px,0,0)')
				.css('height','100%').css('width','100%').eq(0).css('transform','translate3d(0,0,0)')
		}

		this.current_m_pageId = this.$master.find('[data-role="page"]').eq(0).attr('id');
		this.current_d_pageId = this.$detail.find('[data-role="page"]').eq(0).attr('id');
		this.mHistory = [];
		this.dHistory = [];
		this.isNarrow = null;
		this.response();
		$(window).resize(function(){
			me.response();
		})
		
	}

	
	MDLayout.DEFAULTS = {
		minWidth: 480,
//		masterFloat: false,
		afterNarrow:function(){},
		afterUnNarrow:function(){},
		afterMasterGo:function(pageId){},
		afterMasterBack:function(pageId){},
		afterDetailGo:function(pageId){},
		afterDetailBack:function(pageId){}
	}

	MDLayout.fn = MDLayout.prototype
	
	MDLayout.fn.response = function() {
		var totalWidth = this.$element.width();
		if (totalWidth < this.options.minWidth){
			if (this.isNarrow == null || this.isNarrow == false)
			this.isNarrow = true
			this.hideMaster()
			this.options.afterNarrow()
		}
		else{
			if (this.isNarrow == null || this.isNarrow == true)
			this.isNarrow = false
			this.showMaster()
			this.options.afterUnNarrow();
		}
		this.calcWidth();
		
	}
	
	MDLayout.fn.calcWidth = function(){
		if (!this.browser.ie || this.browser.ie > 8){
			this.detailWidth = this.$detail.width()
			this.masterWidth = this.$master.width()
			this.$detail.find('[data-role="page"]').css('transform','translate3d('+ this.detailWidth +'px,0,0)')
			this.$detail.find('#' + this.current_d_pageId).css('transform','translate3d(0,0,0)')
		}
		
	}
	
	MDLayout.fn.mGo = function(pageId) {
		if (this.current_m_pageId == pageId) return;
		this.mHistory.push(this.current_m_pageId);
		_hidePage(this.$master.find('#' + this.current_m_pageId),this,'-' + this.masterWidth)
		this.current_m_pageId = pageId
		_showPage(this.$master.find('#' + this.current_m_pageId),this)
		this.options.afterMasterGo(pageId);
	}	
	
	MDLayout.fn.mBack = function() {
		if (this.mHistory.length == 0) return;
		_hidePage(this.$master.find('#' + this.current_m_pageId),this,this.masterWidth)
		this.current_m_pageId = this.mHistory.pop();
		_showPage(this.$master.find('#' + this.current_m_pageId),this)
		this.options.afterMasterBack(this.current_d_pageId);
	}	

	MDLayout.fn.dGo = function(pageId) {
		if (this.current_d_pageId == pageId) return;
		this.dHistory.push(this.current_d_pageId);
		_hidePage(this.$detail.find('#' + this.current_d_pageId),this,'-' + this.detailWidth)
		this.current_d_pageId = pageId
		_showPage(this.$detail.find('#' + this.current_d_pageId),this)
		this.options.afterDetailGo(pageId);
	}	
	
	MDLayout.fn.dBack = function() {
		if (this.dHistory.length == 0) return;
		_hidePage(this.$detail.find('#' + this.current_d_pageId),this,this.detailWidth)
		this.current_d_pageId = this.dHistory.pop();
		_showPage(this.$detail.find('#' + this.current_d_pageId),this)
		this.options.afterDetailBack(this.current_d_pageId);
	}	
	
	MDLayout.fn.showMaster = function() {
		if (this.browser.ie && this.browser.ie < 9)
			this.$master.show()
		else{
			this.$master.css('transform','translate3d(0,0,0)').css('transition', 'all 300ms')
		}
		if (!this.isNarrow)
			this.$master.css('position','relative')					
	}	

	MDLayout.fn.hideMaster = function() {
		if (this.browser.ie && this.browser.ie < 9)
			this.$master.hide()
		else{
			this.$master.css('transform','translate3d(-'+ this.masterWidth +'px,0,0)').css('transition', 'all 300ms')
		}
		this.$master.css('position','absolute').css('z-index',5)
		this.calcWidth()
	}	

	/**
	 * masterFloat属性只有在宽屏下起作用，为true时，master层浮动于detail层之上
	 * 
	 */
//	MDLayout.fn.setMasterFloat = function(float){
//		this.masterFloat = float;
//		
//	}

	function _getBrowserInfo(){
	    var browser = {};
	    var ua = navigator.userAgent.toLowerCase();
	    var s;
	    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? browser.ie = parseInt(s[1]) :
	    (s = ua.match(/msie ([\d.]+)/)) ? browser.ie = s[1] :
	    (s = ua.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] :
	    (s = ua.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] :
	    (s = ua.match(/opera.([\d.]+)/)) ? browser.opera = s[1] :
	    (s = ua.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;	
	    return browser;
	}
	
	function _showPage($el,me){
		if (me.browser.ie && me.browser.ie < 9)
			$el.show()
		else{
			$el.css('transition', 'all 300ms').css('transform','translate3d(0,0,0)')
//			$el.show(400)
		}
	}
	
	function _hidePage($el,me,width){
		if (me.browser.ie && me.browser.ie < 9)
			$el.hide()
		else{
			$el.css('transition', 'all 300ms').css('transform','translate3d('+ width +'px,0,0)')
//			$el.hide(400);
		}
	}

	function Plugin(option) {
		if (this.length != 1) return;
		var $this = $(this)
		var data = $this.data('u.mdlayout')
		var options = typeof option == 'object' && option

		if (!data) $this.data('u.mdlayout', (data = new MDLayout(this, options)))
			//	else data.update(options);
		return data;
	}

	var old = $.fn.mdlayout

	$.fn.mdlayout = Plugin
	$.fn.mdlayout.Constructor = MDLayout



	$.fn.mdlayout.noConflict = function() {
		$.fn.mdlayout = old
		return this
	}

}(jQuery);
+ function($) {
	"use strict";

	var PageProxy = function(options, page) {
		this.isCurrent = function() {
			return page == options.currentPage;
		}

		this.isFirst = function() {
			return page == 1;
		}

		this.isLast = function() {
			return page == options.totalPages;
		}

		this.isPrev = function() {
			return page == (options.currentPage - 1);
		}

		this.isNext = function() {
			return page == (options.currentPage + 1);
		}

		this.isLeftOuter = function() {
			return page <= options.outerWindow;
		}

		this.isRightOuter = function() {
			return (options.totalPages - page) < options.outerWindow;
		}

		this.isInsideWindow = function() {
			if (options.currentPage < options.innerWindow + 1) {
				return page <= ((options.innerWindow * 2) + 1);
			} else if (options.currentPage > (options.totalPages - options.innerWindow)) {
				return (options.totalPages - page) <= (options.innerWindow * 2);
			} else {
				return Math.abs(options.currentPage - page) <= options.innerWindow;
			}
		}

		this.number = function() {
			return page;
		}
	}

	var View = {
		firstPage: function(pagin, options, currentPageProxy) {
			var li = $('<li>').append($('<a href="#"></a>')
				.html(options.first)
				.bind('click.bs-pagin', function() {
					pagin.firstPage();
					return false;
				}));

			if (currentPageProxy.isFirst()) {
				li.addClass("disabled");
			}

			return li;
		},

		prevPage: function(pagin, options, currentPageProxy) {
			var li = $('<li>').append(
				$('<a href="#"></a>')
				.attr("rel", "prev")
				.html(options.prev)
				.bind('click.bs-pagin', function() {
					pagin.prevPage();
					return false;
				}));

			if (currentPageProxy.isFirst()) {
				li.addClass("disabled");
			}

			return li;
		},

		nextPage: function(pagin, options, currentPageProxy) {
			var li = $('<li>').append(
				$('<a href="#"></a>')
				.attr("rel", "next")
				.html(options.next)
				.bind('click.bs-pagin', function() {
					pagin.nextPage();
					return false;
				}));

			if (currentPageProxy.isLast()) {
				li.addClass("disabled");
			}

			return li;
		},

		lastPage: function(pagin, options, currentPageProxy) {
			var li = $('<li>').append(
				$('<a href="#"></a>')
				.html(options.last)
				.bind('click.bs-pagin', function() {
					pagin.lastPage();
					return false;
				}));

			if (currentPageProxy.isLast()) {
				li.addClass("disabled");
			}

			return li;
		},

		gap: function(pagin, options) {
			return $('<li>').addClass("disabled")
				.append($('<a href="#"></a>').html(options.gap));
		},

		page: function(pagin, options, pageProxy) {
				var li = $('<li>').append(function() {
					var link = $('<a href="#"></a>');
					if (pageProxy.isNext()) {
						link.attr("rel", "next")
					}
					if (pageProxy.isPrev()) {
						link.attr("rel", "prev")
					}
					link.html(pageProxy.number());
					link.bind('click.bs-pagin', function() {
						pagin.page(pageProxy.number());
						pagin.$element.trigger('pageChange', pageProxy.number())
						return false;
					});
					return link;
				});

				if (pageProxy.isCurrent()) {
					li.addClass("active");
				}

				return li;
			}

	}


	var Pagination = function(element, options) {
		this.$element = $(element);
		this.options = $.extend({}, Pagination.DEFAULTS, options);

		this.$ul = this.$element; //.find("ul");
		this.render();
	}

	Pagination.DEFAULTS = {
		currentPage: 1,
		totalPages: 20,
		innerWindow: 2,
		outerWindow: 0,
		first: '&laquo;',
		prev: '&lsaquo;',
		next: '&rsaquo;',
		last: '&raquo;',
		gap: '..',
		totalText: '合计:',
		truncate: false,
		page: function(page) {
			return true
		}
	}

	Pagination.prototype.update = function(options) {
		this.$ul.empty();
		this.options = $.extend({}, this.options, options);
		this.render();
	}	
	Pagination.prototype.render = function() {
		var options = this.options;

		if (!options.totalPages) {
			this.$element.hide();
			return;
		} else {
			this.$element.show();
		}

		var currentPageProxy = new PageProxy(options, options.currentPage);

		if (!currentPageProxy.isFirst() || !options.truncate) {
			if (options.first) {
				this.$ul.append(View.firstPage(this, options, currentPageProxy));
			}

			if (options.prev) {
				this.$ul.append(View.prevPage(this, options, currentPageProxy));
			}
		}

		var wasTruncated = false;
		for (var i = 1, length = options.totalPages; i <= length; i++) {
			var pageProxy = new PageProxy(options, i);
			if (pageProxy.isLeftOuter() || pageProxy.isRightOuter() || pageProxy.isInsideWindow()) {
				this.$ul.append(View.page(this, options, pageProxy));
				wasTruncated = false;
			} else {
				if (!wasTruncated && options.outerWindow > 0) {
					this.$ul.append(View.gap(this, options));
					wasTruncated = true;
				}
			}
		}

		if (!currentPageProxy.isLast() || !options.truncate) {
			if (options.next) {
				this.$ul.append(View.nextPage(this, options, currentPageProxy));
			}

			if (options.last) {
				this.$ul.append(View.lastPage(this, options, currentPageProxy));
			}
		}
		
		if(options.totalCount > 0){
			var htmlStr = '<li><a style="cursor:default;background-color:#FFF;">' + options.totalText + options.totalCount + '</a></li>';
			this.$ul.append(htmlStr);
		}
		if(options.jumpPage){ 
			var tmpjump = '<li><a><input style="margin-right: 6px;width: 32px;border: 1px solid #ddd; height: 20px; padding-left: 2px; border-radius: 3px;">页<i class="jump_page fa fa-arrow-circle-right" style="margin-left: 8px; cursor: pointer;"></i></a></li>'; 
			var me = this; 
			this.$ul.append(tmpjump); 
			
			
		
			$(".jump_page").off("click").on("click",function(){
				me.page($(this).siblings("input").val());
				return false;
			})
			
		}
	}

	Pagination.prototype.page = function(page, totalPages) {
		var options = this.options;

		if (totalPages === undefined) {
			totalPages = options.totalPages;
		}

		if (page > 0 && page <= totalPages) {
			if (options.page(page)) {
				this.$ul.empty();
				options.currentPage = page;
				options.totalPages = totalPages;
				this.render();
			}
		}

		return false;
	}

	Pagination.prototype.firstPage = function() {
		return this.page(1);
	}

	Pagination.prototype.lastPage = function() {
		return this.page(this.options.totalPages);
	}

	Pagination.prototype.nextPage = function() {
		return this.page(this.options.currentPage + 1);
	}

	Pagination.prototype.prevPage = function() {
		return this.page(this.options.currentPage - 1);
	}


	function Plugin(option) {
		var $this = $(this)
		var data = $this.data('u.pagination')
		var options = typeof option == 'object' && option

		if (!data) $this.data('u.pagination', (data = new Pagination(this, options)))
		else data.update(options);
		return data;
	}


	var old = $.fn.pagination;

	$.fn.pagination = Plugin
	$.fn.pagination.Constructor = Pagination


	$.fn.pagination.noConflict = function() {
		$.fn.pagination = old;
		return this;
	}

}(jQuery);
+function($) {
	'use strict';

	
	$('[data-plugin]').each(function() {
		var json = JSON.parse($(this).attr('data-plugin'))
		if(json) {
			Object.defineProperty($(this)[0], 'value', {
				trueValue: "",
				get: function() {
					for(var key in json) {
						var getter = window.DataPlugins[key]["getter"];
						if(getter){
							getter.call(this,json[key]);
						}
					}
					return this.trueValue;
				},
				set: function(val) {
					if(val == this.showValue) {
						//已经被处理过
						return;
					}

					if (this.getAttribute("maxlength")) {
						val = val + "";
						try {
							var len = parseInt(target.getAttribute("maxlength"))
							if(val.length > len){
								val = val.substring(0,len);
							}
						} catch (e) {
						
						}
					}

					for(var key in json) {
						var setter = window.DataPlugins[key]["setter"];
						if(setter){
							setter.call(this,json[key],val);
						}
					}
					this.innerHTML = this.showValue;
				}
			})

			$(this).focusin(function(e) {
			 	if(e.target.innerHTML == e.target.trueValue)
			 		return;
				e.target.innerHTML = e.target.trueValue || ""
			}).blur(function(e) {
				var target = e.target;
				if (target.getAttribute("maxlength")) {
					try {
						var len = parseInt(target.getAttribute("maxlength"))
						if(target.innerHTML.length > len){
							target.innerHTML = target.innerHTML.substring(0,len);
						}
					} catch (e) {
					
					}
				}
				target.value = target.innerHTML ;
				/**
				 * 模拟原生的input输入框,触发修改事件 ko默认监听这个事件
				 */
				$(target).trigger('change');
			})



		}

		

	});
}(jQuery);
+function($) {
	'use strict';

	window.DataPlugins = window.DataPlugins ? window.DataPlugins :  {};

  	window.DataPlugins.masker = {
		getter:function(options){

		},
		setter:function(options, value){
			// 是否已经被formater处理过的
			var json = JSON.parse($(this).attr('data-plugin'))
			this.trueValue = json.formater ? this.trueValue : value;
			
			var masker = window.DataPlugins.masker[options.type];
			var formatMeta = json.masker;
			if(options.type == 'number') {
				masker = masker ? masker.update(formatMeta) : new NumberMasker(formatMeta);
			} else if(options.type == 'percent') {
	    		masker = masker ? masker.update(formatMeta) : new PrecentMasker(formatMeta);
	    	} else if(options.type == 'currency') {
	    		masker = masker ? masker.update(formatMeta) : new CurrencyMasker(formatMeta);
	    	} else if(options.type == 'datetime') {
	    		masker = masker ? masker.update(formatMeta) : new DateTimeMasker(formatMeta);
	    	} else if(options.type == 'date') {
	    		masker = masker ? masker.update(formatMeta) : new DateMasker(formatMeta);
	    	} else if(options.type == 'time') {
	    		masker = masker ? masker.update(formatMeta) : new TimeMasker(formatMeta);
	    	} else if(options.type == 'address') {
	    		masker = masker ? masker.update(formatMeta) : new AddressMasker(formatMeta);
	    	}
			this.showValue = masker.format(this.trueValue).value;
		}
	}

}(jQuery);



/* ========================================================================
 * UUI: refer.js v 1.0.0
 *
 * ========================================================================
 * Copyright 2015 yonyou, Inc.
 * Licensed under MIT ()
 * ======================================================================== */

/**
 * $.refer({
* contentId: 'mycontent' //内容区id，如果不提供，创建弹出框口div，以弹出方式打开参照
* pageUrl:'xxxx' //自定义参照需要设置此属性
* dataUrl:'yyyyy' //标准参照需要设置此属性
* isPOPMode: false,
* params{}
* onOk: function(data){
*
* },
* onCancel: function(){
*
* }
* })
 */

+ function() {

    var Refer = function(options) {
        var contentId = options['contentId']
        if ($.isEmptyObject(contentId))
            throw new Error('contentId is null')
        this.options = $.extend({}, Refer.DEFAULTS, options)
        this.params = this.options['params']
        this.create()
    }

    Refer.DEFAULTS = {
        isPOPMode: false,
		searchInput:null,
        contentId: null,
        okId: 'okBtn',
        cancelId: 'cancelBtn',
		width:null,
		height:null,
		title:'参照',
        setVal: function() {},
        onOk: function() {},
        onCancel: function() {}
    }

    Refer.fn = Refer.prototype

    Refer.fn.create = function() {
        var self = this
        self.setVal = this.options.setVal;
		self.searchInput=this.options.searchInput;
		
        var prefixID=this.options.contentId.replace(/[^\w\s]/gi, '\\$&');
        if (!this.options.isPOPMode) {
            if($('#'+this.options.contentId).length=== 0){
				$('body').append($('<div>').attr('id',this.options.contentId));
			}
            this.$contentEle = $('#' + prefixID)
            this.$okBtn = $('#' +prefixID+ this.options.okId)
            this.$cancelBtn = $('#' +prefixID+ this.options.cancelId)
        } else {
            var dialog = $('#'+prefixID);
            if (dialog.length == 0) {
            	self.isDefaultDialog = true;
                var d = document.createElement('DIV')
                d.innerHTML = '<div class="modal" id="'+prefixID+'"><div class="modal-dialog"><div class="modal-content">' + '<div class="modal-header"><h4 class="modal-title">Modal title</h4></div>' + '<div class="modal-body"></div><div class="modal-footer">' + '<button   type="button" class="btn btn-primary okBtn">确定</button>' + '<button  type="button" class="btn btn-default cancelBtn" data-dismiss="modal">取消</button></div></div></div></div>'
                document.body.appendChild(d)
                dialog = $('#'+prefixID);
            }
            this.$contentEle = dialog.find('.modal-body')
            this.$okBtn = dialog.find('.okBtn')
            this.$cancelBtn = dialog.find('.cancelBtn')
            this.dialog = dialog
			if (this.options.width)
				dialog.find('.modal-content').css('width', this.options.width)	
			if (this.options.height)
				this.$contentEle.css('height', this.options.height)
			this.dialog.find('.modal-title').html(this.options.title)	
            
        }
        this.$okBtn.on('click', function() {
            self.submit()
        })

        this.$cancelBtn.on('click', function() {
            self.cancel()
        })
    }


    Refer.fn.submit = function(){
        var data = this.submitData()
        this.options.onOk(data)
		Plugin.destroy(this)
    }

    Refer.fn.cancel = function(){
        this.options.onCancel()
		Plugin.destroy(this)
    }

    Refer.fn.open = function() {
        var self = this
        if (self.isDefaultDialog){
        	self.dialog.modal('show')
        }
        require([this.options.pageUrl], function(module) {
            self.$contentEle.html(module.template);
            module.init(self);
        })
    }

    /**
     * 参照页面中需注册此方法
     */
    Refer.fn.registerSubmitFunc = function(func) {
        this.submitData = func
    }

    Refer.fn.submitData = function() {}

    var Plugin = function(options) {
        var r = new Refer(options)

        Plugin.addRefer(r)
        r.open()
    }

    Refer.fn.destroy = function() {
        if (this.dialog) {
	        if (this.isDefaultDialog) {
	            this.dialog.modal('hide');
//	            this.dialog.modal('removeBackdrop');
	        }
            this.dialog.parent().remove();
        }
        delete this.options
    }

    /**
     * 参照实列
     */
    Plugin.instances = {}

    Plugin.openRefer = function(options) {
        var r = new Refer(options)
        Plugin.addRefer(r)
        r.open()
    }

    Plugin.getRefer = function(id) {
        return Plugin.instances[id]
    }

    Plugin.addRefer = function(refer) {
        Plugin.instances[refer.options.id] = refer
    }

    Plugin.destroy = function(refer) {
        var r = Plugin.instances[refer.options.id]
        delete Plugin.instances[refer.options.id]
        r.destroy()
    }

    $.refer = Plugin


}(jQuery)
/* ========================================================================
 * UUI: statemanager.js v 1.0.0
 *
 * ========================================================================
 * Copyright 2015 yonyou, Inc.
 * Licensed under MIT ()
 * ======================================================================== */

/**
 * 状态管理工具，管理两种状态：visible,readonly
 */
+ function($) {

	var StateManager = function(element, options) {
		this.$element = $(element)
		this.options = $.extend({}, StateManager.DEFAULTS, options)
		StateManager.instances.push(this)
		this.update()
	}

	StateManager.DEFAULTS = {
		visible: 'true',
		readonly: 'false'
	}

	/**
	 * 被管理的元素实例
	 */
	StateManager.instances = []

	/**
	 * 更新所有的按钮状态
	 */
	StateManager.update = function() {
		for (var i=0, count = StateManager.instances.length; i< count; i++)
			StateManager.instances[i].update()
	}

	StateManager.fn = StateManager.prototype

	StateManager.fn.update = function() {
		var visible = eval(this.options.visible)
		var readonly = eval(this.options.readonly)
		if (visible)
			this.$element.show()
		else
			this.$element.hide()
		if (readonly)
			this.$element.attr("readonly", true)
		else
			this.$element.attr("readonly", false)
	}

	function Plugin(option) {
		if (this.length != 1) return;
		var $this = $(this)
		var data = $this.data('u.statemanager')
		var options = typeof option == 'object' && option

		if (!data) $this.data('u.statemanager', (data = new StateManager(this, options)))
			//	else data.update(options);
		return data;
	}

	var old = $.fn.stateManager

	$.fn.stateManager = Plugin
	$.fn.stateManager.Constructor = StateManager


	$.fn.stateManager.noConflict = function() {
		$.fn.stateManager = old
		return this
	}

	$.StateManager = StateManager
}(jQuery)
+ function($) {
	var Validate = function(element,options,form) {
		var self = this
		this.$element = element
		this.$form = form
		this.options = options
		this.required = false
		//所有属性优先级 ：  options参数  > attr属性  > 默认值 
		this.required = this.options['required']  ? this.options['required'] : this.$element.attr('required') ? true : false
		this.validType = this.options['validType'] ? this.options['validType'] : 
			this.$element.attr('valid-type') ? this.$element.attr('valid-type') : null
		//校验模式  blur  submit
		this.validMode = this.options['validMode'] ? this.options['validMode'] :
			this.$element.attr('valid-mode') ? this.$element.attr('valid-mode') : Validate.DEFAULTS.validMode
		//空提示	
		this.nullMsg = this.options['nullMsg'] ? this.options['nullMsg'] :
			this.$element.attr('null-msg') ? this.$element.attr('null-msg') : Validate.NULLMSG[this.validType]
		//是否必填	
		if (this.required && !this.nullMsg)
			this.nullmsg = Validate.NULLMSG['required']
		//错误必填	
		this.errorMsg = this.options['errorMsg'] ? this.options['nullMsg'] : 
			$(element).attr('error-msg') ? this.$element.attr('error-msg') : Validate.ERRORMSG[this.validType]
		//正则校验	
		this.regExp = this.options['reg'] ? this.options['reg'] : 
			$(element).attr('reg') ? this.$element.attr('reg') : Validate.REG[this.validType]
		//提示div的id 为空时使用tooltop来提示	
		this.tipId = this.options['tipId'] ? this.options['tipId'] : 
			$(element).attr('tip-id') ? this.$element.attr('tip-id') : null
		//提示框位置	
		this.placement = this.options['placement'] ? this.options['placement'] : 
			$(element).attr('placement') ? this.$element.attr('placement') : Validate.DEFAULTS.placement
		//
		this.minLength = this.options['minLength'] ? this.options['minLength'] : 
			$(element).attr('min-length') ? this.$element.attr('min-length') : null
		this.maxLength = this.options['maxLength'] ? this.options['maxLength'] : 
			$(element).attr('max-length') ? this.$element.attr('max-length') : null
		this.min = this.options['min'] ? this.options['min'] : 
			$(element).attr('min') ? this.$element.attr('min') : null
		this.max = this.options['max'] ? this.options['max'] : 
			$(element).attr('max') ? this.$element.attr('max') : null
		this.create()
	}
	
	Validate.tipTemplate = null 
	// Validate.NULLMSG = {
	// 	"required": trans('validate.required', "不能为空！"),
	// 	"integer": trans('validate.integer', "请填写整数！"),
	// 	"float": trans('validate.float', "请填写数字！"),
	// 	"zipCode": trans('validate.zipCode', "请填写邮政编码！"),
	// 	"phone": trans('validate.phone', "请填写手机号码！"),
	// 	"email": trans('validate.email', "请填写邮箱地址！"),
	// 	"url": trans('validate.url', "请填写网址！")
		
	// }

	// Validate.ERRORMSG = {
	// 	"integer": trans('validate.integer', "请填写整数！"),
	// 	"float": trans('validate.float', "请填写数字！"),
	// 	"error_zipCode": trans('validate.zipCode', "邮政编码格式不对！"),
	// 	"error_phone": trans('validate.phone', "手机号码格式不对！"),
	// 	"error_email": trans('validate.email', "邮箱地址格式不对！"),
	// 	"error_url": trans('validate.url', "网址格式不对！")
	// }

	Validate.REG = {
		"integer": /^-?\d+$/,
		"float": /^-?\d+(\.\d+)?$/,
		"zipCode": /^[0-9]{6}$/,
		"phone": /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
		"email": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		"url": /^(\w+:\/\/)?\w+(\.\w+)+.*$/
	}

	Validate.DEFAULTS = {
		validMode: 'blur',
		placement: "top"
	}

	Validate.fn = Validate.prototype

	Validate.fn.create = function() {
		var self = this
		this.$element.on('blur', function(e) {
			if (self.validMode == 'blur')
				self.doValid()
		}).on('focus', function(e) {
			//隐藏错误信息
			self.hideMsg()
		}).on('change', function(e) {
			//隐藏错误信息
			self.hideMsg()
		}).on('keypress', function(e) {
			//			middleValidate  ??
		})
	}
	
	Validate.fn.updateOptions = function(options){
		
	}

	Validate.fn.doValid = function() {
		if (this.$element.attr("readonly")) return true
		var value = this.getValue()
		if (this.isEmpty(value) && this.required) {
			this.showMsg(this.nullMsg)
			return false
		} 
		if (this.regExp) {
			var reg = new RegExp(this.regExp);
			var r = value.match(reg);
			if (r == null || r == false){
				this.showMsg(this.errorMsg)
				return false
			}	
		}
		if (this.minLength){
			if (value.lengthb() < this.minLength){
				this.showMsg("输入长度不能小于" + this.minLength + "位")
				return false
			}
		}
		if (this.maxLength){
			if (value.lengthb() > this.maxLength){
				this.showMsg("输入长度不能大于" + this.maxLength + "位")
				return false
			}
		}
		if (this.max){
			if (value > this.max){
				this.showMsg("输入值不能大于" + this.max)
				return false
			}
		}
		if(this.min){
			if (value < this.min){
				this.showMsg("输入值不能小于" + this.min)
				return false
			}
		}
		return true
	}
	
	Validate.fn.getValue = function() {
		var inputval
		if (this.$element.is(":radio")) {
			inputval = this.$form.find(":radio[name='" + this.$element.attr("name") + "']:checked").val();
		} else if (this.$element.is(":checkbox")) {
			inputval = "";
			this.$form.find(":checkbox[name='" + obj.attr("name") + "']:checked").each(function() {
				inputval += $(this).val() + ',';
			})
		} else if (this.$element.is('div')) {
			inputval = this.$element[0].trueValue;
		} else {
			inputval = this.$element.val();
		}
		inputval = $.trim(inputval);
		return this.isEmpty(inputval) ? "" : inputval;
	}

	Validate.fn.isEmpty = function(val) {
		return val === "" || val === $.trim(this.$element.attr("tip"));
	}

	Validate.fn.showMsg = function(msg) {
		if (this.tipId) {
			$('#' + this.tipId).html(msg).show()
		} else {
			var tipOptions = {
				"title": msg,
				"trigger": "manual",
				"placement": this.placement
			}
			if (Validate.tipTemplate)
				tipOptions.template = Validate.tipTemplate
			this.$element.tooltip(tipOptions)
			this.$element.tooltip('show')
		}
	}

	Validate.fn.hideMsg = function() {
		if (this.tipId) {
			$('#' + this.tipId).hide()
		} else {
			this.$element.tooltip('destroy')
		}
	}

	function Plugin($element, options) {
		var self = this
		this.options = options
		this.$element = $element
		if (this.$element.children().length > 0) {
			var $form = this.$element.find('[valid-type], [required]')			
			$form.each(function() {
				var $this = $(this)
				self.createValidate($this, options, $form)
			})
		} else
			this.createValidate(this.$element, options)
		return this
	}

	Plugin.fn = Plugin.prototype

	Plugin.fn.createValidate = function($ele, options, $form) {
		var data = $ele.data('u.validate')
		var options = typeof options == 'object' && options
		if (!data) $ele.data('u.validate', (data = new Validate($ele, options, $form)))
	}

	Plugin.fn.check = function() {
		var passed = true
		if (this.$element.children().length > 0) {
			var $form = this.$element.find('[valid-type], [required]')
			$form.each(function() {
				var validate = $(this).data('u.validate')
				passed = passed && validate.doValid()
			})
		} else{
			var validate = this.$element.data('u.validate')
			passed = validate.doValid()
		}
		return passed	
	}

	var old = $.fn.validate;

	$.fn.validate = function(options){
		var plug = new Plugin(this, options)
		return plug
	}

	$.fn.validate.noConflict = function() {
		$.fn.validate = old;
		return this;
	}

}(jQuery);
;(function($){
	var Combobox = function(element,options){
		
        var self = this;
        this.$element = element;       
		this.options=$.extend({}, Combobox.DEFAULTS,options);
		this.items = [] ;
		
		Object.defineProperty(element[0], 'value', {
			
				get: function() {
					
					return this.trueValue;
				},
				set: function(pk) {
					
					var items = self.items;
					
					for( var i=0,length=items.length; i<length; i++){
						   
						   var ipk = items[i].pk;
						   if(ipk==pk){
						   	 this.innerHTML = items[i].name;
						   	 this.trueValue = pk;
						   	 break;
						   }else{
						   	  
						   	 this.trueValue = '';	
						     this.innerHTML = '';
						   }
						
					}
															
				}
			})

		
        this.createDom();
        this.focusEvent();
        this.clickEvent();
        this.blurEvent();
        this.divValue();
       
	}
	
	Combobox.DEFAULTS = {
		   dataSource:{},
		   multSelect:false,
		   onSelect: function(){}
	}
	
	Combobox.fn = Combobox.prototype;
	
	Combobox.fn.createDom = function(){
		    		   
			var data = this.options.dataSource;
			if($.isEmptyObject(data)){
				throw new Error("dataSource为空！");
			}
			
			var oDiv = document.createElement("div");
				oDiv.className = 'select-list-div';
				
			    this.oDiv = oDiv;
			
			var oUl = document.createElement("ul");
			
			oUl.className = 'select-list-ul';
			for(var i=0;i<data.length;i++){
			  var item = {
			  	pk:data[i].pk,
			  	name:data[i].name			  	
			  }
			  this.items.push(item)
			  var oLi =	document.createElement("li");
			
			  oLi.item = item ;
			  oLi.innerHTML = data[i]['name'];
			  oUl.appendChild(oLi);
			
		 }
			
			
			oDiv.appendChild(oUl);
			oDiv.style.display = 'none';
			document.body.appendChild(oDiv);
										
	}		    
	
	Combobox.fn.focusEvent = function(){
		   var self = this;
		   this.$element.on('click', function(e){
			
                self.show();
			
				self.floatLayer();
				
				self.floatLayerEvent();
				
				if(e.stopPropagation){
					e.stopPropagation();
				}else{
					e.cancelBubble = true;					
				}
			  			
        });
	}
	
	//下拉图标的点击事件
	Combobox.fn.clickEvent = function(){
		   var self = this;
		   var caret = this.$element.next('.input-group-addon')[0]||this.$element.next(':button')[0];
		   
		   $(caret).on('click',function(e){
		   	
		   	    self.show();
			
				self.floatLayer();
				
				self.floatLayerEvent();
				
				if(e.stopPropagation){
					e.stopPropagation();
				}else{
					e.cancelBubble = true;					
				}
		   	
		   })
	}
	
	//tab键切换 下拉隐藏	
	Combobox.fn.blurEvent = function(){
		   var self = this;
		 	  
		   this.$element.on('keyup', function(e){
			    var key = e.which || e.keyCode;
				if(key==9){
					self.show();
				}else{
					
					self.hide();
				}					     					  			
        }).on('keydown',function(e){
			   self.hide();
		});
	}
	
	
	
	Combobox.fn.floatLayer = function(){
		
		if($(".select-floatDiv").length==0){
					
				   var oDivTwo = document.createElement("div");
			
			       oDivTwo.className = 'select-floatDiv';
			       document.body.appendChild(oDivTwo);
			}
		
	}
	
	Combobox.fn.floatLayerEvent = function(){
		  var self = this;
		  $(".select-floatDiv").click(function(e){

                 self.hide();
        	     $(this).remove();
        	     
        	    if(e.stopPropagation){
					e.stopPropagation();
				}else{
					e.cancelBubble = true;					
				}
           });
		
		
	}
	
	Combobox.fn.show = function(){
		
		 var left = this.$element.offset().left;
		 var top  = this.$element.offset().top;
		 
		 var selectHeight = this.options.dataSource.length*30+10+10;
		 
		 var differ = (top+this.$element.outerHeight()+selectHeight) - ($(window).height()+$(window).scrollTop());
		 var oDiv = this.oDiv;
		
		 if(differ>0){
		 	
		 	 oDiv.style.left = left+'px';
		     oDiv.style.top  = top-selectHeight+'px';
		 	
		 }else{
		 	
		 	oDiv.style.left = left+'px';
		    oDiv.style.top  = top+this.$element.outerHeight()+'px';
		 	
		 }
		 			 		
		  oDiv.style.display = 'block';
	}
	
	Combobox.fn.hide = function(){
		this.oDiv.style.display = 'none';
	}
	
	Combobox.fn.divValue = function(){
		var self = this;
		var oLis = this.oDiv.getElementsByTagName('li');
		for(var i=0;i<oLis.length;i++){
			oLis[i].onclick = function(){
			    
			    var item = this.item
				self.$element.val(item.pk);
								
				self.oDiv.style.display = 'none';
				
				self.options.onSelect(item);
				
				self.$element.trigger('change');				
				
				
			}
		}
	}
	

	var Plugin = function(option){
		
		var $this = $(this);
		var data  = $this.data('s.select');
        var options = typeof option == 'object' && option

      if (!data) $this.data('s.select', (new Combobox(this,options)))
			
	}
	
	$.fn.Combobox = Plugin;
	
})(jQuery);
//! moment.js
//! version : 2.9.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (undefined) {
    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = '2.9.0',
        // the global-scope this is NOT the global object in Node.js
        globalScope = (typeof global !== 'undefined' && (typeof window === 'undefined' || window === global.window)) ? global : this,
        oldGlobalMoment,
        round = Math.round,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for locale config files
        locales = {},

        // extra moment internal properties (plugins register props here)
        momentProperties = [],

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenOffsetMs = /[\+\-]?\d+/, // 1234567890123
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker '+10:00' > ['10', '00'] or '-1530' > ['-', '15', '30']
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // default relative time thresholds
        relativeTimeThresholds = {
            s: 45,  // seconds to minute
            m: 45,  // minutes to hour
            h: 22,  // hours to day
            d: 26,  // days to month
            M: 11   // months to year
        },

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.localeData().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.localeData().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.localeData().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.localeData().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.localeData().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = this.utcOffset(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = this.utcOffset(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            x    : function () {
                return this.valueOf();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        deprecations = {},

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'],

        updateInProgress = false;

    // Pick the first defined of two or three arguments. dfl comes from
    // default.
    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2: return a != null ? a : b;
            case 3: return a != null ? a : b != null ? b : c;
            default: throw new Error('Implement me');
        }
    }

    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b);
    }

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false &&
                typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function () {
            if (firstTime) {
                printMsg(msg);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
        }
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.localeData().ordinal(func.call(this, a), period);
        };
    }

    function monthDiff(a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // thie is not supposed to happen
            return hour;
        }
    }

    /************************************
        Constructors
    ************************************/

    function Locale() {
    }

    // Moment prototype object
    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config);
        }
        copyConfig(this, config);
        this._d = new Date(+config._d);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            moment.updateOffset(this);
            updateInProgress = false;
        }
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = moment.localeData();

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = from._pf;
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
        };
    }

    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return Object.prototype.toString.call(input) === '[object Date]' ||
            input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment._locale[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 24 ||
                    (m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 ||
                                           m._a[SECOND] !== 0 ||
                                           m._a[MILLISECOND] !== 0)) ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0 &&
                    m._pf.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
                moment.locale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // Return a moment from input, that is local/utc/utcOffset equivalent to
    // model.
    function makeAs(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (moment.isMoment(input) || isDate(input) ?
                    +input : +moment(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            moment.updateOffset(res, false);
            return res;
        } else {
            return moment(input).local();
        }
    }

    /************************************
        Locale
    ************************************/


    extend(Locale.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
            // Lenient ordinal parsing accepts just a number in addition to
            // number + (possibly) stuff coming from _ordinalParseLenient.
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);
        },

        _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName, format, strict) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                mom = moment.utc([2000, i]);
                if (strict && !this._longMonthsParse[i]) {
                    this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                    this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
                }
                if (!strict && !this._monthsParse[i]) {
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                    return i;
                } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                    return i;
                } else if (!strict && this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LTS : 'h:mm:ss A',
            LT : 'h:mm A',
            L : 'MM/DD/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY LT',
            LLLL : 'dddd, MMMM D, YYYY LT'
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },


        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom, now) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom, [now]) : output;
        },

        _relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },

        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },

        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace('%d', number);
        },
        _ordinal : '%d',
        _ordinalParse : /\d{1,2}/,

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        firstDayOfWeek : function () {
            return this._week.dow;
        },

        firstDayOfYear : function () {
            return this._week.doy;
        },

        _invalidDate: '',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) {
                return parseTokenOneDigit;
            }
            /* falls through */
        case 'SS':
            if (strict) {
                return parseTokenTwoDigits;
            }
            /* falls through */
        case 'SSS':
            if (strict) {
                return parseTokenThreeDigits;
            }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return config._locale._meridiemParse;
        case 'x':
            return parseTokenOffsetMs;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
            return a;
        }
    }

    function utcOffsetFromString(string) {
        string = string || '';
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = config._locale.monthsParse(input, token, config._strict);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(
                            input.match(/\d{1,2}/)[0], 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._meridiem = input;
            // config._isPm = config._locale.isPM(input);
            break;
        // HOUR
        case 'h' : // fall through to hh
        case 'hh' :
            config._pf.bigHour = true;
            /* falls through */
        case 'H' : // fall through to HH
        case 'HH' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX OFFSET (MILLISECONDS)
        case 'x':
            config._d = new Date(toInt(input));
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = utcOffsetFromString(input);
            break;
        // WEEKDAY - human
        case 'dd':
        case 'ddd':
        case 'dddd':
            a = config._locale.weekdaysParse(input);
            // if we didn't get a weekday name, mark the date as invalid
            if (a != null) {
                config._w = config._w || {};
                config._w['d'] = a;
            } else {
                config._pf.invalidWeekday = input;
            }
            break;
        // WEEK, WEEK DAY - numeric
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gggg':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
            }
            break;
        case 'gg':
        case 'GG':
            config._w = config._w || {};
            config._w[token] = moment.parseTwoDigitYear(input);
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day || normalizedInput.date,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
            config._pf.bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR],
                config._meridiem);
        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function parseISO(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be 'T' or undefined
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += 'Z';
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function makeDateFromInput(config) {
        var input = config._i, matched;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            dateFromConfig(config);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            years = round(duration.as('y')),

            args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < relativeTimeThresholds.h && ['hh', hours] ||
                days === 1 && ['d'] ||
                days < relativeTimeThresholds.d && ['dd', days] ||
                months === 1 && ['M'] ||
                months < relativeTimeThresholds.M && ['MM', months] ||
                years === 1 && ['y'] || ['yy', years];

        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f,
            res;

        config._locale = config._locale || moment.localeData(config._l);

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (moment.isMoment(input)) {
            return new Moment(input, true);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        res = new Moment(config);
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    moment = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    moment.min = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    };

    moment.max = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    };

    // creating with utc
    moment.utc = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso,
            diffRes;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' &&
                ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // constant that refers to the ISO standard
    moment.ISO_8601 = function () {};

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function allows you to set a threshold for relative time strings
    moment.relativeTimeThreshold = function (threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold];
        }
        relativeTimeThresholds[threshold] = limit;
        return true;
    };

    moment.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        function (key, value) {
            return moment.locale(key, value);
        }
    );

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    moment.locale = function (key, values) {
        var data;
        if (key) {
            if (typeof(values) !== 'undefined') {
                data = moment.defineLocale(key, values);
            }
            else {
                data = moment.localeData(key);
            }

            if (data) {
                moment.duration._locale = moment._locale = data;
            }
        }

        return moment._locale._abbr;
    };

    moment.defineLocale = function (name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);

            // backwards compat for now: also set the locale
            moment.locale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    };

    moment.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        function (key) {
            return moment.localeData(key);
        }
    );

    // returns locale data
    moment.localeData = function (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return moment._locale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null && hasOwnProp(obj, '_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    moment.isDate = isDate;

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d - ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                if ('function' === typeof Date.prototype.toISOString) {
                    // native implementation is ~50x faster, use it when we can
                    return this.toDate().toISOString();
                } else {
                    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                }
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function (keepLocalTime) {
            return this.utcOffset(0, keepLocalTime);
        },

        local : function (keepLocalTime) {
            if (this._isUTC) {
                this.utcOffset(0, keepLocalTime);
                this._isUTC = false;

                if (keepLocalTime) {
                    this.subtract(this._dateUtcOffset(), 'm');
                }
            }
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output);
        },

        add : createAdder(1, 'add'),

        subtract : createAdder(-1, 'subtract'),

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (that.utcOffset() - this.utcOffset()) * 6e4,
                anchor, diff, output, daysAdjust;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month' || units === 'quarter') {
                output = monthDiff(this, that);
                if (units === 'quarter') {
                    output = output / 3;
                } else if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = this - that;
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function (time) {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're locat/utc/offset
            // or not.
            var now = time || moment(),
                sod = makeAs(now, this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.localeData().calendar(format, this, moment(now)));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.utcOffset() > this.clone().month(0).utcOffset() ||
                this.utcOffset() > this.clone().month(5).utcOffset());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf : function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            if (units === undefined || units === 'millisecond') {
                return this;
            }
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
        },

        isAfter: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this > +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return inputMs < +this.clone().startOf(units);
            }
        },

        isBefore: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this < +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return +this.clone().endOf(units) < inputMs;
            }
        },

        isBetween: function (from, to, units) {
            return this.isAfter(from, units) && this.isBefore(to, units);
        },

        isSame: function (input, units) {
            var inputMs;
            units = normalizeUnits(units || 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this === +input;
            } else {
                inputMs = +moment(input);
                return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
            }
        },

        min: deprecate(
                 'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
                 function (other) {
                     other = moment.apply(null, arguments);
                     return other < this ? this : other;
                 }
         ),

        max: deprecate(
                'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
                function (other) {
                    other = moment.apply(null, arguments);
                    return other > this ? this : other;
                }
        ),

        zone : deprecate(
                'moment().zone is deprecated, use moment().utcOffset instead. ' +
                'https://github.com/moment/moment/issues/1779',
                function (input, keepLocalTime) {
                    if (input != null) {
                        if (typeof input !== 'string') {
                            input = -input;
                        }

                        this.utcOffset(input, keepLocalTime);

                        return this;
                    } else {
                        return -this.utcOffset();
                    }
                }
        ),

        // keepLocalTime = true means only change the timezone, without
        // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
        // +0200, so we adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        utcOffset : function (input, keepLocalTime) {
            var offset = this._offset || 0,
                localAdjust;
            if (input != null) {
                if (typeof input === 'string') {
                    input = utcOffsetFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._dateUtcOffset();
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.add(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(input - offset, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }

                return this;
            } else {
                return this._isUTC ? offset : this._dateUtcOffset();
            }
        },

        isLocal : function () {
            return !this._isUTC;
        },

        isUtcOffset : function () {
            return this._isUTC;
        },

        isUtc : function () {
            return this._isUTC && this._offset === 0;
        },

        zoneAbbr : function () {
            return this._isUTC ? 'UTC' : '';
        },

        zoneName : function () {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        },

        parseZone : function () {
            if (this._tzm) {
                this.utcOffset(this._tzm);
            } else if (typeof this._i === 'string') {
                this.utcOffset(utcOffsetFromString(this._i));
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).utcOffset();
            }

            return (this.utcOffset() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        week : function (input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            var unit;
            if (typeof units === 'object') {
                for (unit in units) {
                    this.set(unit, units[unit]);
                }
            }
            else {
                units = normalizeUnits(units);
                if (typeof this[units] === 'function') {
                    this[units](value);
                }
            }
            return this;
        },

        // If passed a locale key, it will set the locale for this
        // instance.  Otherwise, it will return the locale configuration
        // variables for this instance.
        locale : function (key) {
            var newLocaleData;

            if (key === undefined) {
                return this._locale._abbr;
            } else {
                newLocaleData = moment.localeData(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        },

        lang : deprecate(
            'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
            function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    return this.locale(key);
                }
            }
        ),

        localeData : function () {
            return this._locale;
        },

        _dateUtcOffset : function () {
            // On Firefox.24 Date#getTimezoneOffset returns a floating point.
            // https://github.com/moment/moment/pull/1871
            return -Math.round(this._d.getTimezoneOffset() / 15) * 15;
        }

    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    // alias isUtc for dev-friendliness
    moment.fn.isUTC = moment.fn.isUtc;

    /************************************
        Duration Prototype
    ************************************/


    function daysToYears (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        return days * 400 / 146097;
    }

    function yearsToDays (years) {
        // years * 365 + absRound(years / 4) -
        //     absRound(years / 100) + absRound(years / 400);
        return years * 146097 / 400;
    }

    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years = 0;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);

            // Accurately convert days to years, assume start from year 0.
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));

            // 30 days to a month
            // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
            months += absRound(days / 30);
            days %= 30;

            // 12 months -> 1 year
            years += absRound(months / 12);
            months %= 12;

            data.days = days;
            data.months = months;
            data.years = years;
        },

        abs : function () {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);

            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);

            return this;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());

            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output);
            }

            return this.localeData().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            var days, months;
            units = normalizeUnits(units);

            if (units === 'month' || units === 'year') {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            } else {
                // handle milliseconds separately because of floating point math errors (issue #1867)
                days = this._days + Math.round(yearsToDays(this._months / 12));
                switch (units) {
                    case 'week': return days / 7 + this._milliseconds / 6048e5;
                    case 'day': return days + this._milliseconds / 864e5;
                    case 'hour': return days * 24 + this._milliseconds / 36e5;
                    case 'minute': return days * 24 * 60 + this._milliseconds / 6e4;
                    case 'second': return days * 24 * 60 * 60 + this._milliseconds / 1000;
                    // Math.floor prevents floating point math errors here
                    case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
                    default: throw new Error('Unknown unit ' + units);
                }
            }
        },

        lang : moment.fn.lang,
        locale : moment.fn.locale,

        toIsoString : deprecate(
            'toIsoString() is deprecated. Please use toISOString() instead ' +
            '(notice the capitals)',
            function () {
                return this.toISOString();
            }
        ),

        toISOString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        },

        localeData : function () {
            return this._locale;
        },

        toJSON : function () {
            return this.toISOString();
        }
    });

    moment.duration.fn.toString = moment.duration.fn.toISOString;

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }

    moment.duration.fn.asMilliseconds = function () {
        return this.as('ms');
    };
    moment.duration.fn.asSeconds = function () {
        return this.as('s');
    };
    moment.duration.fn.asMinutes = function () {
        return this.as('m');
    };
    moment.duration.fn.asHours = function () {
        return this.as('h');
    };
    moment.duration.fn.asDays = function () {
        return this.as('d');
    };
    moment.duration.fn.asWeeks = function () {
        return this.as('weeks');
    };
    moment.duration.fn.asMonths = function () {
        return this.as('M');
    };
    moment.duration.fn.asYears = function () {
        return this.as('y');
    };

    /************************************
        Default Locale
    ************************************/


    // Set default locale, other locale will inherit from English.
    moment.locale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // moment.js locale configuration
// locale : afrikaans (af)
// author : Werner Mollentze : https://github.com/wernerm

(function (factory) {
    factory(moment);
}(function (moment) {
    return moment.defineLocale('af', {
        months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
        weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
        weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
        weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
        meridiemParse: /vm|nm/i,
        isPM : function (input) {
            return /^nm$/i.test(input);
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower ? 'vm' : 'VM';
            } else {
                return isLower ? 'nm' : 'NM';
            }
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'LT:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd, D MMMM YYYY LT'
        },
        calendar : {
            sameDay : '[Vandag om] LT',
            nextDay : '[Môre om] LT',
            nextWeek : 'dddd [om] LT',
            lastDay : '[Gister om] LT',
            lastWeek : '[Laas] dddd [om] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'oor %s',
            past : '%s gelede',
            s : '\'n paar sekondes',
            m : '\'n minuut',
            mm : '%d minute',
            h : '\'n uur',
            hh : '%d ure',
            d : '\'n dag',
            dd : '%d dae',
            M : '\'n maand',
            MM : '%d maande',
            y : '\'n jaar',
            yy : '%d jaar'
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
        },
        week : {
            dow : 1, // Maandag is die eerste dag van die week.
            doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
        }
    });
}));
// moment.js locale configuration
// locale : chinese (zh-cn)
// author : suupic : https://github.com/suupic
// author : Zeno Zeng : https://github.com/zenozeng

(function (factory) {
    factory(moment);
}(function (moment) {
    return moment.defineLocale('zh-cn', {
        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
        longDateFormat : {
            LT : 'Ah点mm',
            LTS : 'Ah点m分s秒',
            L : 'YYYY-MM-DD',
            LL : 'YYYY年MMMD日',
            LLL : 'YYYY年MMMD日LT',
            LLLL : 'YYYY年MMMD日ddddLT',
            l : 'YYYY-MM-DD',
            ll : 'YYYY年MMMD日',
            lll : 'YYYY年MMMD日LT',
            llll : 'YYYY年MMMD日ddddLT'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' ||
                    meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar : {
            sameDay : function () {
                return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
            },
            nextDay : function () {
                return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
            },
            lastDay : function () {
                return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
            },
            nextWeek : function () {
                var startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
            },
            lastWeek : function () {
                var startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
            },
            sameElse : 'LL'
        },
        ordinalParse: /\d{1,2}(日|月|周)/,
        ordinal : function (number, period) {
            switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
            }
        },
        relativeTime : {
            future : '%s内',
            past : '%s前',
            s : '几秒',
            m : '1分钟',
            mm : '%d分钟',
            h : '1小时',
            hh : '%d小时',
            d : '1天',
            dd : '%d天',
            M : '1个月',
            MM : '%d个月',
            y : '1年',
            yy : '%d年'
        },
        week : {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
}));


    moment.locale('en');


    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    'Accessing Moment through the global scope is ' +
                    'deprecated, and will be removed in an upcoming ' +
                    'release.',
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === 'function' && define.amd) {
        define(function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);

/*! version : 4.7.14
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
/*
 The MIT License (MIT)

 Copyright (c) 2015 Jonathan Peterson

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
/*global define:false */
/*global exports:false */
/*global require:false */
/*global jQuery:false */
/*global moment:false */
(function (factory) {
    'use strict';
    // if (typeof define === 'function' && define.amd) {
    //     // AMD is used - Register as an anonymous module.
    //     define(['jquery', 'moment'], factory);
    // } else if (typeof exports === 'object') {
    //     factory(require('jquery'), require('moment'));
    // } else {
    //     // Neither AMD nor CommonJS used. Use global variables.
    //     if (typeof jQuery === 'undefined') {
    //         throw 'bootstrap-datetimepicker requires jQuery to be loaded first';
    //     }
    //     if (typeof moment === 'undefined') {
    //         throw 'bootstrap-datetimepicker requires Moment.js to be loaded first';
    //     }
        factory(jQuery, moment);
    // }
}(function ($, moment) {
    'use strict';
    if($.app){
	 			$.each($("[data-provide='datetimepicker']"), function(i,node) {    	 				
	 				var tmpt = $(node).children("div");
            		$.datepicker_mobile(tmpt.text(),tmpt,"test")
	 				                                                          
	 			});
            	
     			return;
	}
    if (!moment) {
        throw new Error('bootstrap-datetimepicker requires Moment.js to be loaded first');
    }
    var inputSelector = 'input,div[contenteditable=true]'

    var dateTimePicker = function (element, options) {
        var picker = {},
            date = moment().startOf('d'),
            viewDate = date.clone(),
            unset = true,
            input,
            component = false,
            widget = false,
            use24Hours,
            minViewModeNumber = 0,
            actualFormat,
            parseFormats,
            currentViewMode,
            datePickerModes = [
                {
                    clsName: 'days',
                    navFnc: 'M',
                    navStep: 1
                },
                {
                    clsName: 'months',
                    navFnc: 'y',
                    navStep: 1
                },
                {
                    clsName: 'years',
                    navFnc: 'y',
                    navStep: 10
                }
            ],
            viewModes = ['days', 'months', 'years'],
            verticalModes = ['top', 'bottom', 'auto'],
            horizontalModes = ['left', 'right', 'auto'],
            toolbarPlacements = ['default', 'top', 'bottom'],
            keyMap = {
                'up': 38,
                38: 'up',
                'down': 40,
                40: 'down',
                'left': 37,
                37: 'left',
                'right': 39,
                39: 'right',
                'tab': 9,
                9: 'tab',
                'escape': 27,
                27: 'escape',
                'enter': 13,
                13: 'enter',
                'pageUp': 33,
                33: 'pageUp',
                'pageDown': 34,
                34: 'pageDown',
                'shift': 16,
                16: 'shift',
                'control': 17,
                17: 'control',
                'space': 32,
                32: 'space',
                't': 84,
                84: 't',
                'delete': 46,
                46: 'delete'
            },
            keyState = {},

            /********************************************************************************
             *
             * Private functions
             *
             ********************************************************************************/
            isEnabled = function (granularity) {
                if (typeof granularity !== 'string' || granularity.length > 1) {
                    throw new TypeError('isEnabled expects a single character string parameter');
                }
                switch (granularity) {
                    case 'y':
                        return actualFormat.indexOf('Y') !== -1;
                    case 'M':
                        return actualFormat.indexOf('M') !== -1;
                    case 'd':
                        return actualFormat.toLowerCase().indexOf('d') !== -1;
                    case 'h':
                    case 'H':
                        return actualFormat.toLowerCase().indexOf('h') !== -1;
                    case 'm':
                        return actualFormat.indexOf('m') !== -1;
                    case 's':
                        return actualFormat.indexOf('s') !== -1;
                    default:
                        return false;
                }
            },

            hasTime = function () {
                return (isEnabled('h') || isEnabled('m') || isEnabled('s'));
            },

            hasDate = function () {
                return (isEnabled('y') || isEnabled('M') || isEnabled('d'));
            },

            getDatePickerTemplate = function () {
                var headTemplate = $('<thead>')
                        .append($('<tr>')
                            .append($('<th>').addClass('prev').attr('data-action', 'previous')
                                .append($('<span>').addClass(options.icons.previous))
                                )
                            .append($('<th>').addClass('picker-switch').attr('data-action', 'pickerSwitch').attr('colspan', (options.calendarWeeks ? '6' : '5')))
                            .append($('<th>').addClass('next').attr('data-action', 'next')
                                .append($('<span>').addClass(options.icons.next))
                                )
                            ),
                    contTemplate = $('<tbody>')
                        .append($('<tr>')
                            .append($('<td>').attr('colspan', (options.calendarWeeks ? '8' : '7')))
                            );

                return [
                    $('<div>').addClass('datepicker-days')
                        .append($('<table>').addClass('table-condensed')
                            .append(headTemplate)
                            .append($('<tbody>'))
                            ),
                    $('<div>').addClass('datepicker-months')
                        .append($('<table>').addClass('table-condensed')
                            .append(headTemplate.clone())
                            .append(contTemplate.clone())
                            ),
                    $('<div>').addClass('datepicker-years')
                        .append($('<table>').addClass('table-condensed')
                            .append(headTemplate.clone())
                            .append(contTemplate.clone())
                            )
                ];
            },

            getTimePickerMainTemplate = function () {
                var topRow = $('<tr>'),
                    middleRow = $('<tr>'),
                    bottomRow = $('<tr>');

                if (isEnabled('h')) {
                    topRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1'}).addClass('btn').attr('data-action', 'incrementHours')
                            .append($('<span>').addClass(options.icons.up))));
                    middleRow.append($('<td>')
                        .append($('<span>').addClass('timepicker-hour').attr('data-time-component', 'hours').attr('data-action', 'showHours')));
                    bottomRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1'}).addClass('btn').attr('data-action', 'decrementHours')
                            .append($('<span>').addClass(options.icons.down))));
                }
                if (isEnabled('m')) {
                    if (isEnabled('h')) {
                        topRow.append($('<td>').addClass('separator'));
                        middleRow.append($('<td>').addClass('separator').html(':'));
                        bottomRow.append($('<td>').addClass('separator'));
                    }
                    topRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1'}).addClass('btn').attr('data-action', 'incrementMinutes')
                            .append($('<span>').addClass(options.icons.up))));
                    middleRow.append($('<td>')
                        .append($('<span>').addClass('timepicker-minute').attr('data-time-component', 'minutes').attr('data-action', 'showMinutes')));
                    bottomRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1'}).addClass('btn').attr('data-action', 'decrementMinutes')
                            .append($('<span>').addClass(options.icons.down))));
                }
                if (isEnabled('s')) {
                    if (isEnabled('m')) {
                        topRow.append($('<td>').addClass('separator'));
                        middleRow.append($('<td>').addClass('separator').html(':'));
                        bottomRow.append($('<td>').addClass('separator'));
                    }
                    topRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1'}).addClass('btn').attr('data-action', 'incrementSeconds')
                            .append($('<span>').addClass(options.icons.up))));
                    middleRow.append($('<td>')
                        .append($('<span>').addClass('timepicker-second').attr('data-time-component', 'seconds').attr('data-action', 'showSeconds')));
                    bottomRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1'}).addClass('btn').attr('data-action', 'decrementSeconds')
                            .append($('<span>').addClass(options.icons.down))));
                }

                if (!use24Hours) {
                    topRow.append($('<td>').addClass('separator'));
                    middleRow.append($('<td>')
                        .append($('<button>').addClass('btn btn-primary').attr('data-action', 'togglePeriod')));
                    bottomRow.append($('<td>').addClass('separator'));
                }

                return $('<div>').addClass('timepicker-picker')
                    .append($('<table>').addClass('table-condensed')
                        .append([topRow, middleRow, bottomRow]));
            },

            getTimePickerTemplate = function () {
                var hoursView = $('<div>').addClass('timepicker-hours')
                        .append($('<table>').addClass('table-condensed')),
                    minutesView = $('<div>').addClass('timepicker-minutes')
                        .append($('<table>').addClass('table-condensed')),
                    secondsView = $('<div>').addClass('timepicker-seconds')
                        .append($('<table>').addClass('table-condensed')),
                    ret = [getTimePickerMainTemplate()];

                if (isEnabled('h')) {
                    ret.push(hoursView);
                }
                if (isEnabled('m')) {
                    ret.push(minutesView);
                }
                if (isEnabled('s')) {
                    ret.push(secondsView);
                }

                return ret;
            },

            getToolbar = function () {
                var row = [];
                if (options.showTodayButton) {
                    row.push($('<td>').append($('<a>').attr('data-action', 'today').append($('<span>').addClass(options.icons.today))));
                }
                if (!options.sideBySide && hasDate() && hasTime()) {
                    row.push($('<td>').append($('<a>').attr('data-action', 'togglePicker').append($('<span>').addClass(options.icons.time))));
                }
                if (options.showClear) {
                    row.push($('<td>').append($('<a>').attr('data-action', 'clear').append($('<span>').addClass(options.icons.clear))));
                }
                if (options.showClose) {
                    row.push($('<td>').append($('<a>').attr('data-action', 'close').append($('<span>').addClass(options.icons.close))));
                }
                return $('<table>').addClass('table-condensed').append($('<tbody>').append($('<tr>').append(row)));
            },

            getTemplate = function () {
                var template = $('<div>').addClass('bootstrap-datetimepicker-widget dropdown-menu'),
                    dateView = $('<div>').addClass('datepicker').append(getDatePickerTemplate()),
                    timeView = $('<div>').addClass('timepicker').append(getTimePickerTemplate()),
                    content = $('<ul>').addClass('list-unstyled'),
                    toolbar = $('<li>').addClass('picker-switch' + (options.collapse ? ' accordion-toggle' : '')).append(getToolbar());

                if (options.inline) {
                    template.removeClass('dropdown-menu');
                }

                if (use24Hours) {
                    template.addClass('usetwentyfour');
                }
                if (options.sideBySide && hasDate() && hasTime()) {
                    template.addClass('timepicker-sbs');
                    template.append(
                        $('<div>').addClass('row')
                            .append(dateView.addClass('col-sm-6'))
                            .append(timeView.addClass('col-sm-6'))
                    );
                    template.append(toolbar);
                    return template;
                }

                if (options.toolbarPlacement === 'top') {
                    content.append(toolbar);
                }
                if (hasDate()) {
                    content.append($('<li>').addClass((options.collapse && hasTime() ? 'collapse in' : '')).append(dateView));
                }
                if (options.toolbarPlacement === 'default') {
                    content.append(toolbar);
                }
                if (hasTime()) {
                    content.append($('<li>').addClass((options.collapse && hasDate() ? 'collapse' : '')).append(timeView));
                }
                if (options.toolbarPlacement === 'bottom') {
                    content.append(toolbar);
                }
                return template.append(content);
            },

            dataToOptions = function () {
                var eData,
                    dataOptions = {};

                if (element.is(inputSelector) || options.inline) {
                    eData = element.data();
                } else {
                    eData = element.find(inputSelector).data();
                }

                if (eData.dateOptions && eData.dateOptions instanceof Object) {
                    dataOptions = $.extend(true, dataOptions, eData.dateOptions);
                }

                $.each(options, function (key) {
                    var attributeName = 'date' + key.charAt(0).toUpperCase() + key.slice(1);
                    if (eData[attributeName] !== undefined) {
                        dataOptions[key] = eData[attributeName];
                    }
                });
                return dataOptions;
            },

            place = function () {
                var position = (component || element).position(),
                    offset = (component || element).offset(),
                    vertical = options.widgetPositioning.vertical,
                    horizontal = options.widgetPositioning.horizontal,
                    parent;

                if (options.widgetParent) {
                    parent = options.widgetParent.append(widget);
                } else if (element.is(inputSelector)) {
                    parent = element.parent().append(widget);
                } else if (options.inline) {
                    parent = element.append(widget);
                    return;
                } else {
                    parent = element;
                    element.children().first().after(widget);
                }

                // Top and bottom logic
                if (vertical === 'auto') {
                    if (offset.top + widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() &&
                        widget.height() + element.outerHeight() < offset.top) {
                        vertical = 'top';
                    } else {
                        vertical = 'bottom';
                    }
                }

                // Left and right logic
                if (horizontal === 'auto') {
                    if (parent.width() < offset.left + widget.outerWidth() / 2 &&
                        offset.left + widget.outerWidth() > $(window).width()) {
                        horizontal = 'right';
                    } else {
                        horizontal = 'left';
                    }
                }

                if (vertical === 'top') {
                    widget.addClass('top').removeClass('bottom');
                } else {
                    widget.addClass('bottom').removeClass('top');
                }

                if (horizontal === 'right') {
                    widget.addClass('pull-right');
                } else {
                    widget.removeClass('pull-right');
                }

                // find the first parent element that has a relative css positioning
                if (parent.css('position') !== 'relative') {
                    parent = parent.parents().filter(function () {
                        return $(this).css('position') === 'relative';
                    }).first();
                }

                if (parent.length === 0) {
                    throw new Error('datetimepicker component should be placed within a relative positioned container');
                }

                widget.css({
                    top: vertical === 'top' ? 'auto' : position.top + element.outerHeight(),
                    bottom: vertical === 'top' ? position.top + element.outerHeight() : 'auto',
                    left: horizontal === 'left' ? parent.css('padding-left') : 'auto',
                    right: horizontal === 'left' ? 'auto' : parent.width() - element.outerWidth()
                });
				//查询模板拓展
				if(options.afterShow){
					options.afterShow(widget,component || element);
				}
            },

            notifyEvent = function (e) {
                if (e.type === 'dp.change' && ((e.date && e.date.isSame(e.oldDate)) || (!e.date && !e.oldDate))) {
                    return;
                }
                element.trigger(e);
            },

            showMode = function (dir) {
                if (!widget) {
                    return;
                }
                if (dir) {
                    currentViewMode = Math.max(minViewModeNumber, Math.min(2, currentViewMode + dir));
                }
                widget.find('.datepicker > div').hide().filter('.datepicker-' + datePickerModes[currentViewMode].clsName).show();
            },

            fillDow = function () {
                var row = $('<tr>'),
                    currentDate = viewDate.clone().startOf('w');

                if (options.calendarWeeks === true) {
                    row.append($('<th>').addClass('cw').text('#'));
                }

                while (currentDate.isBefore(viewDate.clone().endOf('w'))) {
                    row.append($('<th>').addClass('dow').text(currentDate.format('dd')));
                    currentDate.add(1, 'd');
                }
                widget.find('.datepicker-days thead').append(row);
            },

            isInDisabledDates = function (testDate) {
                return options.disabledDates[testDate.format('YYYY-MM-DD')] === true;
            },

            isInEnabledDates = function (testDate) {
                return options.enabledDates[testDate.format('YYYY-MM-DD')] === true;
            },

            isValid = function (targetMoment, granularity) {
                if (!targetMoment.isValid()) {
                    return false;
                }
                if (options.disabledDates && isInDisabledDates(targetMoment) && granularity !== 'M') {
                    return false;
                }
                if (options.enabledDates && !isInEnabledDates(targetMoment) && granularity !== 'M') {
                    return false;
                }
                if (options.minDate && targetMoment.isBefore(options.minDate, granularity)) {
                    return false;
                }
                if (options.maxDate && targetMoment.isAfter(options.maxDate, granularity)) {
                    return false;
                }
                if (granularity === 'd' && options.daysOfWeekDisabled.indexOf(targetMoment.day()) !== -1) { //widget && widget.find('.datepicker-days').length > 0
                    return false;
                }
                return true;
            },

            fillMonths = function () {
                var spans = [],
                    monthsShort = viewDate.clone().startOf('y').hour(12); // hour is changed to avoid DST issues in some browsers
                while (monthsShort.isSame(viewDate, 'y')) {
                    spans.push($('<span>').attr('data-action', 'selectMonth').addClass('month').text(monthsShort.format('MMM')));
                    monthsShort.add(1, 'M');
                }
                widget.find('.datepicker-months td').empty().append(spans);
            },

            updateMonths = function () {
                var monthsView = widget.find('.datepicker-months'),
                    monthsViewHeader = monthsView.find('th'),
                    months = monthsView.find('tbody').find('span');

                monthsView.find('.disabled').removeClass('disabled');

                if (!isValid(viewDate.clone().subtract(1, 'y'), 'y')) {
                    monthsViewHeader.eq(0).addClass('disabled');
                }

                monthsViewHeader.eq(1).text(viewDate.year());

                if (!isValid(viewDate.clone().add(1, 'y'), 'y')) {
                    monthsViewHeader.eq(2).addClass('disabled');
                }

                months.removeClass('active');
                if (date.isSame(viewDate, 'y')) {
                    months.eq(date.month()).addClass('active');
                }

                months.each(function (index) {
                    if (!isValid(viewDate.clone().month(index), 'M')) {
                        $(this).addClass('disabled');
                    }
                });
            },

            updateYears = function () {
                var yearsView = widget.find('.datepicker-years'),
                    yearsViewHeader = yearsView.find('th'),
                    startYear = viewDate.clone().subtract(5, 'y'),
                    endYear = viewDate.clone().add(6, 'y'),
                    html = '';

                yearsView.find('.disabled').removeClass('disabled');

                if (options.minDate && options.minDate.isAfter(startYear, 'y')) {
                    yearsViewHeader.eq(0).addClass('disabled');
                }

                yearsViewHeader.eq(1).text(startYear.year() + '-' + endYear.year());

                if (options.maxDate && options.maxDate.isBefore(endYear, 'y')) {
                    yearsViewHeader.eq(2).addClass('disabled');
                }

                while (!startYear.isAfter(endYear, 'y')) {
                    html += '<span data-action="selectYear" class="year' + (startYear.isSame(date, 'y') ? ' active' : '') + (!isValid(startYear, 'y') ? ' disabled' : '') + '">' + startYear.year() + '</span>';
                    startYear.add(1, 'y');
                }

                yearsView.find('td').html(html);
            },

            fillDate = function () {
                var daysView = widget.find('.datepicker-days'),
                    daysViewHeader = daysView.find('th'),
                    currentDate,
                    html = [],
                    row,
                    clsName;

                if (!hasDate()) {
                    return;
                }

                daysView.find('.disabled').removeClass('disabled');
                daysViewHeader.eq(1).text(viewDate.format(options.dayViewHeaderFormat));

                if (!isValid(viewDate.clone().subtract(1, 'M'), 'M')) {
                    daysViewHeader.eq(0).addClass('disabled');
                }
                if (!isValid(viewDate.clone().add(1, 'M'), 'M')) {
                    daysViewHeader.eq(2).addClass('disabled');
                }

                currentDate = viewDate.clone().startOf('M').startOf('week');

                while (!viewDate.clone().endOf('M').endOf('w').isBefore(currentDate, 'd')) {
                    if (currentDate.weekday() === 0) {
                        row = $('<tr>');
                        if (options.calendarWeeks) {
                            row.append('<td class="cw">' + currentDate.week() + '</td>');
                        }
                        html.push(row);
                    }
                    clsName = '';
                    if (currentDate.isBefore(viewDate, 'M')) {
                        clsName += ' old';
                    }
                    if (currentDate.isAfter(viewDate, 'M')) {
                        clsName += ' new';
                    }
                    if (currentDate.isSame(date, 'd') && !unset) {
                        clsName += ' active';
                    }
                    if (!isValid(currentDate, 'd')) {
                        clsName += ' disabled';
                    }
                    if (currentDate.isSame(moment(), 'd')) {
                        clsName += ' today';
                    }
                    if (currentDate.day() === 0 || currentDate.day() === 6) {
                        clsName += ' weekend';
                    }
                    row.append('<td data-action="selectDay" class="day' + clsName + '">' + currentDate.date() + '</td>');
                    currentDate.add(1, 'd');
                }

                daysView.find('tbody').empty().append(html);

                updateMonths();

                updateYears();
            },

            fillHours = function () {
                var table = widget.find('.timepicker-hours table'),
                    currentHour = viewDate.clone().startOf('d'),
                    html = [],
                    row = $('<tr>');

                if (viewDate.hour() > 11 && !use24Hours) {
                    currentHour.hour(12);
                }
                while (currentHour.isSame(viewDate, 'd') && (use24Hours || (viewDate.hour() < 12 && currentHour.hour() < 12) || viewDate.hour() > 11)) {
                    if (currentHour.hour() % 4 === 0) {
                        row = $('<tr>');
                        html.push(row);
                    }
                    row.append('<td data-action="selectHour" class="hour' + (!isValid(currentHour, 'h') ? ' disabled' : '') + '">' + currentHour.format(use24Hours ? 'HH' : 'hh') + '</td>');
                    currentHour.add(1, 'h');
                }
                table.empty().append(html);
            },

            fillMinutes = function () {
                var table = widget.find('.timepicker-minutes table'),
                    currentMinute = viewDate.clone().startOf('h'),
                    html = [],
                    row = $('<tr>'),
                    step = options.stepping === 1 ? 5 : options.stepping;

                while (viewDate.isSame(currentMinute, 'h')) {
                    if (currentMinute.minute() % (step * 4) === 0) {
                        row = $('<tr>');
                        html.push(row);
                    }
                    row.append('<td data-action="selectMinute" class="minute' + (!isValid(currentMinute, 'm') ? ' disabled' : '') + '">' + currentMinute.format('mm') + '</td>');
                    currentMinute.add(step, 'm');
                }
                table.empty().append(html);
            },

            fillSeconds = function () {
                var table = widget.find('.timepicker-seconds table'),
                    currentSecond = viewDate.clone().startOf('m'),
                    html = [],
                    row = $('<tr>');

                while (viewDate.isSame(currentSecond, 'm')) {
                    if (currentSecond.second() % 20 === 0) {
                        row = $('<tr>');
                        html.push(row);
                    }
                    row.append('<td data-action="selectSecond" class="second' + (!isValid(currentSecond, 's') ? ' disabled' : '') + '">' + currentSecond.format('ss') + '</td>');
                    currentSecond.add(5, 's');
                }

                table.empty().append(html);
            },

            fillTime = function () {
                var timeComponents = widget.find('.timepicker span[data-time-component]');
                if (!use24Hours) {
                    widget.find('.timepicker [data-action=togglePeriod]').text(date.format('A'));
                }
                timeComponents.filter('[data-time-component=hours]').text(date.format(use24Hours ? 'HH' : 'hh'));
                timeComponents.filter('[data-time-component=minutes]').text(date.format('mm'));
                timeComponents.filter('[data-time-component=seconds]').text(date.format('ss'));

                fillHours();
                fillMinutes();
                fillSeconds();
            },

            update = function () {
                if (!widget) {
                    return;
                }
                fillDate();
                fillTime();
            },

            setValue = function (targetMoment) {
                var oldDate = unset ? null : date;

                // case of calling setValue(null or false)
                if (!targetMoment) {
                    unset = true;
                    _setInputValue(input, '');
                    element.data('date', '');
                    notifyEvent({
                        type: 'dp.change',
                        date: null,
                        oldDate: oldDate
                    });
                    update();
                    return;
                }

                targetMoment = targetMoment.clone().locale(options.locale);

                if (options.stepping !== 1) {
                    targetMoment.minutes((Math.round(targetMoment.minutes() / options.stepping) * options.stepping) % 60).seconds(0);
                }

                if (isValid(targetMoment)) {
                    date = targetMoment;
                    viewDate = date.clone();
                    _setInputValue(input, date.format(actualFormat));
                    element.data('date', date.format(actualFormat));
                    update();
                    unset = false;
                    notifyEvent({
                        type: 'dp.change',
                        date: date.clone(),
                        oldDate: oldDate
                    });
                } else {
                    if (!options.keepInvalid) {
                        _setInputValue(input, unset ? '' : date.format(actualFormat));
                    }
                    notifyEvent({
                        type: 'dp.error',
                        date: targetMoment
                    });
                }
            },

            hide = function () {
                var transitioning = false;
                if (!widget) {
                    return picker;
                }
                // Ignore event if in the middle of a picker transition
                widget.find('.collapse').each(function () {
                    var collapseData = $(this).data('collapse');
                    if (collapseData && collapseData.transitioning) {
                        transitioning = true;
                        return false;
                    }
                    return true;
                });
                if (transitioning) {
                    return picker;
                }
                if (component && component.hasClass('btn')) {
                    component.toggleClass('active');
                }
                widget.hide();

                $(window).off('resize', place);
                widget.off('click', '[data-action]');
                widget.off('mousedown', false);

                widget.remove();
                widget = false;

                notifyEvent({
                    type: 'dp.hide',
                    date: date.clone()
                });
                return picker;
            },

            clear = function () {
                setValue(null);
            },

            /********************************************************************************
             *
             * Widget UI interaction functions
             *
             ********************************************************************************/
            actions = {
                next: function () {
                    viewDate.add(datePickerModes[currentViewMode].navStep, datePickerModes[currentViewMode].navFnc);
                    fillDate();
                },

                previous: function () {
                    viewDate.subtract(datePickerModes[currentViewMode].navStep, datePickerModes[currentViewMode].navFnc);
                    fillDate();
                },

                pickerSwitch: function () {
                    showMode(1);
                },

                selectMonth: function (e) {
                    var month = $(e.target).closest('tbody').find('span').index($(e.target));
                    viewDate.month(month);
                    if (currentViewMode === minViewModeNumber) {
                        setValue(date.clone().year(viewDate.year()).month(viewDate.month()));
                        if (!options.inline) {
                            hide();
                        }
                    } else {
                        showMode(-1);
                        fillDate();
                    }
                },

                selectYear: function (e) {
                    var year = parseInt($(e.target).text(), 10) || 0;
                    viewDate.year(year);
                    if (currentViewMode === minViewModeNumber) {
                        setValue(date.clone().year(viewDate.year()));
                        if (!options.inline) {
                            hide();
                        }
                    } else {
                        showMode(-1);
                        fillDate();
                    }
                },

                selectDay: function (e) {
                    var day = viewDate.clone();
                    if ($(e.target).is('.old')) {
                        day.subtract(1, 'M');
                    }
                    if ($(e.target).is('.new')) {
                        day.add(1, 'M');
                    }
                    setValue(day.date(parseInt($(e.target).text(), 10)));
                    if (!hasTime() && !options.keepOpen && !options.inline) {
                        hide();
                    }
                },

                incrementHours: function () {
                    setValue(date.clone().add(1, 'h'));
                },

                incrementMinutes: function () {
                    setValue(date.clone().add(options.stepping, 'm'));
                },

                incrementSeconds: function () {
                    setValue(date.clone().add(1, 's'));
                },

                decrementHours: function () {
                    setValue(date.clone().subtract(1, 'h'));
                },

                decrementMinutes: function () {
                    setValue(date.clone().subtract(options.stepping, 'm'));
                },

                decrementSeconds: function () {
                    setValue(date.clone().subtract(1, 's'));
                },

                togglePeriod: function () {
                    setValue(date.clone().add((date.hours() >= 12) ? -12 : 12, 'h'));
                },

                togglePicker: function (e) {
                    var $this = $(e.target),
                        $parent = $this.closest('ul'),
                        expanded = $parent.find('.in'),
                        closed = $parent.find('.collapse:not(.in)'),
                        collapseData;

                    if (expanded && expanded.length) {
                        collapseData = expanded.data('collapse');
                        if (collapseData && collapseData.transitioning) {
                            return;
                        }
                        if (expanded.collapse) { // if collapse plugin is available through bootstrap.js then use it
                            expanded.collapse('hide');
                            closed.collapse('show');
                        } else { // otherwise just toggle in class on the two views
                            expanded.removeClass('in');
                            closed.addClass('in');
                        }
                        if ($this.is('span')) {
                            $this.toggleClass(options.icons.time + ' ' + options.icons.date);
                        } else {
                            $this.find('span').toggleClass(options.icons.time + ' ' + options.icons.date);
                        }

                        // NOTE: uncomment if toggled state will be restored in show()
                        //if (component) {
                        //    component.find('span').toggleClass(options.icons.time + ' ' + options.icons.date);
                        //}
                    }
                },

                showPicker: function () {
                    widget.find('.timepicker > div:not(.timepicker-picker)').hide();
                    widget.find('.timepicker .timepicker-picker').show();
                },

                showHours: function () {
                    widget.find('.timepicker .timepicker-picker').hide();
                    widget.find('.timepicker .timepicker-hours').show();
                },

                showMinutes: function () {
                    widget.find('.timepicker .timepicker-picker').hide();
                    widget.find('.timepicker .timepicker-minutes').show();
                },

                showSeconds: function () {
                    widget.find('.timepicker .timepicker-picker').hide();
                    widget.find('.timepicker .timepicker-seconds').show();
                },

                selectHour: function (e) {
                    var hour = parseInt($(e.target).text(), 10);

                    if (!use24Hours) {
                        if (date.hours() >= 12) {
                            if (hour !== 12) {
                                hour += 12;
                            }
                        } else {
                            if (hour === 12) {
                                hour = 0;
                            }
                        }
                    }
                    setValue(date.clone().hours(hour));
                    actions.showPicker.call(picker);
                },

                selectMinute: function (e) {
                    setValue(date.clone().minutes(parseInt($(e.target).text(), 10)));
                    actions.showPicker.call(picker);
                },

                selectSecond: function (e) {
                    setValue(date.clone().seconds(parseInt($(e.target).text(), 10)));
                    actions.showPicker.call(picker);
                },

                clear: clear,

                today: function () {
                    setValue(moment());
                },

                close: hide
            },

            doAction = function (e) {
                if ($(e.currentTarget).is('.disabled')) {
                    return false;
                }
                actions[$(e.currentTarget).data('action')].apply(picker, arguments);
                return false;
            },

            show = function () {
                var currentMoment,
                    useCurrentGranularity = {
                        'year': function (m) {
                            return m.month(0).date(1).hours(0).seconds(0).minutes(0);
                        },
                        'month': function (m) {
                            return m.date(1).hours(0).seconds(0).minutes(0);
                        },
                        'day': function (m) {
                            return m.hours(0).seconds(0).minutes(0);
                        },
                        'hour': function (m) {
                            return m.seconds(0).minutes(0);
                        },
                        'minute': function (m) {
                            return m.seconds(0);
                        }
                    };



                if (input.prop('disabled') || (!options.ignoreReadonly && input.prop('readonly')) 
                            || (input.prop('contenteditable') == false)
                            || widget
                            || input.closest('fieldset').prop('disabled')) {
                    return picker;
                }
                if (options.useCurrent && unset && ((input.is(inputSelector) && _getInputValue(input).trim().length === 0) || options.inline)) {
                    currentMoment = moment();
                    if (typeof options.useCurrent === 'string') {
                        currentMoment = useCurrentGranularity[options.useCurrent](currentMoment);
                    }
                    setValue(currentMoment);
                }

                widget = getTemplate();

                fillDow();
                fillMonths();

                widget.find('.timepicker-hours').hide();
                widget.find('.timepicker-minutes').hide();
                widget.find('.timepicker-seconds').hide();

                update();
                showMode();

                $(window).on('resize', place);
                widget.on('click', '[data-action]', doAction); // this handles clicks on the widget
                widget.on('mousedown', false);

                if (component && component.hasClass('btn')) {
                    component.toggleClass('active');
                }
                widget.show();
                place();

                if (!input.is(':focus')) {
                    input.focus();
                }

                notifyEvent({
                    type: 'dp.show'
                });
                return picker;
            },

            toggle = function () {
                return (widget ? hide() : show());
            },

            parseInputDate = function (inputDate) {
                if (moment.isMoment(inputDate) || inputDate instanceof Date) {
                    inputDate = moment(inputDate);
                } else {
                    inputDate = moment(inputDate, parseFormats, options.useStrict);
                }
                inputDate.locale(options.locale);
                return inputDate;
            },

            keydown = function (e) {
                //if (e.keyCode === 27 && widget) { // allow escape to hide picker
                //    hide();
                //    return false;
                //}
                //if (e.keyCode === 40 && !widget) { // allow down to show picker
                //    show();
                //    e.preventDefault();
                //}
                //return true;

                var handler = null,
                    index,
                    index2,
                    pressedKeys = [],
                    pressedModifiers = {},
                    currentKey = e.which,
                    keyBindKeys,
                    allModifiersPressed,
                    pressed = 'p';

                keyState[currentKey] = pressed;

                for (index in keyState) {
                    if (keyState.hasOwnProperty(index) && keyState[index] === pressed) {
                        pressedKeys.push(index);
                        if (parseInt(index, 10) !== currentKey) {
                            pressedModifiers[index] = true;
                        }
                    }
                }

                for (index in options.keyBinds) {
                    if (options.keyBinds.hasOwnProperty(index) && typeof (options.keyBinds[index]) === 'function') {
                        keyBindKeys = index.split(' ');
                        if (keyBindKeys.length === pressedKeys.length && keyMap[currentKey] === keyBindKeys[keyBindKeys.length - 1]) {
                            allModifiersPressed = true;
                            for (index2 = keyBindKeys.length - 2; index2 >= 0; index2--) {
                                if (!(keyMap[keyBindKeys[index2]] in pressedModifiers)) {
                                    allModifiersPressed = false;
                                    break;
                                }
                            }
                            if (allModifiersPressed) {
                                handler = options.keyBinds[index];
                                break;
                            }
                        }
                    }
                }

                if (handler) {
                    handler.call(picker, widget);
                    e.stopPropagation();
                    e.preventDefault();
                }
            },

            keyup = function (e) {
                keyState[e.which] = 'r';
                e.stopPropagation();
                e.preventDefault();
            },

            change = function (e) {
                var val = _getInputValue($(e.target)).trim(),
                    parsedDate = val ? parseInputDate(val) : null;
                setValue(parsedDate);
                e.stopImmediatePropagation();
                return false;
            },

            attachDatePickerElementEvents = function () {
                input.on({
                    'change': change,
                    'blur': options.debug ? '' : hide,
                    'keydown': keydown,
                    'keyup': keyup
                });

                input.on({
                    'focus': show
                });

               if (component) {
                    component.on('click', toggle);
                    component.on('mousedown', false);
                }
            },

            detachDatePickerElementEvents = function () {
                input.off({
                    'change': change,
                    'blur': hide,
                    'keydown': keydown,
                    'keyup': keyup
                });

                input.off({
                    'focus': show
                });

                if (component) {
                    component.off('click', toggle);
                    component.off('mousedown', false);
                }
            },

            indexGivenDates = function (givenDatesArray) {
                // Store given enabledDates and disabledDates as keys.
                // This way we can check their existence in O(1) time instead of looping through whole array.
                // (for example: options.enabledDates['2014-02-27'] === true)
                var givenDatesIndexed = {};
                $.each(givenDatesArray, function () {
                    var dDate = parseInputDate(this);
                    if (dDate.isValid()) {
                        givenDatesIndexed[dDate.format('YYYY-MM-DD')] = true;
                    }
                });
                return (Object.keys(givenDatesIndexed).length) ? givenDatesIndexed : false;
            },

            initFormatting = function () {
                var format = options.format || 'L LT';

                actualFormat = format.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput) {
                    var newinput = date.localeData().longDateFormat(formatInput) || formatInput;
                    return newinput.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput2) { //temp fix for #740
                        return date.localeData().longDateFormat(formatInput2) || formatInput2;
                    });
                });


                parseFormats = options.extraFormats ? options.extraFormats.slice() : [];
                if (parseFormats.indexOf(format) < 0 && parseFormats.indexOf(actualFormat) < 0) {
                    parseFormats.push(actualFormat);
                }

                use24Hours = (actualFormat.toLowerCase().indexOf('a') < 1 && actualFormat.indexOf('h') < 1);

                if (isEnabled('y')) {
                    minViewModeNumber = 2;
                }
                if (isEnabled('M')) {
                    minViewModeNumber = 1;
                }
                if (isEnabled('d')) {
                    minViewModeNumber = 0;
                }

                currentViewMode = Math.max(minViewModeNumber, currentViewMode);

                if (!unset) {
                    setValue(date);
                }
            },

            // 新添加方法 by tianxq1
            _getInputValue = function(input) {
                var value;
                if(input.is('input')) {
                    value = input.val();
                } else if(input.is('div[contenteditable=true]')) {
                    value = input.html();
                } else {
                    throw new Error('Must be a input or contenteditable div');
                }
                return value;
            },

            _setInputValue = function(input, value) {
                if(input.is('input')) {
                    input.val(value);
                } else if(input.is('div[contenteditable=true]')) {
                    input[0].value = value;
                } else {
                    throw new Error('Must be a input or contenteditable div');
                }
            };

        /********************************************************************************
         *
         * Public API functions
         * =====================
         *
         * Important: Do not expose direct references to private objects or the options
         * object to the outer world. Always return a clone when returning values or make
         * a clone when setting a private variable.
         *
         ********************************************************************************/
        picker.destroy = function () {
            hide();
            detachDatePickerElementEvents();
            element.removeData('DateTimePicker');
            element.removeData('date');
        };

        picker.toggle = toggle;

        picker.show = show;

        picker.hide = hide;

        picker.disable = function () {
            hide();
            if (component && component.hasClass('btn')) {
                component.addClass('disabled');
            }
            input.prop('disabled', true);
            return picker;
        };

        picker.enable = function () {
            if (component && component.hasClass('btn')) {
                component.removeClass('disabled');
            }
            input.prop('disabled', false);
            return picker;
        };

        picker.ignoreReadonly = function (ignoreReadonly) {
            if (arguments.length === 0) {
                return options.ignoreReadonly;
            }
            if (typeof ignoreReadonly !== 'boolean') {
                throw new TypeError('ignoreReadonly () expects a boolean parameter');
            }
            options.ignoreReadonly = ignoreReadonly;
            return picker;
        };

        picker.options = function (newOptions) {
            if (arguments.length === 0) {
                return $.extend(true, {}, options);
            }

            if (!(newOptions instanceof Object)) {
                throw new TypeError('options() options parameter should be an object');
            }
            $.extend(true, options, newOptions);
            $.each(options, function (key, value) {
                if (picker[key] !== undefined) {
                    picker[key](value);
                } else {
                    //throw new TypeError('option ' + key + ' is not recognized!');
                }
            });
            return picker;
        };

        picker.date = function (newDate) {
            if (arguments.length === 0) {
                if (unset) {
                    return null;
                }
                return date.clone();
            }

            if (newDate !== null && typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('date() parameter must be one of [null, string, moment or Date]');
            }

            setValue(newDate === null ? null : parseInputDate(newDate));
            return picker;
        };

        picker.format = function (newFormat) {
            if (arguments.length === 0) {
                return options.format;
            }

            if ((typeof newFormat !== 'string') && ((typeof newFormat !== 'boolean') || (newFormat !== false))) {
                throw new TypeError('format() expects a sting or boolean:false parameter ' + newFormat);
            }

            options.format = newFormat;
            if (actualFormat) {
                initFormatting(); // reinit formatting
            }
            return picker;
        };

        picker.dayViewHeaderFormat = function (newFormat) {
            if (arguments.length === 0) {
                return options.dayViewHeaderFormat;
            }

            if (typeof newFormat !== 'string') {
                throw new TypeError('dayViewHeaderFormat() expects a string parameter');
            }

            options.dayViewHeaderFormat = newFormat;
            return picker;
        };

        picker.extraFormats = function (formats) {
            if (arguments.length === 0) {
                return options.extraFormats;
            }

            if (formats !== false && !(formats instanceof Array)) {
                throw new TypeError('extraFormats() expects an array or false parameter');
            }

            options.extraFormats = formats;
            if (parseFormats) {
                initFormatting(); // reinit formatting
            }
            return picker;
        };

        picker.disabledDates = function (dates) {
            if (arguments.length === 0) {
                return (options.disabledDates ? $.extend({}, options.disabledDates) : options.disabledDates);
            }

            if (!dates) {
                options.disabledDates = false;
                update();
                return picker;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('disabledDates() expects an array parameter');
            }
            options.disabledDates = indexGivenDates(dates);
            options.enabledDates = false;
            update();
            return picker;
        };

        picker.enabledDates = function (dates) {
            if (arguments.length === 0) {
                return (options.enabledDates ? $.extend({}, options.enabledDates) : options.enabledDates);
            }

            if (!dates) {
                options.enabledDates = false;
                update();
                return picker;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('enabledDates() expects an array parameter');
            }
            options.enabledDates = indexGivenDates(dates);
            options.disabledDates = false;
            update();
            return picker;
        };

        picker.daysOfWeekDisabled = function (daysOfWeekDisabled) {
            if (arguments.length === 0) {
                return options.daysOfWeekDisabled.splice(0);
            }

            if (!(daysOfWeekDisabled instanceof Array)) {
                throw new TypeError('daysOfWeekDisabled() expects an array parameter');
            }
            options.daysOfWeekDisabled = daysOfWeekDisabled.reduce(function (previousValue, currentValue) {
                currentValue = parseInt(currentValue, 10);
                if (currentValue > 6 || currentValue < 0 || isNaN(currentValue)) {
                    return previousValue;
                }
                if (previousValue.indexOf(currentValue) === -1) {
                    previousValue.push(currentValue);
                }
                return previousValue;
            }, []).sort();
            update();
            return picker;
        };

        picker.maxDate = function (maxDate) {
            if (arguments.length === 0) {
                return options.maxDate ? options.maxDate.clone() : options.maxDate;
            }

            if ((typeof maxDate === 'boolean') && maxDate === false) {
                options.maxDate = false;
                update();
                return picker;
            }

            if (typeof maxDate === 'string') {
                if (maxDate === 'now' || maxDate === 'moment') {
                    maxDate = moment();
                }
            }

            var parsedDate = parseInputDate(maxDate);

            if (!parsedDate.isValid()) {
                throw new TypeError('maxDate() Could not parse date parameter: ' + maxDate);
            }
            if (options.minDate && parsedDate.isBefore(options.minDate)) {
                throw new TypeError('maxDate() date parameter is before options.minDate: ' + parsedDate.format(actualFormat));
            }
            options.maxDate = parsedDate;
            if (options.maxDate.isBefore(maxDate)) {
                setValue(options.maxDate);
            }
            if (viewDate.isAfter(parsedDate)) {
                viewDate = parsedDate.clone();
            }
            update();
            return picker;
        };

        picker.minDate = function (minDate) {
            if (arguments.length === 0) {
                return options.minDate ? options.minDate.clone() : options.minDate;
            }

            if ((typeof minDate === 'boolean') && minDate === false) {
                options.minDate = false;
                update();
                return picker;
            }

            if (typeof minDate === 'string') {
                if (minDate === 'now' || minDate === 'moment') {
                    minDate = moment();
                }
            }

            var parsedDate = parseInputDate(minDate);

            if (!parsedDate.isValid()) {
                throw new TypeError('minDate() Could not parse date parameter: ' + minDate);
            }
            if (options.maxDate && parsedDate.isAfter(options.maxDate)) {
                throw new TypeError('minDate() date parameter is after options.maxDate: ' + parsedDate.format(actualFormat));
            }
            options.minDate = parsedDate;
            if (options.minDate.isAfter(minDate)) {
                setValue(options.minDate);
            }
            if (viewDate.isBefore(parsedDate)) {
                viewDate = parsedDate.clone();
            }
            update();
            return picker;
        };

        picker.defaultDate = function (defaultDate) {
            if (arguments.length === 0) {
                return options.defaultDate ? options.defaultDate.clone() : options.defaultDate;
            }
            if (!defaultDate) {
                options.defaultDate = false;
                return picker;
            }

            if (typeof defaultDate === 'string') {
                if (defaultDate === 'now' || defaultDate === 'moment') {
                    defaultDate = moment();
                }
            }

            var parsedDate = parseInputDate(defaultDate);
            if (!parsedDate.isValid()) {
                throw new TypeError('defaultDate() Could not parse date parameter: ' + defaultDate);
            }
            if (!isValid(parsedDate)) {
                throw new TypeError('defaultDate() date passed is invalid according to component setup validations');
            }

            options.defaultDate = parsedDate;

            if (options.defaultDate && _getInputValue(input).trim() === '' && input.attr('placeholder') === undefined) {
                setValue(options.defaultDate);
            }
            return picker;
        };

        picker.locale = function (locale) {
            if (arguments.length === 0) {
                return options.locale;
            }

            if (!moment.localeData(locale)) {
                throw new TypeError('locale() locale ' + locale + ' is not loaded from moment locales!');
            }

            options.locale = locale;
            date.locale(options.locale);
            viewDate.locale(options.locale);

            if (actualFormat) {
                initFormatting(); // reinit formatting
            }
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.stepping = function (stepping) {
            if (arguments.length === 0) {
                return options.stepping;
            }

            stepping = parseInt(stepping, 10);
            if (isNaN(stepping) || stepping < 1) {
                stepping = 1;
            }
            options.stepping = stepping;
            return picker;
        };

        picker.useCurrent = function (useCurrent) {
            var useCurrentOptions = ['year', 'month', 'day', 'hour', 'minute'];
            if (arguments.length === 0) {
                return options.useCurrent;
            }

            if ((typeof useCurrent !== 'boolean') && (typeof useCurrent !== 'string')) {
                throw new TypeError('useCurrent() expects a boolean or string parameter');
            }
            if (typeof useCurrent === 'string' && useCurrentOptions.indexOf(useCurrent.toLowerCase()) === -1) {
                throw new TypeError('useCurrent() expects a string parameter of ' + useCurrentOptions.join(', '));
            }
            options.useCurrent = useCurrent;
            return picker;
        };

        picker.collapse = function (collapse) {
            if (arguments.length === 0) {
                return options.collapse;
            }

            if (typeof collapse !== 'boolean') {
                throw new TypeError('collapse() expects a boolean parameter');
            }
            if (options.collapse === collapse) {
                return picker;
            }
            options.collapse = collapse;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.icons = function (icons) {
            if (arguments.length === 0) {
                return $.extend({}, options.icons);
            }

            if (!(icons instanceof Object)) {
                throw new TypeError('icons() expects parameter to be an Object');
            }
            $.extend(options.icons, icons);
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.useStrict = function (useStrict) {
            if (arguments.length === 0) {
                return options.useStrict;
            }

            if (typeof useStrict !== 'boolean') {
                throw new TypeError('useStrict() expects a boolean parameter');
            }
            options.useStrict = useStrict;
            return picker;
        };

        picker.sideBySide = function (sideBySide) {
            if (arguments.length === 0) {
                return options.sideBySide;
            }

            if (typeof sideBySide !== 'boolean') {
                throw new TypeError('sideBySide() expects a boolean parameter');
            }
            options.sideBySide = sideBySide;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.viewMode = function (viewMode) {
            if (arguments.length === 0) {
                return options.viewMode;
            }

            if (typeof viewMode !== 'string') {
                throw new TypeError('viewMode() expects a string parameter');
            }

            if (viewModes.indexOf(viewMode) === -1) {
                throw new TypeError('viewMode() parameter must be one of (' + viewModes.join(', ') + ') value');
            }

            options.viewMode = viewMode;
            currentViewMode = Math.max(viewModes.indexOf(viewMode), minViewModeNumber);

            showMode();
            return picker;
        };

        picker.toolbarPlacement = function (toolbarPlacement) {
            if (arguments.length === 0) {
                return options.toolbarPlacement;
            }

            if (typeof toolbarPlacement !== 'string') {
                throw new TypeError('toolbarPlacement() expects a string parameter');
            }
            if (toolbarPlacements.indexOf(toolbarPlacement) === -1) {
                throw new TypeError('toolbarPlacement() parameter must be one of (' + toolbarPlacements.join(', ') + ') value');
            }
            options.toolbarPlacement = toolbarPlacement;

            if (widget) {
                hide();
                show();
            }
            return picker;
        };
		
		//查询模板拓展
		picker.afterShow=function(afterShow){
			options.afterShow = afterShow;
		return picker
		};
		
        picker.widgetPositioning = function (widgetPositioning) {
            if (arguments.length === 0) {
                return $.extend({}, options.widgetPositioning);
            }

            if (({}).toString.call(widgetPositioning) !== '[object Object]') {
                throw new TypeError('widgetPositioning() expects an object variable');
            }
            if (widgetPositioning.horizontal) {
                if (typeof widgetPositioning.horizontal !== 'string') {
                    throw new TypeError('widgetPositioning() horizontal variable must be a string');
                }
                widgetPositioning.horizontal = widgetPositioning.horizontal.toLowerCase();
                if (horizontalModes.indexOf(widgetPositioning.horizontal) === -1) {
                    throw new TypeError('widgetPositioning() expects horizontal parameter to be one of (' + horizontalModes.join(', ') + ')');
                }
                options.widgetPositioning.horizontal = widgetPositioning.horizontal;
            }
            if (widgetPositioning.vertical) {
                if (typeof widgetPositioning.vertical !== 'string') {
                    throw new TypeError('widgetPositioning() vertical variable must be a string');
                }
                widgetPositioning.vertical = widgetPositioning.vertical.toLowerCase();
                if (verticalModes.indexOf(widgetPositioning.vertical) === -1) {
                    throw new TypeError('widgetPositioning() expects vertical parameter to be one of (' + verticalModes.join(', ') + ')');
                }
                options.widgetPositioning.vertical = widgetPositioning.vertical;
            }
            update();
            return picker;
        };

        picker.calendarWeeks = function (calendarWeeks) {
            if (arguments.length === 0) {
                return options.calendarWeeks;
            }

            if (typeof calendarWeeks !== 'boolean') {
                throw new TypeError('calendarWeeks() expects parameter to be a boolean value');
            }

            options.calendarWeeks = calendarWeeks;
            update();
            return picker;
        };

        picker.showTodayButton = function (showTodayButton) {
            if (arguments.length === 0) {
                return options.showTodayButton;
            }

            if (typeof showTodayButton !== 'boolean') {
                throw new TypeError('showTodayButton() expects a boolean parameter');
            }

            options.showTodayButton = showTodayButton;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.showClear = function (showClear) {
            if (arguments.length === 0) {
                return options.showClear;
            }

            if (typeof showClear !== 'boolean') {
                throw new TypeError('showClear() expects a boolean parameter');
            }

            options.showClear = showClear;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.widgetParent = function (widgetParent) {
            if (arguments.length === 0) {
                return options.widgetParent;
            }

            if (typeof widgetParent === 'string') {
                widgetParent = $(widgetParent);
            }

            if (widgetParent !== null && (typeof widgetParent !== 'string' && !(widgetParent instanceof $))) {
                throw new TypeError('widgetParent() expects a string or a jQuery object parameter');
            }

            options.widgetParent = widgetParent;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.keepOpen = function (keepOpen) {
            if (arguments.length === 0) {
                return options.keepOpen;
            }

            if (typeof keepOpen !== 'boolean') {
                throw new TypeError('keepOpen() expects a boolean parameter');
            }

            options.keepOpen = keepOpen;
            return picker;
        };

        picker.inline = function (inline) {
            if (arguments.length === 0) {
                return options.inline;
            }

            if (typeof inline !== 'boolean') {
                throw new TypeError('inline() expects a boolean parameter');
            }

            options.inline = inline;
            return picker;
        };

        picker.clear = function () {
            clear();
            return picker;
        };

        picker.keyBinds = function (keyBinds) {
            options.keyBinds = keyBinds;
            return picker;
        };

        picker.debug = function (debug) {
            if (typeof debug !== 'boolean') {
                throw new TypeError('debug() expects a boolean parameter');
            }

            options.debug = debug;
            return picker;
        };

        picker.showClose = function (showClose) {
            if (arguments.length === 0) {
                return options.showClose;
            }

            if (typeof showClose !== 'boolean') {
                throw new TypeError('showClose() expects a boolean parameter');
            }

            options.showClose = showClose;
            return picker;
        };

        picker.keepInvalid = function (keepInvalid) {
            if (arguments.length === 0) {
                return options.keepInvalid;
            }

            if (typeof keepInvalid !== 'boolean') {
                throw new TypeError('keepInvalid() expects a boolean parameter');
            }
            options.keepInvalid = keepInvalid;
            return picker;
        };

        picker.datepickerInput = function (datepickerInput) {
            if (arguments.length === 0) {
                return options.datepickerInput;
            }

            if (typeof datepickerInput !== 'string') {
                throw new TypeError('datepickerInput() expects a string parameter');
            }

            options.datepickerInput = datepickerInput;
            return picker;
        };


        // initializing element and component attributes
        if (element.is(inputSelector)) {
            input = element;
        } else {
            input = element.find(options.datepickerInput);
            if (input.size() === 0) {
                input = element.find(inputSelector);
            } else if (!input.is(inputSelector)) {
                throw new Error('CSS class "' + options.datepickerInput + '" cannot be applied to non input element');
            }
        }

        if (element.hasClass('input-group')) {
            // in case there is more then one 'input-group-addon' Issue #48
            if (element.find('.datepickerbutton').size() === 0) {
                component = element.find('[class^="input-group-"]');
            } else {
                component = element.find('.datepickerbutton');
            }
        }

        if (!options.inline && !input.is(inputSelector)) {
            throw new Error('Could not initialize DateTimePicker without an input element');
        }

        $.extend(true, options, dataToOptions());

        picker.options(options);

        initFormatting();

        attachDatePickerElementEvents();

        if (input.prop('disabled')) {
            picker.disable();
        }
        
        if (input.is(inputSelector) && _getInputValue(input).trim().length !== 0) {
            setValue(parseInputDate(_getInputValue(input).trim()));
        }
        else if (options.defaultDate && input.attr('placeholder') === undefined) {
            setValue(options.defaultDate);
        }
        if (options.inline) {
            show();
        }
        return picker;
    };

    /********************************************************************************
     *
     * jQuery plugin constructor and defaults object
     *
     ********************************************************************************/

    $.fn.datetimepicker = function (options) {
        return this.each(function () {
            var $this = $(this);
            if (!$this.data('DateTimePicker')) {
                // create a private copy of the defaults object
                options = $.extend(true, {}, $.fn.datetimepicker.defaults, options);
                $this.data('DateTimePicker', dateTimePicker($this, options));
            }
        });
    };

    $.fn.datetimepicker.defaults = {
		afterShow:undefined,
        format: false,
        dayViewHeaderFormat: 'MMMM YYYY',
        extraFormats: false,
        stepping: 1,
        minDate: false,
        maxDate: false,
        useCurrent: true,
        collapse: true,
        locale: moment.locale('zh-cn'),
        defaultDate: false,
        disabledDates: false,
        enabledDates: false,
        icons: {
            time: 'glyphicon glyphicon-time',
            date: 'glyphicon glyphicon-calendar',
            up: 'glyphicon glyphicon-chevron-up',
            down: 'glyphicon glyphicon-chevron-down',
            previous: 'glyphicon glyphicon-chevron-left',
            next: 'glyphicon glyphicon-chevron-right',
            today: 'glyphicon glyphicon-screenshot',
            clear: 'glyphicon glyphicon-trash',
            close: 'glyphicon glyphicon-remove'
        },
        useStrict: false,
        sideBySide: false,
        daysOfWeekDisabled: [],
        calendarWeeks: false,
        viewMode: 'days',
        toolbarPlacement: 'default',
        showTodayButton: false,
        showClear: false,
        showClose: false,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'auto'
        },
        widgetParent: null,
        ignoreReadonly: false,
        keepOpen: false,
        inline: false,
        keepInvalid: false,
        datepickerInput: '.datepickerinput',
        keyBinds: {
            up: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || moment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(7, 'd'));
                } else {
                    this.date(d.clone().add(1, 'm'));
                }
            },
            down: function (widget) {
                if (!widget) {
                    this.show();
                    return;
                }
                var d = this.date() || moment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(7, 'd'));
                } else {
                    this.date(d.clone().subtract(1, 'm'));
                }
            },
            'control up': function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || moment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'y'));
                } else {
                    this.date(d.clone().add(1, 'h'));
                }
            },
            'control down': function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || moment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'y'));
                } else {
                    this.date(d.clone().subtract(1, 'h'));
                }
            },
            left: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || moment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'd'));
                }
            },
            right: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || moment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'd'));
                }
            },
            pageUp: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || moment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'M'));
                }
            },
            pageDown: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || moment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'M'));
                }
            },
            enter: function () {
                this.hide();
            },
            escape: function () {
                this.hide();
            },
            //tab: function (widget) { //this break the flow of the form. disabling for now
            //    var toggle = widget.find('.picker-switch a[data-action="togglePicker"]');
            //    if(toggle.length > 0) toggle.click();
            //},
            'control space': function (widget) {
                if (widget.find('.timepicker').is(':visible')) {
                    widget.find('.btn[data-action="togglePeriod"]').click();
                }
            },
            t: function () {
                this.date(moment());
            },
            'delete': function () {
                this.clear();
            }
        },
        debug: false
    };
    $(document).on(
        'focus.datetimepicker.data-api click.datetimepicker.data-api',
        '[data-provide="datetimepicker"]',
        function (e) {
            var $this = $(this);
            if ($this.data('DateTimePicker')) return;
            e.preventDefault();
            var options = JSON.parse($this.attr('data-options') || null);
            $this.datetimepicker(options || {});
            $this.data('DateTimePicker').show();
            $this.on('dp.change', function() {
                $(this).find('input').trigger('change');
            });
        }
    );
}));

/**
* @version: 1.3.6
* @author: Dan Grossman http://www.dangrossman.info/
* @date: 2014-04-29
* @copyright: Copyright (c) 2012-2014 Dan Grossman. All rights reserved.
* @license: Licensed under Apache License v2.0. See http://www.apache.org/licenses/LICENSE-2.0
* @website: http://www.improvely.com/
*/

!function ($, moment) {

   var DateRangePicker = function (element, options, cb) {

        // by default, the daterangepicker element is placed at the bottom of HTML body
        this.parentEl = 'body';

        //element that triggered the date range picker
        this.element = $(element);
        

        //create the picker HTML object
        var DRPTemplate = '<div class="daterangepicker dropdown-menu">' +
               
                '<div class="ranges">' +
                  '<div class="range_inputs">' +
                    '<div class="daterangepicker_start_input">' +
                      '<label for="daterangepicker_start"></label>' +
                      '<input class="input-mini" type="text" name="daterangepicker_start" value="" disabled="disabled" />' +
                    '</div>' +
                    '<div class="daterangepicker_end_input">' +
                      '<label for="daterangepicker_end"></label>' +
                      '<input class="input-mini" type="text" name="daterangepicker_end" value="" disabled="disabled" />' +
                    '</div>' +
                    '<button class="applyBtn" disabled="disabled"></button>&nbsp;' +
                    '<button class="cancelBtn"></button>' +
                  '</div>' +
                '</div>' +
                '<div class="clear"></div>'+
                 '<div class="calendar left"></div>' +
                '<div class="calendar right"></div>' +
              '</div>';

        //custom options
        if (typeof options !== 'object' || options === null)
            options = {};

        this.parentEl = (typeof options === 'object' && options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(DRPTemplate).appendTo(this.parentEl);

        this.setOptions(options, cb);

        //apply CSS classes and labels to buttons
        var c = this.container;
        $.each(this.buttonClasses, function (idx, val) {
            c.find('button').addClass(val);
        });
        this.container.find('.daterangepicker_start_input label').html(this.locale.fromLabel);
        this.container.find('.daterangepicker_end_input label').html(this.locale.toLabel);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //event listeners

        this.container.find('.calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.enterDate, this))
            .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.updateMonthYear, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.updateMonthYear, this))
            .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.ampmselect', $.proxy(this.updateTime, this));

        this.container.find('.ranges')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click.daterangepicker', '.daterangepicker_start_input,.daterangepicker_end_input', $.proxy(this.showCalendars, this))
            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
            .on('mouseenter.daterangepicker', 'li', $.proxy(this.enterRange, this))
            .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));

        if (this.element.is('input')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.updateFromControl, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
        }

    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setOptions: function(options, callback) {
			//moment().endOf('day')
            this.startDate = moment().startOf('day');
            this.endDate = moment().endOf('day');
            this.minDate = moment("1970-01-01","YYYY-MM-DD").startOf('day');
            this.maxDate = moment("2999-01-01","YYYY-MM-DD").endOf('day');
            this.dateLimit = false;

            this.showDropdowns = false;
            this.showWeekNumbers = false;
            this.timePicker = false;
            this.timePickerIncrement = 30;
            this.timePicker12Hour = true;
            this.singleDatePicker = false;
            this.ranges = {};

            this.opens = 'right';
            if (this.element.hasClass('pull-right'))
                this.opens = 'left';

            this.buttonClasses = ['btn', 'btn-small'];
            this.applyClass = 'btn-success';
            this.cancelClass = 'btn-default';

            this.format = 'YYYY-MM-DD';
            this.separator = ' - ';

            this.locale = {
                applyLabel: '确定',
                cancelLabel: '取消',
                fromLabel: '从',
                toLabel: '到',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: moment()._locale._weekdaysMin.slice(),
                monthNames: moment()._locale._monthsShort.slice(),
                firstDay: 0
            };

            this.cb = function () { };

            if (typeof options.format === 'string')
                this.format = options.format;

            if (typeof options.separator === 'string')
                this.separator = options.separator;

            if (typeof options.startDate === 'string')
                this.startDate = moment(options.startDate, this.format);

            if (typeof options.endDate === 'string')
                this.endDate = moment(options.endDate, this.format);

            if (typeof options.minDate === 'string')
                this.minDate = moment(options.minDate, this.format);

            if (typeof options.maxDate === 'string')
                this.maxDate = moment(options.maxDate, this.format);

            if (typeof options.startDate === 'object')
                this.startDate = moment(options.startDate);

            if (typeof options.endDate === 'object')
                this.endDate = moment(options.endDate);

            if (typeof options.minDate === 'object')
                this.minDate = moment(options.minDate);

            if (typeof options.maxDate === 'object')
                this.maxDate = moment(options.maxDate);

            if (typeof options.applyClass === 'string')
                this.applyClass = options.applyClass;

            if (typeof options.cancelClass === 'string')
                this.cancelClass = options.cancelClass;

            if (typeof options.dateLimit === 'object')
                this.dateLimit = options.dateLimit;

            // update day names order to firstDay
            if (typeof options.locale === 'object') {

                if (typeof options.locale.daysOfWeek === 'object') {
                    // Create a copy of daysOfWeek to avoid modification of original
                    // options object for reusability in multiple daterangepicker instances
                    this.locale.daysOfWeek = options.locale.daysOfWeek.slice();
                }

                if (typeof options.locale.monthNames === 'object') {
                  this.locale.monthNames = options.locale.monthNames.slice();
                }

                if (typeof options.locale.firstDay === 'number') {
                    this.locale.firstDay = options.locale.firstDay;
                    var iterator = options.locale.firstDay;
                    while (iterator > 0) {
                        this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                        iterator--;
                    }
                }

                if (typeof options.locale.applyLabel === 'string') {
                  this.locale.applyLabel = options.locale.applyLabel;
                }

                if (typeof options.locale.cancelLabel === 'string') {
                  this.locale.cancelLabel = options.locale.cancelLabel;
                }

                if (typeof options.locale.fromLabel === 'string') {
                  this.locale.fromLabel = options.locale.fromLabel;
                }

                if (typeof options.locale.toLabel === 'string') {
                  this.locale.toLabel = options.locale.toLabel;
                }

                if (typeof options.locale.weekLabel === 'string') {
                  this.locale.weekLabel = options.locale.weekLabel;
                }

                if (typeof options.locale.customRangeLabel === 'string') {
                  this.locale.customRangeLabel = options.locale.customRangeLabel;
                }
            }

            if (typeof options.opens === 'string')
                this.opens = options.opens;

            if (typeof options.showWeekNumbers === 'boolean') {
                this.showWeekNumbers = options.showWeekNumbers;
            }

            if (typeof options.buttonClasses === 'string') {
                this.buttonClasses = [options.buttonClasses];
            }

            if (typeof options.buttonClasses === 'object') {
                this.buttonClasses = options.buttonClasses;
            }

            if (typeof options.showDropdowns === 'boolean') {
                this.showDropdowns = options.showDropdowns;
            }

            if (typeof options.singleDatePicker === 'boolean') {
                this.singleDatePicker = options.singleDatePicker;
            }

            if (typeof options.timePicker === 'boolean') {
                this.timePicker = options.timePicker;
            }

            if (typeof options.timePickerIncrement === 'number') {
                this.timePickerIncrement = options.timePickerIncrement;
            }

            if (typeof options.timePicker12Hour === 'boolean') {
                this.timePicker12Hour = options.timePicker12Hour;
            }

            var start, end, range;

            //if no start/end dates set, check if an input element contains initial values
            
            if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
            	
                if ($(this.element).is('input[type=text]')) {
                	
                    var val = $(this.element).prop("value");
                    var split = val.split(this.separator);
                    
                    start = end = null;
                    if (split.length == 2) {
                        start = moment(split[0], this.format);
                        end = moment(split[1], this.format);
                    } else if (this.singleDatePicker) {
                        start = moment(val, this.format);
                        end = moment(val, this.format);
                    }
                    if (start !== null && end !== null) {
                        this.startDate = start;
                        this.endDate = end;
                    }
                }
            }

            if (typeof options.ranges === 'object') {
                for (range in options.ranges) {

                    start = moment(options.ranges[range][0]);
                    end = moment(options.ranges[range][1]);

                    // If we have a min/max date set, bound this range
                    // to it, but only if it would otherwise fall
                    // outside of the min/max.
                    if (this.minDate && start.isBefore(this.minDate))
                        start = moment(this.minDate);

                    if (this.maxDate && end.isAfter(this.maxDate))
                        end = moment(this.maxDate);

                    // If the end of the range is before the minimum (if min is set) OR
                    // the start of the range is after the max (also if set) don't display this
                    // range option.
                    if ((this.minDate && end.isBefore(this.minDate)) || (this.maxDate && start.isAfter(this.maxDate))) {
                        continue;
                    }

                    this.ranges[range] = [start, end];
                }

                var list = '<ul>';
                for (range in this.ranges) {
                    list += '<li>' + range + '</li>';
                }
                list += '<li>' + this.locale.customRangeLabel + '</li>';
                list += '</ul>';
                this.container.find('.ranges ul').remove();
                this.container.find('.ranges').prepend(list);
            }

            if (typeof callback === 'function') {
                this.cb = callback;
            }

            if (!this.timePicker) {
            	
                this.startDate = this.startDate.startOf('day');
                this.endDate = this.endDate.endOf('day');
            }

            if (this.singleDatePicker) {
                this.opens = 'right';
                this.container.find('.calendar.right').show();
                this.container.find('.calendar.left').hide();
                this.container.find('.ranges').hide();
                if (!this.container.find('.calendar.right').hasClass('single'))
                    this.container.find('.calendar.right').addClass('single');
            } else {
                this.container.find('.calendar.right').removeClass('single');
                this.container.find('.ranges').show();
            }

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();
            this.oldChosenLabel = this.chosenLabel;

            this.leftCalendar = {
                month: moment([this.startDate.year(), this.startDate.month(), 1, this.startDate.hour(), this.startDate.minute()]),
                calendar: []
            };

            this.rightCalendar = {
                month: moment([this.endDate.year(), this.endDate.month(), 1, this.endDate.hour(), this.endDate.minute()]),
                calendar: []
            };

            if (this.opens == 'right') {
                //swap calendar positions
                var left = this.container.find('.calendar.left');
                var right = this.container.find('.calendar.right');
                left.removeClass('left').addClass('right');
                right.removeClass('right').addClass('left');
            }

            if (typeof options.ranges === 'undefined' && !this.singleDatePicker) {
                this.container.addClass('show-calendar');
            }

            this.container.addClass('opens' + this.opens);

            this.updateView();
            this.updateCalendars();

        },

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');

            this.oldStartDate = this.startDate.clone();

            this.updateView();
            this.updateCalendars();
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (!this.timePicker)
                this.endDate = this.endDate.endOf('day');

            this.oldEndDate = this.endDate.clone();

            this.updateView();
            this.updateCalendars();
        },

        updateView: function () {
        	
            this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year());
            this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year());
            this.updateFormInputs();
        },

        updateFormInputs: function (mode) {
        	if(this.startDate.valueOf() != this.minDate.valueOf()){
        	this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.format));
        	}else{
        	this.container.find('input[name=daterangepicker_start]').val("");	
        	}
        	if(this.endDate.valueOf() != this.maxDate.valueOf()){
        	this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.format));
        	}else{
        	this.container.find('input[name=daterangepicker_end]').val("");	
        	}
            
            
			
            if (this.startDate.isSame(this.endDate) || this.startDate.isBefore(this.endDate)) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }
        },

        updateFromControl: function () {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;

            var dateString = this.element.val().split(this.separator),
                start = null,
                end = null;
            
            if(dateString.length === 2) {
                start = moment(dateString[0], this.format);
                end = moment(dateString[1], this.format);
            }

            if (this.singleDatePicker || start === null || end === null) {
                start = moment(this.element.val(), this.format);
                end = start;
            }
            
            if (end.isBefore(start)) return;

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            this.startDate = start;
            this.endDate = end;

            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.notify();

            this.updateCalendars();
        },

        notify: function () {
            this.updateView();
            this.cb(this.startDate, this.endDate, this.chosenLabel);
        },

        move: function () {
            var parentOffset = { top: 0, left: 0 };
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
            }

            if (this.opens == 'left') {
                this.container.css({
                    top: this.element.offset().top + this.element.outerHeight() - parentOffset.top,
                    right: $(window).width() - this.element.offset().left - this.element.outerWidth() - parentOffset.left,
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: this.element.offset().top + this.element.outerHeight() - parentOffset.top,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        toggle: function (e) {
            if (this.element.hasClass('active')) {
                this.hide();
            } else {
                this.show();
            }
        },

        show: function (e) {
            this.element.addClass('active');
            this.container.show();
            this.move();

            $(document).on('click.daterangepicker', $.proxy(this.outsideClick, this));
            // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
            $(document).on('click.daterangepicker', '[data-toggle=dropdown]', $.proxy(this.outsideClick, this));

            this.element.trigger('show.daterangepicker', this);
        },

        outsideClick: function (e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                target.closest(this.element).length ||
                target.closest(this.container).length ||
                target.closest('.calendar-date').length
                ) return;
            this.hide();
        },

        hide: function (e) {
            $(document).off('click.daterangepicker', this.outsideClick);

            this.element.removeClass('active');
            this.container.hide();

            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.notify();

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            this.element.trigger('hide.daterangepicker', this);
        },

        enterRange: function (e) {
            // mouse pointer has entered a range label
            var label = e.target.innerHTML;
            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.format));
                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.format));
            }
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
        },

        updateInputText: function() {
            if (this.element.is('input') && !this.singleDatePicker) {
                //this.element.val(this.startDate.format(this.format) + this.separator + this.endDate.format(this.format));
                $(this.element).prop("value",this.container.find('input[name=daterangepicker_start]').val() + this.separator + this.container.find('input[name=daterangepicker_end]').val()).trigger("change")
            } else if (this.element.is('input')) {               
                $(this.element).prop("value",this.container.find('input[name=daterangepicker_start]').val()).trigger("change")
            }
       
            
        },

        clickRange: function (e) {
            var label = e.target.innerHTML;
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];

                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }

                this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute());
                this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute());
                this.updateCalendars();

                this.updateInputText();

                this.hideCalendars();
                this.hide();
                this.element.trigger('apply.daterangepicker', this);
            }
        },

        clickPrev: function (e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract(1,'month');
            } else {
                this.rightCalendar.month.subtract(1,'month');
            }
            this.updateCalendars();
        },

        clickNext: function (e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add(1,'month');
            } else {
                this.rightCalendar.month.add(1,'month');
            }
            this.updateCalendars();
        },

        enterDate: function (e) {

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');

            if (cal.hasClass('left')) {
                this.container.find('input[name=daterangepicker_start]').val(this.leftCalendar.calendar[row][col].format(this.format));
            } else {
                this.container.find('input[name=daterangepicker_end]').val(this.rightCalendar.calendar[row][col].format(this.format));
            }

        },

        clickDate: function (e) {
            var title = $(e.target).attr('data-title'),target_cancel = $(e.target).hasClass('active');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
			
            var startDate, endDate;
            if (cal.hasClass('left')) {
            	if(target_cancel){
            		
            		startDate = this.minDate  		
            	}else{	
	                startDate = this.leftCalendar.calendar[row][col];
	            }    
	                endDate = this.endDate;
	                if (typeof this.dateLimit === 'object') {
	                    var maxDate = moment(startDate).add(this.dateLimit).startOf('day');
	                    if (endDate.isAfter(maxDate)) {
	                        endDate = maxDate;
	                    }
	                }
              	
            } else {
            	if(target_cancel){
            		
            		endDate = this.maxDate  		
            	}else{	
	                endDate = this.rightCalendar.calendar[row][col];
	            }  
                startDate = this.startDate;
                
                if (typeof this.dateLimit === 'object') {
                    var minDate = moment(endDate).subtract(this.dateLimit).startOf('day');
                    if (startDate.isBefore(minDate)) {
                        startDate = minDate;
                    }
                }
            }
			
            if (this.singleDatePicker && cal.hasClass('left')) {
                endDate = startDate.clone();
            } else if (this.singleDatePicker && cal.hasClass('right')) {
                startDate = endDate.clone();
            }
			
            cal.find('td').removeClass('active');
			
			
			 if (startDate.isSame(endDate) || startDate.isBefore(endDate)) {
               
                this.startDate = startDate;
                this.endDate = endDate;
                this.chosenLabel = this.locale.customRangeLabel;
            } else if (startDate.isAfter(endDate)) {
                
                var difference = this.endDate.diff(this.startDate);
                this.startDate = startDate;
                this.endDate = moment(startDate).add(difference,'ms');
                this.chosenLabel = this.locale.customRangeLabel;
            }
//			if(target_cancel){
//				cal.find(".available").addClass("in-range")
//				this.updateFormInputs();
//				return;
//			}
			$(e.target).addClass('active');
            this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year());
            this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year());
            this.updateCalendars();

            if (!this.timePicker)
                endDate.endOf('day');

            if (this.singleDatePicker)
                this.clickApply();
        },

        clickApply: function (e) {
            this.updateInputText();
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function (e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.chosenLabel = this.oldChosenLabel;
            this.updateView();
            this.updateCalendars();
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        updateMonthYear: function (e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            this[leftOrRight+'Calendar'].month.month(month).year(year);
            this.updateCalendars();
        },

        updateTime: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);

            if (this.timePicker12Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }

            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                this.startDate = start;
                this.leftCalendar.month.hour(hour).minute(minute);
            } else {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                this.endDate = end;
                this.rightCalendar.month.hour(hour).minute(minute);
            }

            this.updateCalendars();
        },

        updateCalendars: function () {
        	if(this.startDate.valueOf() != this.minDate.valueOf()){
        	
        	this.leftCalendar.calendar = this.buildCalendar(this.leftCalendar.month.month(), this.leftCalendar.month.year(), this.leftCalendar.month.hour(), this.leftCalendar.month.minute(), 'left');	
        	}
        	if(this.endDate.valueOf() != this.maxDate.valueOf()){
        	this.rightCalendar.calendar = this.buildCalendar(this.rightCalendar.month.month(), this.rightCalendar.month.year(), this.rightCalendar.month.hour(), this.rightCalendar.month.minute(), 'right');	
        	
        	}
            
            
            this.container.find('.calendar.left').empty().html(this.renderCalendar(this.leftCalendar.calendar, this.startDate, this.minDate, this.maxDate));
            this.container.find('.calendar.right').empty().html(this.renderCalendar(this.rightCalendar.calendar, this.endDate, this.startDate, this.maxDate));

            this.container.find('.ranges li').removeClass('active');
            var customRange = true;
            var i = 0;
            for (var range in this.ranges) {
                if (this.timePicker) {
                    if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')')
                            .addClass('active').html();
                    }
                } else {
                    //ignore times when comparing dates if time picker is not enabled
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')')
                            .addClass('active').html();
                    }
                }
                i++;
            }
            if (customRange) {
                this.chosenLabel = this.container.find('.ranges li:last')
                    .addClass('active').html();
            }
        },

        buildCalendar: function (month, year, hour, minute, side) {
            var firstDay = moment([year, month, 1]);
            var lastMonth = moment(firstDay).subtract(1,'month').month();
            var lastYear = moment(firstDay).subtract(1,'month').year();

            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();

            var dayOfWeek = firstDay.day();

            var i;

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            for (i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute]);
            var col, row;
            for (i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24,'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour);
                curDate.hour(12);
            }

            return calendar;
        },

        renderDropdowns: function (selected, minDate, maxDate) {
            var currentMonth = selected.month();
            var monthHtml = '<select class="monthselect">';
            var inMinYear = false;
            var inMaxYear = false;

            for (var m = 0; m < 12; m++) {
                if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                    monthHtml += "<option value='" + m + "'" +
                        (m === currentMonth ? " selected='selected'" : "") +
                        ">" + this.locale.monthNames[m] + "</option>";
                }
            }
            monthHtml += "</select>";

            var currentYear = selected.year();
            var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
            var minYear = (minDate && minDate.year()) || (currentYear - 50);
            var yearHtml = '<select class="yearselect">';

            for (var y = minYear; y <= maxYear; y++) {
                yearHtml += '<option value="' + y + '"' +
                    (y === currentYear ? ' selected="selected"' : '') +
                    '>' + y + '</option>';
            }

            yearHtml += '</select>';

            return monthHtml + yearHtml;
        },

        renderCalendar: function (calendar, selected, minDate, maxDate) {

            var html = '<div class="calendar-date">';
            html += '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers)
                html += '<th></th>';

            if (!minDate || minDate.isBefore(calendar[1][1])) {
                html += '<th class="prev available"><i class="fa fa-arrow-left icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                dateHtml = this.renderDropdowns(calendar[1][1], minDate, maxDate);
            }
			
            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if (!maxDate || maxDate.isAfter(calendar[1][1])) {
                html += '<th class="next available"><i class="fa fa-arrow-right icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function (index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';

                for (var col = 0; col < 7; col++) {
                    var cname = 'available ';
                    cname += (calendar[row][col].month() == calendar[1][1].month()) ? '' : 'off';

                    if ((minDate && calendar[row][col].isBefore(minDate)) || (maxDate && calendar[row][col].isAfter(maxDate))) {
                        cname = ' off disabled ';
                    } else if (calendar[row][col].format('YYYY-MM-DD') == selected.format('YYYY-MM-DD')) {
                        cname += ' active ';
                        if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
                            cname += ' start-date ';
                        }
                        if (calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
                            cname += ' end-date ';
                        }
                    } else if (calendar[row][col] >= this.startDate && calendar[row][col] <= this.endDate) {
                        cname += ' in-range ';
                        if (calendar[row][col].isSame(this.startDate)) { cname += ' start-date '; }
                        if (calendar[row][col].isSame(this.endDate)) { cname += ' end-date '; }
                    }

                    var title = 'r' + row + 'c' + col;
                    html += '<td class="' + cname.replace(/\s+/g, ' ').replace(/^\s?(.*?)\s?$/, '$1') + '" data-title="' + title + '">' + calendar[row][col].date() + '</td>';
                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';
            html += '</div>';

            var i;
            if (this.timePicker) {

                html += '<div class="calendar-time">';
                html += '<select class="hourselect">';
                var start = 0;
                var end = 23;
                var selected_hour = selected.hour();
                if (this.timePicker12Hour) {
                    start = 1;
                    end = 12;
                    if (selected_hour >= 12)
                        selected_hour -= 12;
                    if (selected_hour === 0)
                        selected_hour = 12;
                }

                for (i = start; i <= end; i++) {
                    if (i == selected_hour) {
                        html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + i + '</option>';
                    }
                }

                html += '</select> : ';

                html += '<select class="minuteselect">';

                for (i = 0; i < 60; i += this.timePickerIncrement) {
                    var num = i;
                    if (num < 10)
                        num = '0' + num;
                    if (i == selected.minute()) {
                        html += '<option value="' + i + '" selected="selected">' + num + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + num + '</option>';
                    }
                }

                html += '</select> ';

                if (this.timePicker12Hour) {
                    html += '<select class="ampmselect">';
                    if (selected.hour() >= 12) {
                        html += '<option value="AM">AM</option><option value="PM" selected="selected">PM</option>';
                    } else {
                        html += '<option value="AM" selected="selected">AM</option><option value="PM">PM</option>';
                    }
                    html += '</select>';
                }

                html += '</div>';

            }

            return html;

        },

        remove: function() {

            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData('daterangepicker');

        }

    };

    $.fn.daterangepicker = function (options, cb) {
        this.each(function () {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, cb));
        });
        return this;
    };

}(window.jQuery, window.moment);

	!(function($) {
		var Multilang = function() {
			this.addData = function(val,target,vm) {
				var target = target , jq_t = $(target),jq_tsb = jq_t.siblings(".multilang_body"),tmparray,tmpname="name";
				if(typeof(val) == "object"){
					tmparray = val
					if(tmparray.lang_name){
					tmpname = tmparray.lang_name
					}
				}else{
					tmparray = val.split(",")	
				}		
				jq_tsb.val(tmparray)				
				$.each(tmparray,function(i,node){
					if(i > 0){
					jq_tsb.find(".m_context").eq(i).attr("data-bind","value:"+tmpname+i).text(node)					
					}else{
					jq_tsb.find(".m_context").eq(i).attr("data-bind","value:"+tmpname).text(node)	
					}
				})
				if(this.ko_vm){
					ko.applyBindings(this.ko_vm, jq_tsb[0])
				}
			};
			this.ko_vm; 
			this.add_ko_vm = function(vm){				
				this.ko_vm = vm				
			}
			this.multinfo = function(sort){		
				var target = multilang.target, jq_t = $(target), me = multilang,tmplabel = "",close_menu=true;		
				if ($.isArray(sort)) {											
							
					jq_t.addClass("multilang_array").after("<div class='multilang_body'><input class='lang_value' contenteditable='true'><span class='fa fa-sort-desc lang_icon'></span>").css("display","none")

					$.each(sort, function(i, node) {
						tmplabel += "<label attr='lang_"+i+"'><span class='m_context'></span><span class='m_icon'>" + node + "</span></label>"
					})
					jq_t.siblings(".multilang_body").append("<div class='multilang_menu '>" + tmplabel + "</div>")
					
					$(".multilang_body").off("click mouseenter mouseleave").on({
						click:function(){
							var target_icon = $(this), target_div = target_icon.parents(".multilang_body");
							target_icon.siblings("input").focus()
							if(target_div.find(".multilang_menu").css("display") == "block"){
								target_div.find(".multilang_menu").css("display","none")
							}else{
								target_div.find(".multilang_menu").css("display","block")
							}
						},
						mouseenter:function(){
							close_menu = false;
						},
						mouseleave:function(){
							close_menu = true;
						}
							
					},".lang_icon").off("blur").on("blur",".lang_value",function(){
						var target_input = $(this),
							target_box = me.fixtarget(target_input),
							target_div = target_input.parents(".multilang_body"),
							tmpkey = (target_input.attr("class").split(" "))[2],						
							tmptext = target_input.val();
						
							if(target_input.hasClass("ready_change")){
								
								me.changeData(target_box,tmpkey,tmptext);
							}
							
							if(close_menu){
								target_div.find(".multilang_menu").css("display","none")
							}
							
					})
					$(".multilang_menu").off("click").on("click","label",function(){
						var target_label = $(this), target_div = target_label.parents(".multilang_body"),
							tmpsort = target_label.index();
							tmptext = target_label.children(".m_context").text();
							tmpicon = target_label.children(".m_icon").clone();
							
							target_div.find(".lang_value").attr("class","").addClass("ready_change lang_value "+tmpsort).val(tmptext).focus();
							target_div.find(".lang_icon").removeClass("fa-sort-desc").html(tmpicon)
						
							target_div.trigger('change.u.multilang', {newValue:tmptext, lang:tmpicon.text()})


					}).off("mouseenter mouseleave").on({
						mouseenter:function(){
							close_menu = false;
						},
						mouseleave:function(){
							close_menu = true;
						}
					})
					
				} else {
					console.error('Not object')
				}
			}
			this.multidata = function(text,vm){
				var target = multilang.target;
				multilang.addData(text,target,vm)
				
			}
			this.changeData = function(target,i,text){
				var tmpdata = target.value; jq_t = $(target) 				
				tmpdata[i]=text;		
				jq_t.find("label[attr='lang_"+i+"']").find(".m_context").text(text).prop("value",text).trigger('change');
							
			}
			this.getData = function(){
				var target = $(multilang.target).siblings(".multilang_body")[0], multilang_data = target.value;
				return 	multilang_data;
			}
			this.fixtarget = function(element){
				multilang.target = element.parents(".multilang_body")[0]
				return multilang.target;
			}
			this.target = "";
			this.doSth = function(opt) {
					multilang.target = this[0];
					
					if(typeof(opt) == "object"){
						$.each(opt, function(k, v) {						
								multilang[k](v)		
						})
					}else{
							
						return multilang[opt]();			
					}
					multilang.target = "";
			}
		};
		var multilang = new Multilang();
		$.fn.extend({
			multilang: multilang.doSth
		})
		
	})(jQuery);
+ function($) { 
    $(document).on('focus.u.input', '.form-control', function() {
		var $ele = $(this);
		setTimeout((function($ele){
			return function(){
				if($ele.is('div[contenteditable=true]')) {
					$ele.selectText();
				} else if($ele.is('input')){
					$ele.select();
				}
			}
		})($ele), 100);
        
    })
	$("div[contenteditable='true']").on('keydown',function(event){
		 		
		 		if (event.keyCode == 13) {
                     
                 $(this).blur();                              
              }
		 		
	})

}(jQuery);

;
(function($, window, document, undefined) { 
	/*
	 * 对象所支持的属性及默认值
	 */
	var dataSource = function(options, gridComp) {
		this.defaults = {
			
		}
		this.gridComp = gridComp;
		this.options = $.extend({}, this.defaults, options);
		this.rows = new Array(); // 存储数据行
		this.hasParentRows = new Array(); // 存在父项
		this.nothasParentRows = new Array(); // 不存在父项
		this.sortRows();
		
	};
	var gridCompColumn = function(options, gridOptions) {
		this.defaults = {
				width:200, // 默认宽度为200
				sortable: true, // 是否可以排序
				canDrag: true, // 是否可以拖动
				fixed: false, // 是否固定列
				visible: true, // 是否显示
				canVisible: true, // 是否可以隐藏
				sumCol:false, // 是否计算合计
				editable:false, // 是否可修改
				autoExpand:false, // 是否自动扩展列
				editType:'text', // 编辑类型，支持传入function扩展
				dataType:'String', // 数据类型,String、Date、DateTime、Int、Float
				//precision:  //精度
				format:'yyyy-MM-dd hh:mm:ss',
				//renderType:'', 渲染类型
		};
			// 从grid继承的属性
		var gridDefault = {
			sortable: gridOptions.sortable,
			canDrag: gridOptions.canDrag,
			editable: gridOptions.editable,
			width: gridOptions.columnWidth,
		};
		if(options.dataType == 'Date'){
			this.defaults.format = 'yyyy-MM-dd';
		}
		// 树表暂时不支持排序
		if(gridOptions.showTree){
			options.sortable = false;
		}
		this.options = $.extend({}, this.defaults, gridDefault, options);
		
		// 转成数字
		this.options.width = parseInt(this.options.width);
		
		this.firstColumn = false;
	};

	var gridComp = function(ele, options) {
		this.dataSource = dataSource;
		this.gridCompColumn = gridCompColumn;
		this.ele = ele[0];
		this.$ele = ele;

		this.defaults = {
			id: 'grid',
			//width: '100%',
			//height: '100%',
			columnWidth:200,
			sortable: true, // 是否可以排序
			canDrag: true, // 是否可以拖动
			showHeader: true, // 是否显示表头
			columnMenu: true, // 是否存在列头操作按钮
			showNumCol: false, // 是否显示数字列
			multiSelect:false, // 是否显示复选框
			showSumRow: false, // 是否显示合计行
			editable: false, // 是否可修改
			editType: 'default', // 编辑方式，default为行编辑，form为在行下方以form编辑 
			showTree:false, // 是否显示树表
			autoExpand:true, // 是否默认展开
		}
		
		this.transDefault = {
			ml_show_column:trans('gridComp.show_column', '显示/隐藏列'),
			ml_clear_set:trans('gridComp.clear_set', '清除设置'),
			ml_no_rows:trans('gridComp.no_rows', '无数据'),
			ml_sum:trans('gridComp.sum', '合计:'),
			ml_close:trans('gridComp.close', '关闭'),
		}
		
		this.transMap = $.extend({},this.transDefault,options.transMap);

		this.options = $.extend({}, this.defaults, options);

		this.gridCompColumnArr = new Array(); // 存储设置默认值之后的columns对象
		this.gridCompColumnFixedArr = new Array(); // 存储设置默认值之后的固定列columns对象
		this.basicGridCompColumnArr = new Array(); // 存储基本的columns对象，用于清除设置
		
		this.treeLeft = 10; // 树表时每一级之间的差值
		this.multiSelectWidth = 40; // 复选框列宽度
		this.numWidth = 40; // 数字列宽度
		this.multiWidth = 40; // 复选框宽度
		this.headerHeight = 34; // header区域高度
		this.countContentHeight = true;// 是否计算内容区的高度（是否为流式）
		this.minColumnWidth = 80; // 最小列宽
		this.columnMenuWidth = 160; // column menu的宽度
		this.scrollBarHeight = 16; // 滚动条高度
		this.columnMenuHeight = 33;
		
		this.initGrid();
	};

	/*
	 * 对象提供的方法
	 */
	gridComp.prototype = {
		/*
		 * 创建grid
		 */
		initGrid: function() {
			var oThis = this;
			this.initOptions();
			this.initVariable();
			this.initWidthVariable();
			this.initGridCompColumn();
			this.initDataSource();
			this.createDivs();
			this.inte = setInterval(function(){oThis.setIntervalFun.call(oThis)}, 100);
		},
		
		destroySelf: function(){
			clearInterval(this.inte);
			this.$ele.data('gridComp',null);
			this.ele.innerHTML = '';
		},
		
		/*
		 * 对传入参数进行格式化处理
		 * 宽度、高度处理
		 * 左侧区域宽度计算
		 * 除去内容区域的高度
		 */
		initOptions: function() {
			this.options.width = this.formatWidth(this.options.width);
			this.options.height = this.formatWidth(this.options.height);
			if(this.options.height == '100%' || !this.options.height){
				this.countContentHeight = false;
			}
			
			this.leftW = 0; // 左侧区域宽度（数字列复选框等）
			if (this.options.showNumCol) {
				this.leftW += this.numWidth;
			}
			if(this.options.multiSelect){
				this.leftW += this.multiWidth;
			}
			
			this.exceptContentHeight = 0; // 内容区域之外的高度
			if(this.options.showHeader){
				this.exceptContentHeight +=this.headerHeight;
			}
			
			// 缓存id
			var url = window.location.href;
			var index = url.indexOf('?');
			if(index > 0){
				url = url.substring(0,index);
			}
			this.localStorageId = this.options.id + url;
			
		},
		
		/*
		 * 初始化变量
		 */
		initVariable:function(){
			this.initDataSourceVariable();
			// 鼠标点击移动时位置记录
			this.mouseUpX = 'mouseUpX';
			this.mouseUpY = 'mouseUpY';
			this.mouseDownX = 'mouseDownX';
			this.mouseDownY = 'mouseDownY';
			this.mouseMoveX = 'mouseMoveX';
			this.mouseMoveY = 'mouseMoveY';
			this.scrollLeft = 0; // 记录横向滚动条
			this.scrollTop = 0;// 记录纵向滚动条
			this.showType = ''; // 记录grid显示方式，form和grid
			this.createGridFlag = false; // 是否已经创建grid展示
			this.createFormFlag = false; // 是否已经创建form展示
			this.columnClickX = 0; // 点击处的X坐标
			this.columnClickY = 0; // 点击处的Y坐标
			this.$sd_storageData = null;// 本地缓存内容为object
			this.columnMenuMove = false;// 是否在column menu区域移动
			this.createColumnMenuFlage = false;
			this.firstColumn = true; // 用于记录是否已经存在第一列，true表示还没有，false表示已经存在
			this.lastVisibleColumn = null;
			this.lastVisibleColumnWidth = 0;
			this.menuColumnsHeight = 0; 
		},
		/*
		 * 初始化datasource相关变量
		 */
		initDataSourceVariable:function(){
			this.selectRows = new Array();
			this.selectRowsObj = new Array();
			this.selectRowsIndex = new Array();
			this.allRows = new Array();
			this.eidtRowIndex = -1; // 当前修改行
		},
		
		// 初始化宽度相关变量
		initWidthVariable:function(){
			// 计算用变量
			this.wholeWidth = 0; // 整体宽度
			this.wholeHeight = 0; // 整体高度
			this.rowHeight = 0; // 数据行高度
			this.fixedRealWidth = 0; // 固定区域真实宽度
			this.fixedWidth = 0; // 固定区域宽度
			this.contentRealWidth = 0; // 内容区真实宽度,严格按照设置的width计算的宽度
			this.contentWidth = 0; // 内容区宽度，自动扩展之后的宽度
			this.contentMinWidth = 0; // 内容区最小宽度,即可视宽度
			this.contentHeight = 0; //内容区高度
		},
		/*
		 * 创建gridCompColumn对象方便后续处理
		 */
		initGridCompColumn: function() {
			var oThis = this;
			oThis.gridCompColumnFixedArr = new Array();
			if (this.options.columns) {
				$.each(this.options.columns, function(i) {
					var column = new gridCompColumn(this, oThis.options);
					oThis.gridCompColumnArr[i] = column;
					var column1 = new gridCompColumn(this, oThis.options);
					oThis.basicGridCompColumnArr[i] = column1;
				});
			}
			var localGridCompColumnArr = this.getGridCompColumnArrFromLocal();
			// 获取本地缓存中的数据
			if(localGridCompColumnArr != null){
				this.gridCompColumnArr = localGridCompColumnArr;
				$.each(this.gridCompColumnArr,function(){
					var field = this.options.field;
					for(var i =0;i < oThis.options.columns.length;i++){
						var c = oThis.options.columns[i];
						if(c.field == field){
							var options = $.extend({},c,this.options);
							this.options = options;
							break;
						}
					}
				});
			}
			this.menuColumnsHeight = this.gridCompColumnArr.length * this.columnMenuHeight;
			
			this.initGridCompFixedColumn();
			this.columnsVisibleFun();
		},
		
		/*
		 * 将固定列放入gridCompColumnFixedArr
		 */
		initGridCompFixedColumn:function(){
			var oThis = this;
			var w = 0;
			$.each(this.gridCompColumnArr,function(i){
				if(this.options.fixed == true){
					oThis.gridCompColumnFixedArr.push(this);
				}
			});
			$.each(this.gridCompColumnFixedArr,function(i){
				for(var i = oThis.gridCompColumnArr.length;i >-1;i-- ){
					if(oThis.gridCompColumnArr[i] == this){
						oThis.gridCompColumnArr.splice(i,1);
						break;
					}
				}
			});
		},
		/*
		 * 创建dataSource对象方便后续处理
		 */
		initDataSource: function() {
			var oThis = this;
			this.dataSourceObj = new dataSource(this.options.dataSource,this);
		},

		/*
		 * 创建顶层div以及_top div层
		 * 添加顶层div相关监听
		 */
		createDivs: function() {
			var oThis = this;
			this.ele.innerHTML = '';
			// 创建顶层div
			var styleStr = '',str = '';
			if(this.options.width){
				str += 'width:' + this.options.width + ';';
			}else{
				str += 'width:auto;';
			}
			if(this.options.height){
				str += 'height:' + this.options.height + ';';
			}else{
				str += 'height:auto;';
			}
			if(str != ''){
				styleStr = 'style="' + str + '"';
			}
			var htmlStr = '<div id="' + this.options.id + '" data-role="grid" class="u-grid" ' + styleStr + '>';
			htmlStr += '</div>';
			this.ele.insertAdjacentHTML('afterBegin', htmlStr);
			// 创建屏幕div,用于拖动等操作
			var htmlStr = '<div id="' + this.options.id + '_top" class="u-grid-top"></div>';
			this.ele.insertAdjacentHTML('afterBegin', htmlStr);
			
			this.initEventFun(); //创建完成之后顶层div添加监听
			this.widthChangeFun(); // 根据整体宽度创建grid或form展示区域
		},
		/*
		 * 创建div区域
		 */
		repaintDivs:function(){
			// 后期可以考虑form展示
			this.repaintGridDivs();
		},		/*
		 * 创建grid形式下div区域
		 */
		createGridDivs: function() {
			if (this.createGridFlag) {
				return;
			}
			// 为避免重复渲染，在开始清空里面内容
			if($('#' + this.options.id)[0])
				$('#' + this.options.id)[0].innerHTML = '';
			var htmlStr = '<div id="' + this.options.id + '_grid" class="u-grid-grid">';
			if(this.options.showHeader){
				htmlStr += this.createColumnMenu();
				htmlStr += this.createHeader();
			}
			htmlStr += this.createContent();
			if(this.options.editable){
				htmlStr += this.createContentEditMenu();
			}
			htmlStr += '</div>';
			if($('#' + this.options.id)[0])
				$('#' + this.options.id)[0].insertAdjacentHTML('afterBegin', htmlStr);
			
			this.headerFirstClassFun();
			this.initGridEventFun();
			this.afterGridDivsCreate();
			this.createGridFlag = true;
		},
		/*
		 * 重画grid
		 */
		repaintGridDivs: function() {
			$('#' + this.options.id + '_grid').remove();
			this.showType = '';
			this.wholeWidth = 0;
			this.createGridFlag = false;
			this.columnsVisibleFun();
			this.widthChangeFun();
		},
		
		/*
		 * 创建columnMenu区域
		 */
		createColumnMenu: function() {
			var htmlStr = '<div class="u-grid-column-menu" id="' + this.options.id + '_column_menu">';
			htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-ul" id="' + this.options.id + '_column_menu_ul">';

			// 创建显示/隐藏列
			htmlStr += '<li class="u-grid-column-menu-li" role="menuitem">';
			htmlStr += '<div class="u-grid-column-menu-div1" id="' + this.options.id + '_showColumn">';
			htmlStr += '<span class="u-grid-column-menu-span">' + this.transMap.ml_show_column + '</span>';
			htmlStr += '<div class="u-grid-column-menu-div3 fa fa-caret-right"></div>';
			htmlStr += '</div></li>';
			
			// 创建清除设置
			htmlStr += '<li class="u-grid-column-menu-li" role="menuitem">';
			htmlStr += '<div class="u-grid-column-menu-div1" id="' + this.options.id + '_clearSet">';
			htmlStr += '<span class="u-grid-column-menu-span">' + this.transMap.ml_clear_set + '</span>';
			htmlStr += '</div></li>';
			
			htmlStr += '</ul></div>';
			
			// 创建数据列区域
			htmlStr += '<div class="u-grid-column-menu-columns" id="' + this.options.id + '_column_menu_columns">';
			htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-columns-ul" id="' + this.options.id + '_column_menu_columns_ul">';
			$.each(this.gridCompColumnArr, function(i) {
				htmlStr += '<li class="u-grid-column-menu-columns-li" role="menuitem" index="' + i + '">';
				htmlStr += '<div class="u-grid-column-menu-columns-div1">';
				var checkedStr = "";
				if(this.options.visible)
					checkedStr = ' checked';
				if(!this.options.canVisible)
					checkedStr += ' style="display:none;"';
				htmlStr += '<div class="u-grid-column-menu-columns-div2"><input type="checkbox" ' + checkedStr + '></div>';
				htmlStr += '<span class="u-grid-column-menu-columns-span">' + this.options.title + '</span>';
				htmlStr += '</div></li>';
			});
			htmlStr += '</ul></div>';
			return htmlStr;
		},

		/*
		 * 创建header区域
		 */
		createHeader: function() {
			var htmlStr = '<div class="u-grid-header" id="' + this.options.id + '_header"><div class="u-grid-header-wrap" id="' + this.options.id + '_header_wrap" data-role="resizable">';
			if (this.options.multiSelect || this.options.showNumCol) {
				htmlStr += '<div id="' + this.options.id + '_header_left" class="u-grid-header-left" style="width:' + this.leftW + 'px;">';
				if (this.options.multiSelect) {
					htmlStr += '<div class="u-grid-header-multi-select" style="width:' + this.multiWidth + 'px;"><input type="checkbox" id="' + this.options.id + '_header_multi_input"></div>'
				}
				if (this.options.showNumCol) {
					htmlStr += '<div class="u-grid-header-num" style="width:' + this.numWidth + 'px;"></div>';
				}
				htmlStr += '</div>';
			}
			htmlStr += this.createHeaderTable('fixed');
			htmlStr += this.createHeaderTable();
			htmlStr += '</div>';
			htmlStr += '<div class="u-grid-header-resize-handle" id="' + this.options.id + '_resize_handle"><div class="u-grid-header-resize-handle-inner"></div></div>';
			htmlStr += '</div>';
			return htmlStr;
		},
		/*
		 * 创建header区域table
		 */
		createHeaderTable:function(createFlag){
			var leftW,positionStr,idStr;
			if(createFlag == 'fixed'){
				leftW = parseInt(this.leftW);
				positionStr = 'absolute;width:'+this.fixedWidth+'px;z-index:11;background:#F9F9F9;';
				idStr = 'fixed_';
			}else{
				leftW = parseInt(this.leftW) + parseInt(this.fixedWidth);	
				positionStr = 'relative;';
				idStr = '';
				if(this.contentMinWidth > 0){
					positionStr += 'width:'+this.contentMinWidth+'px;';
				}
			}
			
			var htmlStr = '<table role="grid" id="' + this.options.id + '_header_'+idStr+'table" style="position:'+ positionStr+';left:' + leftW + 'px">';
			htmlStr += this.createColgroup(createFlag);
			htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_header_'+idStr+'thead">';
			htmlStr += this.createThead(createFlag);
			htmlStr += '</thead></table>';
			return htmlStr;
		},
		/*
		 * 创建colgroup
		 */
		createColgroup: function(createFlag) {
			var oThis = this,
				htmlStr = '<colgroup>',gridCompColumnArr;
			if(createFlag == 'fixed'){
				gridCompColumnArr = this.gridCompColumnFixedArr;
			}else{
				gridCompColumnArr = this.gridCompColumnArr;
			}
			$.each(gridCompColumnArr, function() {
				if(this.options.visible){
					htmlStr += '<col';
					htmlStr += ' style="width:' + oThis.formatWidth(this.options.width) + '"';
					htmlStr += '>';
				}
			});
			htmlStr += '</colgroup>';
			return htmlStr;
		},
		
		/*
		 * 创建thead区域
		 */
		createThead: function(createFlag) {
			var oThis = this;
			var visibleIndex = 0;
			var gridCompColumnArr;
			
			var htmlStr = '<tr role="row">';
			if(createFlag == 'fixed'){
				gridCompColumnArr = this.gridCompColumnFixedArr;
			}else{
				gridCompColumnArr = this.gridCompColumnArr;
			}
			$.each(gridCompColumnArr, function(i) {
				var vi = visibleIndex;
				var displayStyle = '';
				if(this.options.visible == false){
					vi = -1;
					displayStyle = 'style="display:none;"'; 
				}else{
					visibleIndex++;
				}
				// 低版本浏览器不支持th position为relative，因此加入空div
				htmlStr += '<th role="columnheader" data-filed="' + this.options.field + '" rowspan="1" class="u-grid-header-th" ' + displayStyle + 'field="' + this.options.field + '" index="' + i + '" visibleIndex="' + vi + '"><div style="position:relative;">';
				htmlStr += '<div class="u-grid-header-link" field="' + this.options.field + '" title="' + this.options.title + '">' + this.options.title + '</div>';
				if(oThis.options.columnMenu && createFlag != 'fixed'){
					// 创建右侧按钮图标
					htmlStr += '<div class="u-grid-header-columnmenu fa fa-bars " field="' + this.options.field + '" style="display:none;"></div>';
				}
				htmlStr += '</div></th>';
			});
			htmlStr += '</tr>';

			return htmlStr;
		},		/*
		 * 创建内容区域
		 */
		createContent: function() {
			var h = '',displayStr = '',bottonStr='';
			if(this.countContentHeight){
				var wh = $('#' + this.options.id)[0].offsetHeight;
				this.wholeHeight = wh;
				if (wh > 0) {
					this.contentHeight = parseInt(wh) - this.exceptContentHeight > 0?parseInt(wh) - this.exceptContentHeight:0;
					if(this.contentHeight > 0){
						h = 'style="max-height:' + this.contentHeight + 'px;"';
					}
				}
			}
			var htmlStr = '<div id="' + this.options.id + '_content" class="u-grid-content" ' + h + '>';
			if (this.options.showNumCol || this.options.multiSelect) {
				htmlStr += this.createContentLeft();
				if(!(this.contentWidth > this.contentMinWidth)){
					displayStr = 'display:none;';
					bottonStr = 'bottom:0px;'
				}
				if(this.options.showSumRow){
					htmlStr += '<div class="u-grid-content-left-sum-bottom" id="' + this.options.id + '_content_left_sum_bottom" style="width:' + (this.leftW + this.fixedWidth) + 'px;'+bottonStr+'">';
					htmlStr += '</div>';
				}
				
				htmlStr += '<div class="u-grid-content-left-bottom" id="' + this.options.id + '_content_left_bottom" style="width:' + (this.leftW + this.fixedWidth) + 'px;'+displayStr+'">';
				htmlStr += '</div>';
			}
			htmlStr += this.createContentTable('fixed');
			htmlStr += this.createContentTable();
			htmlStr += '</div>';
			return htmlStr;
		},
		
		/*
		 * 创建内容区左侧区域
		 */
		createContentLeft: function() {
			var oThis = this,
				htmlStr = "",
				left = 0;
			if(this.options.multiSelect){
				htmlStr += '<div class="u-grid-content-left" id="' + this.options.id + '_content_multiSelect" style="width:' + this.multiSelectWidth + 'px;">';
				// 遍历生成所有行
				if (this.dataSourceObj.rows) {
					$.each(this.dataSourceObj.rows, function(i) {
						htmlStr += oThis.createContentLeftMultiSelectRow(this);
					});
				}
				htmlStr += '</div>';
				left += this.multiSelectWidth;
			}
			if (this.options.showNumCol) {
				htmlStr += '<div class="u-grid-content-left" id="' + this.options.id + '_content_numCol" style="width:' + this.numWidth + 'px;left:' + left + 'px;">';
				// 遍历生成所有行
				if (this.dataSourceObj.rows) {
					$.each(this.dataSourceObj.rows, function(i) {
						htmlStr += oThis.createContentLeftNumColRow(i);
					});
				}
				htmlStr += '</div>';
			}
			
			return htmlStr;
		},
		
		/*
		 * 创建内容区左侧区域复选区（一行）
		 */
		createContentLeftMultiSelectRow:function(row,displayFlag){
			var displayStr = '';
			if(!this.options.autoExpand && row.level > 0 && displayFlag != 'block'){
				displayStr = 'display:none;'
			}
			var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect"><input type="checkbox" class="u-grid-multi-input"></div>';
			return htmlStr;
		},
		/*
		 * 创建内容区左侧区域数字列（一行）
		 */
		createContentLeftNumColRow:function(index){
			var htmlStr = '<div style="width:' + this.numWidth + 'px;" class="u-grid-content-num">' + (index+1) + '</div>';
			return htmlStr;
		},
		
		
		
		/*
		 * 创建内容区table
		 */
		createContentTable:function(createFlag){
			var leftW,idStr,styleStr,hStr,cssStr,tableStyleStr;
			if(this.countContentHeight && parseInt(this.contentHeight) > 0){
				hStr = 'max-height:' + this.contentHeight + 'px;';
			}else{
				hStr = "";
			}
			if(createFlag == 'fixed'){
				leftW = parseInt(this.leftW);
				idStr = 'fixed_';
				cssStr = 'fixed-';
				styleStr = 'style="position:absolute;width:'+this.fixedWidth+'px;left:' + leftW + 'px;' +hStr+'"';
				tableStyleStr = 'style="width:'+this.fixedWidth+'px;"';
			}else{
				leftW = parseInt(this.leftW) + parseInt(this.fixedWidth);	
				idStr = '';
				cssStr = '';
				styleStr = 'style="position:relative;left:' + leftW + 'px;' +hStr;
				if(this.contentMinWidth > 0){
					styleStr += 'width:' + this.contentMinWidth + 'px;"';
				}
				styleStr += '"';
				tableStyleStr = '';
				if(this.contentMinWidth > 0){
					if(this.contentWidth > 0){
						tableStyleStr = 'style="min-width:' + this.contentMinWidth + 'px;width:' + this.contentWidth + 'px;"';	
					}else{
						tableStyleStr = 'style="min-width:' + this.contentMinWidth + 'px;"';
					}
				}
			}
			var  htmlStr = '<div id="' + this.options.id + '_content_'+idStr+'div" class="u-grid-content-'+cssStr+'div" '+styleStr+'>';
			htmlStr += '<table role="grid" id="' + this.options.id + '_content_'+idStr+'table" ' + tableStyleStr+'>';
			htmlStr += this.createColgroup(createFlag);
			htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_content_'+idStr+'thead" style="display:none">';
			htmlStr += this.createThead(createFlag);
			htmlStr += '</thead>';
			htmlStr += this.createContentRows(createFlag);
			htmlStr += '</table>';
			if(createFlag != 'fixed'){
				htmlStr += this.createNoRowsDiv();
			}
			htmlStr += '</div>';
			return htmlStr;
		},
		
		/*
		 * 创建无数据区域
		 */
		createNoRowsDiv:function(){
			var styleStr = '',styleStr1 = '';
			if(this.contentMinWidth > 0){
				styleStr += 'style="width:' + this.contentMinWidth + 'px;"';
			}
			if(this.contentWidth > 0){
				styleStr1 += 'style="width:' + this.contentWidth + 'px;"';
			}
			
			var htmlStr = '<div class="u-grid-noRowsDiv"' + styleStr1 + ' id="' + this.options.id + '_noRows"></div>';
			htmlStr += '<div class="u-grid-noRowsShowDiv"' + styleStr + ' id="' + this.options.id + '_noRowsShow">' + this.transMap.ml_no_rows + '</div>';
			
			return htmlStr; 
		},
		
		
		/*
		 * 创建内容区域所有行
		 */
		createContentRows: function(createFlag) {
			var oThis = this,
				htmlStr = "",idStr;
			if(createFlag == 'fixed'){
				idStr = 'fixed_';
			}else{
				idStr = '';
			}
			// 遍历生成所有行
			if (this.dataSourceObj.rows) {
				htmlStr += '<tbody role="rowgroup" id="' + this.options.id + '_content_'+idStr+'tbody">';
				$.each(this.dataSourceObj.rows, function(i) {
					htmlStr += oThis.createContentOneRow(this,createFlag);
				});
				if(oThis.options.showSumRow && this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0){
					htmlStr += oThis.createSumRow(createFlag);
				}
				htmlStr += '</tbody>';
			}
			return htmlStr;
		},
		
		/*
		 * 创建内容区域数据行
		 */
		createContentOneRow: function(row,createFlag,displayFlag) {
			var styleStr = '';
			if(!this.options.autoExpand && row.level > 0 && displayFlag != 'block'){
				styleStr = 'style="display:none"';
			}
			var htmlStr = '<tr role="row" ' + styleStr + '>';
			htmlStr += this.createContentOneRowTd(row,createFlag);
			htmlStr += '</tr>';
			return htmlStr;
		},
		/*
		 * 创建内容区域数据行，针对IE
		 */
		createContentOneRowForIE:function(table,index,rowObj,createFlag,displayFlag){
			var row = table.insertRow(index + 1);
			row.role = 'row';
			if(!this.options.autoExpand && row.level > 0 && displayFlag != 'block'){
				row.style.display = 'none';
			}
			this.createContentOneRowTdForIE(row,rowObj,createFlag);
			  
		},
		
		/*
		 * 数据更新重画当前行
		 */
		repaintRow:function(tr,row,createFlag){
			var $tr = $(tr);
			var index = $('tr',$tr.parent()).index($tr);
			tr.innerHTML = this.createContentOneRowTd(row,createFlag);
			var obj = {};
			obj.begin = index;
			obj.length = 1;
			obj.createFlag = createFlag;
			this.renderTypeFun(obj);
		},
		
		/*
		 * 创建行td对应的html
		 */
		createContentOneRowTd:function(row,createFlag){
			var oThis = this;
			var htmlStr = '',gridCompColumnArr;
			if(createFlag == 'fixed'){
				gridCompColumnArr = this.gridCompColumnFixedArr;
			}else{
				gridCompColumnArr = this.gridCompColumnArr;
			}
			var value = row.value;
			$.each(gridCompColumnArr, function() {
				var f = this.options.field,
					v = $(value).attr(f);
					v = oThis.getString(v,'');
				// tianxq begin
				if($.type(v) == 'object') {
					v = v.showValue
				}
				// tianxq end
				var renderType = this.options.renderType;
				var treeStyle = '';
				var spanStr ='';
				var iconStr = '';
				var vStr= '';
				var tdStyle = '';
				
				if(oThis.options.showTree && this.firstColumn){
					var l = parseInt(oThis.treeLeft)*parseInt(row.level);
					treeStyle = 'style="position:relative;';
					if(row.hasChild){
						if(oThis.options.autoExpand){
							spanStr = '<span class=" fa fa-minus-square-o u-grid-content-tree-span"></span>';
						}else{
							spanStr = '<span class=" fa fa-plus-square-o u-grid-content-tree-span"></span>';
						}
					}else{
						l += 16;
					}
					treeStyle += 'left:'+ l +'px;"';
				}
				if(!this.options.visible){
					tdStyle = 'style="display:none;"';
				}
				if(this.options.icon){
					iconStr = '<span class="' + this.options.icon + '"></span>';
				}
				// title="' + v + '" 创建td的时候不在设置title，在renderType中设置,处理现实xml的情况
				htmlStr += '<td role="rowcell"  '+ tdStyle +'><div class="u-grid-content-td-div" ' + treeStyle+'>' + spanStr + iconStr + '<span>' + v + '</span></div></td>';
				
			});
			
			return htmlStr;
		},
		/*
		 * 创建行td,针对IE
		 */
		createContentOneRowTdForIE:function(row,rowObj,createFlag){
			var oThis = this,gridCompColumnArr;
			if(createFlag == 'fixed'){
				gridCompColumnArr = this.gridCompColumnFixedArr;
			}else{
				gridCompColumnArr = this.gridCompColumnArr;
			}
			var value = rowObj.value;
			$.each(gridCompColumnArr, function() {
				var f = this.options.field,
					v = $(value).attr(f);
					v = oThis.getString(v,'');
				// tianxq begin
				if($.type(v) == 'object') {
					v = v.showValue
				}
				// tianxq end
				var renderType = this.options.renderType;
				var treeStyle = '';
				var spanStr ='';
				var iconStr = '';
				var vStr= '';
				var htmlStr = '';
				
				var newCell= row.insertCell();  
				newCell.row = 'rowcell';
				newCell.title = v;
				if(oThis.options.showTree && this.firstColumn){
					var l = parseInt(oThis.treeLeft)*parseInt(rowObj.level);
					treeStyle = 'style="position:relative;';
					if(rowObj.hasChild){
						if(oThis.options.autoExpand){
							spanStr = '<span class=" fa fa-minus-square-o u-grid-content-tree-span"></span>';
						}else{
							spanStr = '<span class=" fa fa-plus-square-o u-grid-content-tree-span"></span>';
						}
					}else{
						l += 18;
					}
					treeStyle += 'left:'+ l +'px;"';
				}
				if(this.options.icon){
					iconStr = '<span class="' + this.options.icon + '"></span>';
				}
				htmlStr += '<div class="u-grid-content-td-div" ' + treeStyle+'>' + spanStr + iconStr + '<span>' + v + '</span></div>';
				newCell.insertAdjacentHTML('afterBegin',htmlStr);
			});
		},
		/*
		 * 创建合计行
		 */
		createSumRow:function(createFlag){
			if(this.options.showSumRow){
				var oThis = this,idStr,gridCompColumnArr;
				if(createFlag == 'fixed'){
					idStr = 'fixed_';
					gridCompColumnArr = this.gridCompColumnFixedArr;
				}else{
					idStr = '';
					gridCompColumnArr = this.gridCompColumnArr;
				}
				var t = parseInt(this.wholeHeight) - this.exceptContentHeight - 48 - this.scrollBarHeight;
				t = t> 0?t:0;
				var htmlStr = '<tr role="row" class="u-grid-content-sum-row" id="' + this.options.id + '_content_'+idStr+'sum_row" style="top:'+t+'px;">';
				$.each(gridCompColumnArr, function() {
					var f = this.options.field;
					var sumValue = oThis.dataSourceObj.getSumValue(f,this,oThis);
					var tdStyle = '';
					if(!this.options.visible){
						tdStyle = 'style="display:none;"';
					}
					htmlStr += '<td role="rowcell" title="' + sumValue + '" ' + tdStyle + '>';
					if(this.firstColumn){
						htmlStr += '<div class="u-gird-centent-sum-div"><span>' + oThis.transDefault.ml_sum + '</span></div>';
					}
					htmlStr += '<div class="u-grid-content-td-div"><span>' + sumValue + '</span></div></td>';
				});
				htmlStr += '</tr>';
				return htmlStr;
			}
		},
		
		/*
		 * 创建合计行 for ie
		 */
		createSumRowForIE:function(table,createFlag){
			if(this.options.showSumRow){
				var oThis = this,idStr,gridCompColumnArr;
				if(createFlag == 'fixed'){
					idStr = 'fixed_';
					gridCompColumnArr = this.gridCompColumnFixedArr;
				}else{
					idStr = '';
					gridCompColumnArr = this.gridCompColumnArr;
				}
				var t = parseInt(this.wholeHeight) - this.exceptContentHeight - 48 - this.scrollBarHeight;
				t = t> 0?t:0;
				var row = table.insertRow();
				row.row = 'row';
				row.className = 'u-grid-content-sum-row'; 
				row.id = this.options.id + '_content_'+idStr+'sum_row';
				row.style.top = t + 'px';
				$.each(gridCompColumnArr, function() {
					var f = this.options.field;
					var sumValue = oThis.dataSourceObj.getSumValue(f,this,oThis);
					var newCell= row.insertCell(); 
					newCell.role = 'rowcell';
					newCell.title = sumValue;
					var htmlStr = '<div class="u-grid-content-td-div"><span>' + sumValue + '</span></div>';
					newCell.insertAdjacentHTML('afterBegin',htmlStr);
				});
			}
		},
		/*
		 * 重画合计行
		 */
		repairSumRow:function(){
			if(this.options.showSumRow){
				$('#' + this.options.id + '_content_div tbody .u-grid-content-sum-row').remove();
				$('#' + this.options.id + '_content_fixed_div tbody .u-grid-content-sum-row').remove();
				try{
					if(this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0){
						var htmlStr = this.createSumRow();
						$('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd',htmlStr);
						var htmlStr = this.createSumRow('fixed');
						$('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd',htmlStr);
					}
				}catch(e){
					var table = $('#' + this.options.id + '_content_div table')[0];
					var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
					this.createSumRowForIE(table);
					this.createSumRowForIE(table,'fixed');
				}
			}
		},
		/*
		 * 重画内容区域
		 */
		repairContent: function(){
			var $pDiv = $('#' + this.options.id + '_content').parent();
			$('#' + this.options.id + '_content').remove();
			if($pDiv[0]){
				var htmlStr = this.createContent();
				$pDiv[0].insertAdjacentHTML('beforeEnd', htmlStr);
				this.initContentDivEventFun();
				if($('#' + this.options.id + '_content_div')[0]){
					$('#' + this.options.id + '_content_div')[0].scrollLeft = this.scrollLeft;
				}
				$('#' +this.options.id + '_content_edit_menu').css('display','none');
			}
		},
		/*
		 * 重画数据区域
		 */
		/*rePairContentRows: function() {
			var $pDiv = $('#' + this.options.id + '_content_div').parent();
			$('#' + this.options.id + '_content_div').remove();
			var htmlStr = this.createContentTable();
			if($pDiv[0]){
				$pDiv[0].insertAdjacentHTML('beforeEnd', htmlStr);
				this.initContentDivEventFun();
				if($('#' + this.options.id + '_content_div')[0]){
					$('#' + this.options.id + '_content_div')[0].scrollLeft = this.scrollLeft;
				}
				$('#' +this.options.id + '_content_edit_menu').css('display','none');
			}
		},*/
		
		/*
		 * 创建内容区编辑按钮
		 */
		createContentEditMenu:function(){
			var htmlStr = '<div class="u-grid-content-edit-menu" id="' + this.options.id + '_content_edit_menu">';
			// tianxq begin
			//htmlStr += '<button type="button" class="u-grid-content-edit-menu-button fa fa-check" id="' + this.options.id + '_content_edit_menu_ok">Ok</button>';
			//htmlStr += '<button type="button" class="u-grid-content-edit-menu-button fa fa-times" id="' + this.options.id + '_content_edit_menu_cancel">Cancel</button>';
//			htmlStr += '<button type="button" class="u-grid-content-edit-menu-button u-grid-content-edit-menu-button-cancel" id="' + this.options.id + '_content_edit_menu_cancel">取消</button>';
//			htmlStr += '<button type="button" class="u-grid-content-edit-menu-button u-grid-content-edit-menu-button-ok" id="' + this.options.id + '_content_edit_menu_ok">确定</button>';
			htmlStr += '<button type="button" class="u-grid-content-edit-menu-button u-grid-content-edit-menu-button-ok" id="' + this.options.id + '_content_edit_menu_close">' + this.transDefault.ml_close + '</button>';
			// tianxq end
			htmlStr += '</div>';
			return htmlStr;
		},		/*
		 * 创建form形式下div
		 */
		createFromDivs: function() {
			if (this.createFormFlag) {
				return;
			}
			var htmlStr = '<div id="' + this.options.id + '_form" class="u-grid-form">';
			htmlStr += this.createFromContent();
			$('#' + this.options.id)[0].insertAdjacentHTML('afterBegin', htmlStr);
			this.createFormFlag = true;
		},

		/*
		 * 创建form形式下内容区域
		 */
		createFromContent: function() {
			var htmlStr = '<div class="u-grid-form-content" id="' + this.options.id + '_form_content" class="u-grid-content">';
			htmlStr += '<table role="grid" id="' + this.options.id + '_form_content_table">';
			htmlStr += this.createFormContentRows();
			htmlStr += '</table>';
			return htmlStr;
		},

		/*
		 * 创建form形式下内容区域所有行
		 */
		createFormContentRows: function() {
			var oThis = this,
				htmlStr = "";
			// 遍历生成所有行
			if (this.dataSourceObj.rows) {
				htmlStr += '<tbody role="rowgroup" id="' + this.options.id + '_form_content_tbody">';
				$.each(this.dataSourceObj.rows, function() {
					htmlStr += '<tr role="row"><td role="rowcell">';
					var value = this.value;
					$.each(oThis.gridCompColumnArr, function() {
						var f = this.options.field,
							t = this.options.title,
							v = $(value).attr(f);
						htmlStr += '<div>' + t + ':</div>';
						htmlStr += '<div>' + v + '</div>';
					});
					htmlStr += '</td></tr>';
				});
				htmlStr += '</tbody>';
			}
			return htmlStr;
		},
				/*
		 * 创建完成之后顶层div添加监听
		 */
		initEventFun: function() {
			var oThis = this;
			$('#' + this.options.id).on('mousedown', function(e) {
				if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
					// 点击的是header区域
					oThis.mouseDownX = e.clientX;
					oThis.mouseDownY = e.clientY;
					var eleTh = $(e.target).closest('th')[0];
					oThis.swapColumnStart(e, eleTh);
					e.preventDefault();
				} else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
					// 点击的是数据区域
				}
			});
			$('#' + this.options.id).on('mousemove', function(e) {
//				if (!oThis.countWidthFlag) {
//					oThis.countWidth(e); //某些情况下不是创建完就显示的，所以在mousemove中处理
//					oThis.countWidthFlag = true;
//				}
				if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
					// 在header区域移动
					var eleTh = $(e.target).closest('th')[0];
					// 将其他列的操作按钮隐藏，显示当前列的
					oThis.headerThDrag(e, eleTh);
				}
				oThis.mouseMoveX = e.clientX;
				oThis.mouseMoveY = e.clientY;
				if ((oThis.mouseMoveX != oThis.mouseDownX || oThis.mouseDownY != oThis.mouseMoveY) && oThis.mouseDownX != 'mouseDownX') {
					// 鼠标按下之后移动了
					oThis.swapColumnFlag = true;
				}
				oThis.dragFun(e);
				oThis.swapColumnFun(e);
				e.stopPropagation();
			});
			$('#' + this.options.id + '_top').on('mousemove', function(e) {
				oThis.mouseMoveX = e.clientX;
				oThis.mouseMoveY = e.clientY;
				if ((oThis.mouseMoveX != oThis.mouseDownX || oThis.mouseDownY != oThis.mouseMoveY) && oThis.mouseDownX != 'mouseDownX') {
					// 鼠标按下之后移动了
					oThis.swapColumnFlag = true;
				}
				oThis.dragFun(e);
				oThis.swapColumnFun(e);
				e.stopPropagation();
			});
			$('#' + this.options.id).on('mouseup', function(e) {
				if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
					// 点击的是header区域
					oThis.mouseUpX = e.clientX;
					oThis.mouseUpY = e.clientY;
					//点击过程中鼠标没有移动 
					if (oThis.mouseDownX == oThis.mouseUpX && oThis.mouseDownY == oThis.mouseUpY) {
					//或者移动距离小于5px(由于移动之后会显示屏幕div，暂时不做处理)
//					if( Math.abs(parseInt(oThis.mouseDownX) - parseInt(oThis.mouseUpX)) <=5 && Math.abs(parseInt(oThis.mouseDownY) - parseInt(oThis.mouseUpY)) <=5){
						oThis.columnClickX = e.clientX;
						oThis.columnClickY = e.clientY;
						var eleTh = $(e.target).closest('th')[0];
						if($(e.target).hasClass('u-grid-header-columnmenu')){
							//点击的是columnmenu
							$('#' + oThis.options.id + '_column_menu').css('display','block');
							var left = eleTh.attrRightTotalWidth - oThis.scrollLeft + oThis.leftW + oThis.fixedWidth - 20;
							if(left + oThis.columnMenuWidth > oThis.wholeWidth)
								left = eleTh.attrRightTotalWidth - oThis.scrollLeft + oThis.leftW + oThis.fixedWidth - oThis.columnMenuWidth + 1;
							$('#' + oThis.options.id + '_column_menu').css('left',left);
							$('#' + oThis.options.id + '_column_menu').css('top',oThis.headerHeight);
							oThis.ele.createColumnMenuFlage = true;
						}else{
							// 执行click操作,进行排序
							oThis.canSortable(e, eleTh);
						}
					}
				} else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
					// 点击的是数据区域

				}
				oThis.dragEnd(e);
				oThis.swapColumnEnd(e);
				oThis.mouseUpX = 'mouseUpX';
				oThis.mouseUpY = 'mouseUpY';
				oThis.mouseDownX = 'mouseDownX';
				oThis.mouseDownY = 'mouseDownY';
				oThis.mouseMoveX = 'mouseMoveX';
				oThis.mouseMoveY = 'mouseMoveY';
			});
			$('#' + this.options.id+ '_top').on('mouseup', function(e) {
				oThis.dragEnd(e);
				oThis.swapColumnEnd(e);
				oThis.mouseUpX = 'mouseUpX';
				oThis.mouseUpY = 'mouseUpY';
				oThis.mouseDownX = 'mouseDownX';
				oThis.mouseDownY = 'mouseDownY';
				oThis.mouseMoveX = 'mouseMoveX';
				oThis.mouseMoveY = 'mouseMoveY';
			});
			$(document).on('click',function(){
				if(oThis.columnMenuMove == false && oThis.ele.createColumnMenuFlage == false){
					$('#' + oThis.options.id + '_column_menu',oThis.$ele).css('display','none');
				}
				oThis.ele.createColumnMenuFlage = false;
			});
		},

		/*
		 * 创建完成之后grid层 div添加监听
		 */
		initGridEventFun: function() {
			var oThis = this;
			// 拖动
			$('#' + this.options.id + '_resize_handle').on('mousedown', function(e) {
				oThis.dragStart(e);
				return false;
			});
			
			// 列头按钮显示/隐藏
			$('#' + this.options.id + '_header_table th').on('mousemove',function(e){
				$('.u-grid-header-columnmenu',$(this)).css('display','block');
			});
			
			$('#' + this.options.id + '_header_table th').on('mouseout',function(e){
				$('.u-grid-header-columnmenu',$(this)).css('display','none');
			});
			
			this.initContentDivEventFun();
			
			// 全选
			$('#' + this.options.id + '_header_multi_input').on('click', function(e) {
				if(this.checked){
					oThis.setAllRowSelect();
				}else{
					oThis.setAllRowUnSelect();
				}
			});
			
			
			/*header 按钮处理开始*/
			// column按钮
			$('#' + this.options.id + '_column_menu_ul').on('mousemove', function(e) {
				oThis.columnMenuMove = true;
			});
			$('#' + this.options.id + '_column_menu_ul').on('mouseout', function(e) {
				oThis.columnMenuMove = false;
			});
			
			// 显示/隐藏列按钮
			$('#' + this.options.id + '_showColumn').on('mousemove', function(e) {
				//待完善 考虑屏幕高度决定columnMenu显示形式
				
				if(oThis.hideMenuColumns)
					clearTimeout(oThis.hideMenuColumns);
				if($('#' + oThis.options.id + '_column_menu_columns').css('display') == 'block')
					return;
				var sX = $(window).width();
				var sH = $(window).height();
				
				var menuLeft = $('#' + oThis.options.id + '_column_menu').css('left');
				var columnsLeft = parseInt(menuLeft) + oThis.columnMenuWidth;
				var maxLeft = oThis.columnClickX + oThis.columnMenuWidth * 2;
				if(maxLeft > sX)
					columnsLeft = parseInt(menuLeft) - oThis.columnMenuWidth;
				$('#' + oThis.options.id + '_column_menu_columns').css('left',columnsLeft);
				var columnsTop = oThis.headerHeight;
				var cY = e.clientY;
				// 如果数据列高度高于屏幕高度则数据列高度设置为屏幕高度-10；
				var columnsHeight = oThis.menuColumnsHeight;
				var hh = 0;
				if((oThis.menuColumnsHeight + 30) > sH){
					columnsHeight = sH - 30;
					$('#' + oThis.options.id + '_column_menu_columns').css('height',columnsHeight + 'px'); 
				}else{
					$('#' + oThis.options.id + '_column_menu_columns').css('height','');
				}
				var maxHeight = cY + columnsHeight;
				if(maxHeight > sH)
					columnsTop = (cY - (sH - columnsHeight)) * -1 + 30;
				$('#' + oThis.options.id + '_column_menu_columns').css('top',columnsTop);
				$('#' + oThis.options.id + '_column_menu_columns').css('display','block');
				oThis.columnMenuMove = true;
			});
			$('#' + this.options.id + '_showColumn').on('mouseout', function(e) {
				oThis.hideMenuColumns = setTimeout(function(){
					$('#' + oThis.options.id + '_column_menu_columns').css('display','none');	
					oThis.columnMenuMove = false;
				},200);
				
			});
			$('#' + this.options.id + '_column_menu_columns').on('mousemove', function(e) {
				if(oThis.hideMenuColumns)
					clearTimeout(oThis.hideMenuColumns);
				$('#' + oThis.options.id + '_column_menu_columns').css('display','block');
				oThis.columnMenuMove = true;
			});
			$('#' + this.options.id + '_column_menu_columns').on('mouseout', function(e) {
				oThis.hideMenuColumns = setTimeout(function(){
					$('#' + oThis.options.id + '_column_menu_columns').css('display','none');	
					oThis.columnMenuMove = false;
				},200);
			});
			
			// 清除设置按钮
			$('#' + this.options.id + '_clearSet').on('click', function(e) {
				oThis.clearLocalData();
				oThis.initGridCompColumn();
				// 清除排序
				oThis.dataSourceObj.sortRows();
				oThis.repaintGridDivs();
				if(typeof oThis.options.onClearSetFun == 'function'){
					oThis.options.onClearSetFun(oThis);
				}
			});
			// 显示/隐藏列 对应所有列的点击处理
			$('#' + this.options.id + '_column_menu_columns_ul li input').on('click', function(e) {
				//待完善 优化与li的click的代码整合
				var index = $(this).closest('li').attr('index');
				
				if(oThis.gridCompColumnArr[index].options.visible){
					$(this)[0].checked = false;
					var ll = $('input:checked',$('#' + oThis.options.id + '_column_menu_columns_ul')).length;
					if(ll == 0){
						$(this)[0].checked = true;
						return;
					}
					
					if(document.documentMode == 8){
						oThis.gridCompColumnArr[index].options.visible = false;
						oThis.repaintGridDivs();
					}else{
						oThis.setColumnVisibleByIndex(index,false);
						oThis.gridCompColumnArr[index].options.visible = false;
					}
				}else{
					$(this)[0].checked = true;
					
					if(document.documentMode == 8){
						oThis.gridCompColumnArr[index].options.visible = true;
						oThis.repaintGridDivs();
					}else{
						oThis.setColumnVisibleByIndex(index,true);
						oThis.gridCompColumnArr[index].options.visible = true;
					}
					
				}
				oThis.saveGridCompColumnArrToLocal();
				e.stopPropagation();
			});
			$('#' + this.options.id + '_column_menu_columns_ul li').on('click', function(e) {
				var index = $(this).attr('index');
				var gridCompColumn = oThis.gridCompColumnArr[index];
				if(!gridCompColumn.options.canVisible){
					return false;
				}
				//获取选中列数量，不能小于1
				if(gridCompColumn.options.visible){
					$('input',$(this))[0].checked = false;
					var ll = $('input:checked',$('#' + oThis.options.id + '_column_menu_columns_ul')).length;
					if(ll == 0){
						$('input',$(this))[0].checked = true;
						return;
					}
					oThis.setColumnVisibleByIndex(index,false);
					oThis.gridCompColumnArr[index].options.visible = false;
				}else{
					$('input',$(this))[0].checked = true;
					oThis.setColumnVisibleByIndex(index,true);
					oThis.gridCompColumnArr[index].options.visible = true;
				}
				oThis.saveGridCompColumnArrToLocal();
			});
			/*header 按钮处理结束*/
			// 行编辑按钮相关事件
			/*$('#' + this.options.id + '_content_edit_menu_ok').on('click',function(e){
				oThis.editOk();
			});
			$('#' + this.options.id + '_content_edit_menu_cancel').on('click',function(e){
				oThis.editCancel();
			});*/
			
			$('#' + this.options.id + '_content_edit_menu_close').on('click',function(e){
				oThis.editClose();
			});
		},
		/*
		 * 内容区 div添加监听
		 */
		initContentDivEventFun:function(){
			var oThis = this;
			
			// 选中行
			$('#' + oThis.options.id + '_content .u-grid-content-left').on('click',function(e){
				var $input = $(e.target).closest('input');
				if($input.length > 0){
					var $div = $($input.parent());
					var index = $('div',$div.parent()).index($div);
					if($input[0].checked){
						oThis.setRowSelect(index);
					}else{
						oThis.setRowUnselect(index);
					}
				}
			});
			
			// 同步滚动条
			$('#' + this.options.id + '_content_div').on('scroll', function(e) {
				oThis.scrollLeft = this.scrollLeft;
				oThis.scrollTop = this.scrollTop;
				$('#' + oThis.options.id + '_header_table').css('left', oThis.leftW - oThis.scrollLeft + oThis.fixedWidth + "px");
				$('#' + oThis.options.id + '_noRowsShow').css('left', oThis.scrollLeft + "px");
				$('#' + oThis.options.id + '_content_multiSelect').css('top', -oThis.scrollTop + "px");
				$('#' + oThis.options.id + '_content_numCol').css('top', -oThis.scrollTop + "px");
				$('#' + oThis.options.id + '_content_fixed_div').css('top', -oThis.scrollTop + "px");
			});
			
			
			
			// 数据行相关事件
			$('#' + this.options.id + '_content_tbody').on('click',function(e){
				// 双击处理
				if(typeof oThis.options.onDblClickFun == 'function'){
					oThis.isDblEvent('tbodyClick',oThis.dblClickFun,e,oThis.clickFun,e);
				}else{
					oThis.clickFun(e);
				}
			});
			
			$('#' + this.options.id + '_content_fixed_tbody').on('click',function(e){
				// 双击处理
				if(typeof oThis.options.onDblClickFun == 'function'){
					oThis.isDblEvent('tbodyClick',oThis.dblClickFun,e,oThis.clickFun,e);
				}else{
					oThis.clickFun(e);
				}
			});
		},

		/*
		 * 定时器处理
		 */
		setIntervalFun: function(e) {
			this.widthChangeFun();
			this.heightChangeFun();
		},
		
		
		
		/*
		 * grid区域创建完成之后处理
		 * 1、数据列显示处理
		 * 2、取行高
		 */
		afterGridDivsCreate:function(){
			this.columnsVisibleFun();
			this.resetThVariable();
			this.countRowHeight();
			this.noRowsShowFun();
			var obj = {};
			obj.createFlag = 'fixed';
			this.renderTypeFun(obj);
			this.renderTypeFun();
			
			this.resetScrollLeft();
			this.hideEditMenu();
		},
		
		/*
		 * 取行高
		 */
		countRowHeight:function(){
			if($('#' + this.options.id + '_content_tbody tr')[0]){
				this.rowHeight = $('#' + this.options.id + '_content_tbody tr')[0].offsetHeight;
			}
		},
		
		/*
		 * 处理是否显示无数据行
		 */
		noRowsShowFun:function(){
			if(this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0){
				$('#' + this.options.id + '_noRowsShow').css('display','none');
				$('#' + this.options.id + '_noRows').css('display','none');
			}else{
				$('#' + this.options.id + '_noRowsShow').css('display','block');
				$('#' + this.options.id + '_noRows').css('display','block');
			}
		},
		/*
		 * 处理renderType
		 * begin为起始行，length为行数（增加行数时使用）
		 */
		renderTypeFun:function(obj){
			if(typeof obj == 'undefined'){
				var begin = null,length = null,createFlag = '';
			}else{
				var begin = typeof obj.begin == 'undefined'?null:obj.begin,length = typeof obj.length == 'undefined'?null:obj.length,createFlag = typeof obj.createFlag == 'undefined'?'':obj.createFlag;
			}
			var oThis = this,begin = parseInt(begin),length = parseInt(length);
			var end = begin;
			if(length >0){
				end = parseInt(begin + length - 1);
			}
			
			
			if(createFlag == 'fixed'){
				$.each(this.gridCompColumnFixedArr,function(i){
					oThis.fixedRenderTypeByColumn(this,i,begin,length);
				})
			}else{
				$.each(this.gridCompColumnArr,function(i){
					oThis.renderTypeByColumn(this,i,begin,length);
				})
			}
		},
		/*
		 * 处理renderType
		 * gridCompColumn对象，index为第几列
		 * begin为起始行，length为行数（增加行数时使用）
		 */
		renderTypeByColumn:function(gridCompColumn,i,begin,length){
			var oThis = this;
			var renderType = gridCompColumn.options.renderType;
			var dataType = gridCompColumn.options.dataType;
			var precision = gridCompColumn.options.precision;
			var format = gridCompColumn.options.format;
			var field = gridCompColumn.options.field;
			var end = begin;
			if(length >0){
				end = parseInt(begin + length - 1);
			}
//			if(typeof renderType == 'function' || dataType == 'Date' || dataType == 'DateTime' || dataType == 'String'){
				$.each(oThis.dataSourceObj.rows, function(j) {    
					if((begin >= 0 && j >= begin && j <= end) || isNaN(begin)){
						var td = $('#' + oThis.options.id + '_content_tbody tr:eq(' + j + ') td:eq(' +i+ ')')[0];
						if(td){
							var span = $('#' + oThis.options.id + '_content_tbody tr:eq(' + j + ') td:eq(' +i+ ') span:last-child')[0];
							var v = $(this.value).attr(field);
							
							if(typeof renderType == 'function'){
								v = oThis.getString(v,'');
								var obj = {};
								obj.value = v;
								obj.element = span;
								obj.gridObj = oThis;
								obj.row = this;
								obj.gridCompColumn = gridCompColumn;
								obj.rowIndex = j;
								renderType.call(oThis,obj);
							}else if(dataType == 'Date' || dataType == 'DateTime'){
								if(v == null || v == undefined || v == 'null' || v == 'undefined' || v == ""){
									v = "";
								}
								// 处理逻辑一致，format值不同
								var dateObj = new Date(v);
								if(parseInt(dateObj.valueOf()) > 0){
									v = dateObj.format(format);
								}else{
									// 依赖 moment.js
									dateObj = moment(v,'YYYY-MM-DD HH:mm:ss').toDate();
									if(parseInt(dateObj.valueOf()) > 0){
										v = dateObj.format(format);
									}
								}
								span.innerHTML = v;
								td.title = v;
							}else if(dataType == 'Int'){
								v = parseInt(v);
								span.innerHTML = v;
								td.title = v;
							}else if(dataType == 'Float'){
								if(precision){
									var o = {};
									o.value = v;
									o.precision = precision;
									v = oThis.DicimalFormater(o);
								}else{
									v = parseFloat(v);
								}
								span.innerHTML = v;
								td.title = v;
							}else{
								v = oThis.getString(v,'');
								v1 = v.replace(/\</g,'\<'); 
								v1 = v1.replace(/\>/g,'\>'); 
								td.title = v; 
								v = v.replace(/\</g,'&lt;'); 
								v = v.replace(/\>/g,'&gt;'); 
								span.innerHTML = v;
							}
						}
					}
				});
//			}
		},
		
		/*
		 * 处理renderType
		 * gridCompColumn对象，index为第几列
		 * begin为起始行，length为行数（增加行数时使用）
		 */
		fixedRenderTypeByColumn:function(gridCompColumn,i,begin,length){
			var oThis = this;
			var renderType = gridCompColumn.options.renderType;
			var dataType = gridCompColumn.options.dataType;
			var precision = gridCompColumn.options.precision;
			var format = gridCompColumn.options.format;
			var field = gridCompColumn.options.field;
			var end = begin;
			if(length >0){
				end = parseInt(begin + length - 1);
			}
//			if(typeof renderType == 'function' || dataType == 'Date' || dataType == 'DateTime' || dataType == 'String'){
				$.each(oThis.dataSourceObj.rows, function(j) {    
					if((begin >= 0 && j >= begin && j <= end) || isNaN(begin)){
						var td = $('#' + oThis.options.id + '_content_fixed_tbody tr:eq(' + j + ') td:eq(' +i+ ')')[0];
						if(td){
							var span = $('#' + oThis.options.id + '_content_fixed_tbody tr:eq(' + j + ') td:eq(' +i+ ') span:last-child')[0];
							var v = $(this.value).attr(field);
							v = oThis.getString(v,'');
							if(typeof renderType == 'function'){
								var obj = {};
								obj.value = v;
								obj.element = span;
								obj.gridObj = oThis;
								obj.row = this;
								obj.gridCompColumn = gridCompColumn;
								obj.rowIndex = j;
								renderType.call(oThis,obj);
							}else if(dataType == 'Date' || dataType == 'DateTime'){
								// 处理逻辑一致，format值不同
								var dateObj = new Date(v);
								if(parseInt(dateObj.valueOf()) > 0){
									v = dateObj.format(format);
								}else{
									// 依赖 moment.js
									dateObj = moment(v,'YYYY-MM-DD HH:mm:ss').toDate();
									if(parseInt(dateObj.valueOf()) > 0){
										v = dateObj.format(format);
									}
								}
								span.innerHTML = v;
								td.title = v;
							}else if(dataType == 'Int'){
								v = parseInt(v);
								span.innerHTML = v;
								td.title = v;
							}else if(dataType == 'Float'){
								if(precision){
									var o = {};
									o.value = v;
									o.precision = precision;
									v = oThis.DicimalFormater(o);
								}else{
									v = parseFloat(v);
								}
								span.innerHTML = v;
								td.title = v;
							}else{
								span.innerHTML = v;
								td.title = v;
							}
						}
					}
				});
//			}
		},
		/*
		 * grid区域重画完成之后处理，已经执行过afterGridDivsCreate
		 * 1、设置横向滚动条
		 * 2、隐藏编辑按钮
		 */
		afterRepaintGrid:function(){
			this.resetScrollLeft();
			this.hideEditMenu();
		},
		/*
		 * 设置横向滚动条
		 */
		resetScrollLeft:function(){
			if($('#' + this.options.id + '_content_div')[0]){
				$('#' + this.options.id + '_content_div')[0].scrollLeft = this.scrollLeft;
			}
		},
		/*
		 * 隐藏编辑按钮
		 */
		hideEditMenu:function(){
			$('#' +this.options.id + '_content_edit_menu').css('display','none');
		},		/*
		 * 整体宽度改变处理
		 */
		widthChangeFun: function() {
			var oThis = this;
			if($('#' + this.options.id)[0]){
				// 获取整体区域宽度
				var w = $('#' + this.options.id)[0].offsetWidth;
				if(this.wholeWidth != w){
					this.wholeWidth = w;
					
					// 树展开/合上的时候会导致页面出现滚动条导致宽度改变，没有&&之后会重新刷新页面导致无法收起
					if (w > 300 && (this.showType == 'form' || this.showType == '')) {
						//不再延迟渲染，通过其他方式控制第一次渲染的时候宽度是固定的。
						/*if(this.widthChangeGridS)
							clearTimeout(this.widthChangeGridS);
						this.widthChangeGridS = setTimeout(function(){
							oThis.widthChangeGridFun();	
						},500);*/
						oThis.widthChangeGridFun();	
					} else if (w > 0 && w < 300 && (this.showType == 'grid' || this.showType == '')) {
						this.widthChangeFormFun();
					}
					// 某些情况下需要重复执行，待优化，去掉，以后也不应该执行这段代码
					/*if(w > 300){
						this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
						if(this.contentMinWidth < 0)
							this.contentMinWidth = 0;
						setTimeout(function(){
							$('#' + oThis.options.id + '_content_div').css('width', oThis.contentMinWidth + 'px');
							$('#' + oThis.options.id + '_content_table').css('min-width', oThis.contentMinWidth + 'px');
							$('#' + oThis.options.id + '_header_table').css('min-width', oThis.contentMinWidth + 'px');
							if(typeof oThis.options.afterCreate == 'function'){
								oThis.options.afterCreate.call(oThis);
							}
						},100);
					}*/
				}
				
			}
		},
		
		/*
		 * 整体宽度改变处理(grid形式)
		 */
		widthChangeGridFun: function() {
			var halfWholeWidth = parseInt(this.wholeWidth/2);
			// 固定区域宽度不大于整体宽度的一半
			if(this.fixedRealWidth > halfWholeWidth){
				this.fixedWidth = halfWholeWidth;
			}else{
				this.fixedWidth = this.fixedRealWidth;
			}
			// 内容区域宽度自动扩展
			this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
			if(this.contentMinWidth < 0)
				this.contentMinWidth = 0;
			if(this.contentRealWidth < this.contentMinWidth){
				this.contentWidth = this.contentMinWidth;
				var oldWidth = this.lastVisibleColumn.options.width;
				this.lastVisibleColumnWidth = oldWidth + (this.contentMinWidth - this.contentRealWidth);
				this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
			}else{
				this.contentWidth = this.contentRealWidth;
			}
			this.createGridFlag = false;
			this.createGridDivs();
			$('#' + this.options.id + '_form').css('display', 'none');
			$('#' + this.options.id + '_grid').css('display', 'block');
			this.showType = 'grid';
		},
		
		/*
		 * 整体宽度改变处理(form形式)
		 */
		widthChangeFormFun: function() {
			this.createFromDivs();
			$('#' + this.options.id + '_grid').css('display', 'none');
			$('#' + this.options.id + '_form').css('display', 'block');
			this.showType = 'form';
			if(typeof this.options.afterCreate == 'function'){
				this.options.afterCreate.call(this);
			}
		},
		/*
		 * 整体高度改变处理
		 */
		heightChangeFun: function() {
			if(this.countContentHeight){
				var oldH = this.wholeHeight,
					h = $('#' + this.options.id)[0].offsetHeight;
				this.wholeHeight = h;
				if (oldH != h) {
					var contentH = h - this.exceptContentHeight > 0 ? h - this.exceptContentHeight : 0;
					$('#' + this.options.id + '_content').css('height', contentH + 'px');
					$('#' + this.options.id + '_content_div').css('height', contentH + 'px');
				}
			}
		},
		
		
		
		
		/*
		 * column是否显示处理，只在初始化gridCompColumn对象时调用，其他时候不再调用
		 * 计算固定区域及内容区域的真实宽度
		 * 计算第一列
		 * 计算内容区域最后一列显示列
		 */
		columnsVisibleFun:function(){
			var oThis = this;
			var fixW = 0;
			var w = 0;
			this.firstColumn = true;
			
			$.each(this.gridCompColumnFixedArr,function(){
				if(this.options.visible){
					fixW += parseInt(this.options.width);
					this.firstColumn = oThis.firstColumn;
					oThis.firstColumn = false;
				}
			});
			this.fixedRealWidth = fixW;
			
			$.each(this.gridCompColumnArr,function(){
				if(this.options.visible){
					w+=parseInt(this.options.width);
					this.firstColumn = oThis.firstColumn;
					oThis.firstColumn = false;
					oThis.lastVisibleColumn = this;
					oThis.lastVisibleColumnWidth = this.options.width;
				}
			});
			this.contentRealWidth = w;
		},
		/*
		 * 创建完成之后处理变量
		 */
		resetThVariable: function() {
			var oThis = this;
			this.contentWidth = 0;
				
			// 记录每列宽度及当前宽度之和
			$('#' + this.options.id + '_header_table th').each(function(i) {
				var gridCompColumn = oThis.gridCompColumnArr[i];
				var w = 0;
				if(gridCompColumn.options.visible){
					w = gridCompColumn.options.width;
				}
				this.attrLeftTotalWidth = oThis.contentWidth;
				oThis.contentWidth += w;
				if (!$('#' + oThis.options.id + '_resize_handle')[0].nowTh && gridCompColumn.options.canDrag) {
					$('#' + oThis.options.id + '_resize_handle').css('left', w - 4 + oThis.leftW);
					$('#' + oThis.options.id + '_resize_handle')[0].nowTh = this;
				}
				this.gridCompColumn = gridCompColumn;
				this.attrWidth = w;
				this.attrRightTotalWidth = oThis.contentWidth;
			});
		},
		
		/*
		 * 内容区宽度改变
		 */
		contentWidthChange:function(newContentWidth){
			if(newContentWidth < this.contentMinWidth){
				var oldW = this.lastVisibleColumn.options.width;
				this.lastVisibleColumnWidth = oldW + (this.contentMinWidth - newContentWidth);
				$('#' + this.options.id + '_header_table col:last').css('width', this.lastVisibleColumnWidth + "px");
				$('#' + this.options.id + '_content_table col:last').css('width', this.lastVisibleColumnWidth + "px");
				newContentWidth = this.contentMinWidth;
			}
			$('#' + this.options.id + '_content_table').css('width', newContentWidth + "px");
			$('#' + this.options.id + '_noRows').css('width', newContentWidth + "px");
			if(newContentWidth > this.contentMinWidth){
				$('#' + this.options.id + '_content_left_bottom').css('display','block');
				$('#' + this.options.id + '_content_left_sum_bottom').css('bottom',16);
			}else{
				$('#' + this.options.id + '_content_left_bottom').css('display','none');
				$('#' + this.options.id + '_content_left_sum_bottom').css('bottom',0);
			}
			return newContentWidth;
		},
		/*
		 * 获取某列对应属性
		 */
		getColumnAttr: function(attr, field) {
			for (var i = 0; i < this.gridCompColumnArr.length; i++) {
				if (this.gridCompColumnArr[i].options.field == field) {
					return $(this.gridCompColumnArr[i].options).attr(attr);
				}
			}
			return "";
		},
		
		/*
		 * 根据field获取gridcompColumn对象
		 */
		getColumnByField: function(field){
			for (var i = 0; i < this.gridCompColumnArr.length; i++) {
				if (this.gridCompColumnArr[i].options.field == field) {
					return this.gridCompColumnArr[i];
				}
			}
			return null;
		},
		
		
		
		/*
		 * 获取column属于第几列
		 */
		getIndexOfColumn:function(column){
			var index = -1;
			for(var i=0;i < this.gridCompColumnArr.length;i++){
				if(this.gridCompColumnArr[i] == column){
					index = i;
					break;
				}
			}
			return index;
		},
		/*
		 * 获取column属于当前显示第几列
		 */
		getVisibleIndexOfColumn:function(column){
			var index = -1;
			var j = 0;
			for(var i=0;i < this.gridCompColumnArr.length;i++){
				if(this.gridCompColumnArr[i] == column){
					if(!($('#' + this.options.id + '_header th:eq(' + i + ')').css('display') == 'none')){
						index = j;	
					}
					break;
				}
				if(!($('#' + this.options.id + '_header th:eq(' + i + ')').css('display') == 'none')){
					j++;
				}
			}
			return index;
		},
		/*
		 * 获取column后面第一个显示列所在第几列
		 */
		getNextVisibleInidexOfColumn:function(column){
			var index = -1;
			var flag = false;
			var j = 0;
			for(var i=0;i < this.gridCompColumnArr.length;i++){
				if(this.gridCompColumnArr[i] == column){
					flag = true;
					continue;
				}
				if(flag == true && !($('#' + this.options.id + '_header th:eq(' + i + ')').css('display') == 'none')){
					index = j;	
					break;
				}
				if(!($('#' + this.options.id + '_header th:eq(' + i + ')').css('display') == 'none')){
					j++;
				}
			}
			return index;
		},
		
		/*
		 * 修改第一列的css
		 */
		headerFirstClassFun:function(){
			$('#' + this.options.id + '_grid .u-grid-header-th-first').removeClass('u-grid-header-th-first');
			$('#' + this.options.id + '_grid th:eq(0)').addClass('u-grid-header-th-first');
		},
		/*
		 * 双击/单击处理
		 */
		isDblEvent:function(eventname,dbFun,dbArg,Fun,Arg){
			if (this.currentEventName != null && this.currentEventName == eventname){
				dbFun.call(this,dbArg);
				this.currentEventName = null;
				if (this.cleanCurrEventName)
					clearTimeout(this.cleanCurrEventName);
			}else{
				var oThis = this;
				if (this.cleanCurrEventName)
					clearTimeout(this.cleanCurrEventName);
				this.currentEventName = eventname;
				this.cleanCurrEventName =  setTimeout(function(){
					oThis.currentEventName = null;
					Fun.call(oThis,Arg);
				},500);
			}	
		},
		
		/*
		 * 双击处理
		 */
		dblClickFun:function(e){
			if(typeof this.options.onDblClickFun == 'function'){
				var $tr = $(e.target).closest('tr');
				if($tr[0].id == this.options.id + '_edit_tr'){
					return;
				}
				var index = 0;
				if($tr.length > 0){
					index = $('tr',$tr.parent()).index($tr);
				}
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[index];
				obj.rowIndex = index;
				this.options.onDblClickFun(obj);
			}
		},
		
		/*
		 * 单击处理
		 */
		clickFun:function(e){
			var oThis = this;
			// 处理树表展开/合上
			var $td = $(e.target).closest('td');
			if($td.length > 0){
				var $tr = $td.parent();
				var index = $('tr',$tr.parent()).index($tr);
				var row = oThis.dataSourceObj.rows[index];
				if(row){
					var rowChildIndex = row.childRowIndex;
					
					var minus = $td.find('.fa-minus-square-o');
					var plus = $td.find('.fa-plus-square-o');
					if(minus.length >0){
						// 合上 需要将所有的都合上
						minus.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
						if(rowChildIndex.length > 0){
							var allChildRowIndex = oThis.getAllChildRowIndex(row);
							$.each(allChildRowIndex, function() {    
								var $tr1 = $('tr:eq(' + parseInt(this) +')',$tr.parent());
								$tr1.css('display','none');	  
								// 左侧复选区隐藏
								$('#' + oThis.options.id + '_content_multiSelect >div:nth-child('+(parseInt(this) +1)+ ')').css('display','none');
								$('.fa-minus-square-o',$tr1).removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
							});
						}
						return;
					}else if(plus.length > 0){
						// 展开
						plus.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
						if(rowChildIndex.length > 0){
							$.each(rowChildIndex, function() {    
								var $tr1 = $('tr:eq(' + parseInt(this) +')',$tr.parent());
							    $tr1.css('display','');	
							    var ss = $('#' + oThis.options.id + '_content_multiSelect >div:nth-child('+(parseInt(this) +1)+ ')')[0]; 
								$('#' + oThis.options.id + '_content_multiSelect >div:nth-child('+(parseInt(this) +1)+ ')').css('display','');
							});
						}
						return;
					}
				}
			}
			
			var $tr = $(e.target).closest('tr');
			if($tr[0].id == this.options.id + '_edit_tr'){
				return;
			}
			if($tr.length > 0){
				var index = $('tr',$tr.parent()).index($tr);
				var row = oThis.dataSourceObj.rows[index];
				if(row){
					var rowChildIndex = row.childRowIndex;
					if(oThis.options.editable && oThis.eidtRowIndex != index){
						if(oThis.eidtRowIndex != -1){
							oThis.editOk();
						}
						var index = $('tr',$tr.parent()).index($tr);
						this.eidtRowIndex = index;
						oThis.editRow();
					}
					if(oThis.dataSourceObj.rows[index].checked){
						oThis.setRowUnselect(index);
					}else{
						oThis.setRowSelect(index);
					}
				}
			}
		},
		/*
		 * 设置某列是否显示(传入column)
		 */
		setColumnVisibleByColumn:function(column,visible){
			var index = this.getIndexOfColumn(column);
			this.setColumnVisibleByIndex(index,visible);
		},
		
		/*
		 * 设置某列是否显示(传入index为gridCompColumnArr中的数据)
		 */
		setColumnVisibleByIndex:function(index,visible){
			if(index >= 0){
				var column = this.gridCompColumnArr[index];
				var visibleIndex = this.getVisibleIndexOfColumn(column);
				// 显示处理
				if(column.options.visible == false && visible){ 
					var htmlStr = '<col';
					if (column.options.width) {
						htmlStr += ' style="width:' + this.formatWidth(column.options.width) + '"';
					}
					htmlStr += '>';
					
					$('#' + this.options.id + '_header th:eq(' + index + ')').css('display', "");
					$('#' + this.options.id + '_content th:eq(' + index + ')').css('display', "");
					$('td:eq(' + index + ')',$('#' + this.options.id + '_content tbody tr')).css('display', "");
					// 当前列之后的显示列的index
					var nextVisibleIndex = this.getNextVisibleInidexOfColumn(column);
					if(nextVisibleIndex == -1){
						// 添加在最后面
						try{
							$('#' + this.options.id + '_header col:last')[0].insertAdjacentHTML('afterEnd',htmlStr);
							$('#' + this.options.id + '_content col:last')[0].insertAdjacentHTML('afterEnd',htmlStr);
						}catch(e){
							$('#' + this.options.id + '_header col:last').after(htmlStr);
							$('#' + this.options.id + '_content col:last').after(htmlStr);
						}
					}else{
						// 添加在下一个显示列之前
						try{
							$('#' + this.options.id + '_header col:eq(' + (nextVisibleIndex) + ')')[0].insertAdjacentHTML('beforeBegin',htmlStr);
							$('#' + this.options.id + '_content col:eq(' + (nextVisibleIndex) + ')')[0].insertAdjacentHTML('beforeBegin',htmlStr);
						}catch(e){
							$('#' + this.options.id + '_header col:eq(' + (nextVisibleIndex) + ')').before(htmlStr);
							$('#' + this.options.id + '_content col:eq(' + (nextVisibleIndex) + ')').before(htmlStr);
						}
					}
					var newContentW = this.contentWidth + column.options.width;
				}
				// 隐藏处理
				if(column.options.visible == true && !visible){
					$('#' + this.options.id + '_header th:eq(' + index + ')').css('display', "none");
					$('#' + this.options.id + '_header col:eq(' + visibleIndex + ')').remove();
					$('#' + this.options.id + '_content th:eq(' + index + ')').css('display', "none");
					$('#' + this.options.id + '_content col:eq(' + visibleIndex + ')').remove();
					$('td:eq(' + index + ')',$('#' + this.options.id + '_content tbody tr')).css('display', "none");
					
					// 隐藏之后需要判断总体宽度是否小于内容区最小宽度，如果小于需要将最后一列进行扩展
					var newContentW = this.contentWidth - column.options.width;
				}
				column.options.visible = visible;
				this.columnsVisibleFun();
				var w = this.contentWidthChange(newContentW);
				this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
				this.contentWidth = w;
				this.resetThVariable();
				this.saveGridCompColumnArrToLocal();
			}
		},		/*
		 * 拖动开始
		 */
		dragStart: function(e) {
			this.dragFlag = true;
			this.dragW = null;
			this.dragStartX = e.clientX;
		},
		/*
		 * 改变列宽度处理
		 */
		dragFun: function(e) {
			if (this.dragFlag) {
				var nowTh = $('#' + this.options.id + '_resize_handle')[0].nowTh,
					$nowTh = $(nowTh),
					nowThIndex = $nowTh.attr('index'),
					column = this.gridCompColumnArr[nowThIndex];
					nowVisibleThIndex = this.getVisibleIndexOfColumn(column);
				if (nowTh && column != this.lastVisibleColumn) {
					this.dragEndX = e.clientX;
					var changeWidth = this.dragEndX - this.dragStartX,
						newWidth = nowTh.attrWidth + changeWidth;
						cWidth = this.contentWidth + changeWidth;
					if (newWidth > this.minColumnWidth) {
						this.dragW = this.contentWidthChange(cWidth);
						$('#' + this.options.id + '_header_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
						$('#' + this.options.id + '_content_table col:eq(' + nowVisibleThIndex + ')').css('width', newWidth + "px");
						
						column.options.width = newWidth;
					}
				}
				$('#' + this.options.id + '_top').css('display', 'block');
			}
		},
		/*
		 * 拖动结束
		 */
		dragEnd: function(e) {
			if (this.dragFlag) {
				this.resetThVariable();
				this.saveGridCompColumnArrToLocal();
			}
			this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
			if(this.dragW)
				this.contentWidth = this.dragW;
			$('#' + this.options.id + '_resize_handle')[0].nowTh = null;
			this.dragFlag = false;
			$('#' + this.options.id + '_top').css('display', 'none');
		},
		/*
		 * 计算拖动div所在位置
		 */
		headerThDrag: function(e, ele) {
			if (!this.dragFlag && !this.swapColumnFlag && ele && ele.gridCompColumn && ele.gridCompColumn.options.canDrag && $('#' + this.options.id + '_resize_handle')[0].nowTh != ele) {
				var $ele = $(ele);
				$('#' + this.options.id + '_resize_handle').css('left', ele.attrRightTotalWidth - this.scrollLeft - 4 + this.leftW + this.fixedWidth);
				$('#' + this.options.id + '_resize_handle')[0].nowTh = ele;
			}
		},		/*
		 * 交换列位置开始，并不修改swapColumnFlag，当移动的时候才修改swapColumnFlag
		 */
		swapColumnStart: function(e, ele) {
			this.swapColumnEle = ele;
			this.swapColumnStartX = e.clientX;
			this.swapColumnStartY = e.clientY;
		},
		/*
		 * 交换位置
		 */
		swapColumnFun: function(e) {
			var oThis = this;
			if (this.swapColumnFlag) {
				var nowTh = this.swapColumnEle,
					$nowTh = $(nowTh),
					nowGridCompColumn = nowTh.gridCompColumn;
				//创建拖动区域
				if ($('#' + this.options.id + '_clue').length == 0) {
					var $d = $('<div class="u-grid u-grid-header-drag-clue" id="' + this.options.id + '_clue" />').css({
						width: nowTh.scrollWidth + "px",
						left: nowTh.attrLeftTotalWidth - oThis.scrollLeft + oThis.leftW +oThis.fixedWidth + "px",
						top: "0px",
						paddingLeft: $nowTh.css("paddingLeft"),
						paddingRight: $nowTh.css("paddingRight"),
						lineHeight: $nowTh.height() + "px",
						paddingTop: $nowTh.css("paddingTop"),
						paddingBottom: $nowTh.css("paddingBottom")
					}).html(nowGridCompColumn.options.title || nowGridCompColumn.options.field).prepend('<span class="fa fa-ban u-grid-header-drag-status" />');
					$('#' + this.options.id)[0].insertAdjacentElement('afterBegin',$d[0]);
					$d.on('mousemove',function(){
						e.stopPropagation();
					});
				}
				this.swapColumnEndX = e.clientX;
				this.swapColumnEndY = e.clientY;
				var changeX = this.swapColumnEndX - this.swapColumnStartX,
					changeY = this.swapColumnEndY - this.swapColumnStartY;
				$('#' + this.options.id + '_clue').css({
					left: nowTh.attrLeftTotalWidth + changeX - oThis.scrollLeft + oThis.leftW + oThis.fixedWidth + "px",
					top: changeY + "px"
				});

				// 创建提示div
				if ($('#' + this.options.id + '_swap_top').length == 0) {
					var $d = $('<span class="fa fa-sort-desc u-grid-header-swap-tip-span"  id="' + this.options.id + '_swap_top"/>');
					$d.css({
						top: $nowTh.height() - 6 + 'px',
					});
					var $d1 = $('<span class="fa fa-sort-asc u-grid-header-swap-tip-span" id="' + this.options.id + '_swap_down" />');
					$d1.css({
						top: '6px'
					});
					$('#' + this.options.id)[0].insertAdjacentElement('afterBegin',$d[0]);
					$('#' + this.options.id)[0].insertAdjacentElement('afterBegin',$d1[0]);
				}
				this.canSwap = false;
				$('#' + this.options.id + '_header_table th').each(function(i) {
					var left = $(this).offset().left,
						right = left + parseInt(this.attrWidth);
					if (i == 0 && e.clientX < left) {
						// 移动到最左边
						if (oThis.swapColumnEle != this) {
							oThis.swapToColumnEle = 'LeftEle';
							$('#' + oThis.options.id + '_swap_top').css({
								left: -oThis.scrollLeft - 3 + oThis.leftW +oThis.fixedWidth + 'px',
								display: 'block'
							});
							$('#' + oThis.options.id + '_swap_down').css({
								left: -oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
								display: 'block'
							});
						}
						oThis.canSwap = true;
					} else if (left < e.clientX && e.clientX < right) {
						if (oThis.swapColumnEle != this && parseInt($(this).attr('index')) + 1 != parseInt($(oThis.swapColumnEle).attr('index'))) {
							if (oThis.swapToColumnEle != this) {
								oThis.swapToColumnEle = this;
								$('#' + oThis.options.id + '_swap_top').css({
									left: this.attrRightTotalWidth - oThis.scrollLeft - 3 + oThis.leftW  + oThis.fixedWidth + 'px',
									display: 'block'
								});
								$('#' + oThis.options.id + '_swap_down').css({
									left: this.attrRightTotalWidth - oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
									display: 'block'
								});
							}
							oThis.canSwap = true;
							return false;
						}
					}
				});
				if (this.canSwap) {
					$('.u-grid-header-drag-status').removeClass('fa-ban').addClass('fa-plus-circle');
				} else {
					$('#' + this.options.id + '_swap_top').css('display', 'none');
					$('#' + this.options.id + '_swap_down').css('display', 'none');
					$('.u-grid-header-drag-status').removeClass('fa-plus-circle').addClass('fa-ban');
					this.swapToColumnEle = null;
				}
				$('#' + this.options.id + '_top').css('display', 'block');
			}
		},
		/*
		 * 交换位置结束
		 */
		swapColumnEnd: function(e) {
			var oThis = this;
			if (this.swapColumnFlag) {
				if (this.swapToColumnEle) {
					var swapColumnEle = this.swapColumnEle,
						swapToColumnEle = this.swapToColumnEle,
						swapColumnIndex = $(swapColumnEle).attr('index'),
						swapToColumnIndex = $(swapToColumnEle).attr('index'),
						swapGridCompColumn = this.gridCompColumnArr[swapColumnIndex];
					this.gridCompColumnArr.splice(parseInt(swapToColumnIndex) + 1, 0, swapGridCompColumn);
					if (swapColumnIndex < swapToColumnIndex)
						this.gridCompColumnArr.splice(swapColumnIndex, 1);
					else
						this.gridCompColumnArr.splice(parseInt(swapColumnIndex) + 1, 1);
					this.saveGridCompColumnArrToLocal();
					this.repaintGridDivs();
				}
				$('#' + this.options.id + '_clue').remove();
				$('#' + this.options.id + '_swap_top').css('display', 'none');
				$('#' + this.options.id + '_swap_down').css('display', 'none');
			}
			this.swapColumnFlag = false;
			$('#' + this.options.id + '_top').css('display', 'none');
		},		/*
		 * 处理排序
		 */
		canSortable: function(e, ele) {
			var oThis = this,
				$ele = $(ele),
				field = $ele.attr('field'),
				sortable = this.getColumnAttr('sortable', field);
			if (sortable) {
				if ($(".fa-angle-up").parent().parent()[0] == ele) { //原来为升序，本次为降序
					$(".fa-angle-up").remove();
					$(ele.firstChild)[0].insertAdjacentHTML('beforeEnd','<span class="fa fa-angle-down u-grid-header-sort-span" ></span>');
					if(typeof this.options.onSortFun == 'function'){
						this.options.onSortFun(field,'asc')
					}else{
						this.dataSourceObj.sortRows(field, "asc");
					}
				} else if ($(".fa-angle-down").parent().parent()[0] == ele) { //原来为降序，本次为不排序
					$(".fa-angle-down").remove();
					if(typeof this.options.onSortFun == 'function'){
						this.options.onSortFun();
					}else{
						this.dataSourceObj.sortRows();
					}
					
				} else { //本次为升序
					$(".fa-angle-up").remove();
					$(".fa-angle-down").remove();
					$(ele.firstChild)[0].insertAdjacentHTML('beforeEnd','<span class="fa fa-angle-up u-grid-header-sort-span"></span>');
					if(typeof this.options.onSortFun == 'function'){
						this.options.onSortFun(field, "desc");
					}else{
						this.dataSourceObj.sortRows(field, "desc");
					}
					
				}
				oThis.repairContent();
				oThis.afterGridDivsCreate();
			}
		},		
		/*
		 * 创建编辑行
		 */
		editRow:function(){
			var oThis = this;
			var $tr = $('#' + this.options.id + '_content_tbody tr:eq(' + this.eidtRowIndex+ ')');
			var $fixedtr = $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + this.eidtRowIndex+ ')');
			var row = this.dataSourceObj.rows[this.eidtRowIndex].value;
			this.editRowObj = this.cloneObj(row);
			if(this.options.editType == 'default'){
				$.each(this.gridCompColumnArr, function(i) {
					if(this.options.editable){
						var td = $('td:eq(' + i + ')',$tr)[0];
						var field = this.options.field;
						var value = $(row).attr(field); 
						value = oThis.getString(value,'');
						oThis.editCell(td,value,field,this.options.editType,oThis.editRowObj);
					}
				});
				$.each(this.gridCompColumnFixedArr, function(i) {
					if(this.options.editable){
						var td = $('td:eq(' + i + ')',$fixedtr)[0];
						var field = this.options.field;
						var value = $(row).attr(field); 
						value = oThis.getString(value,'');
						oThis.editCell(td,value,field,this.options.editType,oThis.editRowObj);
					}
				});
				$('#' +this.options.id + '_content_edit_menu').css('display','block');
	//			$('#' +this.options.id + '_content_edit_menu').css('left',this.leftW + this.fixedWidth + 'px');
				$('#' +this.options.id + '_content_edit_menu').css('left',this.leftW + 'px');
				$('#' +this.options.id + '_content_edit_menu_cancel').css('marginLeft','10px');// 与form形式相比偏左
				var topIndex = $('tr:visible',$tr.parent()).index($tr);
				this.rowHeight = $tr.height(); // tianxq
				var t = this.rowHeight * (topIndex + 1) + this.headerHeight + 1;
				$('#' +this.options.id + '_content_edit_menu').css('top',t + 'px');
			}else if(this.options.editType == 'form'){
				if(typeof this.options.formEditRenderFun == 'function'){
					if(this.fixedWidth>0){
						var table = $('#' + this.options.id + '_content_fixed_table')[0];
					}else{
						var table = $('#' + this.options.id + '_content_table')[0];
					}
					
					var tr = table.insertRow(this.eidtRowIndex + 2);
					tr.id = this.options.id + '_edit_tr';
					var cell = tr.insertCell();
					cell.id = this.options.id + '_edit_td';
					cell.style.borderBottom = '0px';
					var cWidth = parseInt(this.contentMinWidth) + parseInt(this.fixedWidth);
					var htmlStr = '<div id="' + this.options.id + '_edit_form" class="u-grid-edit-form" style="width:' + cWidth + 'px;">';
					htmlStr += '</div>';
					cell.innerHTML = htmlStr;
					var obj = {};
					obj.grid = gridObj;
					obj.element = $('#' + this.options.id + '_edit_form')[0];
					obj.editRowObj = this.editRowObj;
					this.options.formEditRenderFun.call(this,obj);
					var h = $('#' + this.options.id + '_edit_td')[0].offsetHeight;
					h += 40;
					tr.style.height = h + 'px';
					$('#' + this.options.id + '_edit_form')[0].style.height = h + 'px';
					if(this.options.multiSelect){
						var $div = $('#' + this.options.id + '_content_multiSelect > div:eq(' + this.eidtRowIndex + ')');
						var htmlStr = '<div id="' + this.options.id + '_multiSelect_edit" style="float:left;position:relative;width:' + this.multiSelectWidth + 'px;height:' + h + 'px;"></div>';
						$div[0].insertAdjacentHTML('afterEnd',htmlStr);
					}
					if(this.options.showNumCol){
						var $div = $('#' + this.options.id + '_content_numCol > div:eq(' + this.eidtRowIndex + ')');
						var htmlStr = '<div id="' + this.options.id + '_numCol_edit" style="float:left;position:relative;width:' + this.numWidth + 'px;height:' + h + 'px;"></div>';
						$div[0].insertAdjacentHTML('afterEnd',htmlStr);
					}
					$('#' +this.options.id + '_content_edit_menu').css('display','block');
					$('#' +this.options.id + '_content_edit_menu').css('left',this.leftW + 'px');
					var topIndex = $('tr:visible',$tr.parent()).index($tr);
					this.rowHeight = $tr.height(); //tianxq
					var t = this.rowHeight * (topIndex + 1) + this.headerHeight + 1;
					t = t + h - 40;
					$('#' +this.options.id + '_content_edit_menu').css('top',t + 'px');
					
					if(this.fixedWidth>0){
						var table1 = $('#' + this.options.id + '_content_table')[0];
						var tr1 = table1.insertRow(this.eidtRowIndex + 2);
						tr1.id = this.options.id + '_edit_tr1';
						tr1.style.height = h + 'px';
					}
				}else{
					if(this.fixedWidth>0){
						var table = $('#' + this.options.id + '_content_fixed_table')[0];
					}else{
						var table = $('#' + this.options.id + '_content_table')[0];
					}
					
					var tr = table.insertRow(this.eidtRowIndex + 2);
					tr.id = this.options.id + '_edit_tr';
					var cell = tr.insertCell();
					cell.id = this.options.id + '_edit_td';
					cell.style.borderBottom = '0px';
					var cWidth = parseInt(this.contentMinWidth) + parseInt(this.fixedWidth);
					var htmlStr = '<div id="' + this.options.id + '_edit_form" class="u-grid-edit-form" style="width:' + cWidth + 'px;">';
					$.each(this.gridCompColumnFixedArr, function(i) {
						if(this.options.editable){
							var field = this.options.field;
							var value = $(row).attr(field); 
							value = oThis.getString(value,'');
							var title = this.options.title;
							htmlStr += oThis.formEditCell(value,field,title);
						}
					});
					
					$.each(this.gridCompColumnArr, function(i) {
						if(this.options.editable){
							var field = this.options.field;
							var value = $(row).attr(field); 
							value = oThis.getString(value,'');
							var title = this.options.title;
							htmlStr += oThis.formEditCell(value,field,title);
						}
					});
					htmlStr += '</div>';
					cell.innerHTML = htmlStr;
					
					$.each(this.gridCompColumnFixedArr, function(i) {
						if(this.options.editable){
							var field = this.options.field;
							var td = $('#' + oThis.options.id + '_edit_' + field)[0];
							var value = $(row).attr(field); 
							var title = this.options.title;
							value = oThis.getString(value,'');
							htmlStr += oThis.editCell(td,value,field,this.options.editType,oThis.editRowObj);
						}
					});
					
					$.each(this.gridCompColumnArr, function(i) {
						if(this.options.editable){
							var field = this.options.field;
							var td = $('#' + oThis.options.id + '_edit_' + field)[0];
							var value = $(row).attr(field); 
							var title = this.options.title;
							value = oThis.getString(value,'');
							htmlStr += oThis.editCell(td,value,field,this.options.editType,oThis.editRowObj);
						}
					});
					// 处理左侧区域位置
					var h = $('#' + this.options.id + '_edit_td')[0].offsetHeight;
					h += 40;
					tr.style.height = h + 'px';
					$('#' + this.options.id + '_edit_form')[0].style.height = h + 'px';
					if(this.options.multiSelect){
						var $div = $('#' + this.options.id + '_content_multiSelect > div:eq(' + this.eidtRowIndex + ')');
						var htmlStr = '<div id="' + this.options.id + '_multiSelect_edit" style="float:left;position:relative;width:' + this.multiSelectWidth + 'px;height:' + h + 'px;"></div>';
						$div[0].insertAdjacentHTML('afterEnd',htmlStr);
					}
					if(this.options.showNumCol){
						var $div = $('#' + this.options.id + '_content_numCol > div:eq(' + this.eidtRowIndex + ')');
						var htmlStr = '<div id="' + this.options.id + '_numCol_edit" style="float:left;position:relative;width:' + this.numWidth + 'px;height:' + h + 'px;"></div>';
						$div[0].insertAdjacentHTML('afterEnd',htmlStr);
					}
					$('#' +this.options.id + '_content_edit_menu').css('display','block');
					$('#' +this.options.id + '_content_edit_menu').css('left',this.leftW + 'px');
					var topIndex = $('tr:visible',$tr.parent()).index($tr);
					this.rowHeight = $tr.height(); //tianxq
					var t = this.rowHeight * (topIndex + 1) + this.headerHeight + 1;
					t = t + h - 40;
					$('#' +this.options.id + '_content_edit_menu').css('top',t + 'px');
					
					if(this.fixedWidth>0){
						var table1 = $('#' + this.options.id + '_content_table')[0];
						var tr1 = table1.insertRow(this.eidtRowIndex + 2);
						tr1.id = this.options.id + '_edit_tr1';
						tr1.style.height = h + 'px';
					}
				}
				
			}
		},
		
		/*
		 * 行编辑完成
		 */
		/*editOk:function(){
			var oThis = this;
			var tr = $('#' + this.options.id + '_content_tbody tr:eq(' + this.eidtRowIndex+ ')')[0];
			var fixedtr = $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + this.eidtRowIndex+ ')')[0];
			var row = this.dataSourceObj.rows[this.eidtRowIndex];
			var oldRow = this.cloneObj(row);
			var oldValue = row.value;
			if(typeof this.options.onBeforeRowEditConfirm == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.oldRowObj = row;
				obj.editRowObj = this.editRowObj;
				obj.eidtRowIndex = this.eidtRowIndex;
				if(!this.options.onBeforeRowEditConfirm.call(this,obj)){
					return;
				}
			}
			
			row.value = this.cloneObj(this.editRowObj);
			try{
				this.repaintRow(tr,row);
				this.repaintRow(fixedtr,row,'fixed');
			}catch(e){
				var table = $('#' + this.options.id + '_content_table')[0];
				var fixedtable = $('#' + this.options.id + '_content_fixed_table')[0];
				table.deleteRow(this.eidtRowIndex + 1);
				fixedtable.deleteRow(this.eidtRowIndex + 1);
				this.createContentOneRowForIE(table,this.eidtRowIndex,row);
				this.createContentOneRowForIE(fixedtable,this.eidtRowIndex,row,'fixed');
			}
			$('#' +this.options.id + '_content_edit_menu').css('display','none');
			this.repairSumRow();
			this.noRowsShowFun();
			// form形式删除对应区域
			if(this.options.editType == 'form'){
				$('#' + this.options.id + '_multiSelect_edit').remove();
				$('#' + this.options.id + '_numCol_edit').remove();
				$('#' + this.options.id + '_edit_tr').remove();
				$('#' + this.options.id + '_edit_tr1').remove();
			}
			
			if(typeof this.options.onValueChange == 'function'){
				// 比较row和editRow的值，差异的触发onValueChange
				var rowIndex = this.eidtRowIndex;
				for(var field in this.editRowObj){
					var oldValue = oldRow.value[field];
					var newValue =  this.editRowObj[field];
					if(oldValue != newValue){
						var obj = {};
						obj.gridObj = this;
						obj.rowIndex = rowIndex;
						obj.field = field;
						obj.oldValue = oldValue;
						obj.newValue = newValue;
						this.options.onValueChange(obj);
					}
				}
			}
			if(typeof this.options.onRowEditConfirm == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.oldRowObj = row;
				obj.editRowObj = this.editRowObj;
				obj.eidtRowIndex = this.eidtRowIndex;
				this.options.onRowEditConfirm.call(this,obj);
			}
			this.eidtRowIndex = -1;
			
		},*/
		
		/*
		 * 行编辑取消
		 */
		/*editCancel:function(){
			var tr = $('#' + this.options.id + '_content_tbody tr:eq(' + this.eidtRowIndex+ ')')[0];
			var fixedtr = $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + this.eidtRowIndex+ ')')[0];
			var row = this.dataSourceObj.rows[this.eidtRowIndex];
			try{
				this.repaintRow(tr,row);
				this.repaintRow(fixedtr,row,'fixed');
			}catch(e){
				var table = $('#' + this.options.id + '_content_table')[0];
				var fixedtable = $('#' + this.options.id + '_content_fixed_table')[0];
				table.deleteRow(this.eidtRowIndex + 1);
				fixedtable.deleteRow(this.eidtRowIndex + 1);
				this.createContentOneRowForIE(table,this.eidtRowIndex,row);
				this.createContentOneRowForIE(fixedtable,this.eidtRowIndex,row,'fixed');
			}
			$('#' +this.options.id + '_content_edit_menu').css('display','none');
			this.repairSumRow();
			this.noRowsShowFun();
			this.eidtRowIndex = -1;
			// form形式删除对应区域
			if(this.options.editType == 'form'){
				$('#' + this.options.id + '_multiSelect_edit').remove();
				$('#' + this.options.id + '_numCol_edit').remove();
				$('#' + this.options.id + '_edit_tr').remove();
				$('#' + this.options.id + '_edit_tr1').remove();
			}
		},*/
		
		/*
		 * 行编辑关闭
		 */
		editClose:function(){
			var tr = $('#' + this.options.id + '_content_tbody tr:eq(' + this.eidtRowIndex+ ')')[0];
			var fixedtr = $('#' + this.options.id + '_content_fixed_tbody tr:eq(' + this.eidtRowIndex+ ')')[0];
			var row = this.dataSourceObj.rows[this.eidtRowIndex];
			try{
				this.repaintRow(tr,row);
				this.repaintRow(fixedtr,row,'fixed');
			}catch(e){
				var table = $('#' + this.options.id + '_content_table')[0];
				var fixedtable = $('#' + this.options.id + '_content_fixed_table')[0];
				table.deleteRow(this.eidtRowIndex + 1);
				fixedtable.deleteRow(this.eidtRowIndex + 1);
				this.createContentOneRowForIE(table,this.eidtRowIndex,row);
				this.createContentOneRowForIE(fixedtable,this.eidtRowIndex,row,'fixed');
			}
			$('#' +this.options.id + '_content_edit_menu').css('display','none');
			this.repairSumRow();
			this.noRowsShowFun();
			this.eidtRowIndex = -1;
			// form形式删除对应区域
			if(this.options.editType == 'form'){
				$('#' + this.options.id + '_multiSelect_edit').remove();
				$('#' + this.options.id + '_numCol_edit').remove();
				$('#' + this.options.id + '_edit_tr').remove();
				$('#' + this.options.id + '_edit_tr1').remove();
			}
		},
		
		/*
		 * 编辑单元格
		 */
		editCell:function(td,value,field,editType,rowObj){
			var oThis = this;
			if(editType == 'text'){
				// tianxq begin
				if(this.options.editType == 'default'){
					td.innerHTML = '<input id="' + this.options.id + "_edit_field_" + field + '" type="text" value="' + value +'" field="' + field+'" style="width:100%;height:34px;margin:0px;min-height:20px;font-size:12px;color:#444">';
				}else{
					td.innerHTML = '<input id="' + this.options.id + "_edit_field_" + field + '" type="text" value="' + value +'" field="' + field+'">';
				}
				// tianxq end
				$('input',$(td)).on('blur',function(){
//					$(rowObj).attr(field,this.value);
					oThis.editValueChange(field,this.value);
				});
			}else if(typeof editType == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.element = td;
				obj.value = value;
				obj.field = field;
				obj.rowObj = rowObj;
				editType.call(this,obj);
			}
		},
		
		editValueChange:function(field,value){
			// 设置row的值为新值
			this.updateValueAt(this.eidtRowIndex,field,value);
		},
		
		/*
		 * form形式下编辑单元格
		 */
		formEditCell:function(value,field,title){
			// 创建lable
			var htmlStr = '<div class="u-grid-edit-whole-div"><div class="u-grid-edit-label">' + title + '</div>';
			// 创建编辑区域
			htmlStr += '<div id="' + this.options.id + '_edit_' + field + '" class="u-grid-edit-div">'+ value +'</div>';
			htmlStr += '</div>';
			return htmlStr;
		},		/*
		 * 获取本地个性化存储的设置
		 */
		getLocalData:function(){
			if (window.localStorage == null)
				return null;
			if (this.$sd_storageData != null)
				return this.$sd_storageData;
			else{
				if (window.localStorage.getItem(this.localStorageId) == null){
					try{
						window.localStorage.setItem(this.localStorageId,"{}");
					}
					catch(e){
						return null;
					}
				}
				var storageDataStr = window.localStorage.getItem(this.localStorageId);
				if(typeof(JSON) == "undefined")
					this.$sd_storageData = eval("("+storageDataStr+")");
				else
					this.$sd_storageData = JSON.parse(storageDataStr);
				return this.$sd_storageData; 
			}
		},
		/*
		 * 保存本地个性化存储的设置
		 */
		saveLocalData:function(){
			var oThis = this;
			if(this.saveSettimeout){
				clearTimeout(this.saveSettimeout);
			}
			this.saveSettimeout = setTimeout(function(){
				if (oThis.$sd_storageData == null || window.localStorage == null)
					return;
				var strogeDataStr = JSON.stringify(oThis.$sd_storageData);
				try{
					window.localStorage.setItem(oThis.localStorageId,strogeDataStr);
				}catch(e){
					
				}
			},200);
		},
		/*
		 * 清除本地个性化存储的设置
		 */
		clearLocalData:function(){
			if(this.saveSettimeout){
				clearTimeout(this.saveSettimeout);
			}
			window.localStorage.setItem(this.localStorageId,"{}");
			this.$sd_storageData = {};
		},
		/*
		 * 将数据列顺序保存至本地个性化存储
		 */
		saveGridCompColumnArrToLocal:function(){
			var defData = this.getLocalData();
			defData["gridCompColumnArr"] = this.gridCompColumnArr.concat(this.gridCompColumnFixedArr);
			this.saveLocalData();
		},
		/* 
		 * 从本地个性化存储中取出数据列顺序
		 */
		getGridCompColumnArrFromLocal:function(){
			var defData = this.getLocalData();
			if (defData == null) return null;
			if(defData["gridCompColumnArr"] == null) return null;
			return defData["gridCompColumnArr"];
		},		/*
		 * 对宽度和高度进行处理
		 */
		formatWidth: function(w) { // 获得宽度
			if(w){
				return (w + "").indexOf("%") > 0 ? w : parseInt(w) + "px";
			}else{
				return '';
			}
		},
		/*
		 * 两个元素交换位置，要求传入参数e1在e2之前
		 */
		swapEle: function(e1, e2) {
			var n = e1.next(),
				p = e2.prev();
			e2.insertBefore(n);
			e1.insertAfter(p);
		},
		getString:function(value,defaultValue){
			if(value == null || value == undefined || value == 'null' || value == 'undefined' || value == ""){
				value = defaultValue;
			}
			return value + '';
		},
		
		getInt:function(value,defaultValue){
			if(value == null || value == undefined || value == 'null' || value == 'undefined' || value == "" || Number.isNaN(value)){
				value = defaultValue;
			}
			return value;
		},
		
		getFloat:function(value,defaultValue){
			if(value == null || value == undefined || value == 'null' || value == 'undefined' || value == "" || Number.isNaN(value)){
				value = defaultValue;
			}
			return value;
		},
		
		/*
		 * 克隆对象
		 */
		 cloneObj:function(obj){  
		    var o;  
		    if(typeof obj == "object"){  
		        if(obj === null){  
		            o = null;  
		        }else{  
		            if(obj instanceof Array){  
		                o = [];  
		                for(var i = 0, len = obj.length; i < len; i++){  
		                    o.push(this.cloneObj(obj[i]));  
		                }  
		            }else{  
		                o = {};  
		                for(var k in obj){  
		                    o[k] = this.cloneObj(obj[k]);  
		                }  
		            }  
		        }  
		    }else{  
		        o = obj;  
		    }  
		    return o;  
		},
		

		/*
		 * 处理精度
		 */
		DicimalFormater:function(obj){
			var value = obj.value + '';
			var precision = obj.precision;
			
			for ( var i = 0; i < value.length; i++) {
				if ("-0123456789.".indexOf(value.charAt(i)) == -1)
					return "";
			}
			return this.checkDicimalInvalid(value, precision);
		},
		
		checkDicimalInvalid:function(value,precision){
			if (value == null || isNaN(value))
				return "";
			// 浮点数总位数不能超过10位
//			if (value.length > 15)
//				value = value.substring(0, 15);
		
			// 默认2位精度
//			if (precision == null || !isNumberOnly(precision))
//				precision = 2;
//			else
//				precision = parseInt(precision);
			var digit = parseFloat(value);
			var result = (digit * Math.pow(10, precision) / Math.pow(10, precision))
					.toFixed(precision);
			if (result == "NaN")
				return "";
				
			return result;
		},
		accAdd:function(v1,v2){
			var r1,r2,m;
			try{
				r1 = v1.toString().split('.')[1].length;
			}catch(e){
				r1 = 0;
			}
			try{
				r2 = v2.toString().split('.')[1].length;
			}catch(e){
				r2 = 0;
			}
			m = Math.pow(10,Math.max(r1,r2))
			return (v1 * m + v2 * m)/m;
		},
		/*
		 * 设置数据源
		 */
		setDataSource: function(dataSource) {
			this.initDataSourceVariable();
			this.options.dataSource = dataSource;
			this.initDataSource();
			this.repairContent();
			this.afterGridDivsCreate();
		},
		
		/*
		 * 设置数据源 格式为：
		 * {
    		fields:['column1','column2','column3','column4','column5','column6'],
    		values:[["cl1","1","cl3","cl4","cl5","cl6"]
    				,["cl12","2","cl32","cl42","cl52","cl62"]
    				,["cl13","3","cl33","cl43","cl53","cl63"]
    				,["cl14","4","cl34","cl44","cl54","cl64"]
    				,["cl15","5","cl35","cl45","cl55","cl65"]
    				,["cl16","6","cl36","cl46","cl56","cl66"]
		    	]

			}
		 */
		setDataSourceFun1: function(dataSource){
			var dataSourceObj = {};
			if(dataSource.values){
				var valuesArr = new Array();
				$.each(dataSource.values, function() {    
					if(dataSource.fields){
						var valueObj = {},value = this;
						$.each(dataSource.fields, function(j) {
							$(valueObj).attr(this,value[j])
						});
						valuesArr.push(valueObj);
					}
				});
			}
			$(dataSourceObj).attr('values',valuesArr);
			this.setDataSource(dataSourceObj);
		},
		/*
		 * 添加一行
		 */
		addOneRow:function(row,index){
			var oThis = this;
			var displayFlag = 'none';
			var rowObj = {};
			rowObj.value = row;
			var parentIndex;
			var parentChildLength = 0;
			var l = this.dataSourceObj.rows.length;
			// 存在树结构
			if(this.options.showTree){
				var hasParent = false;
				var keyField = this.options.keyField;
				var parentKeyField = this.options.parentKeyField;
				var keyValue = this.getString($(row).attr(keyField),'');
				var parentKeyValue = this.getString($(row).attr(parentKeyField),'');
				/* 判断是否存在父项 */
				$.each(this.dataSourceObj.rows,function(i){
					var value = this.value;
					var nowKeyValue = oThis.getString($(value).attr(keyField),'');
					if(nowKeyValue == parentKeyValue){
						/* 取父项的index和父项的子index*/
						hasParent = true;
						parentIndex = i;
						parentChildLength = this.childRowIndex.length;
						var parentLevel = this.level;
						rowObj.level = parentLevel + 1;
						/*if(parentChildLength > 0){
							var lastChildIndex = this.childRowIndex[parentChildLength - 1];
							index = lastChildIndex + 1;
						}else{
							index = parentIndex + 1;
						}*/
						// 由于不止需要计算最后一个子节点，同时需要计算子节点的子节点。所以现在添加到父节点的下面一个
						index = parentIndex + 1;
						this.allChildRowIndex = new Array();
					}
				});
				if(!hasParent){
					rowObj.level = 0;
					// 如果没有父项则插入到最后，因为index有可能插入到其他节点的子节点之中，计算复杂
					index = 0;
				}
			}
			
			if(index != 0){
				if(index && index > 0){
					if(l < index)
						index = l;
				}else{
					index = 0;
				}
			}
			
			this.dataSourceObj.rows.splice(index,0,rowObj);
			if(hasParent){
					var $pTr = $('#' + this.options.id + '_content_div tbody tr:eq(' + (parentIndex)+ ')');
				if(parentChildLength > 0){
					// 如果存在父项并且父项存在子项则需要判断父项是否展开
					var openDiv = $('.fa-plus-square-o',$pTr);
					if(!(openDiv.length > 0)){
						displayFlag = 'block';
					}
				}else{
					// 如果存在父项并且父项原来没有子项则需要添加图标
					displayFlag = 'block';
					var d = $("div:visible:eq(0)",$pTr);
					var openDiv = $('.fa-plus-square-o',$pTr);
					var closeDiv = $('.fa-minus-square-o',$pTr);
					var spanHtml = '<span class="fa u-grid-content-tree-span fa-minus-square-o"></span>';
					if(d.length > 0 && openDiv.length == 0 && closeDiv.length == 0){
						d[0].insertAdjacentHTML('afterBegin',spanHtml);
						var oldLeft = parseInt(d[0].style.left);
						l = oldLeft - 16;
						if(l > 0 || l == 0){
							d[0].style.left = l + "px";
						}
					}
					if(openDiv.length > 0){
						openDiv.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
					}
				}
			}
			try{
				
				var htmlStr = this.createContentOneRow(rowObj,'normal',displayFlag);
				if($('#' + this.options.id + '_content_div tbody tr:eq(' + index+ ')')[0])
					$('#' + this.options.id + '_content_div tbody tr:eq(' + index+ ')')[0].insertAdjacentHTML('beforeBegin',htmlStr);
				else if($('#' + this.options.id + '_content_div tbody')[0])
					$('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd',htmlStr);
				var htmlStr = this.createContentOneRow(rowObj,'fixed',displayFlag);
				if($('#' + this.options.id + '_content_fixed_div tbody tr:eq(' + index+ ')')[0])
					$('#' + this.options.id + '_content_fixed_div tbody tr:eq(' + index+ ')')[0].insertAdjacentHTML('beforeBegin',htmlStr);
				else if($('#' + this.options.id + '_content_fixed_div tbody')[0])	
					$('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd',htmlStr);
			}catch(e){
				//IE情况下
				var table = $('#' + this.options.id + '_content_div table')[0];
				if(table)
					this.createContentOneRowForIE(table,index,rowObj,'normal',displayFlag);
				var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
				if(fixedTable)
					this.createContentOneRowForIE(fixedTable,index,rowObj,'fixed',displayFlag);
			}
			//
			if(this.options.multiSelect){
				var htmlStr = this.createContentLeftMultiSelectRow(rowObj,displayFlag);
				if($('#' + this.options.id + '_content_multiSelect div:eq(' + index + ')')[0])
					$('#' + this.options.id + '_content_multiSelect div:eq(' + index + ')')[0].insertAdjacentHTML('beforeBegin',htmlStr);
				else
					$('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('afterBegin',htmlStr);
			}
			if (this.options.showNumCol) {
				var htmlStr = this.createContentLeftNumColRow(l);
				$('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('beforeEnd',htmlStr);
			}
			this.repairSumRow();
			this.noRowsShowFun();
			var obj = {};
			obj.begin = index;
			obj.length = 1;
			obj.createFlag = 'fixed';
			this.renderTypeFun(obj);
			var obj = {};
			obj.begin = index;
			obj.length = 1;
			this.renderTypeFun(obj);
			if(this.eidtRowIndex != -1){
				this.editCancel();
			}
			// 需要重新排序重置变量
			var l = 0;
			if(this.options.showTree){
				if(this.dataSourceObj.options.values){
					l = this.dataSourceObj.options.values.length;	
				}else{
					this.dataSourceObj.options.values = new Array();
				}
				this.dataSourceObj.options.values.splice(index,0,row);
				this.dataSourceObj.sortRows();
			}else{
				this.dataSourceObj.options.values.splice(index,0,row);
			}
			
		},
		
		/*
		 * 添加多行
		 */
		addRows:function(rows,index){
			if(this.options.showTree){
				// 树表待优化
				var l = row.length;
				for(var i = l-1; i > -1;i--){
					this.addOneRow(rows[i],index);
				}
				return;
			}
			var htmlStr = '',htmlStrmultiSelect='',htmlStrNumCol='',htmlStrFixed='',oThis = this,l = this.dataSourceObj.rows.length;
			if(index != 0){
				if(index && index > 0){
					if(l < index)
						index = l;
				}else{
					index = 0;
				}
			}
			var rowObjArr = new Array();
			$.each(rows, function(i) {
				var rowObj = {};
				rowObj.value = this;
				rowObjArr.push(rowObj);
				oThis.dataSourceObj.rows.splice(index + i,0,rowObj);
			});
			
			$.each(rowObjArr, function(i) {
				htmlStr += oThis.createContentOneRow(this);
				htmlStrFixed += oThis.createContentOneRow(this,'fixed');
				if(oThis.options.multiSelect){
					htmlStrmultiSelect += oThis.createContentLeftMultiSelectRow(this);
				}
				if(oThis.options.showNumCol){
					htmlStrNumCol += oThis.createContentLeftNumColRow(l + i);
				}
			});
			try{
				if($('#' + this.options.id + '_content_div tbody tr:eq(' + index+ ')')[0])
					$('#' + this.options.id + '_content_div tbody tr:eq(' + index+ ')')[0].insertAdjacentHTML('beforeBegin',htmlStr);
				else if($('#' + this.options.id + '_content_div tbody')[0])
					$('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('afterBegin',htmlStr);
				if($('#' + this.options.id + '_content_fixed_div tbody tr:eq(' + index+ ')')[0])
					$('#' + this.options.id + '_content_fixed_div tbody tr:eq(' + index+ ')')[0].insertAdjacentHTML('beforeBegin',htmlStrFixed);
				else if($('#' + this.options.id + '_content_fixed_div tbody')[0])
					$('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('afterBegin',htmlStrFixed);
			}catch(e){
				//IE情况下
				var table = $('#' + this.options.id + '_content_div table')[0];
				var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
				if(table && fixedTable){
					$.each(rowObjArr, function(i) {
						oThis.createContentOneRowForIE(table,index + i,this);
						oThis.createContentOneRowForIE(fixedTable,index + i,this,'fixed');
					});
				}
			}
			if(this.options.multiSelect){
				if($('#' + this.options.id + '_content_multiSelect div:eq(' + index + ')')[0])
					$('#' + this.options.id + '_content_multiSelect div:eq(' + index + ')')[0].insertAdjacentHTML('beforeBegin',htmlStrmultiSelect);
				else
					$('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('afterBegin',htmlStrmultiSelect);
			}
			if (this.options.showNumCol) {
				$('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('beforeEnd',htmlStrNumCol);
			}
			this.repairSumRow();
			this.noRowsShowFun();
			var obj = {};
			obj.begin = index;
			obj.length = rows.length;
			obj.createFlag = 'fixed';
			this.renderTypeFun(obj);
			var obj = {};
			obj.begin = index;
			obj.length = rows.length;
			this.renderTypeFun(obj);
			if(this.eidtRowIndex != -1){
				this.editCancel();
			}
		},
		/*
		 * 删除一行
		 */
		deleteOneRow:function(index){
			var oThis = this;
			index = parseInt(index);
			var row = this.dataSourceObj.rows[index];
			var rowValue = row.value;
			if(this.selectRows){
				$.each(this.selectRows,function(i){
					if(this == rowValue){
						oThis.selectRows.splice(i,1);
						oThis.selectRowsObj.splice(i,1);
						oThis.selectRowsIndex.splice(i,1);
					}
				});
			}
			this.dataSourceObj.rows.splice(index,1);
			$('#' + this.options.id + '_content_div tbody tr:eq(' + index+ ')').remove();
			$('#' + this.options.id + '_content_fixed_div tbody tr:eq(' + index+ ')').remove();
			$('#' + this.options.id + '_content_multiSelect >div:eq(' + index + ')').remove();
			$('#' + this.options.id + '_content_numCol >div:nth-child('+(this.dataSourceObj.rows.length +1)+ ')').remove();
			this.repairSumRow();
			this.noRowsShowFun();
			if(this.dataSourceObj.options.values) {
				var i = this.dataSourceObj.options.values.indexOf(rowValue);
				this.dataSourceObj.options.values.splice(i,1);
			}
			if(this.options.showTree){
				this.dataSourceObj.sortRows();
			}
			
			if(typeof this.options.onRowDelete == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.index = index;
				if(!this.options.onRowDelete(index)){
					return;
				}
			}
		},
		
		/*
		 * 删除多行
		 */
		deleteRows:function(indexs){
			var oThis = this;
			// 如果传入的就是选中行的话删除时indexs会发生变化
			var indexss = new Array();
			
			$.each(indexs, function(i) {
				indexss.push(indexs[i]);
			});
			indexss.sort(function(a,b){
				return b-a;
			});
			
			$.each(indexss, function(i) {    
				oThis.deleteOneRow(this);
			});
		},
		
		/*
		 * 修改某一行
		 */
		updateRow:function(index,row){
			this.dataSourceObj.rows[index].value = row;
			var obj = {};
			obj.begin = index;
			obj.length = 1;
			obj.createFlag = 'fixed';
			this.renderTypeFun(obj);
			var obj = {};
			obj.begin = index;
			obj.length = 1;
			this.renderTypeFun(obj);
		},
		
		/*
		 * 修改某个cell的值
		 */
		updateValueAt:function(rowIndex,field,value){
			var oldValue = $(this.dataSourceObj.rows[rowIndex].value).attr(field);
			if(oldValue != value){
				$(this.dataSourceObj.rows[rowIndex].value).attr(field,value);
//				var gridCompColumn = this.getColumnByField(field);
//				var colIndex = this.getIndexOfColumn(gridCompColumn);
//				this.renderTypeByColumn(gridCompColumn,colIndex,rowIndex,1);
				var obj = {};
				obj.createFlag = 'fixed';
				obj.begin = rowIndex;
				obj.length = 1;
				this.renderTypeFun(obj);
				var obj = {};
				obj.begin = rowIndex;
				obj.length = 1;
				this.renderTypeFun(obj);
				
				// 如果编辑行为修改行则同时需要修改编辑行的显示
				if(this.eidtRowIndex == rowIndex){
					$('#' +  this.options.id + "_edit_field_" + field)[0].value = value;
				}
				if(typeof this.options.onValueChange == 'function'){
					var obj = {};
					obj.gridObj = this;
					obj.rowIndex = rowIndex;
					obj.field = field;
					obj.oldValue = oldValue;
					obj.newValue = value;
					this.options.onValueChange(obj);
				}
			}
		},
		/*
		 * 选中一行
		 */
		setRowSelect:function(rowIndex){
			if(!this.dataSourceObj.rows[rowIndex])
				return;
			if(typeof this.options.onBeforeRowSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				if(!this.options.onBeforeRowSelected(obj)){
					return;
				}
			}
			//已经选中退出
			if(this.dataSourceObj.rows[rowIndex].checked)
				return;
			if(!this.options.multiSelect){
				if(this.selectRowsObj && this.selectRowsObj.length > 0){
					$.each(this.selectRowsObj, function() {    
						this.checked = false;                                                          
					});
				}
				this.selectRows = new Array();
				this.selectRowsObj = new Array();
				this.selectRowsIndex = new Array();
				$('#' + this.options.id + '_content_tbody tr').removeClass("u-grid-content-sel-row");
				$('#' + this.options.id + '_content_tbody tr a').removeClass("u-grid-content-sel-row");
//				$('#' + this.options.id + '_content_tbody tr span').removeClass("u-grid-content-sel-row");
				$('#' + this.options.id + '_content_fixed_tbody tr').removeClass("u-grid-content-sel-row");
				$('#' + this.options.id + '_content_fixed_tbody tr a').removeClass("u-grid-content-sel-row");
			}else{
				$('#' + this.options.id + '_content_multiSelect input:eq(' + rowIndex+ ')')[0].checked = true;
			}
			$('#' + this.options.id + '_content_tbody tr:eq(' + rowIndex+ ')').addClass("u-grid-content-sel-row");
			$('#' + this.options.id + '_content_tbody tr:eq(' + rowIndex+ ') a').addClass("u-grid-content-sel-row");
//			$('#' + this.options.id + '_content_tbody tr:eq(' + rowIndex+ ') span').addClass("u-grid-content-sel-row");
			$('#' + this.options.id + '_content_fixed_tbody tr:eq(' + rowIndex+ ')').addClass("u-grid-content-sel-row");
			$('#' + this.options.id + '_content_fixed_tbody tr:eq(' + rowIndex+ ') a').addClass("u-grid-content-sel-row");
			this.selectRows.push(this.dataSourceObj.rows[rowIndex].value);
			this.selectRowsObj.push(this.dataSourceObj.rows[rowIndex]);
			this.selectRowsIndex.push(rowIndex);
			this.dataSourceObj.rows[rowIndex].checked = true;
			if(typeof this.options.onRowSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				this.options.onRowSelected(obj);
			}
			
		},
		
		/*
		 * 反选一行
		 */
		setRowUnselect:function(rowIndex){
			var oThis=this;
			if(!this.dataSourceObj.rows[rowIndex])
				return;
			if(typeof this.options.onBeforeRowUnSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				if(!this.options.onBeforeRowUnSelected(obj)){
					return;
				}
			}
			//已经选中退出
			if(!this.dataSourceObj.rows[rowIndex].checked)
				return;
			if(this.options.multiSelect){
				$('#' + this.options.id + '_content_multiSelect input:eq(' + rowIndex+ ')')[0].checked = false;
			}
			$('#' + this.options.id + '_content_tbody tr:eq(' + rowIndex+ ')').removeClass("u-grid-content-sel-row");
			$('#' + this.options.id + '_content_tbody tr:eq(' + rowIndex+ ') a').removeClass("u-grid-content-sel-row");
//			$('#' + this.options.id + '_content_tbody tr:eq(' + rowIndex+ ') span').removeClass("u-grid-content-sel-row");
			$('#' + this.options.id + '_content_fixed_tbody tr:eq(' + rowIndex+ ')').removeClass("u-grid-content-sel-row");
			$('#' + this.options.id + '_content_fixed_tbody tr:eq(' + rowIndex+ ') a').removeClass("u-grid-content-sel-row");
			$.each(this.selectRows,function(i){
				if(this == oThis.dataSourceObj.rows[rowIndex].value){
					oThis.selectRows.splice(i,1);
					oThis.selectRowsObj.splice(i,1);
					oThis.selectRowsIndex.splice(i,1);
				}
			})
			this.dataSourceObj.rows[rowIndex].checked = false;
			if(typeof this.options.onRowUnSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				this.options.onRowUnSelected(obj);
			}
		},
		
		/*
		 * 选中所有行
		 */
		setAllRowSelect:function(){
			if(typeof this.options.onBeforeAllRowSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObjs = this.dataSourceObj.rows;
				if(!this.options.onBeforeAllRowSelected(obj)){
					return;
				}
			}
			for(var i=0;i<this.dataSourceObj.rows.length;i++){
				this.setRowSelect(i);
			}
			if(typeof this.options.onAllRowSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObjs = this.dataSourceObj.rows;
				this.options.onAllRowSelected(obj);
			}
				
		},
		
		/*
		 * 反选所有行
		 */
		setAllRowUnSelect:function(){
			if(typeof this.options.onBeforeAllRowUnSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObjs = this.dataSourceObj.rows;
				if(!this.options.onBeforeAllRowUnSelected(obj)){
					return;
				}
			}
			for(var i=0;i<this.dataSourceObj.rows.length;i++){
				this.setRowUnselect(i);
			}
			if(typeof this.options.onAllRowUnSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObjs = this.dataSourceObj.rows;
				this.options.onAllRowUnSelected(obj);
			}
		},
		
		/*
		 * 获取选中行
		 */
		getSelectRows:function(){
			return this.selectRows;
		},
		
		/*
		 * 获取选中行对应行号
		 */
		getSelectRowsIndex:function(){
			return this.selectRowsIndex;
		},
		/*
		 * 获取所有行
		 */
		getAllRows:function(){
			var oThis = this;
			this.allRows = new Array();
			if(this.dataSourceObj.rows){
				$.each(this.dataSourceObj.rows,function(){
					oThis.allRows.push(this.value);
				});
			}
			return this.allRows;
		},
		
		/*
		 * 根据行号获取row
		 */
		getRowByIndex:function(index){
			return this.dataSourceObj.rows[index];
		},
		
		/*
		 * 根据某个字段值获取rowIndex
		 */
		getRowIndexByValue:function(field,value){
			var index = -1;
			$.each(this.dataSourceObj.rows,function(i){
				var v = $(this.value).attr(field);
				if(v == value){
					index = i;
				}
			})
			return index;
		},
		
		/*
		 * 获取数据行下所有子元素
		 */
		getAllChildRow:function(row){
			if(row.allChildRow && row.allChildRow.length > 0){
				return row.allChildRow;
			}
			row.allChildRow = new Array();
			this.getAllChildRowFun(row,row.allChildRow);
			return row.allChildRow;
		},
		
		/*
		 * 获取数据行下所有子元素的index
		 */
		getAllChildRowIndex:function(row){
			if(row.allChildRowIndex && row.allChildRowIndex.length > 0){
				return row.allChildRowIndex;
			}
			row.allChildRowIndex = new Array();
			this.getAllChildRowIndexFun(row,row.allChildRowIndex);
			return row.allChildRowIndex;
		},
		
		
		getAllChildRowFun:function(row,rowArry){
			var oThis = this;
			if(row.childRow.length > 0){
				Array.prototype.push.apply(rowArry, row.childRow);
				$.each(row.childRow, function() {    
					  oThis.getAllChildRowFun(this,rowArry);                                                        
				});
			}
		},
		
		getAllChildRowIndexFun:function(row,rowArry){
			var oThis  = this;
			if(row.childRowIndex.length > 0){
				Array.prototype.push.apply(rowArry, row.childRowIndex);
				$.each(row.childRow, function() {    
					  oThis.getAllChildRowIndexFun(this,rowArry);                                                        
				});
			}
		},
		
		/*
		 * 根据filed设置renderType
		 */
		setRenderType:function(field,renderType){
			var gridCompColumn = this.getColumnByField(field);
			gridCompColumn.options.renderType = renderType;
			var index = this.getIndexOfColumn(gridCompColumn);
			this.renderTypeByColumn(gridCompColumn,index);
		},
		
		/*
		 * 根据filed设置editType
		 */
		setEditType:function(field,editType){
			var gridCompColumn = this.getColumnByField(field);
			gridCompColumn.options.editType = editType;
		},
		
		/*
		 * 设置是否可修改
		 */
		setEditable:function(editable){
			this.options.editable = editable;
		},
		setColumnPrecision:function(field,precision){
			var gridColumn = this.getColumnByField(field);
			gridColumn.options.precision = precision;
			var obj = {};
			obj.createFlag = 'fixed';
			this.renderTypeFun(obj);
			var obj = {};
			this.renderTypeFun(obj);
			if(this.options.showSumRow){
				this.repairSumRow();
			}
		},
		setMultiSelect:function(multiSelect){
			var oldMultiSelect = this.options.multiSelect;
			if(oldMultiSelect != multiSelect){
				this.options.multiSelect = multiSelect;
				this.initGrid();
			}
		},
		setShowNumCol:function(showNumCol){
			var oldShowNumCol = this.options.showNumCol;
			if(oldShowNumCol != showNumCol){
				this.options.showNumCol = showNumCol;
				this.initGrid();
			}
		},
}
	dataSource.prototype = {
		/*
		 * 将values转化为rows并进行排序
		 */
		sortRows:function(field,sortType){
			if(this.gridComp.options.showTree){
				this.treeSortRows(field,sortType);
			}else{
				this.basicSortRows(field,sortType);
			}
		},
		/*
		 * 将values转化为rows并进行排序(标准)
		 */
		basicSortRows: function(field, sortType) {
			var oThis = this;
			var dataType = "";
			if(field){
				dataType = this.gridComp.getColumnByField(field).options.dataType;
			}
			if (sortType == "asc") {
				this.rows.sort(function(a, b) {
					var v1 = $(b.value).attr(field);
					var v2 = $(a.value).attr(field);
					if(dataType == 'Float'){
						v1 = parseFloat(v1);
						v2 = parseFloat(v2);
						if(v1 != v1){
							return 1;
						}
						if(v2 != v2){
							return -1;
						}
						return v1-v2;
					}else if (dataType == 'Int'){
						v1 = parseInt(v1);
						v2 = parseInt(v2);
						if(v1 != v1){
							return 1;
						}
						if(v2 != v2){
							return -1;
						}
						return v1-v2;
					}else{
						v1 = oThis.gridComp.getString(v1,'');
						v2 = oThis.gridComp.getString(v2,'');
						try{
							return v1.localeCompare(v2);
						}catch(e){
							return 0;
						}
					}
				});
			} else if (sortType == "desc") {
				this.rows.sort(function(a, b) {
					var v1 = $(a.value).attr(field);
					var v2 = $(b.value).attr(field);
					if(dataType == 'Float'){
						v1 = parseFloat(v1);
						v2 = parseFloat(v2);
						if(v1 != v1){
							return 1;
						}
						if(v2 != v2){
							return -1;
						}
						return v1-v2;
					}else if (dataType == 'Int'){
						v1 = parseInt(v1);
						v2 = parseInt(v2);
						if(v1 != v1){
							return 1;
						}
						if(v2 != v2){
							return -1;
						}
						return v1-v2;
					}else{
						v1 = oThis.gridComp.getString(v1,'');
						v2 = oThis.gridComp.getString(v2,'');
						try{
							return v1.localeCompare(v2);
						}catch(e){
							return 0;
						}
					}
				});
			} else {
				this.rows = new Array();
				if(this.options.values){
					$.each(this.options.values, function(i) {
						var rowObj = {};
						rowObj.value = this;
						oThis.rows.push(rowObj);
					});
				}
			}
		},
		
		/*
		 * 将values转化为rows并进行排序(数表)
		 */
		treeSortRows: function(field, sortType) {
			var oThis = this;
			this.rows = new Array();
			this.hasParentRows = new Array();
			this.nothasParentRows = new Array();
			if(this.options.values){
				$.each(this.options.values, function(i){
					var rowObj = {};
					var $this = $(this);
					var keyField = oThis.gridComp.options.keyField;
					var parentKeyField = oThis.gridComp.options.parentKeyField;
					var keyValue = oThis.gridComp.getString($this.attr(keyField),'');
					var parentKeyValue = oThis.gridComp.getString($this.attr(parentKeyField),'');
					rowObj.value = this;
					rowObj.keyValue = keyValue;
					rowObj.parentKeyValue = parentKeyValue;
					if(parentKeyValue == ''){
						oThis.nothasParentRows.push(rowObj);
					}else{
						oThis.hasParentRows.push(rowObj);
					}
					oThis.rows.push(rowObj);
				});
				// 判断存在父项的数据的父项是否真正存在
				$.each(this.hasParentRows,function(i){
					var parentKeyValue = this.parentKeyValue;
					var hasParent = false;
					$.each(oThis.rows,function(){
						if(this.keyValue == parentKeyValue){
							hasParent = true;
						}
					});
					if(!hasParent){
						oThis.hasParentRows.splice(i,0);
						oThis.nothasParentRows.push(this);
					}
				});
				oThis.rows = new Array();
				var level = 0;
				// 遍历nothasParentRows，将子项加入rows
				$.each(this.nothasParentRows, function(i) {
					this.level = level;
					oThis.rows.push(this);
					oThis.pushChildRows(this,level);
				});
			}
		},
		
		/*
		 * 将当前行子项插入rows数组
		 */
		pushChildRows:function(row,level){
			var keyValue = row.keyValue;
			var oThis = this;
			var nowLevel = parseInt(level) + 1;
			var hasChild = false;
			var childRowArray = new Array();
			var childRowIndexArray = new Array();
			$.each(this.hasParentRows, function(i) {
				if(this && this.parentKeyValue == keyValue){
					hasChild = true;
					this.level = nowLevel;
					oThis.rows.push(this);
					childRowArray.push(this);
					var index = parseInt(oThis.rows.length - 1);
					childRowIndexArray.push(index);
					oThis.hasParentRows.splice(i,0);
					oThis.pushChildRows(this,nowLevel);
				}
			});
			row.hasChild = hasChild;
			row.childRow = childRowArray;
			row.childRowIndex = childRowIndexArray;
		},
		/*
		 * 获取合计值
		 */
		getSumValue:function(field,gridCompColumn,gridComp){
			var sumValue = null;
			if(gridCompColumn.options.sumCol){
				$.each(this.rows, function(i) {    
					var v = $(this.value).attr(field);
					if(gridCompColumn.options.dataType == 'Int'){
						v = gridComp.getInt(v,0);
						sumValue  += parseInt(v);
					}else{
						v = gridComp.getFloat(v,0);
						sumValue  = gridComp.accAdd(sumValue,parseFloat(v));
//						sumValue  += parseFloat(v);
					}
				});
			}
			// 处理精度
			if(gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision){
				var o = {};
				o.value = sumValue;
				o.precision = gridCompColumn.options.precision;
				sumValue = gridComp.DicimalFormater(o);
			}
			if(sumValue != null && sumValue != undefined && sumValue != 'null' && sumValue != 'undefined'){
				return sumValue + '';
			}else{
				return '';
			}
			
		},

	};
	var old = $.fn.grid;
	// 方法扩展
	$.fn.grid = function(options) {
		var grid = $(this).data('gridComp');
		if(!grid) 
			$(this).data('gridComp',(grid = new gridComp(this, options)));
		return grid;
	};
	
	$.fn.grid.noConflict = function() {
		$.fn.grid = old;
		return this;
	}
})(jQuery, window, document);
+ function($) {

	"use strict";

	// TREE CONSTRUCTOR AND PROTOTYPE

	/**
     * 树组件
     * @class Tree
     * @constructor
     * @example
     * treeData:[{id:'1',pid:'',title:'1'},{id:'1',pid:'',title:'1'}]
     * 	js代码
     * 	$(function(){
			$('#ex-tree-basic').tree({
				data: treeData,
				loadingHTML: '<div class="static-loader">Loading...</div>',
				multiSelect: true,
				cacheItems: true,
				useChkBox:true,
				onBeforeSelected:function(){},
				onSelected:function(){},
			});
		})
		
		html代码
		<div class="tree" id="ex-tree-basic"></div>
     */
	var Tree = function(element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.tree.defaults, options);
		this.formatData();
		//渲染，改成build建造方法
		this.build(options);
		//叶子节点点击的时候
		this.$element.on('click', '.tree-item-name', $.proxy(function(ev) {
			this.selectChildren($(ev.currentTarget).parent()[0]);
		}, this));
		//父节点点击的时候
		this.$element.on('click', '.tree-folder-header > div', $.proxy(function(ev) {
			this.selectParent($(ev.currentTarget).parent()[0]);
		}, this));
		//父节点前面展开按钮点击的时候
		this.$element.on('click', '.tree-folder-header > i', $.proxy(function(ev) {
			this.openCloseParent($(ev.currentTarget).parent()[0]);
		}, this));
		//父节点复选框点击的时候
		this.$element.on('click', '.tree-folder > input:checkbox', $.proxy(function(ev) {
			var parentDiv = $(ev.currentTarget).parent().find('.tree-folder-header');
			this.selectParent(parentDiv);
		}, this));
		//子节点复选框点击的时候
		this.$element.on('click', '.tree-item > input:checkbox', $.proxy(function(ev) {
			this.selectChildren($(ev.currentTarget).parent()[0]);
		}, this));
		//右键点击树节点的时候，目前先暂定任意节点
		this.$element.on('mousedown', '.tree-folder-name,.tree-item-name', $.proxy(function(ev) {
			this.popMenu(ev.currentTarget, ev);
		}, this));
		//添加鼠标右键事件监听
		this.$element.on('contextmenu', '.tree-folder-header,.tree-item-name', $.proxy(function(ev) {
			this.initContextmenu(ev);
		}, this));

	};

	Tree.prototype = {

		constructor: Tree,

		// 设置数据源
		setDataSource: function(dataSource) {
			this.options.data = dataSource;

			this.formatData();
			//渲染，改成build建造方法
			this.build(this.options);
		},

		// 格式化数据
		/*
		 * 原始:[{id:'1',pid:'',title:'1'},{id:'11',pid:'1',title:'11'}]
		 * 转化后:[{id:'1',pid:'',title:'1',children:[{id:'11',pid:'1',title:'11'}]}]
		 */
		formatData: function() {
			var basicData = this.options.data;
			var dataArry = new Array();
			var self = this;
			this.notHasParentData = new Array();
			this.hasParentData = new Array();

			if (!basicData) {
				return;
			}
			$.each(basicData, function() {
				var pid = $(this).attr('pid');
				this.dataBasicObj = JSON.stringify(this);
				if (pid == '') {
					self.notHasParentData.push(this);
				} else {
					self.hasParentData.push(this);
				}
			});
			// 判断存在父项的数据的父项是否真正存在
			$.each(this.hasParentData, function(i) {
				var pid = $(this).attr('pid');
				var hasParent = false;
				$.each(basicData, function() {
					if ($(this).attr('id') == pid) {
						hasParent = true;
					}
				});
				if (!hasParent) {
					self.hasParentData.splice(i, 0);
					self.notHasParentData.push(this);
				}
			});
			//
			$.each(this.notHasParentData, function(i) {
				dataArry.push(this);
				self.pushChildren(this);
			});
			this.options.data = dataArry;
		},
		// 将子项插入到data的children中
		pushChildren: function(data) {
			var self = this;
			var childrenArr = new Array();
			$.each(this.hasParentData, function(i) {
				if (this && $(this).attr('pid') == $(data).attr('id')) {
					childrenArr.push(this);
					self.hasParentData.splice(i, 0);
					self.pushChildren(this);
				}
			});
			data.children = childrenArr;
		},
		//建造方法，包括对参数ajaxUrl的判断，如果包含有该参数，则ajax方式获取，而不是data属性
		build: function(options) {
			var self = this;
			if (options.ajaxUrl == "" || options.ajaxUrl == null) {
				self.render();
			} else {
				$.ajax({
					type: "POST",
					url: options.ajaxUrl,
					dataType: "text",
					data: options.reqParam,
					success: function(data) {
						options.data = eval(data);
						self.render();
					},
					error: function() {

					}
				});
			}
		},

		//渲染方法
		render: function() {
			this.populate(this.options.data, this.$element);
			this.$element.find('.tree-folder').show();
			this.$element.find('.tree-item').show();
		},
		populate: function(data, $el) {
			var self = this;
			if (!data) {
				return;
			}
			$.each(data, function(index, value) {
				var $entity;
				//如果还有子节点
				if (!self.isEmpty(value.children) || value.type == 'parent') {
					$entity = self.createParent();
					$entity.find('.tree-folder-name').html(value.title);
					$entity.find('.tree-folder-header').data(value.id);
					$entity.find('.tree-folder-header').attr("id", value.id);
					$entity.find('.tree-folder-header').attr("pid", value.pid);
					$entity.find('.tree-folder-header').attr("title", value.title);
					$entity.find('.tree-folder-header').attr("dataBasicObj", value.dataBasicObj);
					self.populate(value.children, $entity.find(".tree-folder-content:eq(0)"));
					if(!$.app){
					$entity.find(".tree-folder-content:eq(0)").hide();
					}
					//这里加上检测是否有自定义图标
					if (value.icon) {
						var findi = $entity.children('.tree-folder-header').children("i");
						var l = findi.length - 1; 
						$(findi[l]).addClass(value.icon).prop("icon", value.icon);
					}
				} else {
					$entity = self.createChildren();
					$entity.find('.tree-item-name').html(value.title);
					$entity.attr("href", value.href);
					$entity.attr("id", value.id);
					$entity.attr("pid", value.pid);
					$entity.attr("title", value.title);
					$entity.attr("dataBasicObj", value.dataBasicObj);
					$entity.data(value.id);
					//这里加上检测是否有自定义图标，对于子节点，还有个bug
					if (value.icon) {
						$entity.children("i").addClass(value.icon).prop("icon", value.icon);
					}
				}
				$el.append($entity);
			});
		},
		isEmpty: function(obj) {
			if (!obj) {
				return true;
			}
			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					return false;
				}
			}
			return true;
		},
		createParent: function() {
			var $node;
			//如果采用复选框
			if (this.options.useChkBox) {
				$node = $('<div class="tree-folder checkbox" style="display:none;">' +
					'<input type="checkbox">' +
					'<div class="tree-folder-header">' +
					'<i class="fa fa-caret-right" style="min-width:10px;"></i>' +
					'<i class="" style="min-width:10px;"></i>' +
					'<div class="tree-folder-name"></div></div><div class="tree-folder-content"></div>' +
					'<div class="tree-loader" style="display:none"></div></div>');
			} else {
				if($.app){
				$node =	$('<div class="accordion-item" ><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title tree-folder-name "></div></div></a><div class="list-block accordion-list accordion-item-content tree-folder-content" ></div></div>');
		
				}else{
				$node = $('<div class="tree-folder" style="display:none;">' +
					'<div class="tree-folder-header"><i class="fa fa-caret-right" style="min-width:10px;"></i>' +
					'<i class="" style="min-width:10px;"></i>' +
					'<div class="tree-folder-name"></div></div><div class="tree-folder-content"></div>' +
					'<div class="tree-loader" style="display:none"></div></div>');
				}	
			}

			return $node;
		},
		createChildren: function() {
			var $node;
			//如果采用复选框
			if (this.options.useChkBox) {
				$node = $('<div class="tree-item checkbox" style="display:none;">' +
					'<input type="checkbox">' +
					'<div class="tree-item-name"></div></div>');
			} else {
				if($.app){
				$node =	$('<div class="accordion-item "><a href="#" class="item-content item-link"><div class="item-inner"><div class="item-title tree-item-name "></div></div></a></div>');
		
				}else{

				$node = $('<div class="tree-item" style="display:none;">' +
//					'<i class="glyphicon glyphicon-list-alt"></i><div class="tree-item-name"></div></div>');
					'<i class="" style="min-width:10px;"></i><div class="tree-item-name"></div></div>');
				}	
			}

			return $node;
		},
		_unSelectNode: function($el) {
			if($el && $el.length) {
				$el.removeClass('tree-selected');
				// 有checkbox的话，
				var cks = $el.find("input[type='checkbox']")
				if(!cks.length) {
					cks = $el.siblings("input[type='checkbox']");
				}
				if (cks.length) {
					var isChecked = cks.prop("checked");
					if(isChecked){
						cks.prop("checked", false);
					}
				}
			}
		},
		// el为 class为tree-item
		selectChildren: function(el) {

			var $el = $(el);
			var $all = this.$element.find('.tree-selected');
			var data = [];
			var id = $el.attr('id');
			var pid = $el.attr('pid');
			var title = $el.attr('title');
			var dataObj = {
				id: id,
				pid: pid,
				title: title
			};
			//检测是否有外部函数
			var eventOnSelect = this.options.onSelect;
			if (eventOnSelect) {
				eventOnSelect($el);
				return;
			}
			//***************************
			if (typeof this.options.onBeforeSelected == 'function') {
				if (!this.options.onBeforeSelected.call(this, this, dataObj)) {
					return;
				}
			}
			if (this.options.multiSelect) {
				$.each($all, function(index, value) {
					var $val = $(value);
					if ($val[0] !== $el[0]) {
						data.push($(value).data());
					}
				});
			} else if ($all[0] !== $el[0]) {
				this._unSelectNode($all);
				data.push($el.data());
			}

			if ($el.hasClass('tree-selected')) {
				$el.removeClass('tree-selected');
//				$el.find('i').removeClass('glyphicon-ok').addClass('glyphicon-list-alt');
				//这里检测是否有icon属性
				if ($el.find("i").prop("icon")) {
					$el.find("i").addClass($el.find("i").prop("icon"));
				}
				// 有checkbox的话，
				var cks = $el.find("input[type='checkbox']");
				if (cks.length > 0) {
					var isChecked = cks.prop("checked");
					if(isChecked){
						cks.prop("checked", false);
					}
				}
			} else {
				$el.addClass('tree-selected');
//				$el.find('i').removeClass('glyphicon-list-alt').addClass('glyphicon-ok');
				if (this.options.multiSelect) {
					data.push($el.data());
				}
				// 有checkbox的话，
				var cks = $el.find("input[type='checkbox']");
				if (cks.length > 0) {
					var isChecked = cks.prop("checked");
					if(!isChecked){
						cks.prop("checked", true);
					}
				}
			}
			//console.info("icon = " + $el.find("i").prop("icon"));

			if (data.length) {
				this.$element.trigger('selected', {
					info: data
				});
			}

			if($el.hasClass('tree-selected')){
				if (typeof this.options.onSelected == 'function') {
					this.options.onSelected.call(this, this, dataObj)
					this.$element.trigger('select.u.tree', dataObj)
				}
			}

		},
		// el 为tree-folder-header
		selectParent: function(el) {
			var oThis = this;
			var $el = $(el);
			var $par = $el.parent();
			var $all = this.$element.find('.tree-selected');
			var id = $el.attr('id');
			var pid = $el.attr('pid')
			var title = $el.attr('title');
			var dataObj = {
				id: id,
				pid: pid,
				title: title
			};
			if (typeof this.options.onBeforeSelected == 'function') {
				if (!this.options.onBeforeSelected.call(this, this, dataObj)) {
					return;
				}
			}
			if (!$el.hasClass('tree-selected')) {
				// 父项选中不再触发展开
				/*if ($par.find('.tree-folder-content').children().length) {
					$par.find('.tree-folder-content:eq(0)').show();
				}

				$par.find('.fa-caret-right:eq(0)')
					.removeClass('fa-caret-right')
					.addClass('fa-caret-down');*/
				if (!this.options.multiSelect) {
					this._unSelectNode($all);
				}
				$el.addClass('tree-selected');
				var ck = $par.find('input:eq(0)');
				if(ck.length > 0){
					var isChecked = ck.prop("checked");
					if(!isChecked){
						ck.prop("checked", true);
					}
				}
				if(this.options.multiSelect){
					var cks = $par.find(".tree-item");
					if (cks.length > 0) {
						$.each(cks, function() {    
				        	var childDiv = this;
				        	$(this).removeClass('tree-selected');
							oThis.selectChildren(childDiv);                                             
						});
						
					}
				}
				/* 父项选中不再触发展开
				this.$element.trigger('opened', {
					element: $el,
					data: $el.data()
				});*/
			} else {
				/* 父项选中不再触发展开
				if (this.options.cacheItems) {
					$par.find('.tree-folder-content:eq(0)').hide();
				} else {
					$par.find('.tree-folder-content:eq(0)').empty();
				}

				$par.find('.fa-caret-down:eq(0)')
					.removeClass('fa-caret-down')
					.addClass('fa-caret-right');*/
				$el.removeClass('tree-selected');
				var ck = $par.find('input:eq(0)');
				if(ck.length > 0){
					var isChecked = ck.prop("checked");
					if(isChecked){
						ck.prop("checked", false);
					}
				}
				if(this.options.multiSelect){
					var cks = $par.find(".tree-item");
					if (cks.length > 0) {
						$.each(cks, function() {    
				        	var childDiv = this;
				        	$(this).addClass('tree-selected');
							oThis.selectChildren(childDiv);                                             
						});
					}
				}
				/* 父项选中不再触发展开
				this.$element.trigger('closed', {
					element: $el,
					data: $el.data()
				});*/
			}
			if($el.hasClass('tree-selected')){
				if (typeof this.options.onSelected == 'function') {
					this.options.onSelected.call(this, this, dataObj);
				}
			}
		},
		
		openCloseParent:function(el){
			var $el = $(el);
			var $par = $el.parent();
			if ($el.find('.fa-caret-right').length) {
				if ($par.find('.tree-folder-content').children().length) {
					$par.find('.tree-folder-content:eq(0)').show();
				}

				$par.find('.fa-caret-right:eq(0)')
					.removeClass('fa-caret-right')
					.addClass('fa-caret-down');
				this.$element.trigger('opened', {
					element: $el,
					data: $el.data()
				});
			}else{
				if (this.options.cacheItems) {
					$par.find('.tree-folder-content:eq(0)').hide();
				} else {
					$par.find('.tree-folder-content:eq(0)').empty();
				}

				$par.find('.fa-caret-down:eq(0)')
					.removeClass('fa-caret-down')
					.addClass('fa-caret-right');
				this.$element.trigger('closed', {
					element: $el,
					data: $el.data()
				});
			}
		},

		selectedItems: function() {
			var $sel = this.$element.find('.tree-selected');
			var data = [];

			$.each($sel, function(index, value) {
				var id = $(value).attr('id');
				var pid = $(value).attr('pid');
				var title = $(value).attr('title');
				var dataBasicObj = $(value).attr('dataBasicObj');
				if(typeof(JSON) == "undefined")
					dataBasicObj = eval("("+dataBasicObj+")");
				else
					dataBasicObj = JSON.parse(dataBasicObj);
				var dataObj = {
					id: id,
					pid: pid,
					title: title,
					dataBasicObj: dataBasicObj
				};
				data.push(dataObj);
			});
			return data;
		},

		//新加函数，勾选父节点的复选框时，下面所有的子节点的复选框都要同样的勾选状态
		
		checkParent: function(el, ev) {
			var $el = $(el);
			var isChecked = $el.prop("checked");
			$el.parent().find("[type='checkbox']").prop("checked", isChecked);
		}

		//新加函数，弹出菜单
		,
		popMenu: function(el, ev) {
			var mouseMenu = this.options.mouseMenu;
			var $el = $(el);
			if (mouseMenu == null) {
				return false;
			}
			if (ev.which == 3) {
				mouseMenu.hide();
				mouseMenu.css({
					"position": "absolute",
					"top": ev.clientY, //这里需要再调试
					"left": ev.clientX
				});
				mouseMenu.show("fast");
				//加上一个标记
				var $p = null; //临时节点，存储parent
				if ($el.hasClass("tree-folder-name")) {
					$p = $el.parent().parent();
				} else if ($el.hasClass("tree-item-name")) {
					$p = $el.parent();
				}
				$el.prop("node", $p.attr("id"));
				console.info($el + ".node = " + $el.prop("node"));
			}
		},

		//鼠标右键事件监听
		initContextmenu: function(ev) {
			this.$element.trigger('rightClick', ev);
		},
		//根据节点创建右键菜单
		createRightMenu: function(data) {
			var self = this;
			$('.tree-right-menu').remove();
			var $element = $(data.element);
			var ev = data.event;
			var menuData = data.data;
			var menuHtml = new Array();
			menuHtml.push('<ul class="dropdown-menu tree-right-menu">');
			$.each(menuData, function() {
				menuHtml.push('<li action="' + this.action + '"><a>' + this.title + '</a></li>');
			});
			menuHtml.push('</ul>');
			$(menuHtml.join('')).appendTo($('body')).show()
				.css({
					position: 'fixed',
					left: ev.pageX,
					top: ev.pageY
				})
				.on('mouseleave', function() {
					$(this).remove();
				}).find('li').on('click', function() {
					var $this = $(this);
					if ($element.hasClass('tree-item-name')) {
						self.$element.trigger($this.attr('action'), $element.parent());
					} else {
						self.$element.trigger($this.attr('action'), $element);
					}
					$this.parent().remove();
				});
		},
		//添加一个节点
		addChildren: function(data) {
			var self = this;
			var node = $(data.node);
			var $entity = null;
			var menu = data.menu;
			if (data.type && data.type == 'parent') {
				$entity = self.createParent();
				$entity.find('.tree-folder-name').html(menu.title);
				$entity.find('.tree-folder-header').data(menu);
				$entity.on('click', {
					element: $(this)
				}, function(e) {
					self.selectParent(e.data.element);
				});
			} else {
				$entity = self.createChildren();
				$entity.find('.tree-item-name').html(menu.title);
				$entity.data(menu);
				$entity.on('click', {
					element: $(this)
				}, function(e) {
					self.selectChildren(e.data.element);
				});
			}
			$entity.show().on('contextmenu', function(ev) {
				self.initContextmenu(ev);
			});
			node.parent().find('>.tree-folder-content').append($entity).show();
			if (node.find('.fa-caret-right').length > 0) {
				node.trigger('click');
			}
		},
		//删除一个节点
		removeChildren: function(data) {
				$(data).remove();
			}
			//提供一个显示文本框用于重新设置标题的接口

	};


	// TREE PLUGIN DEFINITION

	$.fn.tree = function(option, value) {
		var methodReturn;

		var $set = this.each(function() {
			var $this = $(this);
			$this.addClass('tree');
			var data = $this.data('koala.tree');
			var options = typeof option === 'object' && option;

			if (!data) $this.data('koala.tree', (data = new Tree(this, options)));
			this.treeObj = data;
			if (typeof option === 'string') methodReturn = data[option](value);
		});

		//如果有右键菜单，就把原来的右键除掉
		if (option.mouseMenu != null) {
			$(document).bind("contextmenu", function() {
				return false;
			});
		}

		//添加判断是否可拖放
		if (option.draggable) {
			// sortable是jquery-ui提供的，暂不支持draggable
			//var $node = $(".tree");
			//$node.sortable({
			//items:".tree-folder,.tree-item"
			//,containment: $(this).parent()
			//});
			//$node.disableSelection();
		}

		return (methodReturn === undefined) ? $set : methodReturn;

	};

	//默认内置属性列表
	$.fn.tree.defaults = {
		/**
		 * 是否允许树节点多选
		 * @property multiSelect
		 * @type Boolean
		 * @default false
		 */
		multiSelect: false,
		/**
		 * 载入数据时显示的html dom
		 * @property loadingHTML
		 * @type String
		 * @default '<div>Loading...</div>'
		 */
		loadingHTML: '<div>Loading...</div>',
		/**
		 * 当父节点折叠时，子节点是否保存，如果设置为true，则单纯隐藏，设置为false，则清空其子节点
		 * @property cacheItems
		 * @type Boolean
		 * @default true
		 */
		cacheItems: true,
		/**
		 * 是否带复选框
		 * @property useChkBox
		 * @type Boolean
		 * @default false
		 */
		useChkBox: false,
		/**
		 * 节点可否拖放
		 * @property draggable
		 * @type Boolean
		 * @default false
		 */
		draggable: false,
		//        /**
		//    	 * 节点可否编辑
		//    	 * @property multiSelect
		//    	 * @type Boolean
		//    	 * @default false
		//    	 */
		//        editable:false,
		/**
		 * 右键弹出菜单，为下拉框的jQuery
		 * @property mouseMenu
		 * @type jQuery对象
		 * @default null
		 */
		mouseMenu: null,
		/**
		 * 异步加载的url，一旦设置这个，取代原生的json data
		 * @property ajaxUrl
		 * @type String
		 * @default ""
		 */
		ajaxUrl: "",
		/**
		 * 与ajaxUrl对应的请求参数，为一个{}对象
		 * @property reqParam
		 * @type js对象{}
		 * @default null
		 */
		reqParam: null,
		/**
		 * 静态数据源，格式：
		 * @property data
		 * @type js对象{}
		 * @default null
		 */
		data: null,
		/**
		 * 叶子节点点击后的响应事件
		 */
		onSelect: null
	};

	$.fn.tree.Constructor = Tree;

}(window.jQuery);
/*======================================================
************   mobile   ************
======================================================*/
!(function(){
if(!navigator.userAgent.match(/iPhone|iPod|Android|ios|iPad/i)){
	
	return;
}
$.fn.extend({
transform: function(transform) {
		for (var i = 0; i < this.length; i++) {
			var elStyle = this[i].style;
			elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
		}
		return this;
	},
transition: function(duration) {
		if (typeof duration !== 'string') {
			duration = duration + 'ms';
		}
		for (var i = 0; i < this.length; i++) {
			var elStyle = this[i].style;
			elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
		}
		return this;
	},
transitionEnd: function (callback) {
        var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
            i, j, dom = this;
        function fireCallBack(e) {
            /*jshint validthis:true */
            if (e.target !== this) return;
            callback.call(this, e);
            for (i = 0; i < events.length; i++) {
                dom.off(events[i], fireCallBack);
            }
        }
        if (callback) {
            for (i = 0; i < events.length; i++) {
                dom.on(events[i], fireCallBack);
            }
        }
        return this;
    }})
$.app = {}
var app=$.app;
app.btn = true;
app.openModal = function (modal) {
		//if(app.closebutton){
            modal = $(modal);
           
            var isModal = modal.hasClass('modal');
            if ($('.modal.modal-in:not(.modal-out)').length && app.params.modalStack && isModal) {
                app.modalStack.push(function () {
                    app.openModal(modal);
                });
                return;
            }
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
            if (isModal) {
                modal.show();
                modal.css({
                    marginTop: - Math.round(modal.outerHeight() / 2) + 'px'
                });
            }
        
            var overlay;
            if (!isLoginScreen && !isPickerModal) {
                if ($('.modal-overlay').length === 0 && !isPopup) {
                    $('body').append('<div class="modal-overlay"></div>');
                }
                if ($('.popup-overlay').length === 0 && isPopup) {
                    $('body').append('<div class="popup-overlay"></div>');
                }
                overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
            }
        
            //Make sure that styles are applied, trigger relayout;
            var clientLeft = modal[0].clientLeft;
        
            // Trugger open event
            modal.trigger('open');
        
            // Picker modal body class
            if (isPickerModal) {
                $('body').addClass('with-picker-modal');
                //$("html").addClass("hidden_srocll")
            }
        
            // Classes for transition in
            if (!isLoginScreen && !isPickerModal) overlay.addClass('modal-overlay-visible');
            modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
                if (modal.hasClass('modal-out')) modal.trigger('closed');
                else modal.trigger('opened');
            });
     //    }
            return true;
  };
 app.pickerModal = function (pickerModal, removeOnClose) {
            if (typeof removeOnClose === 'undefined') removeOnClose = false;
            if (typeof pickerModal === 'string' && pickerModal.indexOf('<') >= 0) {
                pickerModal = $(pickerModal);
                if (pickerModal.length > 0) {
                    if (removeOnClose) pickerModal.addClass('remove-on-close');
                    $('body').append(pickerModal[0]);
                }
                else return false; //nothing found
            }
            pickerModal = $(pickerModal);
            if (pickerModal.length === 0) return false;
//          pickerModal.show();
//          app.openModal(pickerModal);
// 			pickerModal.hide();
 	//		app.closeModal(pickerModal);
            return pickerModal[0];
 };
 app.closeModal = function (modal) {
 			
 			modal.find(".refer_input").blur();
 			modal.removeClass("refer_modal");
            modal = $(modal || '.modal-in');
            if (typeof modal !== 'undefined' && modal.length === 0) {
                return;
            }
            var isModal = modal.hasClass('modal');
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
        
            var removeOnClose = modal.hasClass('remove-on-close');
        
            var overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
            if (isPopup){
                if (modal.length === $('.popup.modal-in').length) {
                    overlay.removeClass('modal-overlay-visible');    
                }  
            }
            else if (!isPickerModal) {
                overlay.removeClass('modal-overlay-visible');
            }
        
            modal.trigger('close');
            
            // Picker modal body class
            if (isPickerModal) {
                $('body').removeClass('with-picker-modal');
                $("html").removeClass("hidden_srocll")
                $('body').addClass('picker-modal-closing');
            }
        
            if (!isPopover) {
                modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
                    if (modal.hasClass('modal-out')) modal.trigger('closed');
                    else modal.trigger('opened');
                    
                    if (isPickerModal) {
                        $('body').removeClass('picker-modal-closing');
                        $("html").removeClass("hidden_srocll")
                    }
                    if (isPopup || isLoginScreen || isPickerModal) {
                        //modal.removeClass('modal-out').hide();
                         modal.removeClass('modal-out');
                        if (removeOnClose && modal.length > 0) {
                            modal.remove();
                            
                        }
                    }
                    else {
                        modal.remove();
                       
                    }
                });
                if (isModal && app.params.modalStack) {
                	
                    app.modalStackClearQueue();
                }
            }
            else {
                modal.removeClass('modal-in modal-out').trigger('closed').hide();
                if (removeOnClose) {
                    modal.remove();
                   
                }
            }
            $(".refer_select").removeClass("refer_select");
            
            app.btn = true
            return true;
        };
app.accordionToggle = function (item) {
            item = $(item);
            if (item.length === 0) return;
            if (item.hasClass('accordion-item-expanded')) app.accordionClose(item);
            else app.accordionOpen(item);
        };
app.accordionOpen = function (item) {
    item = $(item);
    var list = item.parents('.accordion-list').eq(0);
    var content = item.children('.accordion-item-content');
    if (content.length === 0) content = item.find('.accordion-item-content');
    var expandedItem = list.length > 0 && item.parent().children('.accordion-item-expanded');
    
    if (expandedItem.length > 0) {
        app.accordionClose(expandedItem);
    }
    content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
        if (item.hasClass('accordion-item-expanded')) {
            content.transition(0);
            content.css('height', 'auto');
            var clientLeft = content[0].clientLeft;
            content.transition('');
            item.trigger('opened');
        }
        else {
            content.css('height', '');
            item.trigger('closed');
        }
    });
    item.trigger('open');
    item.addClass('accordion-item-expanded');
};
app.accordionClose = function (item) {
    item = $(item);
    var content = item.children('.accordion-item-content');
    if (content.length === 0) content = item.find('.accordion-item-content');
    item.removeClass('accordion-item-expanded');
    content.transition(0);
    content.css('height', content[0].scrollHeight + 'px');
    // Relayout
    var clientLeft = content[0].clientLeft;
    // Close
    content.transition('');
    content.css('height', '').transitionEnd(function () {
        if (item.hasClass('accordion-item-expanded')) {
            content.transition(0);
            content.css('height', 'auto');
            var clientLeft = content[0].clientLeft;
            content.transition('');
            item.trigger('opened');
        }
        else {
            content.css('height', '');
            item.trigger('closed');
        }
    });
    item.trigger('close');
};
app.support = (function () {
            var support = {
                touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
            };
        
            // Export object
            return support;

})();
app.mobile=(function () {
            var support = navigator.userAgent.match(/iPhone|iPod|Android|ios|iPad/i)?true:false
            // Export object
            return support;

})();

$.getTranslate = function (el, axis) {
    var matrix, curTransform, curStyle, transformMatrix;
    
        // automatic axis detection
        if (typeof axis === 'undefined') {
            axis = 'x';
        }
    
        curStyle = window.getComputedStyle(el, null);
        if (window.WebKitCSSMatrix) {
            // Some old versions of Webkit choke when 'none' is passed; pass
            // empty string instead in this case
            transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
        }
        else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
            matrix = transformMatrix.toString().split(',');
        }
    
        if (axis === 'x') {
            //Latest Chrome and webkits Fix
            if (window.WebKitCSSMatrix)
                curTransform = transformMatrix.m41;
            //Crazy IE10 Matrix
            else if (matrix.length === 16)
                curTransform = parseFloat(matrix[12]);
            //Normal Browsers
            else
                curTransform = parseFloat(matrix[4]);
        }
        if (axis === 'y') {
            //Latest Chrome and webkits Fix
            if (window.WebKitCSSMatrix)
                curTransform = transformMatrix.m42;
            //Crazy IE10 Matrix
            else if (matrix.length === 16)
                curTransform = parseFloat(matrix[13]);
            //Normal Browsers
            else
                curTransform = parseFloat(matrix[5]);
        }
        
        return curTransform || 0;
};
$.requestAnimationFrame = function (callback) {
        if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
        else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
        else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
        else {
            return window.setTimeout(callback, 1000 / 60);
        }
};
$.cancelAnimationFrame = function (id) {
        if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
        else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
        else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
        else {
            return window.clearTimeout(id);
        }  
};
$(document).on('touchend', '.refer_prev, .refer_next, .accordion-item-toggle, .close-picker', handleClicks);
$(document).on('focus', '.refer_input', handleClicks);
 function handleClicks(e) {
 	
 	var clicked = $(this);
 	if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
                    var accordionItem = clicked.parent('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('li');
                    app.accordionToggle(accordionItem);
     }
 	if (clicked.hasClass('close-picker')) {
        var pickerToClose = $('.picker-modal.modal-in');
        if (pickerToClose.length > 0) {
        	
            app.closeModal(pickerToClose);
        }
        else {
            pickerToClose = $('.popover.modal-in .picker-modal');
            if (pickerToClose.length > 0) {
                app.closeModal(pickerToClose.parents('.popover'));
            }
        }
        
    }
 	if (clicked.hasClass('refer_prev')) {
 		var tmpfield = $(".refer_select").parents(" fieldset[enable='true']")
 		
 		if(tmpfield.length > 0){
 			var tmpdate = tmpfield.prev("fieldset[enable='true']").find("[data-provide='datetimepicker'] div")
 			
 			if(tmpdate.length > 0){
 				tmpdate.triggerHandler("touchend");
 				
 				return;
 			}	
 			var tmpadd = tmpfield.prev("fieldset[enable='true']").find("input")
 			if(tmpadd)tmpadd.triggerHandler("touchend")
 		}
 	}
 	if (clicked.hasClass('refer_next')) {
 		var tmpfield = $(".refer_select").parents("fieldset[enable='true']")
 		if(tmpfield.length > 0){
 			var tmpdate = tmpfield.next("fieldset[enable='true']").find("[data-provide='datetimepicker'] div")
 			
 			if(tmpdate.length > 0 ){
 				tmpdate.triggerHandler("touchend");
 				console.log(tmpdate.find("div"))
 				return;
 			}	
 			var tmpadd = tmpfield.next("fieldset[enable='true']").find("input")
 			if(tmpadd)tmpadd.triggerHandler("toucend")
 		}
 	}
 	if (clicked.hasClass('refer_input')) {
 		
 		e.preventDefault();
 		var pickerToHigh = $('.picker-modal.modal-in');
 		pickerToHigh.addClass("refer_modal")
 		clicked.focus();
 	}	
 }
$(document).on("touchstart",function(e){
	if ($(e.target).parents('.picker-modal').length === 0  ){
		 if($(".modal-out").length > 0 ) app.closeModal($(".modal-out"));	
		 if($(".modal-in").length > 0) app.closeModal($(".modal-in"));
		 return;
	}else if($(e.target).parents('.est').length === 0 && $(e.target).parents('.toolbar-inner').length === 0 ){
		
		e.preventDefault();
		return;
	};
})
var Picker = function (params) {
    var p = this;
    var defaults = {
        updateValuesOnMomentum: false,
        updateValuesOnTouchmove: true,
        rotateEffect: false,
        momentumRatio: 7,
        freeMode: false,
        // Common settings
        scrollToInput: true,
        inputReadOnly: true,
        convertToPopover: true,
        onlyInPopover: false,
        toolbar: true,
       
        toolbarCloseText: 'DONE',
        toolbarTemplate: 
            '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left"><a href="#" class="link refer_prev">PREV</a><a href="#"   class="link refer_next">NEXT</a><input style="margin-left:30px" class="refer_input" type="text"></div>' +
                    '<div class="right">' +
                        '<a href="#" class="link close-picker">{{closeText}}</a>' +
                    '</div>' +
                '</div>' +
            '</div>'
    };
    
 	
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }
 
    p.touchEvents = {
            start: app.support.touch ? 'touchstart' : 'mousedown',
            move: app.support.touch ? 'touchmove' : 'mousemove',
            end: app.support.touch ? 'touchend' : 'mouseup'
    };
   
    p.params = params;
    
    p.cols = [];
    p.initialized = false;
    
    // Inline flag
    p.inline = p.params.container ? true : false;
	
    // 3D Transforms origin bug, only on safari
    var originBug = true; 
    //app.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !app.device.android;

    // Should be converted to popover
    function isPopover() {
        var toPopover = false;
        if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
        if (!p.inline && p.params.input) {
            if (p.params.onlyInPopover) toPopover = true;
            else {
                if (app.device.ios) {
                    toPopover = app.device.ipad ? true : false;
                }
                else {
                    if ($(window).width() >= 768) toPopover = true;
                }
            }
        } 
        return toPopover; 
    }
    function inPopover() {
        if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
        else return false;
    }

    // Value
    p.setValue = function (arrValues, transition) {
        var valueIndex = 0;
        for (var i = 0; i < p.cols.length; i++) {
            if (p.cols[i] && !p.cols[i].divider) {
                p.cols[i].setValue(arrValues[valueIndex], transition);
                valueIndex++;
            }
        }
    };
    p.updateValue = function () {
        var newValue = [];
        var newDisplayValue = [];
        for (var i = 0; i < p.cols.length; i++) {
            if (!p.cols[i].divider) {
                newValue.push(p.cols[i].value);
                newDisplayValue.push(p.cols[i].displayValue);
            }
        }
        if (newValue.indexOf(undefined) >= 0) {
            return;
        }
        p.value = newValue;
        p.displayValue = newDisplayValue;
        if (p.params.onChange) {
            p.params.onChange(p, p.value, p.displayValue);
        }
        if (p.input && p.input.length > 0) {
            $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
           // $(p.input).trigger('change');
        }
    };

    // Columns Handlers
    p.initPickerCol = function (colElement, updateItems) {
        var colContainer = $(colElement);
        var colIndex = colContainer.index();
        var col = p.cols[colIndex];
        if (col.divider) return;
        col.container = colContainer;
        col.wrapper = col.container.find('.picker-items-col-wrapper');
        col.items = col.wrapper.find('.picker-item');
        
        var i, j;
        var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
        col.replaceValues = function (values, displayValues) {
            col.destroyEvents();
            col.values = values;
            col.displayValues = displayValues;
            var newItemsHTML = p.columnHTML(col, true);
            col.wrapper.html(newItemsHTML);
            col.items = col.wrapper.find('.picker-item');
            col.calcSize();
            col.setValue(col.values[0], 0, true);
            col.initEvents();
        };
        col.calcSize = function () {
            if (p.params.rotateEffect) {
                col.container.removeClass('picker-items-col-absolute');
                if (!col.width) col.container.css({width:''});
            }
            var colWidth, colHeight;
            colWidth = 0;
            colHeight = col.container[0].offsetHeight;
            wrapperHeight = col.wrapper[0].offsetHeight;
            itemHeight = col.items[0].offsetHeight;
            itemsHeight = itemHeight * col.items.length;
            minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
            maxTranslate = colHeight / 2 - itemHeight / 2;    
            if (col.width) {
                colWidth = col.width;
                if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
                col.container.css({width: colWidth});
            }
            if (p.params.rotateEffect) {
                if (!col.width) {
                    col.items.each(function () {
                        var item = $(this);
                        item.css({width:'auto'});
                        colWidth = Math.max(colWidth, item[0].offsetWidth);
                        item.css({width:''});
                    });
                    col.container.css({width: (colWidth + 2) + 'px'});
                }
                col.container.addClass('picker-items-col-absolute');
            }
        };
        col.calcSize();
      
        col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);


        var activeIndex = 0;
        var animationFrameId;

        // Set Value Function
        col.setValue = function (newValue, transition, valueCallbacks) {
            if (typeof transition === 'undefined') transition = '';
            var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
            if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                return;
            }
            var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
            // Update wrapper
            col.wrapper.transition(transition);
            col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');
                
            // Watch items
            if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex ) {
                $.cancelAnimationFrame(animationFrameId);
                col.wrapper.transitionEnd(function(){
                    $.cancelAnimationFrame(animationFrameId);
                });
                updateDuringScroll();
            }

            // Update items
            col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
        };

        col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
            if (typeof translate === 'undefined') {
                translate = $.getTranslate(col.wrapper[0], 'y');
            }
            if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate)/itemHeight);
            if (activeIndex < 0) activeIndex = 0;
            if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
            var previousActiveIndex = col.activeIndex;
            col.activeIndex = activeIndex;
            col.wrapper.find('.picker-selected, .picker-after-selected, .picker-before-selected').removeClass('picker-selected picker-after-selected picker-before-selected');

            col.items.transition(transition);
            var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
            var prevItems = selectedItem.prevAll().addClass('picker-before-selected');
            var nextItems = selectedItem.nextAll().addClass('picker-after-selected');

            if (valueCallbacks || typeof valueCallbacks === 'undefined') {
                // Update values
                col.value = selectedItem.attr('data-picker-value');
                col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
                // On change callback
                if (previousActiveIndex !== activeIndex) {
                    if (col.onChange) {
                        col.onChange(p, col.value, col.displayValue);
                    }
                    p.updateValue();
                }
            }
                
            // Set 3D rotate effect
            if (!p.params.rotateEffect) {
                return;
            }
            var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
            
            col.items.each(function () {
                var item = $(this);
                var itemOffsetTop = item.index() * itemHeight;
                var translateOffset = maxTranslate - translate;
                var itemOffset = itemOffsetTop - translateOffset;
                var percentage = itemOffset / itemHeight;

                var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;
                
                var angle = (-18*percentage);
                if (angle > 180) angle = 180;
                if (angle < -180) angle = -180;
                // Far class
                if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');
                else item.removeClass('picker-item-far');
                // Set transform
                item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
            });
        };

        function updateDuringScroll() {
            animationFrameId = $.requestAnimationFrame(function () {
                col.updateItems(undefined, undefined, 0);
                updateDuringScroll();
            });
        }

        // Update items on init
        if (updateItems) col.updateItems(0, maxTranslate, 0);

        var allowItemClick = true;
        var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
        function handleTouchStart (e) {
        	
            if (isMoved || isTouched) return;
            e.preventDefault();
            isTouched = true;
            
            touchStartY = touchCurrentY = e.type === 'touchstart' ? e.originalEvent.targetTouches[0].pageY : e.pageY;
            touchStartTime = (new Date()).getTime();
            
            allowItemClick = true;
            startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
        }
        function handleTouchMove (e) {
            if (!isTouched) return;
            e.preventDefault();
            allowItemClick = false;
            touchCurrentY = e.type === 'touchmove' ? e.originalEvent.targetTouches[0].pageY : e.pageY;
            if (!isMoved) {
                // First move
                $.cancelAnimationFrame(animationFrameId);
                isMoved = true;
                startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                col.wrapper.transition(0);
            }
            e.preventDefault();

            var diff = touchCurrentY - touchStartY;
            currentTranslate = startTranslate + diff;
            returnTo = undefined;

            // Normalize translate
            if (currentTranslate < minTranslate) {
                currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                returnTo = 'min';
            }
            if (currentTranslate > maxTranslate) {
                currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                returnTo = 'max';
            }
            // Transform wrapper
            col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');

            // Update items
            col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);
            
            // Calc velocity
            velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
            velocityTime = (new Date()).getTime();
            prevTranslate = currentTranslate;
        }
        function handleTouchEnd (e) {
            if (!isTouched || !isMoved) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
            col.wrapper.transition('');
            if (returnTo) {
                if (returnTo === 'min') {
                    col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
                }
                else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
            }
            touchEndTime = new Date().getTime();
            var velocity, newTranslate;
            if (touchEndTime - touchStartTime > 300) {
                newTranslate = currentTranslate;
            }
            else {
                velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
            }

            newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

            // Active Index
            var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);

            // Normalize translate
            if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;

            // Transform wrapper
            col.wrapper.transform('translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');

            // Update items
            col.updateItems(activeIndex, newTranslate, '', true);

            // Watch items
            if (p.params.updateValuesOnMomentum) {
                updateDuringScroll();
                col.wrapper.transitionEnd(function(){
                    $.cancelAnimationFrame(animationFrameId);
                });
            }

            // Allow click
            setTimeout(function () {
                allowItemClick = true;
            }, 100);
        }

        function handleClick(e) {
            if (!allowItemClick) return;
            $.cancelAnimationFrame(animationFrameId);
            /*jshint validthis:true */
            var value = $(this).attr('data-picker-value');
            col.setValue(value);
        }

        col.initEvents = function (detach) {
            var method = detach ? 'off' : 'on';
            
            col.container[method](p.touchEvents.start, handleTouchStart);
            col.container[method](p.touchEvents.move, handleTouchMove);
            col.container[method](p.touchEvents.end, handleTouchEnd);
            col.items[method]('click', handleClick);
        };
        col.destroyEvents = function () {
            col.initEvents(true);
        };

        col.container[0].f7DestroyPickerCol = function () {
            col.destroyEvents();
        };

        col.initEvents();

    };
    p.destroyPickerCol = function (colContainer) {
        colContainer = $(colContainer);
        if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
    };
    // Resize cols
    function resizeCols() {
    	
        if (!p.opened) return;
        for (var i = 0; i < p.cols.length; i++) {
            if (!p.cols[i].divider) {
                p.cols[i].calcSize();
                p.cols[i].setValue(p.cols[i].value, 0, false);
            }
        }
    }
    $(window).on('resize', resizeCols);

    // HTML Layout
    p.columnHTML = function (col, onlyItems) {
        var columnItemsHTML = '';
        var columnHTML = '';
        if (col.divider) {
            columnHTML += '<div class="picker-items-col picker-items-col-divider ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
        }
        else {
            for (var j = 0; j < col.values.length; j++) {
                columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '">' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</div>';
            }
            columnHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';
        }
        return onlyItems ? columnItemsHTML : columnHTML;
    };
    p.layout = function () {
        var pickerHTML = '';
        var pickerClass = '';
        var i;
        var modalNumber = "modal" + Math.floor(Math.random() * (1000 + 1));
        p.cols = [];
        var colsHTML = '';
        for (i = 0; i < p.params.cols.length; i++) {
            var col = p.params.cols[i];
            colsHTML += p.columnHTML(p.params.cols[i]);
            p.cols.push(col);
        }
        pickerClass = 'picker-modal picker-columns '+ modalNumber + " " + (p.params.cssClass || '') + (p.params.rotateEffect ? ' picker-3d' : '');
        if(p.params.refer){
         pickerHTML =
            '<div class="' + (pickerClass) + '">' +
                (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '') +
                '<div class="picker-modal-inner picker-items">' +
                    p.params.refer+
                '</div>' +
            '</div>';	
        	
        }else{
        
        pickerHTML =
            '<div class="' + (pickerClass) + '">' +
                (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '') +
                '<div class="picker-modal-inner picker-items">' +
                    colsHTML +
                    '<div class="picker-center-highlight"></div>' +
                '</div>' +
            '</div>';
        }    
        p.modalNumber = "."+modalNumber
        p.pickerHTML = pickerHTML;    
    };

    // Input Events
    function openOnInput(e) {
    	
//     closeOnHTMLClick(e)
//     
//     if($(e.target).attr("load") == "ready"){  
//     	  var tmpbox = p.modalNumber
//   	  $(".picker-items").css('display',"none") 
//   	  
//   	  
//   	  
//   	  $(tmpbox).css("display","block")
//	      $(".picker-modal").show()
//	      app.openModal($(".picker-modal"))
//   	  resizeCols()
//   	  return;
//   	       	  
//     }
		
      // e.preventDefault();
       //$(".picker-modal").hide()
       
       if (p.opened) return;
       
       if(p.modalNumber){
       	  
       	  if($(".modal-out").length > 0 ) app.closeModal($(".modal-out"));	
       	  if($(".modal-in").length > 0) app.closeModal($(".modal-in"));
       	 
	      
       	  $(p.container).show()
       	  app.openModal($(p.container))
       	  //resizeCols()
       	  if(p.params.refer){
			
		  }else if(!p.datestart) {
	            // Init Events
	           
	           p.container.find('.picker-items-col').each(function () {
	                var updateItems = true;
	                if ((!p.initialized && p.params.value) || (p.initialized && p.value)) updateItems = false;
	                p.initPickerCol(this, updateItems);
	     	     });
	            
	            
	            // Set value
	            if (!p.initialized) {
	                if (p.params.value) {
	                    p.setValue(p.params.value, 0);
	                }
	            }
	            else {
	                if (p.value) p.setValue(p.value, 0);
	            }
          }
		  
		  p.input.parents(".input-group").addClass("refer_select")
		  p.datestart = true;
       	  p.opened = true;
          p.initialized = true;
       	  return
       }
        p.open(e);
   		$(e.target).attr("load","ready")
        if (p.params.scrollToInput && !isPopover()) {
            var pageContent = p.input.parents('.page-content');
            if (pageContent.length === 0) return;

            var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                newPaddingBottom;
            var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
            if (inputTop > pageHeight) {
                var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                if (scrollTop + pageHeight > pageScrollHeight) {
                    newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                    if (pageHeight === pageScrollHeight) {
                        newPaddingBottom = p.container.height();
                    }
                    pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                }
                pageContent.scrollTop(scrollTop, 300);
            }
        }
    }
    function closeOnHTMLClick(e) {
    	
        if (inPopover()) return;
        if (p.input && p.input.length > 0) {
        	
        	
           if (e.target !== p.input[0] || $(e.target).parents('.picker-modal').length === 0) {
           	p.close();
           }	
        }
        else {
        	
            if ($(e.target).parents('.picker-modal').length === 0) p.close();   
      }
    }

    if (p.params.input) {
        p.input = $(p.params.input);
        if (p.input.length > 0) {
            if (p.params.inputReadOnly) p.input.prop('readOnly', true);
            if (!p.inline) {
                p.input.on('touchend', openOnInput);    
            }
            if (p.params.inputReadOnly) {
                p.input.on('focus mousedown', function (e) {
                    e.preventDefault();
                });
            }
        }
            
    }
    
    

    // Open
    function onPickerClose() {
        p.opened = false;
        if (p.input && p.input.length > 0) p.input.parents('.page-content').css({'padding-bottom': ''});
        if (p.params.onClose) p.params.onClose(p);

        // Destroy events
//      p.container.find('.picker-items-col').each(function () {
//          p.destroyPickerCol(this);
//      });
    }

    p.opened = false;
    p.open = function (e) {
        var toPopover = isPopover();
		
        if (!p.opened) {

            // Layout
            p.layout();

            // Append
            if (toPopover) {
                p.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                p.popover = app.popover(p.pickerHTML, p.params.input, true);
                p.container = $(p.popover).find('.picker-modal');
                $(p.popover).on('close', function () {
                    onPickerClose();
                });
            }
            else if (p.inline) {
                p.container = $(p.pickerHTML);
                p.container.addClass('picker-modal-inline');
                $(p.params.container).append(p.container);
            }
            else  {
				
               p.container = $(app.pickerModal(p.pickerHTML));
              // p.container = p.pickerHTML
                $(p.container)
                .on('close', function () {
                    onPickerClose();
                });
            }

            // Store picker instance
           p.container[0].f7Picker = p;
		  
        }

        // Set flag
        p.opened = false;
        p.initialized = false;

        if (p.params.onOpen) p.params.onOpen(p);
    };

    // Close
    p.close = function () {
    	
        if (!p.opened || p.inline) return;
        if (inPopover()) {
            app.closeModal(p.popover);
            return;
        }
        else {
        	
            app.closeModal(p.container);
            return;
        }
    };

    // Destroy
    p.destroy = function () {
        p.close();
        if (p.params.input && p.input.length > 0) {
            p.input.off('touchend focus', openOnInput);
        }
        //$('html').off('click', closeOnHTMLClick);
        $(window).off('resize', resizeCols);
    };

    if (p.inline) {
        p.open();
    }    
	p.input.triggerHandler("touchend")
    return p;

};
var picker_mobile = function (params) {
	
    return new Picker(params);
};
$.datepicker_mobile = function(params){
	    var tmpv,today;
		if(params.data){
			today = params.data.split("-")
			tmpv = [today[0], today[1], today[2]]
		}else{
			today = new Date();
			tmpv = [today.getMonth(), today.getDate(), today.getFullYear()]
		}
		
        
        
        $('#picker-date-container').html("")
        picker_mobile({
            input:params.input,
            convertToPopover:false,
            cssClass:params.cssClass,
            toolbar:true,
            refer:params.refer,
            //container: '#picker-date-container',
            
            rotateEffect: true,
         
            value: tmpv,
         
            onChange: function (picker, values, displayValues) {
                var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
                if (values[1] > daysInMonth) {
                    picker.cols[1].setValue(daysInMonth);
                }
            },
         
            formatValue: function (p, values, displayValues) {
                return displayValues[0] + ' ' + values[1] + ', ' + values[2] ;
            },
         
            cols: [
                // Months
                {
                    values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                    displayValues: ('January February March April May June July August September October November December').split(' '),
                    width:140,
                    textAlign: 'left'
                },
                // Days
                {
                    values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                    width:50
                },
                // Years
                {
                    values: (function () {
                        var arr = [];
                        for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                        return arr;
                    })(),
                    width:100
                }
              ]  
        });        
        
}

			
	
		
})();
!(function(){
	
	$.swtich_mobile = function(){
		if($.app){
		$(".mobile_swtich").wrap("<label class='label-switch'></label>").after("<div class='checkbox'></div>")
		}else{
		$(".mobile_swtich").css("display","block")
		}
	}
	$.swtich_mobile(); 
	
})()

!(function(){
	$.extend({
		showLoading:function(opt){
			if(!opt){
				var opt = {}				
			}
			var tmpshade = "<div class='loading_shade'></div>"
			if(opt.shadecss){
				tmpshade = "<div class='loading_shade "+opt.shadecss+"'></div>"
			}
			
			
			
			if(opt.loadingpic){			
				tmpshade += "<div class='loading_pic'></div>"
			}
			
			if(opt.parentel){
				
				$(opt.parentel).append(tmpshade)

			}else{
				$("body").append(tmpshade)
				
			}
			
			
		},
		hideLoadding:function(){
			$(".loading_shade").remove();
			$(".loading_pic").remove();
		}
	})
})()
/*!
 * jQuery twitter bootstrap wizard plugin
 * Examples and documentation at: http://github.com/VinceG/twitter-bootstrap-wizard
 * version 1.0
 * Requires jQuery v1.3.2 or later
 * Supports Bootstrap 2.2.x, 2.3.x, 3.0
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Vadim Vincent Gabriel (http://vadimg.com), Jason Gill (www.gilluminate.com)
 */
;(function($) {
var bootstrapWizardCreate = function(element, options) {
	var element = $(element);
	var obj = this;
	
	// selector skips any 'li' elements that do not contain a child with a tab data-toggle
	var baseItemSelector = 'li:has([data-toggle="tab"])';
	var historyStack = [];

	// Merge options with defaults
	var $settings = $.extend({}, $.fn.bootstrapWizard.defaults, options);
	var $activeTab = null;
	var $navigation = null;
	
	this.rebindClick = function(selector, fn)
	{
		selector.unbind('click', fn).bind('click', fn);
	}

	this.fixNavigationButtons = function() {
		// Get the current active tab
		if(!$activeTab.length) {
			// Select first one
			$navigation.find('a:first').tab('show');
			$activeTab = $navigation.find(baseItemSelector + ':first');
		}

		// See if we're currently in the first/last then disable the previous and last buttons
		$($settings.previousSelector, element).toggleClass('disabled', (obj.firstIndex() >= obj.currentIndex()));
		$($settings.nextSelector, element).toggleClass('disabled', (obj.currentIndex() >= obj.navigationLength()));
		$($settings.nextSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));
		$($settings.lastSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));
		$($settings.finishSelector, element).toggleClass('hidden', (obj.currentIndex() < obj.navigationLength()));
		$($settings.backSelector, element).toggleClass('disabled', (historyStack.length == 0));
		$($settings.backSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));

		// We are unbinding and rebinding to ensure single firing and no double-click errors
		obj.rebindClick($($settings.nextSelector, element), obj.next);
		obj.rebindClick($($settings.previousSelector, element), obj.previous);
		obj.rebindClick($($settings.lastSelector, element), obj.last);
		obj.rebindClick($($settings.firstSelector, element), obj.first);
		obj.rebindClick($($settings.finishSelector, element), obj.finish);
		obj.rebindClick($($settings.backSelector, element), obj.back);

		if($settings.onTabShow && typeof $settings.onTabShow === 'function' && $settings.onTabShow($activeTab, $navigation, obj.currentIndex())===false){
			return false;
		}
	};

	this.next = function(e) {
		// If we clicked the last then dont activate this
		if(element.hasClass('last')) {
			return false;
		}

		if($settings.onNext && typeof $settings.onNext === 'function' && $settings.onNext($activeTab, $navigation, obj.nextIndex())===false){
			return false;
		}

		var formerIndex = obj.currentIndex();
		$index = obj.nextIndex();

	  // Did we click the last button
		if($index > obj.navigationLength()) {
		} else {
		  historyStack.push(formerIndex);
		  $navigation.find(baseItemSelector + ':eq(' + $index + ') a').tab('show');
		}
	};

	this.previous = function(e) {
		// If we clicked the first then dont activate this
		if(element.hasClass('first')) {
			return false;
		}

		if($settings.onPrevious && typeof $settings.onPrevious === 'function' && $settings.onPrevious($activeTab, $navigation, obj.previousIndex())===false){
			return false;
		}

		var formerIndex = obj.currentIndex();
		$index = obj.previousIndex();

		if($index < 0) {
		} else {
		  historyStack.push(formerIndex);
		  $navigation.find(baseItemSelector + ':eq(' + $index + ') a').tab('show');
		}
	};

	this.first = function (e) {
		if($settings.onFirst && typeof $settings.onFirst === 'function' && $settings.onFirst($activeTab, $navigation, obj.firstIndex())===false){
			return false;
		}

		// If the element is disabled then we won't do anything
		if(element.hasClass('disabled')) {
			return false;
		}

		historyStack.push(obj.currentIndex());
		$navigation.find(baseItemSelector + ':eq(0) a').tab('show');
	};

	this.last = function(e) {
		if($settings.onLast && typeof $settings.onLast === 'function' && $settings.onLast($activeTab, $navigation, obj.lastIndex())===false){
			return false;
		}

		// If the element is disabled then we won't do anything
		if(element.hasClass('disabled')) {
			return false;
		}

		historyStack.push(obj.currentIndex());
		$navigation.find(baseItemSelector + ':eq(' + obj.navigationLength() + ') a').tab('show');
	};

	this.finish = function (e) {
	  if ($settings.onFinish && typeof $settings.onFinish === 'function') {
	    $settings.onFinish($activeTab, $navigation, obj.lastIndex());
	  }
	};

	this.back = function () {
	  if (historyStack.length == 0) {
	    return null;
	  }

	  var formerIndex = historyStack.pop();
	  if ($settings.onBack && typeof $settings.onBack === 'function' && $settings.onBack($activeTab, $navigation, formerIndex) === false) {
	    historyStack.push(formerIndex);
	    return false;
	  }

	  element.find(baseItemSelector + ':eq(' + formerIndex + ') a').tab('show');
	};

	this.currentIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab);
	};

	this.firstIndex = function() {
		return 0;
	};

	this.lastIndex = function() {
		return obj.navigationLength();
	};
	this.getIndex = function(e) {
		return $navigation.find(baseItemSelector).index(e);
	};
	this.nextIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab) + 1;
	};
	this.previousIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab) - 1;
	};
	this.navigationLength = function() {
		return $navigation.find(baseItemSelector).length - 1;
	};
	this.activeTab = function() {
		return $activeTab;
	};
	this.nextTab = function() {
		return $navigation.find(baseItemSelector + ':eq('+(obj.currentIndex()+1)+')').length ? $navigation.find(baseItemSelector + ':eq('+(obj.currentIndex()+1)+')') : null;
	};
	this.previousTab = function() {
		if(obj.currentIndex() <= 0) {
			return null;
		}
		return $navigation.find(baseItemSelector + ':eq('+parseInt(obj.currentIndex()-1)+')');
	};
	this.show = function(index) {
	  var tabToShow = isNaN(index) ? 
      element.find(baseItemSelector + ' a[href=#' + index + ']') : 
      element.find(baseItemSelector + ':eq(' + index + ') a');
	  if (tabToShow.length > 0) {
	    historyStack.push(obj.currentIndex());
	    tabToShow.tab('show');
	  }
	};
	this.disable = function (index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').addClass('disabled');
	};
	this.enable = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').removeClass('disabled');
	};
	this.hide = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').hide();
	};
	this.display = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').show();
	};
	this.remove = function(args) {
		var $index = args[0];
		var $removeTabPane = typeof args[1] != 'undefined' ? args[1] : false;
		var $item = $navigation.find(baseItemSelector + ':eq('+$index+')');

		// Remove the tab pane first if needed
		if($removeTabPane) {
			var $href = $item.find('a').attr('href');
			$($href).remove();
		}

		// Remove menu item
		$item.remove();
	};
	
	var innerTabClick = function (e) {
		// Get the index of the clicked tab
		var $ul = $navigation.find(baseItemSelector);
		var clickedIndex = $ul.index($(e.currentTarget).parent(baseItemSelector));
		var $clickedTab = $( $ul[clickedIndex] );
		if($settings.onTabClick && typeof $settings.onTabClick === 'function' && $settings.onTabClick($activeTab, $navigation, obj.currentIndex(), clickedIndex, $clickedTab)===false){
		    return false;
		}
	};
	
	var innerTabShown = function (e) {  // use shown instead of show to help prevent double firing
		$element = $(e.target).parent();
		var nextTab = $navigation.find(baseItemSelector).index($element);

		// If it's disabled then do not change
		if($element.hasClass('disabled')) {
			return false;
		}

		if($settings.onTabChange && typeof $settings.onTabChange === 'function' && $settings.onTabChange($activeTab, $navigation, obj.currentIndex(), nextTab)===false){
				return false;
		}

		$activeTab = $element; // activated tab
		obj.fixNavigationButtons();
	};
	
	this.resetWizard = function() {
		
		// remove the existing handlers
		$('a[data-toggle="tab"]', $navigation).off('click', innerTabClick);
		$('a[data-toggle="tab"]', $navigation).off('shown shown.bs.tab', innerTabShown);
		
		// reset elements based on current state of the DOM
		$navigation = element.find('ul:first', element);
		$activeTab = $navigation.find(baseItemSelector + '.active', element);
		
		// re-add handlers
		$('a[data-toggle="tab"]', $navigation).on('click', innerTabClick);
		$('a[data-toggle="tab"]', $navigation).on('shown shown.bs.tab', innerTabShown);
		
		obj.fixNavigationButtons();
	};

	$navigation = element.find('ul:first', element);
	$activeTab = $navigation.find(baseItemSelector + '.active', element);

	if(!$navigation.hasClass($settings.tabClass)) {
		$navigation.addClass($settings.tabClass);
	}

	// Load onInit
	if($settings.onInit && typeof $settings.onInit === 'function'){
		$settings.onInit($activeTab, $navigation, 0);
	}

	// Load onShow
	if($settings.onShow && typeof $settings.onShow === 'function'){
		$settings.onShow($activeTab, $navigation, obj.nextIndex());
	}

	$('a[data-toggle="tab"]', $navigation).on('click', innerTabClick);

	// attach to both shown and shown.bs.tab to support Bootstrap versions 2.3.2 and 3.0.0
	$('a[data-toggle="tab"]', $navigation).on('shown shown.bs.tab', innerTabShown);
};
$.fn.bootstrapWizard = function(options) {
	//expose methods
	if (typeof options == 'string') {
		var args = Array.prototype.slice.call(arguments, 1)
		if(args.length === 1) {
			args.toString();
		}
		return this.data('bootstrapWizard')[options](args);
	}
	return this.each(function(index){
		var element = $(this);
		// Return early if this element already has a plugin instance
		if (element.data('bootstrapWizard')) return;
		// pass options to plugin constructor
		var wizard = new bootstrapWizardCreate(element, options);
		// Store plugin object in this element's data
		element.data('bootstrapWizard', wizard);
		// and then trigger initial change
		wizard.fixNavigationButtons();
	});
};

// expose options
$.fn.bootstrapWizard.defaults = {
	tabClass:         'nav nav-pills',
	nextSelector:     '.wizard li.next',
	previousSelector: '.wizard li.previous',
	firstSelector:    '.wizard li.first',
	lastSelector:     '.wizard li.last',
  finishSelector:   '.wizard li.finish',
	backSelector:     '.wizard li.back',
	onShow:           null,
	onInit:           null,
	onNext:           null,
	onPrevious:       null,
	onLast:           null,
	onFirst:          null,
  onFinish:         null,
  onBack:           null,
	onTabChange:      null, 
	onTabClick:       null,
	onTabShow:        null
};

})(jQuery);
