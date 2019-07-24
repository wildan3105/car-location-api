const { cars, defaultSearchRadiusInKm, badRequest, allowedDistanceUnits } = require('../lib/constants');
const { isValidCoordinates, isJson } = require('../helper');
const { order } = require('../lib/filter');
const geolib = require('geolib');

module.exports = (query) => {

	if(!isJson(query.coordinates)) {
		return badRequest;
	}

	const radius = query.radius == undefined ? defaultSearchRadiusInKm * 1000 : query.radius;
	const distanceUnit = query.unit == undefined ? 'meter' : query.unit;
	const from = JSON.parse(query.coordinates);

	if(!isValidCoordinates(from)) {
		return badRequest;
	}

	if(radius < 0 || isNaN(Number(radius))) {
		return badRequest;
	}

	if(allowedDistanceUnits.indexOf(distanceUnit) < 0) {
		return badRequest;
	}

	let data = cars.data.filter(f => geolib.isPointWithinRadius(
		{
			latitude: f.latitude,
			longitude: f.longitude
		},
		from,
		radius
	) == true);

	data.forEach(d => {
		d['distance'] = distanceUnit == 'meter' ? geolib.getPreciseDistance(from, { latitude: d['latitude'], longitude: d['longitude'] }) : (geolib.getPreciseDistance(from, { latitude: d['latitude'], longitude: d['longitude'] })) / 1000,
		d['distance_unit'] = distanceUnit
	})

	const orderData = order(data, 'distance', 'asc');

	return orderData;
}