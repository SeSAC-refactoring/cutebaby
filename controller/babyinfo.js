import { babyinfoModel } from "../model/babyinfoModel.js";

export const babyinfo = async (req, res) => {
    const { user } = req.body;
    console.log('babyinfo > Received email:', user);

    try {
        const baby = await babyinfoModel(user); // MySQL에서 데이터 가져오기
        console.log('babyinfo에 baby 내용 >>>', baby);

        if (baby.length > 0) {
            const formattedResults = baby.map((baby) => {
                let pictureUrl = null;

                if (baby.picture) {
                    if (Buffer.isBuffer(baby.picture)) {
                        // BLOB 데이터를 Base64로 변환
                        pictureUrl = `data:image/jpeg;base64,${baby.picture.toString("base64")}`;
                    } else if (typeof baby.picture === "string" && baby.picture.startsWith("http")) {
                        pictureUrl = baby.picture;
                    } else {
                        pictureUrl = `http://localhost/uploads/${baby.picture}`;
                    }
                }

                return {
                    ...baby,
                    picture: pictureUrl,
                };
            });

            console.log('변환 후>>', formattedResults);
            res.json(formattedResults);
        } else {
            res.json(false);
        }
    } catch (err) {
        console.error(err);
    }
};
