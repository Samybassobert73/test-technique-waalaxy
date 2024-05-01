import "reflect-metadata"
import * as db from "./database/database";
import * as typeFixtures from "./fixtures/type.fixture";
import * as creditFixtures from "./fixtures/credit.fixture";

import {server} from "./websocket/websocket"
import { container } from "tsyringe";
import Timers from "./timers/timers";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

db.connect().then(() => {

    typeFixtures.createFixtures(4)

    creditFixtures.createFixtures()

    const timers = container.resolve(Timers);
    timers.init()

    server.listen(port, async () => {
      console.log(`Server is running http://${host}:${port}`);
    });

}).catch((e) => {
  console.log(`Db Error: ${e.message}`)
})