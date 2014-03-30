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

function viewRestaurants() {
	Restaurants.load(function (err, restaurants) {
		$('.items').replaceWith(
			$('<section>')
				.addClass('items')
				.append(restaurants.map(function (restaurant) {
					return restaurant.$el.click(function () {
						viewMenuItems(restaurant);
					});
				}))
		);
		refreshView();
	});
}

function viewMenuItems(restaurant) {
	MenuItems.load(restaurant, function (err, items) {
		$('.items').replaceWith(
			$('<section>')
				.addClass('items')
				.append(items.map(function (item) {
					return item.$el.click(function () {
						viewMenuItemOptions(restaurant, item);
					});
				}))
		);
		refreshView();
	});
}

function viewMenuItemOptions(restaurant, item) {
	MenuItemOptions.load(restaurant, item, function (err, options) {
		$('.items').replaceWith(
			$('<section>')
				.addClass('items')
				.addClass('drag')
				.append($('<div>')
					.addClass('pad')
					.append($('<h1>')
						.text('Order options')
					).append($('<p>')
						.text('Swipe right to add, left to remove.')
					)
				).append($('<div>')
					.addClass('content-items')
					.append(options.map(function (opt) {
						return opt.$el;
					}))
				)
				.append($('<a>')
					.addClass('button center')
					.text('Save Order!')
				)
		);
		refreshView();
	});
}

viewRestaurants();
