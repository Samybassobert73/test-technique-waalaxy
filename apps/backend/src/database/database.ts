import * as mongoose from "mongoose";
  
export const connect = async (): Promise<void> => {
  return mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit();
  });
}


export default mongoose;