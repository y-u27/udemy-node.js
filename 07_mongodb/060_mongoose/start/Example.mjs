import { connect, Schema, model, Mixed, set, get } from "mongoose";
import env from "dotenv";
env.config();

// const mongoose = require('mongoose');

connect(process.env.MONGO_URI);
const catSchema = new Schema({
  //入力を必須にしたい場合→オブジェクトを定義し、タイプの箇所にそのデータ型を定義し、required:trueというオプションを使って、入力を必須にする
  //入力値がない場合は、エラーになる
  name: { type: String, required: true },
  size: { type: Number, required: true },
  bool: { type: Boolean, default: false },
  dt: {
    type: Date,
    set: function (newVal) {
      return new Date(newVal);
    },
    get: function (val) {
      return val instanceof Date ? val : new Date(val);
    },
  },
  array: [String],
  anything: Mixed,
});

//mongooseを使うことでモデルから作成したオブジェクトの値を書き換えてセーブメソッドを呼ぶだけで自動的にMongoDBに上にもデータが反映される
//第1引数でモデル指定→コレクション名が小文字で複数形にしたものが名前になる
//第2引数でそのモデルが保持するフィールドを定義する
const Cat = model("Cat", catSchema);

const kitty = new Cat({ name: "Zildjian" });
kitty.name = "Zildjian";
kitty.size = "10";
kitty.dt = "2025/2/17";
kitty.array = [0, 1];
//saveを実行することで変更した状態がMongoDBに反映される
kitty.save().then((doc) => console.log(doc.dt instanceof Date));

// String:文字列
// Number:数値
// Date:日付
// Buffer:バイナリデータ
// Boolean:真偽
// Mixed:なんでもOK
// ObjectId:Mongo固有のID
// Array:配列
// Decimal128:浮動小数点
// Map:マップ
// Schema:他のスキーマ
