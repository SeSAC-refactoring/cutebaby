import React from "react";

interface GenderInputProps {
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
}

const GenderInputComponent: React.FC<GenderInputProps> = ({
  selectedGender,
  setSelectedGender,
}) => {
  const genderOptions = [
    { text: "남아", value: "boy" },
    { text: "여아", value: "girl" },
  ];

  return (
    <div
      style={{ display: "flex", gap: "20px" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        {genderOptions.map((el) => (
          <button
            key={el.value}
            // className={
            //   el.value === selectedGender
            //     ? styles.segmentsItem_selected
            //     : styles.segmentsItem
            // }
            onClick={(e) => {
              e.stopPropagation();
              if (selectedGender !== el.value) {
                setSelectedGender(el.value);
              }
            }}
            style={{
              cursor: "pointer",
              fontWeight: el.value === selectedGender ? "bold" : "normal",
            }}
          >
            {el.text}
          </button>
        ))}
      </div>
    </div>
  );
};

// React.memo 적용 -> 부모 리렌더링 시 필요 없는 재렌더링 방지
export const GenderInput = React.memo(GenderInputComponent);
