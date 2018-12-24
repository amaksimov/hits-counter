process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

chai.use(chaiHttp);

describe('/GET hits', () => {
  it('it should return pageviews object', (done) => {
    chai.request(server)
      .get('/hits')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('pageviews');
        done();
      });
  });
});
