// speculative generality

import React, { createContext, useContext, useEffect, useState } from 'react'
import { canisterId, createActor } from '../../../declarations/sunshine_chat';

const ChatContext = createContext();

const fetchChats = () => {
    const [chats, setChats] = useState();
    useEffect(() => {
        updateChat();
    }, []);
    async function updateChat() {
        const chat = createActor(canisterId);

    }
}

export const chatProvider = ({ children }) => {
    const chats = fetchChats();
    return <ChatContext.Provider value={chats}>{children}</ChatContext.Provider>
}

export const useChat = () => useContext(ChatContext);