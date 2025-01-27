import axios from 'axios';
import React, { useState } from 'react';

// Post 데이터의 타입 정의
interface Post {
  post_id: number;
  post_title: string;
  post_content: string;
  post_date: string;
}

export default function Posttest() {
  const [userid, setUserID] = useState<string>(''); // userid는 string 타입
  const [posts, setPost] = useState<Post[]>([]);

  const inputUserID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(e.target.value);
  };

  const getPost = async () => {
    try {
      const result = await axios.post<Post[]>('http://localhost:5001/api/getPosts', { userid });
      setPost(result.data); 
      console.log('react result>>>>',result)
      console.log('result.data >>>>',result.data);
    } catch (error) {
      console.log('데이터 못 가지러 옴. 일치하는 데이터 없는 듯', error);
    }
  };

  const postList = posts && posts.length;
  return (
    <>
      <div>Posttest</div>
      <input 
        type="text" 
        onChange={inputUserID}
        value={userid}
        placeholder="유저의 아이디를 입력하세요" 
      />
      <button onClick={getPost}>nodejs로 값 보내기!</button>

      <div>
        {/* posts는 해당하는 것들이 모인 배열 그 안에 MySQL에 저장된 제목에 맞춰 객체로 저장되어 있음 */}
        {postList > 0 ? (
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
    </>
  );
}
