import { updatevacModel } from "../model/updatevacModel.js";

// 사용자 정보 조회 처리
export const updateVac = async (req, res) => {
 
    try {
        const { babyid, vaccinationid , dosenumber , dosedate } = req.body; // 클라이언트에서 받은 이메일
        console.log('updateVac',req.body);
    
        const delVacinfo = await updatevacModel({
            babyid,
            vaccinationid,
            dosenumber,
            dosedate
        });
        res.status(201).json({
            success: true,
            message: "성장 정보가 성공적으로 추가되었습니다.",
            data: delVacinfo,
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "서버 오류 발생" });
    
    }
   
    // try {
    //     if (baby.length > 0) {
    //         res.json(baby);
    //         // sessionStorage.setItem("babyid", JSON.stringify(babyids));
    //     } else {
    //         res.json(babyFalse); // 사용자 없으면 404 반환
    //     }
    // } catch (err) {
    //     console.error(err);
    // }
};
