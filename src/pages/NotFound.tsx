import { Link, useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main>
            <img src="/img/404.png" alt="test" />

            <button onClick={() => navigate(-1)}>
                이전페이지로 바로가기
                <img src="../img/icons/i-chevron-right-s20.svg" alt="" />
            </button>
            <button>
                <Link to="/Home">
                    홈으로 바로가기
                    <img src="../img/icons/i-chevron-right-s20.svg" alt="" />
                </Link>
            </button>
        </main>
    );
};
