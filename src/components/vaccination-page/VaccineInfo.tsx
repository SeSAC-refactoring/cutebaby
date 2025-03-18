import React from "react";
import { vaccineInfoArray } from "./vaccineInfoArray";

interface VaccineInfoProps {
  setOpenInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const VaccineInfo: React.FC<VaccineInfoProps> = ({
  setOpenInfoModal,
}) => {
  return (
    <div
      className="modalBg"
      onClick={() => {
        setOpenInfoModal(false);
      }}
    >
      <div
        className="whiteboxModal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <section className="topArea">
          <h2>백신 정보</h2>
          <div
            className="close"
            onClick={() => {
              setOpenInfoModal(false);
            }}
          >
            <img src="/img/Button-close.png" alt="" />
          </div>
        </section>

        <section className="informationArea">
          <div className="information-header">
            <h3>국가예방접종</h3>
            <p>
              국가에서 권장하는 필수예방접종(국가는 ⌜감염병의 예방 및 관리에
              관한 법률⌟ 을 통해 예방접종 대상 감염병과 예방접종 실시 기준 및
              방법을 정하고, 이를 근거로 재원을 마련하여 지원하고 있음)
            </p>
          </div>

          <ul className="information-list">
            {vaccineInfoArray.map((vaccine, index) => (
              <li key={index}>
                <div className="information-title">
                  <span>{index + 1}</span>
                  <h3>{vaccine.name}</h3>
                </div>
                <p>{vaccine.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
