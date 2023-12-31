import mongoose from "mongoose";
mongoose.set("strictQuery", false);

export async function Connection(username, password) {
  const URL = `mongodb://${username}:${password}@ac-w3j8a4d-shard-00-00.aiteiwf.mongodb.net:27017,ac-w3j8a4d-shard-00-01.aiteiwf.mongodb.net:27017,ac-w3j8a4d-shard-00-02.aiteiwf.mongodb.net:27017/?ssl=true&replicaSet=atlas-8mstnm-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true,
      useUnifiedTopology: true, });
    console.log("Database connection established");
  } catch (error) {
    console.log("Error connecting", error);
  }
}

