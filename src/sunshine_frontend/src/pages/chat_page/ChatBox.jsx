import React, { useEffect, useState } from "react"
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import { useAuth } from "../../use-auth-client";

// interface chatInterface{
//     name: string,
//     message: string,
//     timeStamp: number
// }

export default function ChatBox(){
    //buat semua chat
    const [chats, setChats] = useState("");
    // buat input
    const [message, setMessage] = useState("");
    const {user} = useAuth();

    useEffect(()=>{
        // if(user!=null){
            try {
                sunshine_chat.getAllChats().then(chats => {
                    console.log(chats);
                    // const listItems = chats.map(([name, message, timestamp]) => (
                    //     <li>
                    //       {name}: {message} at {timestamp}
                    //     </li>
                    //   ));
                    
                    //   // Setting the state with the list of elements
                    //   setChats(<ul>{listItems}</ul>);
                    // setChats(chats);
                })
                console.log(chats);
                
            } catch (error) {
                
            }
        // }
    }, [user])

    function handleSend(){
        async function sendChat(){
             console.log( await user.whoami());
             console.log( await sunshine_chat.whoami());
            const result = await sunshine_chat.createChat(message);
            console.log(result);
        }
        sendChat();
    }

    return (
        <div>
            {chats}
            <div>
                <input type="text"  id="chatInput" onChange={(event)=>{setMessage(event.target.value)}} />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}