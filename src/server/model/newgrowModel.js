import db from '../config/db.js';  // MySQL 연결 객체

//db쿼리문들 여기다가 적는거

// db에 넣는거
export const newgrowModel = (data) => {
  console.log('newgrow model에서 확인',data)

  
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO babygrow (babyid,height, weight,head,inputData) 
      VALUES (?, ?, ?, ?,?);
    `;
    db.query(query, [data.babyid,data.height, data.weight, data.head , data.inputData], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

};
