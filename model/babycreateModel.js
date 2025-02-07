import db from '../config/db.js';  // MySQL 연결 객체

//db쿼리문들 여기다가 적는거

// db에 넣는거
export const babycreateModel = (data) => {
  console.log('babycreate model에서 확인',data)

  
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO babygrow (babyname,birthday, gender,picture) 
      VALUES (?, ?, ?, ?,?);
    `;
    db.query(query, [data.babyname,data.birthday, data.gender, data.picture], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

};
