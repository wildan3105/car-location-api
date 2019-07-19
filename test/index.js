const should = require('should');

let user = {
	name: 'tj',
	pets: ['tobi', 'loki']
}

user.should.have.property('name', 'tj');