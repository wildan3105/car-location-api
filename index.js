const express = require('express');
const app = express();
const port = process.env.NODE_PORT || 3000;
const routeHandler = require('./services');

app.use('/', routeHandler);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})