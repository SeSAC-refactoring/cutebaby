import React from "react";

interface VaccinationAreaProps {
  setOpenDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCentersModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VaccinationArea: React.FC<VaccinationAreaProps> = ({
  setOpenDetailsModal,
  setOpenCentersModal,
}) => {
  return (
    <article className="vaccinationArea">
      <h3>예방접종 관련 정보</h3>
      <div className="bannerArea">
        <div
          className="banner banner_first"
          onClick={() => setOpenDetailsModal(true)}
        >
          <h4>예방접종 대상 감염병 정보</h4>
          <button>
            <p>바로가기</p>
            <img
              src="/img/icons/i-chevron-right-s20-gray6.svg"
              alt="바로가기 아이콘"
            />
          </button>
        </div>
        <div
          className="banner banner_second"
          onClick={() => setOpenCentersModal(true)}
        >
          <h4>위탁의료기관 찾기</h4>
          <button>
            <p>바로가기</p>
            <img
              src="/img/icons/i-chevron-right-s20-gray6.svg"
              alt="바로가기 아이콘"
            />
          </button>
        </div>
      </div>
    </article>
  );
};
