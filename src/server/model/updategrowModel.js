import db from '../config/db.js';  // MySQL 연결 객체

//db쿼리문들 여기다가 적는거

// db에 넣는거
export const updategrowModel = (data) => {
  console.log('update model에서 확인',data)

  
  return new Promise((resolve, reject) => {
    const query = `
    UPDATE babygrow SET height= ? ,weight=?,head=? ,inputData=? WHERE id=?
    `;
    db.query(query, [data.height,data.weight,data.head, data.inputData ,data.id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

};
