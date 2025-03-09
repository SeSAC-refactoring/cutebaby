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
      className="flex gap-5 bg-blue-1 border-2 border-blue-5 rounded-[20px] mb-[49px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full flex">
        {genderOptions.map((el) => (
          <button
            key={el.value}
            onClick={(e) => {
              e.stopPropagation();
              if (selectedGender !== el.value) {
                setSelectedGender(el.value);
              }
            }}
            className={`${
              el.value === selectedGender
                ? "rounded-[16px] p-4 gap-2 flex-[1_0_0] justify-around bg-blue-3 border-2 border-blue-7 text-sm font-bd text-blue-9 cursor-pointer"
                : "rounded-[16px] p-4 gap-2 flex-[1_0_0] justify-around text-sm font-md text-blue-8 cursor-pointer"
            }`}
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
