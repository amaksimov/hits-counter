process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const db = require('../db');

chai.should();

chai.use(chaiHttp);

describe('/GET', () => {
    before(() => {
        const twoMinutesAgo = new Date(new Date() - 120000);

        db.none('TRUNCATE ONLY hits')
            .then(
                db.none('INSERT INTO hits(created_at) VALUES ($1), ($2)', [new Date(), twoMinutesAgo]),
            );
    });

    it('it should return pageviews per last minute', (done) => {
        chai.request(server)
            .get('/hits')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('pageviews');
                res.body.pageviews.should.equal(2);
                done();
            });
    });
});
