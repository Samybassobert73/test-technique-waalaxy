const Fixtures = require('node-mongodb-fixtures');
const uri = 'mongodb://localhost:27017/db';

const fixtures = new Fixtures({
  dir: 'src/fixtures',
});

fixtures
  .connect(uri)
  .then(() => fixtures.unload())
  .then(() => fixtures.load())
  .catch(e => console.error(e))
  .finally(() => fixtures.disconnect());