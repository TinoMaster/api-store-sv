const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const verifyPassword = require('../password.verify');

const userConnection = require('../../models/users.model');

const LocalStrategy = new Strategy(async (email, password, done) => {
  try {
    const user = await userConnection.findOne({ 'user.email': email });
    if (!user) {
      done(boom.unauthorized(), false);
    }
    const isPassword = await verifyPassword(password, user.user.password);
    if (!isPassword) {
      done(boom.unauthorized(), false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = LocalStrategy;
