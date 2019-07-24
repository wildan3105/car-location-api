const { cars, defaultSearchRadiusInKm, badRequest } = require('../lib/constants');
const { isValidCoordinates, isJson } = require('../helper');
const { order } = require('../lib/filter');
const geolib = require('geolib');

module.exports = (query) => {

	if(!isJson(query.coordinates)) {
		return badRequest;
	}

	let data;

	const from = JSON.parse(query.coordinates);
	const radius = JSON.parse(query.radius) || defaultSearchRadiusInKm * 1000;

	if(!isValidCoordinates(from)) {
		return badRequest;
	}

	if(radius < 0) {
		return badRequest;
	}

	data = cars.data.filter(f => geolib.isPointWithinRadius(
		{
			latitude: f.latitude,
			longitude: f.longitude
		},
		from,
		radius
	) == true);

	data.forEach(d => {
		d['distance'] = geolib.getPreciseDistance(from, { latitude: d['latitude'], longitude: d['longitude'] })
		d['distance_unit'] = 'meters'
	})

	const orderData = order(data, 'distance', 'asc');

	return orderData;
}