/*
New order:
- Select Canes (next is implied)
- Select Box (next is implied)
- Swipe left on coleslaw
- Swipe right on toast to increment
- Next
*/

'use strict';

var extend = require('extend');
var { Restaurant, Restaurants } = require('./restaurant');
var { MenuItem, MenuItems } = require('./menuitem');
var { MenuItemOption, MenuItemOptions } = require('./menuitemoption');

Restaurants.load(function (err, rs) {
	$('.restaurants')
		.empty()
		.attr('data-controller', 'Restaurants')
		.append(rs.map(function (r) {
			return r.$el.click(function () {
				MenuItems.load(r, function (err, items) {
					$('.restaurants')
						.empty()
						.attr('data-controller', 'MenuItems')
						.append(items.map(function (item) {
							return item.$el.click(function () {
								MenuItemOptions.load(r, item, function (err, options) {
									$('.restaurants')
										.empty()
										.attr('data-contoller', 'MenuItemOptions')
										.append(options.map(function (opt) {
											return opt.$el;
										}));
								});
							});
						}));
				});
			});
		}));
});


