import React from 'react'
import Api from "./Api"
import './Login.css'

function Login({onReceive}) {
    const handleFacebookLogin = async () =>{
        let result = await Api.ggPopup()
        if(result){
             onReceive(result.user)
        }
        else{
            alert('ERRO')
        }
    }
  return (
    <div className="login">
        <button onClick={handleFacebookLogin}>Logar com o Facebook</button>
    </div>
  )
}

export default Login