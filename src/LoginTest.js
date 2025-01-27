import React, { useState } from 'react'

export default function LoginTest({data}) {

    console.log('data>?>>>>',data)

    const [inputname , setInputname] = useState('')
    const [newname , setNewname] = useState('')

    // console.log(data[0].username)

    const namefind = ()=>{
        const newData =  data.filter((beforename)=> {
            return beforename.username.includes(inputname)
        })
        setNewname(newData)
    }

    console.log('newname >>>>',newname)

  return (

    <>
        이름을 입력해보세요 : <input type="text" onChange={(e)=>setInputname(e.target.value)} />
        <button onClick={namefind}>db에 계정있는지 없는지 확인</button>
        <h2>{newname.length === 0  ?'없는계정':"이미있는계정"}</h2>
        
        {/* {data ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <strong>ID:</strong> {item.userid}, 
              <strong>Username:</strong> {item.username}, 
              <strong>Email:</strong> {item.email}
            </li>
          ))}
        </ul>
      ) : (
      )}     */}
      
      
      </>

)
}
