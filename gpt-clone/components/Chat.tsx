"use client";

import { db } from "../firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import ZeroState from "./ZeroState";

type Props = {
    chatId: string; 
};

function Chat({chatId}: Props) {

    const { data: serverSession } = useSession(); 
    const [messages] = useCollection(serverSession && query(
        collection(db, "users", serverSession.user?.email!, "chats", chatId, "messages"), 
        orderBy('createdAt', 'asc')
     ))

    return <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {messages?.empty && (
            <ZeroState />
        )}
        
        {messages?.docs.map((message) => (
            <Message key={message.id} message={message.data()} />
        ))}
    </div>;
  }
    
  export default Chat