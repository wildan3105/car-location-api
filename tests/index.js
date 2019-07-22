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

	// describe('FILTER: Where (exact match) ', () => {
	// 	it('Should find item where id is certain value', (done) => {

	// 	})

	// 	it('Should find item where is_on_trip is certain value', (done) => {
			
	// 	})

	// 	it('Should find item where location_name is certain value', (done) => {
			
	// 	})

	// 	it('Should find item where id & is_on_trip is certain value', (done) => {
			
	// 	})

	// 	it('Should find item where id & location_name is certain value', (done) => {
			
	// 	})

	// 	it('Should find item where location_name & is_on_trip is certain value', (done) => {
			
	// 	})

	// 	it('Should find item where id, location_name, & is_on_trip is certain value', (done) => {
			
	// 	})

	// })
})