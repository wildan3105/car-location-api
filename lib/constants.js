const cars = require('../mockup.json');

module.exports = {
	cars,
	defaultItemsInOnePage: 10,
	defaultSkipItems: 0,
	availableOrderFields : ['id', 'is_on_trip', 'location_name', 'distance'],
	availableOrderTypes: ['asc', 'desc'],
	defaultSearchRadiusInMeters: 5000,
	allowedDistanceUnits: ['km', 'meter'],
	latitudeFormats: ['lat', 'latitude'],
	longitudeFormats: ['lon', 'lng', 'longitude'],
	latitudeLimits: {
		min: -90,
		max: 90
	},
	longitudeLimits: {
		min: -180,
		max: 180
	},
	dataStatus: {
		status: true,
		timestamp: Date.now()
	},	
	badRequest: {
		data: [],
		status: 400
	},
	notFound: {
		data: [],
		status: 404
	},
	wrongRequest: {
		data: []
	}
};