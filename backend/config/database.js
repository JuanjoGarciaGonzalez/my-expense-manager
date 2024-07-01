// Import the mongoose module
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = "mongodb+srv://juanjofidenet:sSt9CTxkPpUFDIps@cluster0.c4f9j1q.mongodb.net/expense_manager?retryWrites=true&w=majority&appName=Cluster0";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB");
}