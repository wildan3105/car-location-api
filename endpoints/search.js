const { cars, defaultSearchRadiusInKm } = require('../lib/constants');
const { isValidCoordinates } = require('../helper');
const geolib = require('geolib');

module.exports = (query) => {
	let data;

	const from = JSON.parse(query.coordinates);
	const radius = JSON.parse(query.radius) || defaultSearchRadiusInKm * 1000;

	if(!isValidCoordinates(from)) {
		return {
			data: [],
			status: 400
		}
	}

	if(radius < 0) {
		return {
			data: [],
			status: 400
		}
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

	// TODO: order by distance

	return data;
}