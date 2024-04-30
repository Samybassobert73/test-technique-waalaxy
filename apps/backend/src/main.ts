import app from "./app";
import * as db from "./database";
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

db.connect().then(() => {
  app.listen(port, async () => {
    console.log(`Server is running http://${host}:${port}`);
  });
  
}).catch((e) => {
  console.log(`Db Error: ${e.message}`)
})