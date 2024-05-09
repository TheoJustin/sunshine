import React, { useEffect, useState } from "react"
import { sunshine_chat } from "../../../../declarations/sunshine_chat";
import { useAuth } from "../../use-auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";

// interface chatInterface{
//     name: string,
//     message: string,
//     timeStamp: number
// }

export default function ChatBox({ activeGroup }) {
    //buat semua chat
    const [chats, setChats] = useState("");
    // buat input
    const [message, setMessage] = useState("");
    const { user, principal } = useAuth();
    const [sendBtn, setSendBtn] = useState();
    // const [group, setGroup] = useState();
    const [shouldSendData, setShouldSendData] = useState(false);
    const { mutate: sendMutate, status: sendStatus } = useMutation({
        mutationKey: ["checkSend"],
        mutationFn: handleSend
    });

    const { isLoading: isLoadingFetchChat } = useQuery({
        queryKey: ["checkFetch", activeGroup, chats],
        queryFn: () => fetchChats(activeGroup),
        
    });

    async function fetchChats(activeGroup) {
        const chats = await sunshine_chat.getAllChatsAccordingToGroup(activeGroup)
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
        
        return true;
    }

    function trySend() {
        sendMutate();
    }

    useEffect(() => {
        fetchChats(activeGroup);
    }, [user, chats, activeGroup])

    useEffect(() => {
        async function checkCurrent() {
            // setSendBtn("");
            // sunshine_chat.getGroupById(activeGroup).then(currGroup => {
                if (activeGroup) {
                    setSendBtn(
                        <div>
                            <input type="text" id="chatInput" onChange={(event) => { setMessage(event.target.value) }} />
                            <button onClick={trySend}>Send</button>
                        </div>
                    )
                }
                else {
                    setSendBtn("No group selected");
                }
                // setGroup(currGroup);
                // console.log(currGroup);
            // })
        }
        checkCurrent();
    }, [activeGroup])

    async function handleSend() {

        // async function sendChat() {
            const result = await sunshine_chat.createChat(message, principal, activeGroup);
            if (result.ok) {
                console.log("delivered!");
            }
            setShouldSendData(false);
            console.log(result);
        // }
        // sendChat();
        // fetchChats(activeGroup);
        return true;
    }

    return (
        <div>
            {sendStatus}
            {activeGroup ? (isLoadingFetchChat ? "Fetching Chat..." : chats) : ""}
            {sendStatus == "pending" ? "Sending Data" : sendBtn}
        </div>
    )
}