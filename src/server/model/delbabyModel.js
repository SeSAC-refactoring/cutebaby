import db from '../config/db.js';  // MySQL 연결 객체

//db쿼리문들 여기다가 적는거

// db에 넣는거
export const delbabyModel = (babyid) => {
  console.log('model에서 확인',babyid)
  return new Promise((resolve, reject) => {
    const query = `
     DELETE FROM babyinfo WHERE babyid = ?
    `;
    db.query(query, [babyid], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

};
