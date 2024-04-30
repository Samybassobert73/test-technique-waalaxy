import app from "./app";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, async () => {
  console.log(`Server is running http://${host}:${port}`);
});
