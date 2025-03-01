import React from 'react';

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
            <h2>예방접종 관련 정보</h2>
            <div className="bannerArea">
                <div
                    className="banner banner_first"
                    onClick={() => setOpenDetailsModal(true)}
                >
                    <h3>예방접종 대상 감염병 정보</h3>
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
                    <h3>위탁의료기관 찾기</h3>
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
