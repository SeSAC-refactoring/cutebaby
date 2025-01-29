import axios from 'axios';

const API_URL = 'http://localhost:5001/api/getPosts';

// Post 데이터 타입 정의
export interface Post {
  post_id: number;
  post_title: string;
  post_content: string;
  post_date: string;
}

// 특정 사용자의 게시글 가져오기
export const fetchUserPosts = async (userid: string): Promise<Post[]> => {
  try {
    const response = await axios.post<Post[]>(API_URL, { userid });
    return response.data;
  } catch (error) {
    console.error('게시글 불러오기 실패:', error);
    throw error;
  }
};
