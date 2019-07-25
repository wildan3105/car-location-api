const express = require('express');
const router = express.Router();
const { cars, dataStatus } = require('../lib/constants');
const search = require('./search')
const filter = require('../lib');

router.get('/', (req, res) => {
	res.json({
		...dataStatus,
		path: '/',
		availableEndpoints: [
			{
				endpoint: '/cars',
				description: 'Get all cars'
			},
			{
				endpoint: '/cars/:id',
				description: 'Get car by id'
			},
			{
				endpoint: '/cars/search',
				description: 'Search car by location coordinates'
			}
		]
	})
})

router.get('/cars', (req, res) => {
	const data = filter(req.query);
	if(data.status && data.status > 200) {
		res.status(data.status).json({
			status: false,
			timestamp: dataStatus.timestamp,
			message: data.message || 'Wrong request'
		})
	} else {
		res.json({
			...dataStatus,
			total: data.total || null,
			data
		})
	}
})

router.get('/cars/search', (req, res) => {
	const data = search(req.query)
	if(data.status && data.status > 200){
		res.status(data.status).json({
			status: false,
			timestamp: dataStatus.timestamp,
			message: data.message || 'Wrong request'
		})
	} else {
		res.json({
			...dataStatus,
			total: data.total || null,
			data
		})
	} 
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
			data: carById
		})
	}
})

router.get('*', (req, res) => {
	res.status(404).json({
		status: false,
		timestamp: dataStatus.timestamp,
		message: "Wow! You are entering the jungle ⛳️"
	})
})

module.exports = router; 