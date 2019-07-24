const { longitudeFormats, latitudeFormats, latitudeLimits, longitudeLimits } = require('../lib/constants');

const isEmptyObject = (obj) => {
	return Object.keys(obj).length === 0;
}

const isJson = (string) => {
	try {
		let json = JSON.parse(string);
		return (typeof json == 'object');
	} catch(e) {
		return false;
	};
}

const isValidCoordinates = (coordinates) => {

	if(typeof coordinates !== 'object') {
		return false;
	};

	const keys = Object.keys(coordinates);

	if(keys.length > 2) {
		// not a pair of { latitude, longitude }
		return false;
	}

	const isLatitudeValid = keys.some(val => latitudeFormats.includes(val));
	const isLongitudeValid = keys.some(val => longitudeFormats.includes(val));

	if(!isLatitudeValid || !isLongitudeValid) {
		return false;
	};

	const keyOne = Object.keys(coordinates)[0];
	const keyTwo = Object.keys(coordinates)[1];

	const latValue = latitudeFormats.indexOf(keyOne) >= 0 ? coordinates[keyOne] : coordinates[keyTwo];
	const longValue = longitudeFormats.indexOf(keyOne) >= 0 ? coordinates[keyOne] : coordinates[keyTwo];

	if((latValue < latitudeLimits.min || latValue > latitudeLimits.max) || (longValue < longitudeLimits.min || longValue > longitudeLimits.max)) {
		return false;
	};

	return true;
}

module.exports = {
	isEmptyObject,
	isJson,
	isValidCoordinates
};