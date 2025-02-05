import { babyinfoModel } from '../model/babyinfoModel.js';


// 사용자 정보 조회 처리
export const babyinfo = async (req, res) => {
    const { user } = req.body;  // 클라이언트에서 받은 이메일
    const babyFalse = false
  console.log(req.body)
  console.log('babyinfo > Received email:', user);  // 로그 출력
  
  try {
    const baby = await babyinfoModel(user);
    console.log('babyinfo에 baby 내용 >>>',baby)
    if (baby.length > 0) {
        res.json(baby);

    } else {
      res.json(babyFalse);  // 사용자 없으면 404 반환
    }
  } catch (err) {
    console.error(err);
  }
};
