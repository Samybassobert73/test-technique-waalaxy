import * as mongoose from "mongoose";

const uri  = `mongodb://127.0.0.1:27017/db`
  
export const connect = async (): Promise<void> => {
  return mongoose
  .connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit();
  });
}


export default mongoose;