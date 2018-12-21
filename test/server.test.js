process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const db = require('../db');

chai.should();

chai.use(chaiHttp);

describe('/GET hits', () => {
    before(() => {
        const twoMinutesAgo = new Date(new Date() - 120000);

        db.none('TRUNCATE ONLY hits')
            .then(
                db.none('INSERT INTO hits(route, created_at) VALUES (\'active\', $1), (\'overdue\', $2)', [new Date(), twoMinutesAgo]),
            );
    });

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
