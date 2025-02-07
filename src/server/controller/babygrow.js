import { babygrowModel } from '../model/babygrowModel.js';

// 사용자 정보 조회 처리
export const babygrow = async (req, res) => {
  try {
    const { babyid } = req.body;
    console.log('grow에서 req.body',req.body)
    console.log('babyid in grow > Received babygrow:', babyid);
    // DB에서 babyid로 데이터 조회
    const growInfo = await babygrowModel(babyid);

    // 데이터가 없을 경우 처리
    if (!growInfo || growInfo.length === 0) {
        return res.json({ message: `babyid ${babyid}의 성장 데이터가 없습니다.` });
    }
    res.json(growInfo);
} catch (error) {
    console.error('babygrow 에러:', error);
    res.json({ message: '서버 오류 발생', error: error.message });
}
};
