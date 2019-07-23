const { where, order, pagination } = require('./filter');
const { isObjectEmpty } = require('../helper');
const { cars, badRequest, notFound } = require('./constants');

module.exports = (query) => {
	let data;
	if(isObjectEmpty(query)) {
		
		return pagination(cars.data);

	} else {

		const whereData = where(query.where);

		if(!whereData) {
			data = [];
			return notFound;
		}

		const orderData = order(whereData, query.order_name, query.order_type);

		if(!orderData) {
			return badRequest;
		};
		
		const finalData = pagination(orderData, query.from, query.size);

		if(!finalData) {
			return badRequest;
		};
		
		data = finalData;
	}

	return data;
}