import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app/server';

process.env.NODE_ENV = 'test';

chai.should();

chai.use(chaiHttp);

describe('/GET', () => {
  it('it should return pageviews object', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('pageviews');
        res.body.pageviews.should.eql(1);
        done();
      });
  });
});
