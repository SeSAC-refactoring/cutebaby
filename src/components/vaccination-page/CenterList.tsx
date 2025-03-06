import React from 'react';
import { Centers } from '../types';
import { VaccineList } from './VaccineList';

interface CenterListProps {
    centers: Centers[];
    toggleVaccineList: (orgcd: number) => void;
    showVaccineList: { [key: number]: boolean };
}

export const CenterList: React.FC<CenterListProps> = ({
    centers,
    toggleVaccineList,
    showVaccineList,
}) => {
    const validCenters = (centers || []).filter(Boolean);

    return (
        <div className="centerList">
            {validCenters && validCenters.length > 0
                ? validCenters.map((center) => (
                      <div key={center.orgcd} className="center">
                          <div className="name">
                              <h3>{center.orgnm || '이름 없음'}</h3>
                              <button
                                  onClick={() =>
                                      toggleVaccineList(center.orgcd)
                                  }
                              >
                                  {showVaccineList[center.orgcd]
                                      ? '접종 가능 목록 ▲'
                                      : '접종 가능 목록 ▼'}
                              </button>
                              {showVaccineList[center.orgcd] && (
                                  <VaccineList center={center} />
                              )}
                          </div>
                          <div className="address">
                              <div className="title">병원주소</div>
                              <div className="detail">
                                  {center.orgAddr || '주소 없음'}
                              </div>
                          </div>
                          <div className="phonenumber">
                              <div className="title">대표번호</div>
                              <div className="imgDetail">
                                  <img
                                      src="/img/phone-call-01.png"
                                      alt="전화기"
                                  />
                                  <div className="detail">
                                      {center.orgTlno || '전화번호 없음'}
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))
                : null}
        </div>
    );
};
