const express = require('express');
const router = express.Router();
const { cars, dataStatus } = require('../modules/constants');
const { search } = require('./search')

router.get('/', (req, res) => {
	res.json({
		...dataStatus,
		path: '/'
	})
})

router.get('/cars', (req, res) => {
	res.json({
		...dataStatus,
		size: cars.data.length,
		data: cars
	})
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