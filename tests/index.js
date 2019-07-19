const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Cars endpoint', () => {
	describe('GET /', () => {
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
					const data = res.body.data.data;
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
	})
})