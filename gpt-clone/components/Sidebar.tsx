'use client'

import React from 'react'
import NewChat from './NewChat'
import { useSession, signOut  } from 'next-auth/react'
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore';
import ChatRow from './ChatRow';

function Sidebar() {
    // imports data from the Google session (whatever is logged in)
    const { data: serverSession  } =  useSession();

    const [chats, loading, error] = useCollection(
        serverSession && query(collection(db, "users", serverSession.user?.email!, "chats"), orderBy('createdAt', 'desc'))
    );

  return (
    <div className="p-2 flex flex-col h-screen"> 
        <div className='flex-1'>
            <div>
                <NewChat />
            </div>
            <div>
                {/* Model Selection */}
            </div>
            <div>
                {/* Map thru the chat rows  */}
                {chats?.docs.map( chat => (
                    <ChatRow key={chat.id} id={chat.id} />
                ))} 
            </div>
        </div>

        {serverSession && 
        <div className="flex flex-row items-center justify-center cursor-pointer hover:opacity-70 mb-2" onClick={() => signOut()}>
            <img src={serverSession.user?.image!} alt="Profile Picture" 
            className="h-12 w-12 rounded-full cursor-pointer"
        />
        <p className='ml-3 text-gray-300'>Sign Out</p>
            </div>}

    </div>
  )
}

export default Sidebar