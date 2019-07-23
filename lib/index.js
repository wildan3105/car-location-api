const { where, order, pagination } = require('./filter');
const { isObjectEmpty } = require('../helper');

module.exports = (query) => {
	let data;
	if(isObjectEmpty(query)) {
		
		data = pagination();

	} else {

		const whereData = where(query.where || null);

		if(whereData.length <= 0) {
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