import env from "dotenv";
env.config();

import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function testCollection() {
  try {
    await client.connect();
    console.log("MongoDBの接続に成功!");
  } catch (error) {
    console.error("MongoDBの接続に失敗:", error);
  } finally {
    await client.close();
  }
}
testCollection();
