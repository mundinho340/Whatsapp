import React, {useState, useEffect} from 'react'
import './NewChat.css'
import {IoIosArrowRoundBack} from 'react-icons/io'
import Api from "./Api"


function NewChat({user, chatList, show, setShow}){
    
    const [list, setList] = useState([])
    useEffect(()=>{
        const getList = async() =>{
                if(user !==null){
                    let results=await Api.getContactList(user.id)
                    setList(results)
                }
        }
        getList()
    },[user])

    const addNewChat = async (user2) => {
        await Api.addNewChat(user, user2)

        handleClose()
    }

    function handleClose (){
        setShow(false)
    }
  return (
    <div className="newChat" style={{left: show?0 : -415 }}>
        <div className="newChat--head">
            <div className="newChat--backbutton" onClick={handleClose}>
                <IoIosArrowRoundBack style={{color:'#FFFFFF'}}/>
            </div>
            <div classeName="newChat--headtitle">
                Nova Conversa
            </div>
        </div>
        <div className="newChat--list">
            {
                list.map((item, key) => (
                    <div onClick={()=> addNewChat(item)}  className="newChat--item" key={key}>
                        <img src={item.avatar} alt="" className="newChat--itemavatar" />
                        <div className="newChat--itemname">{item.name}</div> 
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default NewChat