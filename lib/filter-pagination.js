const { defaultPage, defaultItemsInOnePage, defaultSkipItems, cars } = require('./constants');
const orderById = require('./filter-order');

module.exports = (from, size) => {
	const skip = from || 0;
	const total = size || 10;

	const paginationData = (orderById('id', 'asc')['data'].slice(skip)).slice(0, total);

	return paginationData;
}