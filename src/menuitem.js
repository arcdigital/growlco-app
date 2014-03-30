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
		.attr('href', '#')
		.attr('data-id', r.id)
		.append($('<div>')
			.addClass('restaurant')
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
				.append($('<p>').text(r.description))
			)
		);

	return this;
}

module.exports = {
	MenuItems: MenuItems,
	MenuItem: MenuItem
};
