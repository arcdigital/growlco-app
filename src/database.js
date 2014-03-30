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
								default: 'Y'
							},
							128: {
								name: 'Coleslaw',
								type: 'Boolean',
								default: 'Y',
								picture_url: 'coleslaw.png'
							},
							136: {
								name: 'Cane\'s Sauce',
								type: 'Integer',
								default: 1
							},
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
