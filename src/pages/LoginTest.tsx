import React, { useState } from 'react';
import { UserData, findUsersByName } from '../services/userService';

interface LoginTestProps {
    data: UserData[];
}

const LoginTest: React.FC<LoginTestProps> = ({ data }) => {
    const [inputName, setInputName] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);

    // 이름 검색 함수
    const handleSearch = () => {
        setFilteredUsers(findUsersByName(data, inputName));
    };

    return (
        <div>
            <h3>이름을 입력해보세요:</h3>
            <input type="text" onChange={(e) => setInputName(e.target.value)} />
            <button onClick={handleSearch}>DB에 계정 있는지 확인</button>
            <h2>{filteredUsers.length === 0 ? '없는 계정' : '이미 있는 계정'}</h2>
        </div>
    );
};

export default LoginTest;
