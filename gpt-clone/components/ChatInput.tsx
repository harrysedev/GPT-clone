"use client";

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    chatId: string; 
};

function ChatInput({chatId}: Props  ) {
    const [prompt, setPrompt] = useState("");
    const {data: serverSession} = useSession();

    //useSWR to get the model
    const model = "text-davinci-003";

    const sendMessage = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!prompt) return;

        const input = prompt.trim();
        setPrompt(""); 

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: serverSession?.user?.email!,
                name: serverSession?.user?.name!,
                avatar: serverSession?.user?.image! || `https://ui-avatars.com/api/?name=${serverSession?.user?.name}`
            }
        }

        await addDoc(collection(db, 'users', serverSession?.user?.email!, 'chats', chatId, 'messages'), 
        message)

        //Toast Notificaiton to say loading
        const notification = toast.loading('ChatGPT is thinking...');

        //Making API Endpoint
        await fetch('/api/askQuestion', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input,
                chatId, 
                model,
                serverSession,
            }),
        }).then(() => {
            //toast notificaiton to say successful
            toast.success('ChatGPT has responded', {
                id: notification,
            })
        }) 
    };

    return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
        <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
            <input className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300" 
            type="text" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message here..."
            disabled={!serverSession}
            />
            <button 
            disabled = {!serverSession || !prompt}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
            type="submit">
                <PaperAirplaneIcon  className="w-4 h-4 -rotate-45"/> 
            </button>
        </form>

        <div>
            {/* ModelSelection */}  
        </div> 
    </div>
  )
}

export default ChatInput