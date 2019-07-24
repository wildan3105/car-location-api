const express = require('express');
const app = express();
const port = process.env.NODE_PORT || 3000;
const routeHandler = require('./endpoints');

app.use('/', routeHandler);

module.exports = app.listen(port, () => {
	console.log(`car-location-api is listening on port ${port}`)
})