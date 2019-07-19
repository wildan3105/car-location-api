const { cars } = require('./constants');
const orderById = require('./filter-order');

module.exports = (skip) => {
	return orderById('id', 'asc')['data'].slice(skip);
}