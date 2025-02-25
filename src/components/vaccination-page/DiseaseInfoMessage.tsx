import React from "react";

interface DiseaseInfoMessageProps {
  message: string;
}

export const DiseaseInfoMessage: React.FC<DiseaseInfoMessageProps> = ({
  message,
}) => {
  let findFirstIndicator = false; // 첫 번째 ▶ 추적

  return (
    <div>
      <div>
        {message.split("\n").map((line, i) => {
          if (line.includes("▶")) {
            findFirstIndicator = true; // 첫 번째 ▶ 발견 후 true로 변경
          }

          return <p key={i}>{line}</p>;
        })}
      </div>
    </div>
  );
};
