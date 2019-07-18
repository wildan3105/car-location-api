const express = require('express');
const router = express.Router();
const { data } = require('../modules/constants');

router.get('/', (req, res) => {
	res.json({
		status: true,
		path: '/'
	})
})

router.get('/cars', (req, res) => {
	res.json({
		status: true,
		data
	})
})

router.get('/')

module.exports = router; 