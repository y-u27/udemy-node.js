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

updateBook();
async function updateBook() {
  const col = await getCollection();
  //updateOne→
  //updateMany→複数レコードを一括で更新する
  //updateの処理を待ってからcloseする必要があるため、awaitは必ずつける
  const result = await col.updateOne(
    { description: "三島由紀夫" },
    { $set: { rating: 3 } }
  );
  console.log(result);
  await client.close();
}
