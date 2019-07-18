'use strict';

const data = require('../mockup.json');

module.exports = {
	defaultPage: 0,
	defaultItemsInOnePage: 10,
	defaultSkipItems: 0,
	defaultFields: ['id','latitude', 'longitude', 'is_on_trip'],
	defaultSearchRadiusInKm: 5,
	data
};