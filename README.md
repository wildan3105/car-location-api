## Car Location API 
A set of APIs for exploring car locations data

## Description
This set of APIs is intended to explore car locations data. For the ease of development, I add field `location_name` to the mockup data and **intentionally** using sample data (`mockup.json`) to focus more on data manipulation rather than spending more time to setup DB connection. In general, there are three endpoints which are : `/cars`, `/cars/:id`, and `/cars/search`. For each endpoint except `/cars/id`, there are three filters available : order, pagination, and where. 

**Order** filter could sort data by `id`, `location_name`, and `trip_status` ascending (from smallest to largest) or descending (from largest to smallest). By default, **pagination** is also applied which will display 10 items for each page. You could skip n-items by set value in `from` query and decide how much item to be displayed in `size` query. The last filter is **where**, which is an exact match query by `id`, `location_name`, or `trip_status`. When using *where* filter, only field `id` and `location_name` will resulted a single or none item because every item in sample data has unique `id` and `location_name`. You can also combine several field (for more example, see at the API documentation at the bottom of this page). 

Search endpoint is using library `geolib`, a zero dependency library to provide some basic geo functions. I use this library because of the simplicity and the need for calculating distance from a point to another point and search within n-radius are provided by this library. 

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