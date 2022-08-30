import React from 'react'
import ChatListItem from './components/ChatListItem'
import {AiOutlineMore} from "react-icons/ai"
import {MdDonutLarge, MdPhoto} from "react-icons/md"
import {BsFillChatLeftDotsFill, BsSearch} from "react-icons/bs"
import {useState, useEffect} from "react"
import NewChat from './components/NewChat'
import './App.css'
import ChatIntro from "./components/ChatIntro"
import ChatWindow from "./components/ChatWindow"
import Login from "./components/Login"
import Api from "./components/Api"

function Chat() {
    const handleNewChat = () => {
        setShowNewChat(true)
    }
   //lista de users
    const [chatList, setChatList] = useState([])
    const [activeChat, setActiveChat] = useState({})
    const [user, setUser] = useState(null)
    const [showNewChat, setShowNewChat] = useState(false)
    useEffect(()=> {
        if(user !== null){
            let unsub =Api.onChatList(user.id, setChatList)
            return unsub
        }
    }, [user])

    const handleLoginData = async (u) =>{
        let newUser ={
            id: u.uid,
            name:u.displayName,
            avatar: u.photoURL
        }
        await Api.addUser(newUser)
        setUser(newUser)
    }
    // if(user === null){
    //     return(<Login onReceive={handleLoginData}/>)
    // }

  return (
    <div className="app-window"> 
        <div className="sidebar">
            <NewChat 
                chatList={chatList}
                user={user}
                show={showNewChat}
                setShow={setShowNewChat}
            />
            <header>
                <img className='header-avatar' src={user.avatar}/>
                <div className="header-buttons">
                    <div className="header-btn">
                        <MdDonutLarge/>
                    </div>
                    <div className="header-btn" onClick={handleNewChat}>
                        <BsFillChatLeftDotsFill/>
                    </div>
                    <div className="header-btn">
                        <AiOutlineMore/>
                    </div>
                </div>
            </header>
        
            <div className="search">
                <div className='search--input'>
                    <BsSearch/>
                    <input type="search" placeholder="Buscar estudante"/>
                </div>
            </div>
           <div className='chatlist'>
                {chatList.map((item, key) =>(
                    <ChatListItem 
                        key={key}
                        active={activeChat.chatId === chatList[key].chatId}
                        onClick={()=> setActiveChat(chatList[key])} 
                        data={item}
                    />
                ))}
            </div> 
        </div>
        
        <div className="contentarea">
            {activeChat.chatId !== undefined && 
                <ChatWindow 
                    user={user}
                    data={activeChat}
                />
            }
            {activeChat.chatId === undefined &&
                <ChatIntro />
            }
        </div>
    </div>
  )
}

export default Chat