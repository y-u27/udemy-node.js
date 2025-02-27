import express from "express";
//↓飛んできたjsonの情報を簡単にチェックすることができるライブラリー
//bodyという関数を使うと、飛んできたjsonのフィールドをチェックすることができる
import { body } from "express-validator";
import {
  getAllBooks,
  getBookById,
  registBook,
  updateBook,
  deleteBook,
} from "../controllers/books.mjs";
import requestErrorHandler from "../helpers/helper.mjs";

const router = express.Router();

router.get("/", requestErrorHandler(getAllBooks));

router.get("/:id", requestErrorHandler(getBookById));

//notEmpty→飛んできたタイトルに設定されている値が1文字以上であるかどうかをチェックする
router.post(
  "/",
  body("title").notEmpty(),
  body("description").notEmpty(),
  body("comment").notEmpty(),
  body("rating").notEmpty().isInt({ min: 1, max: 5 }),
  requestErrorHandler(registBook)
);

router.patch(
  "/:id",
  //更新する値だけ飛ばせるようにするため、optional()というメソッドをつなげる
  body("title").optional().notEmpty(),
  body("description").optional().notEmpty(),
  body("comment").optional().notEmpty(),
  body("rating").optional().notEmpty().isInt({ min: 1, max: 5 }),
  requestErrorHandler(updateBook)
);

router.delete("/:id", requestErrorHandler(deleteBook));

export default router;
