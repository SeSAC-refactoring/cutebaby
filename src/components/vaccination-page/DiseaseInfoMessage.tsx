import React from "react";
import typography from "../../styles/commons/Typography.module.scss";
import styles from "../../styles/VaccinationDetails.module.scss";

interface DiseaseInfoMessageProps {
  message: string;
}

export const DiseaseInfoMessage: React.FC<DiseaseInfoMessageProps> = ({
  message,
}) => {
  let findFirstIndicator = false; // 첫 번째 ▶ 추적

  return (
    <div className={styles.diseaseDetailContentsWrap}>
      <div className={styles.diseaseDetailContents}>
        {message.split("\n").map((line, i) => {
          if (line.includes("▶")) {
            findFirstIndicator = true; // 첫 번째 ▶ 발견 후 true로 변경
          }

          return (
            <p
              key={i}
              className={`${typography.textSmRg} ${
                findFirstIndicator
                  ? line.includes("▶")
                    ? styles.highlight // ▶ 있는 줄 스타일
                    : ""
                  : styles.beforeIndicator // 첫 번째 ▶ 나오기 전 스타일
              }`}
            >
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
};
