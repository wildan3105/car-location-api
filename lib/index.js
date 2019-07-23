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
		
		const finalData = pagination(orderData, query.from, query.size);
		
		data = finalData;
	}

	return data;
}