import { babygrowModel } from '../model/babygrowModel.js';

// 사용자 정보 조회 처리
export const babygrow = async (req, res) => {
    const { babyid } = req.body;  // 클라이언트에서 받은 이메일
  console.log('grow에서 req.body',req.body)
  console.log('babyid in grow > Received babygrow:', babyid);
  try {
    const baby = await babygrowModel(babyid);
    console.log('babyinfo에 baby 내용 >>>',baby)
    if (baby.length > 0) {
        res.json(baby);
        // sessionStorage.setItem("babyid", JSON.stringify(babyids));
    } else {
      res.json(babyFalse);  // 사용자 없으면 404 반환
    }
  } catch (err) {
    console.error(err);
  }
};
