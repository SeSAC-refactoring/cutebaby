import axios from 'axios';

const API_URL = 'http://localhost:5001/api/user';

export interface UserDataset {
    userid: number;
    username: string;
    email: string;
} 

export const fetchUsers = async () => {
    try {
        const response = await axios.get<UserDataset[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        throw error;
    }
};

// 특정 이름이 포함된 사용자 찾기
export const findUsersByName = (users: UserDataset[], name: string): UserDataset[] => {
    return users.filter((user) => user.username.includes(name));
};