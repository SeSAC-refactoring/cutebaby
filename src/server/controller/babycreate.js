import multer from "multer";
import db from "../config/db.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 업로드 폴더 설정
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname); //파일명 변경
  },
});
const upload = multer({ storage: storage });

export const babycreate = async (req, res) => {

  const { usernumber, babyname, birthday, gender } = req.body;
  const picture = req.file ? req.file.filename : null;

  if (!babyname || !birthday || !gender || !picture) {
    return res.status(400).json({ success: false, message: "모든 필수 데이터를 입력하세요." });
  }

  const sql = `INSERT INTO babyinfo (babyname, usernumber , birthday, gender, picture) 
  VALUES (?, ?, ?, ?,?)`;
  const values = [babyname, usernumber, birthday, gender, picture];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ MySQL 삽입 오류:", err);
      return res.status(500).json({ success: false, message: "데이터베이스 오류", error: err });
    }
    res.status(201).json({
      success: true,
      message: "아기 정보 등록 성공!",
      babyId: result.insertId,
    });
  });
};
