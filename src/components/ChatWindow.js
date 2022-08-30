import React from 'react'
import {GrAttachment} from 'react-icons/gr'
import {BsSearch,BsEmojiSmile,BsMic} from "react-icons/bs"
import { useState, useEffect } from 'react'
import {AiOutlineMore,AiOutlineSend} from "react-icons/ai"
import "./ChatWindow.css"
import MessageItem from './MessageItem'
import Api from "./Api"


function ChatWindow({user, data}) {
  let recognition = null
  let SpeechRecognition = window.SpeechRecognitionResultList || window.webkitSpeechRecognation 
  const [text, setText] = useState('')
  const [list, setList] = useState([])
  const [users, setUsers] =useState([])

  useEffect(()=>{

    setList([])
    let unsub = Api.onChatContent(data.chatId, setList, setUsers)
    return unsub
  }, [data.chatId])

  const handleInputKeyUp =(e)=>{
    if(e.keyCode == 13){
      handleSendClick()
    }
  }
  const handleSendClick =() => {
    if(text !== ''){
      Api.sendMessage(data, user.id, 'text', text, users)
      setText('')
    }
  }
  
  return (
    <div className="chatWindow">
        <div className="chatWindow--header">
            <div className="chatWindow--headerinfo">
                <img className="chatWindow--avatar" src={data.image}/>
              
                <div className="chatWindow--name">{data.title}</div>
            </div>  
            <div className="chatWindow--headerbuttons">
                <div classeName="chatWindow--btn">
                    <BsSearch />
                </div>
                <div classeName="chatWindow--btn">
                    <GrAttachment />
                </div>
                <div classeName="chatWindow--btn">
                    <AiOutlineMore />
                </div>
            </div>
          
        </div>
        <div className="chatWindow--body">
          {list.map((item, key) =>(
            <MessageItem 
              key={key}
              data={item}
              user={user}
            />
          ))

          }
        </div>
        <div className="chatWindow--footer">
            <div className="chatWindow---pre">
              <div classeName="chatWindow--btn">
                  <BsEmojiSmile />
              </div>
            </div>
            <div className="chatWindow---inputarea">
              <input clasName="chatWindow--input" type="text" 
              placeholder="Digite uma mensagem"
              value={text}
              onChange={e=> setText(e.target.value)}
              onKeyUp={handleInputKeyUp}
              />
            </div>
            <div className="chatWindow---pos">
              {
                text =='' &&
                <div classeName="chatWindow--btn">
                    <BsMic />
                </div>
              }
              {
                text !== '' &&
                <div classeName="chatWindow--btn">
                    <AiOutlineSend />
                </div> 
              }
            </div>
        </div>

    </div>
  )
}

export default ChatWindow