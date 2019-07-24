const { cars, defaultSearchRadiusInMeters, allowedDistanceUnits } = require('../lib/constants');
const { isValidCoordinates, isJsonString } = require('../helper');
const { order } = require('../lib/filter');
const geolib = require('geolib');
let { notFound, badRequest } = require('../lib/constants');

module.exports = (query) => {

	if(!isJsonString(query.coordinates)) {
		badRequest['message'] = 'Your query is invalid. Please modify your query.';
		return badRequest;
	}

	const radius = query.radius == undefined ? defaultSearchRadiusInMeters : query.radius;
	const distanceUnit = query.unit == undefined ? 'meter' : query.unit;
	const from = JSON.parse(query.coordinates);

	if(!isValidCoordinates(from)) {
		badRequest['message'] = 'Not valid coordinates. Please check again your coordinates.';
		return badRequest;
	}

	if(radius < 0 || isNaN(Number(radius))) {
		badRequest['message'] = 'Not valid radius. Please check again your radius.';
		return badRequest;
	}

	if(allowedDistanceUnits.indexOf(distanceUnit) < 0) {
		badRequest['message'] = 'Not valid distance unit. Allowed distance unit is kilometer/meter.';
		return badRequest;
	}

	let data = cars.data.filter(f => geolib.isPointWithinRadius(
		{ latitude: f.latitude, longitude: f.longitude },
		from,
		radius
	) == true);

	data.forEach(d => {
		d['distance'] = distanceUnit == 'meter' ? geolib.getPreciseDistance(from, { latitude: d['latitude'], longitude: d['longitude'] }) : Number(((geolib.getPreciseDistance(from, { latitude: d['latitude'], longitude: d['longitude'] })) / 1000).toFixed(3)),
		d['distance_unit'] = distanceUnit
	})

	const orderedData = order(data, 'distance', 'asc');

	if(orderedData.length <= 0) {
		notFound['message'] = 'Your query is likely not match with any of our data';
		return notFound;
	}

	return orderedData;
}