import React, { useEffect, useState } from 'react';
import styles from '../../styles/Mypage.module.scss';

import { babyinfo } from '../types';
import { UpdateBaby } from './UpdateBaby';
import { DelbabyModal } from './DelbabyModal';

import { BabyInputPlus } from './BabyInputPlus';

import { BabyList } from '../commons/BabyList';
import { useBabyMonths } from './hooks/useBabyMonths';

interface BabyInputProps {
    babyInfo: babyinfo[];
}

export const BabyInfo: React.FC<BabyInputProps> = ({ babyInfo }) => {
    const [selectedBabyId, setSelectedBabyId] = useState<number | null>(
        babyInfo.length > 0 ? babyInfo[0].babyid : null
    );

    const [selectedBaby, setSelectedBaby] = useState<{
        babyid: number;
        babyname: string;
        gender: string;
        birthday: string;
        picture: string | null;
    }>({
        babyid: 0,
        babyname: '',
        gender: '',
        birthday: '',
        picture: null,
    });

    const [updateBaby, setUpdateBaby] = useState<boolean>(false);
    const [delModal, setDelModal] = useState<boolean>(false);
    const [babyPlus, setBabyPlus] = useState<boolean>(false); // 아이 등록 모달 상태

    const handleSelectBaby = (babyId: number) => {
        setSelectedBabyId(babyId);
    };

    const babyMonths = useBabyMonths(selectedBaby.birthday); // 아기 개월 수

    useEffect(() => {
        const filterbaby = babyInfo.find(
            (baby) => baby.babyid === selectedBabyId
        );

        if (filterbaby) {
            let pictureUrl: string | null = null;

            if (filterbaby.picture instanceof File) {
                pictureUrl = URL.createObjectURL(filterbaby.picture);
            } else if (typeof filterbaby.picture === 'string') {
                pictureUrl = filterbaby.picture;
            }

            setSelectedBaby({
                babyid: filterbaby.babyid,
                babyname: filterbaby.babyname,
                gender: filterbaby.gender,
                birthday: filterbaby.birthday,
                picture: pictureUrl,
            });
        }
    }, [selectedBabyId, babyInfo]);

    return (
        <div className="w-full flex flex-col items-start gap-4 pt-5 px-6 pb-6 bg-yellow-1 rounded-[2rem] sm:h-0 sm:grow">
            <h3>우리아이 정보</h3>

            <div className="w-full flex flex-col gap-4">
                <BabyList
                    babyInfo={babyInfo}
                    handleSelectBaby={handleSelectBaby}
                    selectedBabyId={selectedBabyId}
                    onOpenModal={() => setBabyPlus(true)}
                />

                <div className="w-full flex gap-4 xs:bg-white xs:p-[16px] xs:gap-6 xs:rounded-[32px] xs:border-[3px] border-blue-3">
                    <div className="bg-white rounded-[16px] border-2 border-[#E1E1E5] w-[60%] sm:w-1/5 flex justify-center items-center ">
                        {!(
                            selectedBaby.picture === 'data:image/jpeg;base64,'
                        ) ? (
                            <img
                                className="rounded-[16px] w-full h-full"
                                src={
                                    selectedBaby?.picture || 'img/babybasic.png'
                                }
                                alt="아기 사진"
                            />
                        ) : (
                            <img
                                className="w-[80px] h-[96px]"
                                src="img/babybasic.png"
                                alt="기본 아기 사진"
                            ></img>
                        )}
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="text-xs font-bd text-gray-8">
                                    생년월일
                                </div>
                                <div className="text-bs font-md">
                                    {selectedBaby.birthday}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-xs font-bd text-gray-8">
                                    성별
                                </div>
                                <div className="text-bs font-md">
                                    {selectedBaby.gender === 'boy'
                                        ? '남아'
                                        : '여아'}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-xs font-bd text-gray-8">
                                    개월 수
                                </div>
                                <div className="text-bs font-md">
                                    {babyMonths}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-end ">
                            <div className="w-[90px] flex gap-2 h-[26px]">
                                <button
                                    className="bg-coral-4 rounded-[8px] text-2xs font-bd w-full"
                                    onClick={() => setDelModal(true)}
                                >
                                    삭제
                                </button>
                                {delModal && (
                                    <DelbabyModal
                                        handleSelectBaby={selectedBaby.babyid}
                                        babyInfo={babyInfo}
                                        onClose={() => setDelModal(false)}
                                    />
                                )}

                                <button
                                    className="bg-yellow-4 flex rounded-[8px] text-2xs font-bd w-full gap-[2px] items-center justify-center  "
                                    onClick={() => setUpdateBaby(true)}
                                >
                                    수정
                                    <img
                                        alt="수정 아이콘"
                                        src="/img/edit-01.png"
                                        className="w-[12px] h-[12px]"
                                    />
                                </button>
                            </div>
                        </div>
                        {updateBaby && (
                            <UpdateBaby
                                selectedBaby={selectedBaby}
                                onClose={() => setUpdateBaby(false)}
                            />
                        )}
                    </div>
                </div>
            </div>

            {babyPlus && (
                <div
                    onClick={() => setBabyPlus(false)}
                    style={{ right: '0px' }}
                >
                    <BabyInputPlus
                        onClose={() => setBabyPlus(false)}
                        babyInfo={babyInfo}
                    />
                </div>
            )}
        </div>
    );
};
