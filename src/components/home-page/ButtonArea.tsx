import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonAreaProps {
    link: string;
    buttonText: string;
}

export const ButtonArea: React.FC<ButtonAreaProps> = ({ link, buttonText }) => {
    return (
        <>
            <div>
                우리아이의 성장상태를
                <br />
                <span>성장추이 그래프</span>로 확인할 수 있어요!
            </div>
            <button>
                <Link to={link}>
                    <p>{buttonText}</p>
                    <img
                        src={'/img/icons/i-chevron-right-s20.svg'}
                        alt="바로가기 아이콘"
                    />
                </Link>
            </button>
        </>
    );
};
