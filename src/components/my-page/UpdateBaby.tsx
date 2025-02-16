import React, { useCallback, useState } from "react";
import styles from "../../styles/Modal.module.scss";
import typography from "../../styles/commons/Typography.module.scss";
import button from "../../styles/commons/Button.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { ImageUploader } from "./ImageUploader";
import { useBabyUpdate } from "./hooks/useBabyUpdate";
import { fetchBabyInfo } from "../../store/babySlice";
import { Input } from "../commons/Input";
import { GenderInput } from "../commons/genderList";

interface UpdateBabyProps {
  onClose: () => void;
  selectedBaby: {
    babyid: number;
    babyname: string;
    gender: string;
    birthday: string;
    picture: string | null;
  };
}

export const UpdateBaby: React.FC<UpdateBabyProps> = ({
  onClose,
  selectedBaby,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { requestbaby } = useBabyUpdate();
  const [defaultImg, setDefaultImg] = useState(true);

  //기존 데이터를 유지하면서 변경 가능하도록 설정
  const [rewriteData, setRewriteData] = useState({
    babyname: selectedBaby.babyname,
    gender: selectedBaby.gender,
    birthday: selectedBaby.birthday,
    picture: selectedBaby.picture as string | File | null,
  });

  // 력값이 변경될 때 `rewriteData`를 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRewriteData((prev) => ({ ...prev, [id]: value }));
  };

  // 성별 선택 시 `rewriteData` 업데이트
  // const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRewriteData((prev) => ({ ...prev, gender: e.target.value }));
  // };
  const handleGenderChange = useCallback((gender: string) => {
    setSelectedGender(gender);
    setRewriteData((prev) => ({ ...prev, gender }));
  }, []);

  // 이미지 변경 시 `rewriteData` 업데이트
  const handleImageSelect = (file: File | null) => {
    setRewriteData((prev) => ({
      ...prev,
      picture: file ? file : prev.picture, // 새 이미지가 없으면 기존 이미지 유지
    }));
  };

  // 변경된 값만 FormData에 추가하여 서버로 전송
  const rewrite = async () => {
    const formData = new FormData();
    formData.append("babyid", String(selectedBaby.babyid));

    // 기존 데이터와 비교하여 입력값이 없으면 기존 값으로 채우기
    const babyname = rewriteData.babyname || selectedBaby.babyname;
    const birthday = rewriteData.birthday || selectedBaby.birthday;
    const gender = rewriteData.gender || selectedBaby.gender;
    const picture = rewriteData.picture || selectedBaby.picture;

    formData.append("babyname", babyname);
    formData.append("birthday", birthday);
    formData.append("gender", gender);

    // 기존 이미지 유지 또는 새 이미지 추가
    if (picture instanceof File) {
      formData.append("picture", picture);
    } else if (typeof picture === "string") {
      formData.append("existingPicture", picture); // 기존 이미지 URL을 서버에 전달
    }

    // console.log("📦 서버로 전송할 변경된 데이터:", [...formData.entries()]);

    try {
      await requestbaby(formData);
      alert("아이 정보가 수정되었습니다!");
      dispatch(fetchBabyInfo());
      onClose();
    } catch (error) {
      // console.error("업데이트 오류:", error);
    }
  };
  const [selectedGender, setSelectedGender] = useState(rewriteData.gender);

  return (
    <div
      onClick={onClose}
      style={{ left: "0" }}
      className={styles.modal_overlay}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.modalWrapW640}
      >
        <div className={styles.titleArea}>
          <div className={`${styles.modal_title} ${typography.text4xlBd}`}>
            아기 정보 수정
          </div>
          <div onClick={onClose} className={styles.closeBtn}>
            <img src="/img/icons/i-modal-close-s32.svg" alt="" />
          </div>
        </div>
        <div className={styles.modalContentsArea}>
          <div className={styles.modalContentsAreaWrap}>
            <div className={styles.modal_img_wrap}>
              {defaultImg && <img src="/img/Profile.png" alt="아기 사진" />}
              <div
                style={{ position: "relative", bottom: "60px", left: "30px" }}
              >
                <ImageUploader
                  setDefaultImg={setDefaultImg}
                  onImageSelect={handleImageSelect}
                  resetTrigger={false}
                />
              </div>
            </div>
            <div className={styles.modal_Input_wrap}>
              <Input
                label="이름"
                placeholder="이름 입력"
                id="babyname"
                value={rewriteData.babyname}
                onChange={handleInputChange}
              ></Input>
              <Input
                label="생년월일"
                type="date"
                id="birthday"
                value={rewriteData.birthday}
                onChange={handleInputChange}
              ></Input>
              <section>
                <label>성별</label>
                <GenderInput
                  setSelectedGender={handleGenderChange}
                  selectedGender={selectedGender}
                />
              </section>
            </div>
          </div>
          <div className={styles.modal_button_container}>
            <button
              className={`${button.btnXlYw} ${typography.textXlBd}`}
              onClick={onClose}
            >
              취소
            </button>
            <button
              onClick={rewrite}
              className={`${button.btnXlGr} ${typography.textXlBd}`}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
