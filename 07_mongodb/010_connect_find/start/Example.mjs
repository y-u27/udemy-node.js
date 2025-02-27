import { MongoClient } from "mongodb";
import env from "dotenv";
env.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function getCollections() {
  try {
    await client.connect();
    const db = client.db("bookshelf");
    return db.collection("books");
  } catch {
    client.close();
  }
}
getAllBooks();
async function getAllBooks() {
  const col = await getCollections();
  // find→データを取得するために使用するメソッド
  // ()の中に引数（特定の取得したいデータなど）を指定していない場合は、データベースのすべてにデータを取得する
  // 逆に特定のデータを絞り込みたい場合、()に値を設定する
  // $ ←オペレーター
  // $or →●●もしくは◼️◼️
  // $gt →>（大なり）
  // $lt →<（小なり）
  // sort →配列の要素をソートする（既定のソート順は）
  const cursor = col
    .find({
      rating: { $gt: 2, $lte: 4 },
    })
    .sort({ rating: 1 });
  // findOne→1レコードのみ取得したい場合（取得できたレコードの最初のレコードを返す）
  // const cursor2 = col.findOne({ title: "バックエンド開発" });
  //toArray→カーソル内のすべてのドキュメントを含む配列を返す
  const result = await cursor.toArray();
  // const result2 = await col.findOne({ title: "バックエンド開発" });
  console.log(result);

  //closeで接続を切断
  await client.close();
}
