import { connect, Schema, model, Mixed } from "mongoose";
import env from "dotenv";
env.config();

connect(process.env.MONGO_URI);

const bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  comment: { type: String, required: true },
});

const Book = model("Book", bookSchema);

// const bookz = new Book({ title: "晴れのち曇り" });
// bookz.title = "晴れのち曇り";
// bookz.description = "自分";
// bookz.rating = 12345;
// bookz.comment = "いい本";
// bookz.save().then(() => console.log("新しい本情報反映"));

const book = new Book({
  title: "テストブック",
  description: "これはテスト本です",
  rating: 4,
  comment: "テストテスト",
});

book.save().then((book) => console.log(book._id));
