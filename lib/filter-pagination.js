const { defaultItemsInOnePage, defaultSkipItems } = require('./constants');
const orderById = require('./filter-order');

module.exports = (from, size) => {
	const skip = from || defaultSkipItems;
	const total = size || defaultItemsInOnePage;

	const paginationData = (orderById('id', 'asc')['data'].slice(skip)).slice(0, total);

	return paginationData;
}