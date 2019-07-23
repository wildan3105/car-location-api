const express = require('express');
const router = express.Router();
const { cars, dataStatus } = require('../lib/constants');
const { search } = require('./search')

const helper = require('../helper');

const commonFilter = require('../lib');

router.get('/', (req, res) => {
	res.json({
		...dataStatus,
		path: '/'
	})
})

router.get('/cars', (req, res) => {

	const data = commonFilter(req.query);

	if(data.status > 200) {
		let message;
		switch(data.status) {
			case 404: message = 'not found';
			break;

			case 400: message = 'bad request';
			break;

			default: message = 'wrong request';
		}

		res.status(data.status).json({
			status: false,
			message
		})
		
	} else {
		res.json({
			...dataStatus,
			data
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