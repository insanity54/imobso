var request = require('supertest');
var app = require('../../../app');
var assert = require('chai').assert;


describe('controllers', function() {

  describe('online_controller', function() {
    this.timeout(8000);

    describe('GET /v1/online/@openbazaar', function() {

      it('should reject onename handles sent without an @ sign', function(done) {
        request(app)
          .get('/v1/online/openbazaar')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            assert.isNull(err);
            assert.match(res.body.error, /at \(\@\) sign required/);
            done();
          });
      });
    })

    describe('GET /v1/online/a06aa22a38f0e62221ab74464c311bd88305f88c', function() {

      it('should accept @openbazaar GUID and return profile as JSON', function(done) {

        request(app)
          .get('/v1/online/a06aa22a38f0e62221ab74464c311bd88305f88c')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            assert.isNull(err);
            assert.equal(res.profile.handle, '@openbazaar');
            done();
          });
      });

      it('should accept @openbazaar onename handel and return profile as JSON', function(done) {
        request(app)
          .get('/v1/online/@openbazaar')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            assert.isNull(err);
            assert.equal(res.profile.handle, '@openbazaar');
            done();
          });
      });

    });
  });
});
