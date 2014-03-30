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
					var option = new MenuItemOption(el);
					MenuItemOptions.set(option.id, option);
					return option;
				}));
			});
		}
	};

}());

function MenuItemOption(option) {
	extend(this, option);

	this.$el = $('<a>')
		.attr('href', '#')
		.attr('data-id', option.id)
		.append($('<div>')
			.addClass('restaurant')
			.append($('<div>')
				.addClass('logo')
				.append($('<img>')
					.attr({
						src: 'img/restaurants/menuitems/' + option.picture_url,
						alt: option.name
					})
				)
			)
			.append($('<div>')
				.addClass('info')
				.append($('<h2>').text(option.name))
				.append($('<p>').text(option.description))
			)
		);

	return this;
}

module.exports = {
	MenuItemOptions: MenuItemOptions,
	MenuItemOption: MenuItemOption
};
