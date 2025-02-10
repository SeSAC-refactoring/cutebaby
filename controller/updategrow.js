import { newgrowModel } from "../model/newgrowModel.js";
import { updategrowModel } from "../model/updategrowModel.js";

// 사용자 정보 조회 처리
export const updategrow = async (req, res) => {
        console.log(req.body)
    try {
        const { babyid, id, height , weight , head , inputData } = req.body; // 클라이언트에서 받은 이메일
        console.log(req.body);
        if (!height || !id|| !weight || !head || !babyid) {
            return res.status(400).json({ success: false, message: "모든 성장 정보가 필요합니다." });
        }
        const newGrowthRecord = await updategrowModel({
            babyid,
            id,
            height,
            weight,
            head,
            inputData
        });
        res.status(201).json({
            success: true,
            message: "성장 정보가 성공적으로 추가되었습니다.",
            data: newGrowthRecord,
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
