## Car Location API 
A set of APIs for exploring car locations data

## Description
This set of APIs is intended to explore car locations data. For the ease of development, I add field `location_name` to the mockup data and **deliberately** using sample data (`mockup.json`) to focus more on data manipulation instead of spending more time to set up a database connection. In general, there are three endpoints which are : `/cars`, `/cars/:id`, and `/cars/search`. For each endpoint except `/cars/id`, there are three filters available: order, pagination, and where. 

**Order** filter could sort data by `id`, `location_name`, and `trip_status` ascending (from smallest to largest) or descending (from largest to smallest). By default, **pagination** is applied which will display 10 items for each page. You could skip n-items by set value in `from` query and decide how much item to be displayed in `size` query. The last filter is **where**, which is an exact match query by `id`, `location_name`, or `trip_status`. When using *where* filter, only field `id`, and `location_name` will result in a single or none item because every item in sample data has unique `id` and `location_name`. You can also combine several fields (for more example, see at the API documentation at the bottom of this page). 

Search endpoint is using library [geolib](https://npmjs.com/package/geolib), a zero dependency library to provide some basic geo functions. I use this library because of the simplicity and the need for calculating distance from a point to another point and search within n-radius are provided by this library. Also, when using this endpoint, there will be two additional fields, the `distance` that represents the distance in kilometer/meter between search point's coordinates and result's coordinates and `distance_unit` that represents unit whether in kilometer or meter. All search result will be sorted by distance ascendingly.

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
	$ git clone https://github.com/wildan3105/car-location-api.git
	$ cd car-location-api
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
	- search available car within radius of n-meters from certain coordinates

## API Documentation
[Click here](DOCUMENTATION.md)