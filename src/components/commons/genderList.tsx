import React from "react";
import styles from "../../styles/commons/ChildrenTabs.module.scss";

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
    <div style={{ display: "flex", gap: "20px" }}>
      <div className={styles.segments}>
        {genderOptions.map((el) => (
          <button
            key={el.value}
            className={
              el.value === selectedGender
                ? styles.segmentsItem_selected
                : styles.segmentsItem
            }
            onClick={() => {
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
