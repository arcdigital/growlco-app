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
				//.append($('<p>').text(r.description))
			)
		);

	return this;
}

module.exports = {
	Restaurants: Restaurants,
	Restaurant: Restaurant
};
