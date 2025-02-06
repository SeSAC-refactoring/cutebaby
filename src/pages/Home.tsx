import { AiChatComponent } from '../components/home-page/AiChatComponent';
import styles from '../styles/Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { Root } from 'react-dom/client';


export default function Home() {
    // const dispatch = useDispatch<AppDispatch>();
    const { babyInfo  } = useSelector(
        (state: RootState) => state.baby
    );

    
    const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);
    console.log('로그인성공시 babygrow 불러옴', growInfo)
    console.log('로그인성공시 babyinfo불러옴',babyInfo)

    return (
        <>
            <div className={styles.background}>
                <div className={styles.block_user}>
                    <div className={styles.big_title}>
                        땡땡이님, 안녕하세요?
                    </div>
                    <div className={styles.profile}></div>
                    <div className={styles.list_box}></div>
                </div>
                <div className={styles.block_center}>
                    <div>
                        <div className={styles.small_title}>
                            다가오는 예방접종
                        </div>
                        <div className={styles.vac_box}></div>
                    </div>
                    <div>
                        <div className={styles.small_title}>최근 예방접종</div>
                        <div className={styles.vac_box}></div>
                    </div>
                    <div>
                        <div className={styles.small_title}>우리 땡땡이는?</div>
                        <div className={styles.user_info}></div>
                    </div>
                    <div className={styles.banner_wrap}>
                        <div className={styles.banner}></div>
                        <div className={styles.banner}></div>
                    </div>
                </div>
                <div className={styles.block_chatbot}>
                    <div className={styles.chatbot}>도움이 필요하신가요?</div>
                    <AiChatComponent />
                </div>
            </div>
        </>
    );
}
