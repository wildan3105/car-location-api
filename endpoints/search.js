const geolib = require('geolib');
const one = {
	lat: 1.3258246666,
	lon: 103.775143166
}

const two = {
	lat: 1.2892128333,
	lon: 103.812455333
}

const distanceInKm = Number((geolib.getPreciseDistance(
	{ latitude: one.lat, longitude: one.lon },
	{ latitude: two.lat, longitude: two.lon }
	) / 1000).toFixed(2));


//console.log(distanceInKm,'km away')

module.exports = {
	search: () => {
		return {
			status: 'Searching...',
			distance: distanceInKm + ' km'
		}
	}
}