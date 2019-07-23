const { where, order, pagination } = require('./filter');
const { isObjectEmpty } = require('../helper');
const { cars } = require('./constants');

module.exports = (query) => {
	let data;
	if(isObjectEmpty(query)) {
		
		return pagination(cars);

	} else {

		const whereData = where(query.where);

		if(!whereData) {
			data = [];
			return {
				data,
				status: 404
			};
		}

		const orderData = order(whereData, query.order_name, query.order_type);

		if(!orderData) {
			return {
				data: [],
				status: 400
			}
		};
		
		const finalData = pagination(orderData, query.from, query.size);

		if(!finalData) {
			return {
				data: [],
				status: 400
			}
		};
		
		data = finalData;
	}

	return data;
}