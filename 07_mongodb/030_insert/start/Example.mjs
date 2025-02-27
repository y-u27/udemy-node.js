import env from "dotenv";
env.config();

import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function getCollection() {
  try {
    await client.connect();
    const db = client.db("bookshelf");
    return db.collection("books");
  } catch {
    await client.close();
  }
}

insertBook();
async function insertBook() {
  const col = await getCollection();
  //insertOne→1レコードのみ挿入
  //insertMany→一括して複数のレコードを挿入
  const result = await col.insertMany([
    {
      title: "こんにちは1",
      int: 20,
      bool: true,
      dt: new Date(),
      array: [0, 1, 2],
      obj: { bye: "さようなら" },
    },
  ]);
  console.log(result);
  await client.close();
}
