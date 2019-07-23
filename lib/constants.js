const cars = require('../mockup.json');
const dataStatus = {
	status: true,
	time: Date.now()
}

module.exports = {
	defaultItemsInOnePage: 10,
	defaultSkipItems: 0,
	defaultFields: ['id','latitude', 'longitude', 'is_on_trip', 'location_name'],
	availableOrderFields : ['id', 'is_on_trip', 'location_name'],
	availableOrderTypes: ['asc', 'desc'],
	defaultSearchRadiusInKm: 5,
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
	cars,
	dataStatus,
	badRequest: {
		data: [],
		status: 400
	},
	notFound: {
		data: [],
		status: 404
	}
};