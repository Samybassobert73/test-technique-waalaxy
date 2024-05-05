import { Error } from "mongoose";

const Fixtures = require('node-mongodb-fixtures');
require('dotenv').config();
const fixtures = new Fixtures({
  dir: 'src/fixtures',
});

fixtures
  .connect(process.env.DB_URL)
  .then(() => fixtures.unload())
  .then(() => fixtures.load())
  .catch((e:Error) => console.error(e))
  .finally(() => fixtures.disconnect());