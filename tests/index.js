const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Cars endpoint', () => {
	describe('Basic requests', () => {
		it('Should ok with http code 200 and body is an object', (done) => {
			chai.request(app)
				.get('/')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				})
		})

		it('Should be not found with http code 404 and body is an object', (done) => {
			chai.request(app)
				.get('/someweirdendpoints')
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
					done();
				})
		})

		it('Should get all cars', (done) => {
			chai.request(app)
				.get('/cars')
				.end((err, res) => {
					const data = res.body.data;
					res.should.have.status(200);
					res.body.should.be.a('object');
					expect(data).to.have.lengthOf.at.least(1);
					done();
				})
		})

		it('Should get a one car by id', (done) => {
			const id = 8;
			chai.request(app)
				.get(`/cars/${id}`)
				.end((err, res) => {
					const carById = res.body.carById;
					res.should.have.status(200);
					carById.should.be.a('array');
					expect(carById).to.have.lengthOf(1);
					done();
				})
		})

		it('Should get none car', (done) => {
			const id = 200;
			chai.request(app)
				.get(`/cars/${id}`)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
					done();
				})
		})
	})

	describe('FILTER: Pagination', () => {
		it('Should return page one (skip = 0 & size = 10)', (done) => {
			chai.request(app)
				.get(`/cars`)
				.end((err, res) => {
					const data = res.body.data;
					res.should.have.status(200);
					res.should.be.a('object');
					data.should.be.a('array');
					expect(data).to.have.lengthOf(10);
					done();
				})
		})

		it('Should return data with size = 5', (done) => {
			const size = 5;
			chai.request(app)
				.get(`/cars?size=${size}`)
				.end((err, res) => {
					const data = res.body.data;
					res.should.have.status(200);
					res.should.be.a('object');
					data.should.be.a('array');
					expect(data).to.have.lengthOf(size);
					done();
				})
		})
	})

	describe('FILTER: Order ', () => {
		it('Should order by id ASC', (done) => {
			const orderBy = 'id', orderType = 'asc';
			chai.request(app)
				.get(`/cars?order_name=${orderBy}&order_type=${orderType}`)
				.end((err, res) => {
					const firstItemId = res.body.data[0].id;
					const secondItemId = res.body.data[1].id;
					res.should.have.status(200);
					expect(secondItemId).to.be.above(firstItemId);
					done();
				})
		})

		it('Should order by id DESC', (done) => {
			const orderBy = 'id', orderType = 'desc';
			chai.request(app)
				.get(`/cars?order_name=${orderBy}&order_type=${orderType}`)
				.end((err, res) => {
					const firstItemId = res.body.data[0].id;
					const secondItemId = res.body.data[1].id;
					res.should.have.status(200);
					expect(firstItemId).to.be.above(secondItemId);
					done();
				})
		})

		it('Should order by location_name ASC', (done) => {
			const orderBy = 'location_name', orderType = 'asc';
			chai.request(app)
				.get(`/cars?order_name=${orderBy}&order_type=${orderType}`)
				.end((err, res) => {
					const firstLocationItem = res.body.data[0].location_name;
					const secondLocationItem = res.body.data[1].location_name;
					res.should.have.status(200);
					expect(firstLocationItem < secondLocationItem).to.be.true;
					done();
				})
		})

		it('Should order by location_name DESC', (done) => {
			const orderBy = 'location_name', orderType = 'desc';
			chai.request(app)
				.get(`/cars?order_name=${orderBy}&order_type=${orderType}`)
				.end((err, res) => {
					const firstLocationItem = res.body.data[0].location_name;
					const secondLocationItem = res.body.data[1].location_name;
					res.should.have.status(200);
					expect(firstLocationItem < secondLocationItem).to.be.false;
					done();
				})
		})

		it('Should order by is_on_trip status ASC', (done) => {
			const orderBy = 'is_on_trip', orderType = 'asc';
			chai.request(app)
				.get(`/cars?order_name=${orderBy}&order_type=${orderType}`)
				.end((err, res) => {
					const firstItemBasedTripStatus = res.body.data[0].is_on_trip;
					res.should.have.status(200);
					expect(firstItemBasedTripStatus).to.be.false;
					done();
				})
		})

		it('Should order by is_on_trip status DESC', (done) => {
			const orderBy = 'is_on_trip', orderType = 'desc';
			chai.request(app)
				.get(`/cars?order_name=${orderBy}&order_type=${orderType}`)
				.end((err, res) => {
					const firstItemBasedTripStatus = res.body.data[0].is_on_trip;
					res.should.have.status(200);
					expect(firstItemBasedTripStatus).to.be.true;
					done();
				})
		})
	}) 

	describe('FILTER: Where (exact match) ', () => {
		it('Should find item where id is certain value', (done) => {
			const where = {
				id: 3
			};
			chai.request(app)
				.get(`/cars?where=${JSON.stringify(where)}`)
				.end((err, res) => {
					res.should.have.status(200);
					const data = res.body.data;
					data.should.be.a('array');
					expect(data).to.have.lengthOf(1);
					expect(data[0].id).to.equal(where.id);
					done();
				})
		})

		it('Should find item(s) where is_on_trip is certain value', (done) => {
			const where = {
				is_on_trip: true
			};
			chai.request(app)
				.get(`/cars?where=${JSON.stringify(where)}`)
				.end((err, res) => {
					const data = res.body.data;
					const isEveryItemsMatch = (data.filter(d => 
						d.is_on_trip == where.is_on_trip)).length == data.length;
					res.should.have.status(200);
					expect(isEveryItemsMatch).to.be.true;
					done();
				})			
		})

		it('Should find item where location_name is certain value', (done) => {
			const where = {
				location_name: "Star City"
			};
			chai.request(app)
				.get(`/cars?where=${JSON.stringify(where)}`)
				.end((err, res) => {
					const data = res.body.data;
					const isEveryItemsMatch = (data.filter(d => 
						d.location_name == where.location_name)).length == data.length;
					res.should.have.status(200);
					expect(isEveryItemsMatch).to.be.true;
					done();
				})	
		})

		it('Should find item where id & is_on_trip is certain value', (done) => {
			const where = {
				is_on_trip: false,
				id: 1
			};
			chai.request(app)
				.get(`/cars?where=${JSON.stringify(where)}`)
				.end((err, res) => {
					const data = res.body.data;
					const isEveryItemsMatch = (data.filter(d => 
						d.is_on_trip == where.is_on_trip && 
						d.id == where.id)).length == data.length;
					res.should.have.status(200);
					expect(isEveryItemsMatch).to.be.true;
					done();
				})	
		})

		it('Should find item where id & location_name is certain value', (done) => {
			const where = {
				location_name: "Star City",
				id: 10
			};
			chai.request(app)
				.get(`/cars?where=${JSON.stringify(where)}`)
				.end((err, res) => {
					const data = res.body.data;
					const isEveryItemsMatch = (data.filter(d => 
						d.location_name == where.location_name && 
						d.id == where.id)).length == data.length;
					res.should.have.status(200);
					expect(isEveryItemsMatch).to.be.true;
					done();
				})		
		})

		it('Should find item where location_name & is_on_trip is certain value', (done) => {
			const where = {
				location_name: "Star City",
				is_on_trip: false
			};
			chai.request(app)
				.get(`/cars?where=${JSON.stringify(where)}`)
				.end((err, res) => {
					const data = res.body.data;
					const isEveryItemsMatch = (data.filter(d => 
						d.location_name == where.location_name && 
						d.is_on_trip == where.is_on_trip)).length == data.length;
					res.should.have.status(200);
					expect(isEveryItemsMatch).to.be.true;
					done();
				})	
		})

		it('Should find item where id, location_name, & is_on_trip is certain value', (done) => {
			const where = {
				location_name: "Star City",
				is_on_trip: false,
				id: 10
			};
			chai.request(app)
				.get(`/cars?where=${JSON.stringify(where)}`)
				.end((err, res) => {
					const data = res.body.data;
					const isEveryItemsMatch = (data.filter(d => 
						d.location_name == where.location_name && 
						d.is_on_trip == where.is_on_trip && 
						d.id == where.id)).length == data.length;
					res.should.have.status(200);
					expect(isEveryItemsMatch).to.be.true;
					done();
				})	
		})

	})

	describe('INTEGRATION FILTER: Where, Order, and Pagination, ', () => {
		it('Should return item(s) where is_on_trip = true, ordered by id DESC and limit item(s) to 3 and skip 3rd item', (done) => {
			const where = {
				is_on_trip: true
			}
			const order = {
				order_name: 'id',
				order_type: 'desc'
			}
			const pagination = {
				from: 3,
				size: 3
			}
			chai.request(app)
				.get(`/cars?where=${JSON.stringify(where)}&order_name=${order.order_name}&order_type=${order.order_type}&from=${pagination.from}&size=${pagination.size}`)
				.end((err, res) => {
					const data = res.body.data;
					const isEveryItemHaveOnTripStatusSameAsRequest = data.filter(d => d.is_on_trip == where.is_on_trip).length == data.length;
					const firstItemId = data[0].id;
					const secondItemId = data[1].id;
					res.should.have.status(200);
					expect(isEveryItemHaveOnTripStatusSameAsRequest).to.be.true; 
					expect(firstItemId > secondItemId).to.be.true; 
					expect(data).have.a.lengthOf(pagination.size); 
					done();
				})
		})
	})

	describe('SEARCH: ', () => {
		it('Should accept some latitude types', (done) => {
			const latitudeTypes = [{name: 'lat'}, {name: 'latitude'}];
			latitudeTypes.forEach(lat => {
				
				let coordinates = {};
				coordinates[lat.name] = 1.023;
				coordinates['lon'] = 102.23923
				const radius = 2000;

				chai.request(app)
					.get(`/cars/search?coordinates=${JSON.stringify(coordinates)}&radius=${radius}`)
					.end((err, res) => {
						res.should.have.status(200);
					})
			})
			done();
		})

		it('Should NOT accept some latitude types', (done) => {
			const wrongLatitudeTypes = [{name: 'lati'}, {name: 'latude'}];
			wrongLatitudeTypes.forEach(lat => {
				
				let coordinates = {};
				coordinates[lat.name] = 10.232;
				coordinates['lon'] = 120.3483;
				const radius = 2000;
				console.log(coordinates);
				
				chai.request(app)
					.get(`/cars/search?coordinates=${JSON.stringify(coordinates)}&radius=${radius}`)
					.end((err, res) => {
						console.log(res.status)
						res.should.have.status(400);
					})
			})
			done();
		})

		// it('Should accept some longitude types', (done) => {

		// })

		// it('Should accept the combination of latitude and longitude types', (done) => {

		// })

		// it('Should accept range for latitude value: from -90 to 90', (done) => {

		// })

		// it('Should throw 400 bad request when latitude value are outside of -90 < lat < 90', (done) => {

		// })

		// it('Should accept range for longitude value: from -180 to 180', (done) => {

		// })

		// it('Should throw 400 bad request when longitude value are outside of -180 < lon < 180', (done) => {
			
		// })

		// it('Should search within radius of N-km and return all items that distance is <= radius set', (done) => {
		// 	// const coordinates = {
		// 	// 	lat:,
		// 	// 	lon:
		// 	// }
		// })

		// it('Should return search result ordered by shortest distance from search point', (done) => {

		// })
	})

	
})