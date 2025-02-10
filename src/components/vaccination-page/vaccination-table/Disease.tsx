import React from 'react';

export const Disease: React.FC = () => {
    const diseases = [
        'B형간염',
        '결핵',
        '디프테리아/\n파상풍/\n백일해', // \n을 사용하여 줄바꿈
        '폴리오',
        'b형헤모필루스\n인플루엔자',
        '폐렴구균\n감염증',
        '로타바이러스\n감염증',
        '홍역/\n유행성이하선염/\n풍진',
        '수두',
        'A형간염',
        '일본뇌염',
        '사람유두종\n바이러스감염증',
        '인플루엔자',
    ];

    return (
        <div>
            <div
                style={{
                    width: '104px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '56px',
                    backgroundColor: '#93CBDF',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    borderBottomLeftRadius: '16px',
                    borderTopLeftRadius: '16px',
                    borderRight: '3px solid #E1E1E5',
                    boxSizing: 'border-box',
                    position: 'sticky',
                    top: '0',
                }}
            >
                대상 감염병
            </div>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {diseases.map((disease, i) => (
                    <li
                        key={i}
                        style={{
                            whiteSpace: 'pre-line', // \n을 인식하여 줄바꿈 적용
                            width: '104px',
                            height:
                                i === 2 ||
                                i === 5 ||
                                i === 6 ||
                                i === 7 ||
                                i === 10
                                    ? '100px'
                                    : '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '2px solid #E1E1E5',
                            borderRight: '3px solid #E1E1E5',
                            boxSizing: 'border-box',
                        }}
                    >
                        {disease}
                    </li>
                ))}
            </ul>
        </div>
    );
};
