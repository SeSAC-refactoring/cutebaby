import React from 'react';

export const Disease: React.FC = () => {
    const diseases = [
        'B형간염',
        '결핵',
        '디프테리아\n파상풍\n백일해', // \n을 사용하여 줄바꿈
        '폴리오',
        'b형헤모필루스인플루엔자',
        '폐렴구균 감염증',
        '로타바이러스 감염증',
        '홍역\n유행성이하선염\n풍진', // 여러 줄로 나누기
        '수두',
        'A형간염',
        '일본뇌염',
        '사람유두종바이러스감염증',
        '인플루엔자',
    ];

    return (
        <div>
            <div>대상 감염병</div>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {diseases.map((disease, i) => (
                    <li
                        key={i}
                        style={{
                            whiteSpace: 'pre-line', // \n을 인식하여 줄바꿈 적용
                        }}
                    >
                        {disease}
                    </li>
                ))}
            </ul>
        </div>
    );
};
