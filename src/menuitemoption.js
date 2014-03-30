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
