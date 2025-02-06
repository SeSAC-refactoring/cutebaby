import React from 'react';

export const DoseDate = () => {
    const headers = [
        '출생시',
        '4주이내',
        '1개월',
        '2개월',
        '4개월',
        '6개월',
        '12개월',
        '15개월',
        '18개월',
        '19~23개월',
        '24~35개월',
        '4세',
        '6세',
        '11세',
        '12세',
    ];

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {headers.map((header, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                    {header}
                </div>
            ))}
        </div>
    );
};
