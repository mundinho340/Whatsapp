import React,{useState, useEffect} from 'react'
import {Router, Route,useHistory} from 'react-router-dom'
import Login from "./components/Login"
import Chat from "./Chat"



function App() {
    const [user, setUser] = useState(null)
    if(user === null){
        return(<Login onReceive={handleLoginData}/>)
    }
  return (
    <div className="app-window"> 
        <Chat />
    </div>
  )
}

export default App