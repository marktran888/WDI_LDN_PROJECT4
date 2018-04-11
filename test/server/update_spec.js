/* global api, describe, it, expect, beforeEach */

const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const userData = {
  username: 'mark',
  email: 'mark@mark.com',
  password: 'password',
  allergies: ['eggs', 'milk'],
  passwordConfirmation: 'password'
};

let token;
let user;

describe('PUT /users/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(_user => {
        user = _user;
        token = jwt.sign({sub: user._id}, secret, {expiresIn: '6h'});
      })
      .then(done);
  });


  it('should return a 401 response', done => {
    api
      .put(`/api/users/${user._id}`)
      .expect(401, done);
  });

  it('should return a 200 response with a token', done => {
    api
      .put(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a user', done => {
    api
      .put(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'username',
          'email',
          'password',
          'allergies'
        ]);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .put(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.body.username).to.eq(userData.username);
        expect(res.body.email).to.eq(userData.email);
        expect(res.body.allergies).to.deep.eq(userData.allergies);
        done();
      });
  });
});
