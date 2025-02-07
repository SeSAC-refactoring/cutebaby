import { vaccinationModel } from '../model/vaccinationModel.js';

// babyid에 따른 예방접종 정보 조회 처리
export const getVaccination = async (req, res) => {
    const { babyid } = req.body; // 클라이언트에서 받은 babyid
    console.log('백엔드에서 받은 babyid', babyid);

    if (!babyid) {
        return res.status(400).json({ error: 'babyid 값이 필요합니다.' });
    }

    try {
        const vaccinationData = await vaccinationModel(babyid);
        console.log(
            '백엔드에서 전송하는 babyid에 따른 vaccination 데이터',
            vaccinationData
        );
        res.json(vaccinationData);
    } catch (err) {
        console.error('백엔드 에러', err);
        res.status(500).json({ error: '서버 에러 발생' });
    }
};
