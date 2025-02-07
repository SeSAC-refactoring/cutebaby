import React from 'react';

export const TotalDoses: React.FC = () => {
    const doses = [3, 1, 5, 1, 4, 4, 4, '-', 2, 3, 2, 1, 2, 5, 2, 2, '-'];

    return (
        <div>
            <div>횟수</div>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {doses.map((dose, i) => (
                    <li key={i}>{dose}</li>
                ))}
            </ul>
        </div>
    );
};
