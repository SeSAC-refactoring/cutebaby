import axios from 'axios';
import React, { useState } from 'react'

export default function Posttest() {
    const [userid , setUserID] = useState('');
    const [posts , setPost] = useState('');


    const inputUserID = (e)=>{
        setUserID(e.target.value)
    }

    const getPost = async () => {
        try {
          const result = await axios.post('http://localhost:5001/api/getPosts',  //api호출하듯이 사용 url은 nodejs 와 같은 url사용해야함
            { userid }, // userid값을 node로 보내줘야함
          );
          setPost(result.data); // 불러온값을 posts에 저장
          console.log(result.data);
        } catch (error) {
          console.log('데이터 못가지고 옴 일치하는 데이터 없는듯', error);
        }
      };
      

  return (
    <>
    <div>Posttest</div>
    <input type="text" 
        onChange={inputUserID}
        value={userid}
        placeholder='유저의 아이디를 입력하세요'
    />
    <button onClick={getPost}>nodejs로 값 보내기!</button>


    <div>
        {/* posts는 해당하는 것들이 모인 배열 그안에 mysql에 저장된 제목에 맞춰 객체로 저장되어있음 */}
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
    
    </>
  )
}
