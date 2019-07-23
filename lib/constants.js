const cars = require('../mockup.json');
const dataStatus = {
	status: true,
	time: new Date()
}

module.exports = {
	defaultItemsInOnePage: 10,
	defaultSkipItems: 0,
	defaultFields: ['id','latitude', 'longitude', 'is_on_trip', 'location_name'],
	availableOrderFields : ['id', 'is_on_trip', 'location_name'],
	availableOrderTypes: ['asc', 'desc'],
	defaultSearchRadiusInKm: 5,
	cars,
	dataStatus
};