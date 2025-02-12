import React, { useRef, useState } from "react";
// import styles from "../../styles/Mypage.module.scss";
import styles from "../../styles/Modal.module.scss";
import tabs from "../../styles/commons/ChildrenTabs.module.scss";
import { babyinfo } from "../types";
import { useCreatebaby } from "./hooks/useCreatebaby";
import { ImageUploader } from "./ImageUploader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchBabyInfo } from "../../store/babySlice";
import { BabyModal } from "./MypageModal";

interface BabyInputProps {
  babyInfo: babyinfo[];
  nothingBaby: boolean;
  onClose: () => void;
}

export const BabyInputPlus: React.FC<BabyInputProps> = ({
  nothingBaby,
  onClose,
}) => {
  const today = new Date();
  const birthday = today
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/. /g, "-")
    .replace(".", "");

  const [resetImage, setResetImage] = useState(true); // 리셋시키기위한 상태관리
  const [newBabyData, setNewBabyData] = useState<babyinfo>({
    babyid: 0,
    babyname: "",
    birthday: birthday,
    gender: "",
    picture: null as File | null, // File | null` 타입 유지
  });
  const [genderCheck, setGenderCheck] = useState<boolean>(false);
  const inputRef = useRef({
    babyname: null as HTMLInputElement | null,
    birthday: null as HTMLInputElement | null,
    gender: null as HTMLInputElement | null,
    name: null as HTMLInputElement | null,
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
      inputRef.current.babyname?.focus();
    } else if (!newBabyData.birthday) {
      inputRef.current.babyname?.focus();
    } else if (!newBabyData.gender) {
      setGenderCheck(true);
      inputRef.current.gender?.focus();
    } else {
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
          birthday: birthday,
          gender: "",
          picture: null,
        });
        setResetImage((prev) => !prev);
        dispatch(fetchBabyInfo());
        onClose();
        alert("등록성공!");
      } catch (error) {
        alert("등록에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <BabyModal />
      <div className={styles.info_box}>
        {nothingBaby}
        <div className={styles.modal_title_wrap}>
          <div className={styles.modal_title}>아이 정보 등록</div>
          <div className={styles.X_btn}>X</div>
        </div>
        <img src="/img/Profile.png" alt="아기 사진" />
        <button className={styles.modal_img_button}>
          사진 등록
          <img src="img/image-add.png" alt="이미지 아이콘" />
        </button>
        <form>
          <section>
            <label>이름</label>
            <input
              type="text"
              id="babyname"
              placeholder="아이의 이름을 입력해주세요!"
              value={newBabyData.babyname}
              onChange={handleInputChange}
              ref={(el) => {
                inputRef.current.babyname = el;
              }}
            />
          </section>

          <section>
            <label>생년월일</label>
            <input
              type="date"
              id="birthday"
              value={newBabyData.birthday}
              onChange={handleInputChange}
              ref={(el) => {
                inputRef.current.birthday = el;
              }}
            />
          </section>

          <section>
            <label>성별</label>
            <div className={tabs.button_group}>
              <div className={tabs.button_selected}>남아</div>
              <div className={tabs.button}>여아</div>
            </div>
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
            {genderCheck && "아이의 성별을 체크해주세요!"}
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
      <button className={styles.edit_btn} onClick={onClose}>
        취소
      </button>
    </>
  );
};
