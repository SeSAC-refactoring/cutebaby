import db from '../config/db.js';  // MySQL 연결 객체

//db쿼리문들 여기다가 적는거

// db에 넣는거
export const updatevacModel = (data) => {
  console.log('updateVac model에서 확인',data)

  
  return new Promise((resolve, reject) => {
    const query = `
        UPDATE vaccination 
        SET babyid=?, vaccinationid=?, dosenumber=?, dosedate=? 
        WHERE babyid=? AND vaccinationid=? AND dosenumber=?;

    `;
    db.query(query, [data.babyid,data.vaccinationid, data.dosenumber,data.dosedate,data.babyid,data.vaccinationid,data.dosenumber], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

};
