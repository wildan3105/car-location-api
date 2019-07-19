const { cars } = require('./constants');

const orderByNonLocation = (input, orderName, orderType) => {
	return input.sort((a, b) => {
	  return orderType === 'asc' ? a[orderName] - b[orderName] : b[orderName] - a[orderName];
	});
};

const orderByLocationName = (input, sortType) => {
	return input.sort((a, b) => {
		let locationNameA = a.location_name.toUpperCase(); 
	  	let locationNameB = b.location_name.toUpperCase(); 

	  	if(sortType === 'asc') {
	  		if (locationNameA < locationNameB) {
			    return -1;
			  }
			  if (locationNameA > locationNameB) {
			    return 1;
			  }
	  	} else if(sortType === 'desc') {
	  		if (locationNameA < locationNameB) {
			    return 1;
			  }
			  if (locationNameA > locationNameB) {
			    return -1;
			  }
	  	}
	});
};

module.exports = (order, type) => {

	let result;

	switch(order){
		case 'id':
		case 'is_on_trip':
			result = orderByNonLocation(cars.data, order, type)
			break;

		case 'location_name':
			result = orderByLocationName(cars.data, type);
			break;

		default: 
			result = cars.data;
	}

	return { 
		size: result.length,
		data: result
	};
};