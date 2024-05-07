import React, { useEffect, useState } from "react"
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import { useAuth } from "../../use-auth-client";

// interface chatInterface{
//     name: string,
//     message: string,
//     timeStamp: number
// }

export default function ChatBox() {
    //buat semua chat
    const [chats, setChats] = useState("");
    // buat input
    const [message, setMessage] = useState("");
    const { user, principal } = useAuth();
    const [sendBtn, setSendBtn] = useState();
    const [group, setGroup] = useState();
    useEffect(() => {
        // if(user!=null){
        // try {
        sunshine_chat.getAllChatsAccordingToGroup().then(chats => {
            // console.log(chats);
            // mapping buat chat
            if (chats.ok) {
                const listItems = chats.ok.map(([name, message, timestamp]) => (

                    <li>
                        {name}: {message} at {new Date(Number(timestamp) / 1000000).toLocaleString()}
                    </li>
                ));

                //   Setting the state with the list of elements
                setChats(<ul>{listItems}</ul>
                );
            }
        })
        // console.log(chats);

        // } catch (error) {

        // }
        // }
    }, [user, chats])

    useEffect(() => {
        async function checkCurrent() {
            sunshine_chat.getCurrentGroup().then(currGroup => {
                if (currGroup.ok) {
                    setSendBtn(
                        <div>
                            <input type="text" id="chatInput" onChange={(event) => { setMessage(event.target.value) }} />
                            <button onClick={handleSend}>Send</button>
                        </div>
                    )
                }
                else {
                    setSendBtn("");
                }
                setGroup(currGroup);
                console.log(currGroup);
            })
        }
        checkCurrent();
    }, [group])

    function handleSend() {
        async function sendChat() {
            // debugging
            // console.log(await user.whoami());
            // console.log(principal);
            // console.log(await sunshine_chat.whoami());
            const result = await sunshine_chat.createChat(message, principal);
            if (result.ok) {
                console.log("delivered!");
            }
            console.log(result);
        }
        sendChat();
    }

    return (
        <div>
            {chats
                // .ok.map((name, message, timestamp) => (
                //     <li key={timestamp}>{name}: {message} at {timestamp}</li>  
                //     // Map over the items array inside the state object
                // ))
            }
            {sendBtn}
        </div>
    )
}