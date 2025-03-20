import { Link, useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full">
      <div className="flex flex-col gap-4 items-center justify-center xl:w-1/2 w-full p-5">
        <img src="/img/404.png" alt="test" />
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="button-sm button-yellow"
          >
            이전페이지로 바로가기
            <img src="../img/icons/i-chevron-right-s20.svg" alt="" />
          </button>
          <Link to="/">
            <button className="button-sm button-black">
              홈으로 바로가기
              <img src="../img/icons/i-chevron-right-s20.svg" alt="" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};
