const { cars } = require('./constants');
const orderById = require('./filter-order');

module.exports = (size) => {
	return orderById('id', 'asc')['data'].slice(0, size);
}