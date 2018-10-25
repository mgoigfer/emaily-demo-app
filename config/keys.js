if (process.env.NODE_ENV === 'production') {
  // We are in production. Return the prod set of keys.
  module.exports = require('./prod');
} else {
  // We are in development. Return the dev set of keys.
  module.exports = require('./dev');
}
