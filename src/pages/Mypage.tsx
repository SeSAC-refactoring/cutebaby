import { useEffect, useState } from 'react';
import { BabyList } from '../components/my-page/BabyList';
import styles from '../styles/Mypage.module.scss';
import { NeedLoginModal } from '../components/NeedLoginModal'; // 모달 import
import axios from 'axios';
import { log } from 'console';

interface babyinfo {
    babyname: string;
    birthday: string;
    gender: string;
    picture: string | null;
}

export default function Mypage() {
    const user = JSON.parse(sessionStorage.getItem('usernumber') || '{}'); // 세션에 담긴거가져오기
    const [babyInfo, setBabyInfo] = useState<babyinfo[]>([]); // 여러 아기 정보를 다룰 수 있도록 배열로 초기화
    const [nothingBaby, setNothing] = useState<boolean>(false);
    //모달관리
    const [openModal, setOpenModal] = useState(false);
    //페이지 시작할때 세션확인
    useEffect(() => {
        const user = sessionStorage.getItem('user'); // 세션에 담긴거가져오기
        if (!user) {
            // 비었다면 밑에 실행
            setOpenModal(true);
        }
    }, []);

    useEffect(() => {
        babycall();
    }, []);

    const babycall = async () => {
        const response = await axios.post(
            'http://localhost:5001/api/babyinfo',
            { user }
        );
        console.log('qwerqwer', response);

        if (!response.data) {
            setNothing(false);
            console.log('response.data >>>',response);
            setBabyInfo([])
        } else {
            console.log('babycall', response.data);
            setNothing(true);
            setBabyInfo(response.data);
        }
    };
    return (
        <div className={styles.wrap}>
            {/* openMoal이 트루면 모달 실행 */}
            {openModal && (
                <NeedLoginModal modalState={() => setOpenModal(false)} />
            )}

            <div className={styles.pageContent}>
                {/* <div className={styles.icon}>수정 아이콘</div> */}
                <div className={styles.background}>
                    <h1 className={styles.title}>마이페이지</h1>
                    <BabyList babyInfo={babyInfo} nothingBaby={nothingBaby} />
                    {/* {message.trim()
          ?
          :<BabyInput message={message} />} */}
                </div>
                <div className={styles.invisible}></div>
            </div>
        </div>
    );
}
