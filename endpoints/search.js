const { cars } = require('../lib/constants');
const geolib = require('geolib');

module.exports = (query) => {
	let data;

	const from = JSON.parse(query.coordinates);
	const radius = JSON.parse(query.radius);

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

	return data;
}