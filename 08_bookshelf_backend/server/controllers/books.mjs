import { validationResult } from "express-validator";
import Book from "../models/book.mjs";
Book;

async function getAllBooks(req, res) {
  const books = await Book.find().sort({ updateAt: -1 });
  res.json(books);
}

async function getBookById(req, res) {
  const _id = req.params.id;
  //mongodbで直接findを使う場合→findOne({_id:new ObjectId(_id)})とオブジェクトIDとクラスに対して_idを渡す必要がある
  //mongooseの場合→findOneに直接文字列を渡せば、データが取得できる
  const book = await Book.findById(_id);

  if (book === null) return res.status(404).json({ msg: "Page Not Found" });

  res.json(book);
}

async function registBook(req, res) {
  const errors = validationResult(req);

  //↓エラーがあった場合の処理（!のnot演算子使う）
  if (!errors.isEmpty()) {
    const errs = errors.array();
    //res.json(errs)のままだとレスポンスコードは200番になり、正常終了とみなされるため、400番のステータスコードを設定する
    //処理自体はエラーのため、この↓の行を実行した時点で処理を止めたいので、returnを追加し、この部分で処理を終了させる
    return res.status(400).json(errs);
  }

  //Bookの初期値としてリクエストのボディーに設定する
  const book = new Book(req.body);
  //saveメソッドは非同期処理
  const newBook = await book.save();
  res.status(200).json(newBook);
}

async function updateBook(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const { title, description, comment, rating } = req.body;
  const _id = req.params.id;
  const book = await Book.findById(_id);

  //bookがnullの場合
  if (book === null) return res.status(404).json({ msg: "Page Not Found" });

  if (title !== undefined) book.title = title;
  if (description !== undefined) book.description = description;
  if (comment !== undefined) book.comment = comment;
  if (rating !== undefined) book.rating = rating;
  await book.save();
  res.json(book);
}

async function deleteBook(req, res) {
  const _id = req.params.id;
  const { deletedCount } = await Book.deleteOne({ _id });

  if (deletedCount === 0)
    return res.status(404).json({ msg: "Target Book Not Found" });

  console.log(result);
  res.json({ msg: "Delete succeeded." });
}

export { registBook, updateBook, getAllBooks, getBookById, deleteBook };
