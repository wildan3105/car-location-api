const { where, order, pagination } = require('./filter');
const { isEmptyObject } = require('../helper');
let { cars, badRequest, wrongRequest } = require('./constants');

module.exports = (query) => {
	let data;
	if(isEmptyObject(query)) {
		
		return pagination(cars.data);

	} else {

		const whereData = where(query.where);

		if(whereData.reason && whereData.reason > 200) {
			switch(whereData.reason) {
				case 404: wrongRequest = { status: 404, message: `Item with query ${query.where} is not found` };
					break;

				case 400: wrongRequest = { status: 400, message: `${query.where} is invalid JSON string. Please modify your query!` };
					break;

				default: 'wrong request';
			}

			return wrongRequest;
		}

		const orderData = order(whereData, query.order_name, query.order_type);

		if(!orderData) {
			badRequest['message'] = `Your order name / type is invalid. Please modify your query!`;
			return badRequest;
		};
		
		const finalData = pagination(orderData, query.from, query.size);

		if(!finalData) {
			badRequest['message'] = `Your value of from / size is invalid. Please modify your query!`;
			return badRequest;
		};
		
		data = finalData;
		data['total'] = orderData.length;

		return data;
	}
}