import React, { useState } from "react";
import styles from "../../styles/Mypage.module.scss";
import layout from "../../styles/commons/Layout.module.scss";
import { babyinfo } from "../types";
import { useCreatebaby } from "./hooks/useCreatebaby";
import { ImageUploader } from "./ImageUploader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchBabyInfo } from "../../store/babySlice";

interface BabyInputProps {
  babyInfo: babyinfo[];
  nothingBaby: boolean;
}

export const BabyInputPlus: React.FC<BabyInputProps> = ({ nothingBaby }) => {
  const [resetImage, setResetImage] = useState(false); // 리셋시키기위한 상태관리

  const [newBabyData, setNewBabyData] = useState<babyinfo>({
    babyid: 0,
    babyname: "",
    birthday: "",
    gender: "",
    picture: null as File | null, // File | null` 타입 유지
  });
  const dispatch = useDispatch<AppDispatch>();
  const { request } = useCreatebaby();
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBabyData((prev) => ({ ...prev, gender: e.target.value }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewBabyData((prev) => ({ ...prev, [id]: value }));
  };
  //입력잘했는지 검사
  const createBaby = async () => {
    if (!newBabyData.babyname) {
      alert("아이의 이름을 입력해주세요");
      return;
    } else if (!newBabyData.birthday) {
      alert("아이의 생일을 입력해주세요");
      return;
    } else if (!newBabyData.gender) {
      alert("아이의 성별을 입력해주세요");
      return;
    } 

    try {
      await request({
        babyname: newBabyData.babyname,
        birthday: newBabyData.birthday,
        gender: newBabyData.gender,
        picture: newBabyData.picture,
      });

      // 입력 필드 초기화
      setNewBabyData({
        babyid: 0,
        babyname: "",
        birthday: "",
        gender: "",
        picture: null,
      });
      setResetImage((prev) => !prev);
      dispatch(fetchBabyInfo());

      alert("등록성공!");
    } catch (error) {
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <>
      <div className={layout.background}>
        {nothingBaby}
        <h3 className={layout.title}>아기 등록하기</h3>
        <form>
          <section>
            <label>이름 :</label>
            <input
              type="text"
              id="babyname"
              placeholder="아이의 이름을 입력해주세요!"
              value={newBabyData.babyname}
              onChange={handleInputChange}
            />
          </section>

          <section>
            <label>생년월일 :</label>
            <input
              type="date"
              id="birthday"
              value={newBabyData.birthday}
              onChange={handleInputChange}
            />
          </section>

          <section>
            <label>성별 :</label>
            <label>
              <input
                type="checkbox"
                name="gender"
                value="boy"
                checked={newBabyData.gender === "boy"}
                onChange={handleGenderChange}
              />
              남아
            </label>
            <label>
              <input
                type="checkbox"
                name="gender"
                value="girl"
                checked={newBabyData.gender === "girl"}
                onChange={handleGenderChange}
              />
              여아
            </label>
          </section>

          <section>
            <label>아기 사진:</label>
            <ImageUploader
              onImageSelect={(file) =>
                setNewBabyData((prev) => ({ ...prev, picture: file }))
              }
              resetTrigger={resetImage}
            />
          </section>
        </form>
      </div>
      <button className={styles.edit_btn} onClick={createBaby}>
        완료
      </button>
    </>
  );
};
