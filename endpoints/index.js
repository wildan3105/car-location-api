const express = require('express');
const router = express.Router();
const { cars, dataStatus } = require('../lib/constants');
const { search } = require('./search')

const helper = require('../helper');

const commonFilter = require('../lib');

const { pagination, where, order } = require('../lib/filter');

const orderNames = ['id', 'is_on_trip', 'location_name', 'order_type'];
const orderTypes = ['asc', 'desc'];

router.get('/', (req, res) => {
	res.json({
		...dataStatus,
		path: '/'
	})
})

router.get('/cars', (req, res) => {

	// res.json({
	// 	...dataStatus,
	// 	data: commonFilter(req.query)
	// })

	if(req.query.from || req.query.size) {
		res.json({
			...dataStatus,
			data: pagination(req.query.from, req.query.size)
		})
	} else if(req.query.where) {
		res.json({
			...dataStatus,
			data: where(req.query.where)
		})
	} else if(req.query.order_name) {
		console.log('here');
		if((orderNames.indexOf(req.query.order_name.toLowerCase()) < 0) || (orderTypes.indexOf(req.query.order_type.toLowerCase())) < 0) {
			res.status(400).json({
				status: false,
				message: `Invalid order_name of '${req.query.order_name}' or order_type of '${req.query.order_type}' `
			});
		} else {
			const { size, data } = order(req.query.order_name.toLowerCase(), req.query.order_type.toLowerCase());
			res.json({
				...dataStatus,
				size,
				data
			});
		}
	} else {
		res.json({
			data: pagination()
		})
	}
})

router.get('/cars/search', (req, res) => {
	res.json({
		...dataStatus,
		message: search
	})
})

router.get('/cars/:id', (req, res) => {

	const carById = cars.data.filter(car => car.id === Number(req.params.id));

	if(carById.length <= 0) {
		res.status(404).json({
			status: false,
			message: `Car with id '${req.params.id}' is not found`
		})
	} else {
		res.json({
			...dataStatus,
			carById
		})
	}
})

router.get('*', (req, res) => {
	res.status(404).json({
		status: false,
		message: "Wow! You are entering the jungle ⛳️"
	})
})

module.exports = router; 