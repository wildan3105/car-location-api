const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Cars endpoint', () => {
	describe('GET /', () => {
		it('Should ok with empty content', (done) => {
			chai.request(app)
				.get('/')
				.end((err, res) => {
					res.should.have.status(200);
					done();
				})
		})
	})
})