(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

function isPlainObject(obj) {
	if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval)
		return false;

	var has_own_constructor = hasOwn.call(obj, 'constructor');
	var has_is_property_of_method = hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !has_own_constructor && !has_is_property_of_method)
		return false;

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for ( key in obj ) {}

	return key === undefined || hasOwn.call( obj, key );
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone,
	    target = arguments[0] || {},
	    i = 1,
	    length = arguments.length,
	    deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && typeof target !== "function") {
		target = {};
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];

					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

},{}],2:[function(require,module,exports){
var extend = require('extend');

module.exports = (function () {

	'use strict';

	var data = {
		restaurants: {
			42: {
				name: 'Raising Cane\'s',
				picture_url: 'canes.png',
				description: 'Delicious chicken made with love.',
				menuitems: {
					1: {
						name: 'The Box Combo',
						picture_url: 'thebox.png',
						options: {
							17: {
								name: 'Chicken Fingers',
								type: 'Integer',
								default: 4,
								picture_url: 'chicken.png'
							},
							93: {
								name: 'Fries',
								type: 'Boolean',
								default: 'Y',
								picture_url: 'fries.png'
							},
							128: {
								name: 'Coleslaw',
								type: 'Boolean',
								default: 'Y',
								picture_url: 'coleslaw.png'
							},
							/*136: {
								name: 'Cane\'s Sauce',
								type: 'Integer',
								default: 1
							},*/
							144: {
								name: 'Texas Toast',
								type: 'Integer',
								default: 1,
								picture_url: 'toast.jpg'
							},
							149: {
								name: 'Soda',
								type: 'Boolean',
								default: 'Y',
								picture_url: 'soda.png'
							}
						}
					},
					32: {
						name: 'The 3 Finger Combo',
						picture_url: '3finger.png',
						//description: 'The perfect 3 finger stuff'
					},
					51: {
						name: 'The Caniac Combo',
						picture_url: 'caniaccombo.png',
						//description: 'The Perfect Caniac Combo'
					},
					54: {
						name: 'The Sandwich Combo',
						picture_url: 'sandwichcombo.png',
						//description: 'Sandwich Box shit'
					}
				}
			},
			69: {
				name: 'Piada Street Food',
				picture_url: 'piada.png',
				description: 'If you\'re Italian, you\'ll love this.'
			},
			144: {
				name: 'Chipotle Mexican Grill',
				picture_url: 'chipotle.png',
				description: 'It\'s not really Mexican food.'
			},
			244: {
				name: 'Jimmy Johns',
				picture_url: 'jimmyjohns.png',
				description: 'The best gormet sandwiches.'
			},
			394: {
				name: 'Domino\'s Pizza',
				picture_url: 'dominoes.png',
				description: 'The best pizza in the world.'
			}
		}
	};

	function lookup(context, path) {
		if (path.length > 0) {
			if (context[path[0]]) {
				//console.log(context[path[0]]);
				//console.log('match', lookup(context[path[0]], path.slice(1)));
				var obj = lookup(context[path[0]], path.slice(1));
				return Object.keys(obj).map(function (key) {
					return extend({ id: key }, obj[key]);
				});
			} else if (context[path[0] + 's']) {
				//console.log(context[path[0] + 's']);
				//console.log('pluralized', lookup(context[path[0] + 's'], path.slice(1)));
				return lookup(context[path[0] + 's'], path.slice(1));
			} else {
				return {};
			}
		} else {
			return context;
		}
	}

	function get(path, cb) {
		var fragments = path.split('/').filter(function (x) { return x.length > 0 });
		var response = lookup(data, fragments);
		console.log(path, response);
		cb(null, response);
	}

	return {
		get: get
	};

}());

},{"extend":1}],3:[function(require,module,exports){
"use strict";
var __moduleName = "index";
'use strict';
var extend = require('extend');
var $__0 = require('./restaurant'),
    Restaurant = $__0.Restaurant,
    Restaurants = $__0.Restaurants;
var $__0 = require('./menuitem'),
    MenuItem = $__0.MenuItem,
    MenuItems = $__0.MenuItems;
var $__0 = require('./menuitemoption'),
    MenuItemOption = $__0.MenuItemOption,
    MenuItemOptions = $__0.MenuItemOptions;
function viewRestaurants() {
  Restaurants.load(function(err, restaurants) {
    $('.items').replaceWith($('<section>').addClass('items').append(restaurants.map(function(restaurant) {
      return restaurant.$el.click(function() {
        viewMenuItems(restaurant);
      });
    })));
    refreshView();
  });
}
function viewMenuItems(restaurant) {
  MenuItems.load(restaurant, function(err, items) {
    $('.items').replaceWith($('<section>').addClass('items').append(items.map(function(item) {
      return item.$el.click(function() {
        viewMenuItemOptions(restaurant, item);
      });
    })));
    refreshView();
  });
}
function viewMenuItemOptions(restaurant, item) {
  MenuItemOptions.load(restaurant, item, function(err, options) {
    $('.items').replaceWith($('<section>').addClass('items').addClass('drag').append($('<div>').addClass('pad').append($('<h1>').text('Order options')).append($('<p>').text('Swipe right to add, left to remove.'))).append($('<div>').addClass('content-items').append(options.map(function(opt) {
      return opt.$el;
    }))).append($('<a>').attr('href', 'confirm.html').addClass('button center').text('Save Order!')));
    refreshView();
  });
}
viewRestaurants();

},{"./menuitem":4,"./menuitemoption":5,"./restaurant":6,"extend":1}],4:[function(require,module,exports){
'use strict';

var extend = require('extend');
var db = require('./database');

var MenuItems = (function () {

	var els = {};

	function clear() {
		els = {};
	}

	return {
		get: function (id) {
			return els[id];
		},
		set: function (id, val) {
			els[id] = val;
		},
		clear: clear,
		load: function (restaurant, cb) {

			var url = [
				'/restaurant/',
				restaurant.id,
				'/menuitems'
			].join('');

			db.get(url, function (err, data) {
				clear();

				cb(err, err ? null : data.map(function (el) {
					var r = new MenuItem(el);
					MenuItems.set(r.id, r);
					return r;
				}));
			});
		}
	};

}());

function MenuItem(r) {
	extend(this, r);

	this.$el = $('<a>')
		//.attr('href', '#')
		.attr('data-id', r.id)
		.append($('<div>')
			.addClass('item')
			.append($('<div>')
				.addClass('logo')
				.append($('<img>')
					.attr({
						src: 'img/restaurants/menuitems/' + r.picture_url,
						alt: r.name
					})
				)
			)
			.append($('<div>')
				.addClass('info')
				.append($('<h2>').text(r.name))
				.append($('<p>').text(r.description || ''))
			)
		);

	return this;
}

module.exports = {
	MenuItems: MenuItems,
	MenuItem: MenuItem
};

},{"./database":2,"extend":1}],5:[function(require,module,exports){
'use strict';

var extend = require('extend');
var db = require('./database');

var MenuItemOptions = (function () {

	var els = {};

	function clear() {
		els = {};
	}

	return {
		get: function (id) {
			return els[id];
		},
		set: function (id, val) {
			els[id] = val;
		},
		clear: clear,
		load: function (restaurant, menuitem, cb) {

			var url = [
				'/restaurant/',
				restaurant.id,
				'/menuitem/',
				menuitem.id,
				'/options'
			].join('');

			db.get(url, function (err, data) {
				clear();

				cb(err, err ? null : data.map(function (el) {
					var option = new MenuItemOption(restaurant, menuitem, el);
					MenuItemOptions.set(option.id, option);
					return option;
				}));
			});
		}
	};

}());

var TypeClasses = {
	'Boolean': ['yn', 'yn'],
	'Integer': ['amount', 'quantity']
};

function MenuItemOption(restaurant, menuitem, option) {
	extend(this, option);

console.log(option);
	this.$el = $('<a>')
		//.attr('href', '#')
		.attr('data-id', option.id)
		.addClass(TypeClasses[option.type][0])
		.append($('<div>')
			.addClass('item')
			.addClass('dragend-page')
			.append($('<div>')
				.addClass('logo')
				.append($('<img>')
					.attr({
						src: [
							'img',
							'restaurants',
							restaurant.id,
							'menuitems',
							menuitem.id,
							'options',
							option.picture_url
						].join('/'),
						alt: option.name
					})
				)
			)
			.append($('<div>')
				.addClass('info')
				.append($('<h2>')
					.text(option.name)
					.append($('<span>')
						.addClass(TypeClasses[option.type][1])
						.text(option.default)
					)
				)
			)
		);

	return this;
}

module.exports = {
	MenuItemOptions: MenuItemOptions,
	MenuItemOption: MenuItemOption
};

},{"./database":2,"extend":1}],6:[function(require,module,exports){
'use strict';

var extend = require('extend');
var db = require('./database');

var Restaurants = (function () {

	var els = {};

	function clear() {
		els = {};
	}

	return {
		get: function (id) {
			return els[id];
		},
		set: function (id, val) {
			els[id] = val;
		},
		clear: clear,
		load: function (cb) {

			var url = '/restaurants';

			db.get(url, function (err, data) {
				clear();

				cb(err, err ? null : data.map(function (el) {
					var r = new Restaurant(el);
					Restaurants.set(r.id, r);
					return r;
				}));
			});
		}
	};

}());

function Restaurant(r) {
	extend(this, r);

	this.$el = $('<a>')
		.attr('href', '#')
		.attr('data-id', r.id)
		.append($('<div>')
			.addClass('item')
			.append($('<div>')
				.addClass('logo')
				.append($('<img>')
					.attr({
						src: 'img/restaurants/' + r.picture_url,
						alt: r.name
					})
				)
			)
			.append($('<div>')
				.addClass('info')
				.append($('<h2>').text(r.name))
				.append($('<p>').text(r.description))
			)
		);

	return this;
}

module.exports = {
	Restaurants: Restaurants,
	Restaurant: Restaurant
};

},{"./database":2,"extend":1}]},{},[3])