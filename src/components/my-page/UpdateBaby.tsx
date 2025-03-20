import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { ImageUploader } from "./ImageUploader";
import { useBabyUpdate } from "./hooks/useBabyUpdate";
import { fetchBabyInfo } from "../../store/babySlice";
import { Input } from "../commons/Input";
import { GenderInput } from "../commons/GenderInputComponent";

interface UpdateBabyProps {
  onClose: () => void;
  selectedBaby: {
    babyid: number;
    babyname: string;
    gender: string;
    birthday: string;
    picture: string | null;
  };
  isOpen: boolean;
}

export const UpdateBaby: React.FC<UpdateBabyProps> = ({
  onClose,
  selectedBaby,
  isOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { requestbaby } = useBabyUpdate();
  const [defaultImg, setDefaultImg] = useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = useState<boolean>(false);

  //기존 데이터를 유지하면서 변경 가능하도록 설정
  const [rewriteData, setRewriteData] = useState({
    babyname: selectedBaby.babyname,
    gender: selectedBaby.gender,
    birthday: selectedBaby.birthday,
    picture: selectedBaby.picture as string | File | null,
  });
  useEffect(() => {
    if (rewriteData.picture !== "data:image/jpeg;base64,") {
      setDefaultImg(false);
    } else {
      setDefaultImg(true);
    }
  }, [isOpen]); // `isOpen`이 변경될 때 실행
  useEffect(() => {
    setPreviewUrl(true);
  }, [rewriteData.picture]);

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
      picture: file as string | File | null,
    }));
    setDefaultImg(!file); // 새 이미지가 있으면 기본 이미지 해제
  };

  const handleImageRemove = () => {
    setRewriteData((prev) => ({
      ...prev,
      picture: null, //이미지 제거
    }));
    setPreviewUrl(false); // 미리보기 이미지 제거
    setDefaultImg(true); // 기본 이미지 활성화
  };
  // 변경된 값만 FormData에 추가하여 서버로 전송
  const rewrite = async () => {
    const formData = new FormData();
    formData.append("babyid", String(selectedBaby.babyid));

    // 기존 데이터와 비교하여 입력값이 없으면 기존 값으로 채우기
    const babyname = rewriteData.babyname || selectedBaby.babyname;
    const birthday = rewriteData.birthday || selectedBaby.birthday;
    const gender = rewriteData.gender || selectedBaby.gender;
    let picture = rewriteData.picture || selectedBaby.picture;

    if (!previewUrl) {
      picture = rewriteData.picture || selectedBaby.picture;
    } else {
      picture = "/img/Profile.png";
    }
    console.log(picture);

    formData.append("babyname", babyname);
    formData.append("birthday", birthday);
    formData.append("gender", gender);

    // 기존 이미지 유지 또는 새 이미지 추가
    if (picture instanceof File) {
      formData.append("picture", picture);
    } else if (typeof picture === "string") {
      formData.append("existingPicture", picture); // 기존 이미지 URL을 서버에 전달
    }
    console.log();
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
    <div onClick={onClose} className="modalBg">
      <div onClick={(e) => e.stopPropagation()} className="mediumModal">
        <div className="flex justify-between">
          <div className="text-2xl font-bd mb-10">아기 정보 수정</div>
          <div onClick={onClose}>
            {/* <img src="/img/icons/i-modal-close-s32.svg" alt="" /> */}
            <img src="img/Button-close.png" alt="button" />
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center flex-col items-center">
            <div>
              <img
                src={
                  defaultImg
                    ? "/img/Profile.png" // 기본 이미지
                    : typeof rewriteData.picture === "string"
                    ? rewriteData.picture // 기존 URL
                    : rewriteData.picture
                    ? URL.createObjectURL(rewriteData.picture) // 새로 업로드한 파일
                    : "/img/Profile.png" // 기본 이미지
                }
                alt="아기 사진"
                className="w-[140px] h-[140px] rounded-[0.5rem]"
              />
              {previewUrl && (
                <button
                  onClick={handleImageRemove}
                  className="absolute top-1 right-1 bg-gray-700 text-white p-1 rounded-full"
                >
                  ✖
                </button>
              )}
              <div className="relative bottom-[45px] left-[8px]">
                <ImageUploader
                  setDefaultImg={setDefaultImg}
                  onImageSelect={handleImageSelect}
                  resetTrigger={false}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-6">
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
                <div className="flex gap-1">
                  <label className="text-xs font-bd text-gray-8 mb-[6px]">
                    성별
                  </label>
                  <div className="w-[6px] h-[6px] bg-red-5 rounded-[4px]"></div>
                </div>
                <GenderInput
                  setSelectedGender={handleGenderChange}
                  selectedGender={selectedGender}
                />
              </section>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="button button-yellow button-lg w-full"
            >
              취소
            </button>
            <button onClick={rewrite} className="button-black button-lg w-full">
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
