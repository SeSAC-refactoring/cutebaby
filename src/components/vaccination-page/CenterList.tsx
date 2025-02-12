import React from 'react';
import { Centers } from '../types';
import { VaccineList } from './VaccineList';
import styles from '../../styles/vaccination_unit.module.scss';

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
    return (
        <div>
            {centers && centers.length > 0 ? (
                centers.map((center) => (
                    <div key={center.orgcd} className={styles.container}>
                        <div className={styles.content_wrap}>
                            <div
                                className={styles.contents_set}
                                style={{ justifyContent: 'space-between' }}
                            >
                                <div
                                    className={`${styles.contents} ${styles.center_name}`}
                                >
                                    {center.orgnm}
                                </div>
                                <button
                                    onClick={() =>
                                        toggleVaccineList(center.orgcd)
                                    }
                                    className={styles.list_btn}
                                >
                                    {showVaccineList[center.orgcd]
                                        ? '접종 목록 ▲'
                                        : '접종 목록 ▼'}
                                </button>
                            </div>
                            <div className={styles.contents_set}>
                                <div className={styles.contents_title}>
                                    병원주소
                                </div>
                                <div className={styles.contents}>
                                    {center.orgAddr}
                                </div>
                            </div>
                            <div className={styles.contents_set}>
                                <div className={styles.contents_title}>
                                    대표번호
                                </div>
                                <img
                                    src="/img/phone-call-01.png"
                                    alt="전화기"
                                ></img>
                                <div
                                    className={`${styles.contents} ${styles.center_number}`}
                                >
                                    {center.orgTlno}
                                </div>
                            </div>
                            <div className={styles.btn_wrap}>
                                <div className={styles.vaccine_list}>
                                    {showVaccineList[center.orgcd] && (
                                        <VaccineList center={center} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>병원 정보가 없습니다</p>
            )}
        </div>
    );
};
