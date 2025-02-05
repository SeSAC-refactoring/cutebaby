import React from 'react';

export const DiaryInputArea = () => {
    return (
        <div>
            <div>
                <label htmlFor="height">신장</label>
                <div>
                    <input type="number" id="height" placeholder="숫자 입력" />
                    <span>cm</span>
                </div>
            </div>

            <div>
                <label htmlFor="height">체중</label>
                <div>
                    <input type="number" id="height" placeholder="숫자 입력" />
                    <span>kg</span>
                </div>
            </div>

            <div>
                <label htmlFor="head">머리둘레</label>
                <div>
                    <input type="number" id="head" placeholder="숫자 입력" />
                    <span>cm</span>
                </div>
            </div>
        </div>
    );
};
