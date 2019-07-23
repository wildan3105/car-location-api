const { where, order, pagination } = require('./filter');
const { isObjectEmpty } = require('../helper');

module.exports = (query) => {
	let data;
	if(isObjectEmpty(query)) {
		// default to from = 0, size = 10 (page 1)
		data = pagination();
	} else {
		// process the query
		data = [];
	}

	return data;
}