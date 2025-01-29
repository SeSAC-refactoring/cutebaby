import React, { useState } from 'react';
import { fetchUserPosts, Post } from '../services/postService';

export default function PostTest() {
  const [userid, setUserID] = useState<string>(''); 
  const [posts, setPosts] = useState<Post[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(e.target.value);
  };

  const handleFetchPosts = async () => {
    try {
      const userPosts = await fetchUserPosts(userid);
      setPosts(userPosts);
    } catch (error) {
      console.log('데이터 불러오기 실패:', error);
    }
  };

  return (
    <div>
      <h2>게시글 조회</h2>
      <input 
        type="text" 
        onChange={handleChange}
        value={userid}
        placeholder="유저의 아이디를 입력하세요" 
      />
      <button onClick={handleFetchPosts}>게시글 가져오기</button>

      <div>
        {posts.length > 0 ? (
          <ul>
            {posts.map(post => (
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
