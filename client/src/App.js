
import './App.css';
import io from "socket.io-client"
import {useState, useEffect } from 'react';


const socket=io.connect("http://localhost:3001")

function App() {
  const [message, setMessage] = useState();
  const [receivedMessage, setReceivedMessage] = useState();
  const sendMessage = () => { 
    console.log(message)
    socket.emit("send_message",{message})
    
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data.backendData);
      setReceivedMessage(data.backendData);


      
      
    })
  },[socket])

  return (
    <div className="App">
      <input placeholder='Message....' onChange={(e)=>setMessage(e.target.value)}/>
      <button onClick={sendMessage}>send message</button>
      <h1>{receivedMessage}</h1>

      
    </div>
  );
}

export default App;
