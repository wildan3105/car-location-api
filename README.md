## Car Location API 
A set of APIs for exploring car locations data

## Description
bla bla blaaa

## How to run locally
- Traditional (Make sure you have [Node.js](https://nodejs.org) and [NPM](https://www.npmjs.com/get-npm) installed)
	```sh 
	$ git clone https://github.com/wildan3105/car-location-api.git
	$ cd car-location-api
	$ npm install
	$ npm start
	```

- Containerization (Make sure you have [Docker](https://www.docker.com/) installed)
	```sh
	$ docker build -t car-location-api .
	$ docker run -p 3000:3000 -d car-location-api
	```

The app should now be running on [http://localhost:3000](http://localhost:3000)

## Feature available
- order
	- by id
	- by location_name 
	- by trip status
- pagination
	- from
	- size
- where 
	- id
	- location_name
	- trip status
- search
	- search available car within n-meters from certain coordinates

## API Documentation
[Click here](DOCUMENTATION.md)