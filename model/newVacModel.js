import db from '../config/db.js';  // MySQL 연결 객체

//db쿼리문들 여기다가 적는거

// db에 넣는거
export const newVacModel = (data) => {
  console.log('newVac model에서 확인',data)

  
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO vaccination (babyid,vaccinationid, dosenumber,dosedate) 
      VALUES (?, ?, ?, ?);
    `;
    db.query(query, [data.babyid,data.vaccinationid, data.dosenumber,data.dosedate], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

};
