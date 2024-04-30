import app from "./app";
import * as db from "./database";
import { createFixtures } from "./fixtures/type.fixture";
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

db.connect().then(() => {
    createFixtures(4)
    app.listen(port, async () => {
      console.log(`Server is running http://${host}:${port}`);
    });

}).catch((e) => {
  console.log(`Db Error: ${e.message}`)
})