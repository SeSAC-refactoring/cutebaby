import React, { useEffect } from 'react';
import styles from '../../styles/Modal.module.scss';
import { useDelbaby } from './hooks/useDelbaby';
import { babyinfo } from '../types';

interface DelbabyProps {
    onClose: () => void;
    babyInfo: babyinfo[];
    handleSelectBaby: number | null;
}

export const DelbabyModal: React.FC<DelbabyProps> = ({ onClose, handleSelectBaby }) => {
    const { delbaby } = useDelbaby();

    // `handleSelectBaby`가 올바른 값인지 확인
    useEffect(() => {
        console.log('삭제할 babyid:', handleSelectBaby);
    }, [handleSelectBaby]);

    // 모달 닫기
    const goBack = () => {
        console.log(' 모달 닫기 실행');
        onClose();
    };

    // 아이 삭제 핸들러
    const handleDelete = async () => {
        if (handleSelectBaby !== null) {
            const success = await delbaby(handleSelectBaby);
            if (success) {
                console.log(' 아이 삭제 성공');
                onClose();
            } else {
                console.error(' 아이 삭제 실패');
            }
        } else {
            console.error('⚠ 삭제할 babyid가 null입니다.');
        }
    };

    return (
      <div className={styles.modal_overlay}>
      <div className={styles.modal_background}>
      <div className={styles.modal_container}>
      <div className={styles.modal_title_wrap}>
      <div className={styles.modal_title}>정말 삭제하시겠습니까?</div>
                <div>
                    <button onClick={handleDelete}>아이 삭제</button>
                    <button onClick={goBack}>취소</button>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
};
