import db from '../config/db.js'; // MySQL 연결 객체

// babyid 기준으로 예방접종 데이터 조회
export const vaccinationModel = (babyid) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM vaccination WHERE babyid = ?'; // babyid 기준으로 예방접종 조회
        db.query(query, [babyid], (err, result) => {
            // 쿼리 실행
            if (err) reject(err);
            else resolve(result); // 결과 반환
        });
    });
};
