import "reflect-metadata"
import * as db from "./database/database";
import {server} from "./websocket/websocket"
import { initTimers } from "./timers/index.timers";
import { initCredits } from "./initialisation/indexInit";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

db.connect().then(() => {

    initCredits();
    initTimers();

    server.listen(port, async () => {
      console.log(`Server is running http://${host}:${port}`);
    });

}).catch((e) => {
  console.log(`Db Error: ${e.message}`)
})