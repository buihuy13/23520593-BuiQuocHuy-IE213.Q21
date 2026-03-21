import dotenv from "dotenv";
import mongodb from "mongodb";

import app from "./server.js";
import MoviesDAO from "./dao/moviesDAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 3000;

if (!process.env.MOVIEREVIEWS_DB_URI) {
  console.error(
    "Missing env MOVIEREVIEWS_DB_URI. Create backend/.env and set MOVIEREVIEWS_DB_URI."
  );
  process.exit(1);
}

const client = new MongoClient(process.env.MOVIEREVIEWS_DB_URI);

async function main() {
  try {
    await client.connect();
    await MoviesDAO.injectDB(client);

    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);