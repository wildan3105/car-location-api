const { cars } = require('./constants');

module.exports = (where) => {
	const queryFilter = JSON.parse(where)
	return cars.data.filter(c => c['location_name'] == queryFilter.location_name );
}