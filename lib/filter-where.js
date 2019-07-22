const { cars } = require('./constants');

module.exports = (where) => {
	const queryFilter = JSON.parse(where)
	let queryFields = {
		isOnTrip: undefined,
		id: undefined,
		locationName: undefined
	}
	
	if(queryFilter.location_name !== undefined) {
		queryFields.locationName = queryFilter.location_name
	};

	if(queryFilter.id !== undefined) {
		queryFields.id = queryFilter.id
	};

	if(queryFilter.is_on_trip !== undefined) {
		queryFields.isOnTrip = queryFilter.is_on_trip
	}

	console.log(queryFilter)

	//return cars.data.filter(c => c['is_on_trip'] == queryFields.isOnTrip)

	return cars.data.filter(c => 
		(queryFields.locationName ? c['location_name'] == queryFields.locationName : c['location_name'] !== queryFields.locationName) && 
		(queryFields.id ? c['id'] == queryFields.id : c['id'] !== queryFields.id) && 
		((queryFields.isOnTrip == true || queryFields.isOnTrip == false) ? c['is_on_trip'] == queryFields.isOnTrip : c['is_on_trip'] !== queryFields.isOnTrip) 
	);
}