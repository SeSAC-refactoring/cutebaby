import { Link, useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="w-full">
            <div className="flex flex-col gap-4 items-center sm:justify-center xl:w-1/2 w-full p-5">
                <img src="/img/404.png" alt="test" />
                <div className="flex flex-col w-full ssm:flex-row gap-2 justify-center items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="button-sm button-yellow w-full"
                    >
                        이전페이지로 바로가기
                        <img
                            src="../img/icons/i-chevron-right-s20.svg"
                            alt=""
                        />
                    </button>
                    <Link to="/" className="w-full">
                        <button className="button-sm button-black w-full">
                            홈으로 바로가기
                            <img
                                src="../img/icons/i-chevron-right-s28.svg"
                                alt=""
                            />
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
};
