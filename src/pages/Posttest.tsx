import React, { useState } from 'react';
import { fetchUserPosts, Post } from '../services/postService';
import axios from 'axios';

export default function PostTest() {
  const [userid, setUserID] = useState<string>('');  // 아이디를 입력받는 state
  const [posts, setPosts] = useState<Post[]>([]);  // 게시글을 담을 state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(e.target.value);  // 입력 값 변경 시 상태 업데이트
  };

  const handleFetchPosts = async () => {
    try {
      // 여기서 'userid'를 서버로 전달하여 관련된 게시글을 받아옴
      const response = await axios.post('http://localhost:5001/api/user/getUser', { userid });
      const userPosts = response.data;  // 서버에서 받은 데이터

      // 게시글을 처리할 방법 (예: userPosts에 게시글 데이터가 포함되어 있다고 가정)
      setPosts(userPosts);  // 게시글 목록을 state에 저장
    } catch (error) {
      console.log('데이터 불러오기 실패:', error);
    }
  };

  return (
    <div>
      <h2>게시글 조회</h2>
      <input
        type="text"
        onChange={handleChange}  // 입력값 변경
        value={userid}
        placeholder="유저의 아이디를 입력하세요"
      />
      <button onClick={handleFetchPosts}>게시글 가져오기</button>

      <div>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.post_id}>
                <h3>{post.post_title}</h3>
                <p>{post.post_content}</p>
                <small>{post.post_date}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>게시글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
