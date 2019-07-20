const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Cars endpoint', () => {
	describe('BASIC ENDPOINTS', () => {
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

	describe('PAGINATION ENDPOINTS', () => {
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
})