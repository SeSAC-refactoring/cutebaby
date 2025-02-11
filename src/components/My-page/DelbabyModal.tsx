import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Modal.module.scss'
import { useDelbaby } from './hooks/useDelbaby';
import { useSelectBaby } from '../../hooks/useSelectBaby';
import { babyinfo } from '../types';


interface delbabyprops {
    onClose: () => void;
    babyInfo: babyinfo[]; // babyInfo는 배열 형식임
    handleSelectBaby: number | null;

}
export const DelbabyModal:React.FC<delbabyprops> = ({onClose,handleSelectBaby}) => {
    const { delbaby } = useDelbaby();
    console.log('asdfasdfasdfbabyid',handleSelectBaby)
    const goBack = () => {
        onClose()
    };

    const handleDelete = async () => {
        const success = await delbaby(handleSelectBaby);
        if (success) {
            onClose();
        }
    };
  return (
      <div className={styles.modalbackground}>
        <div className={styles.mainModal}>
        <p>정말 아이를 삭제하시겠습니까?</p>
        <div >
        <button onClick={handleDelete}>아이삭제</button>

          <button onClick={goBack} >
            취소
          </button>
        </div>
        </div>
      </div>
  )
}
