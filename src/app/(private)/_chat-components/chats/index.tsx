import React from 'react'
import ChatsHeader from '../chat-area/chat-header'
import ChatsList from '../chat-area/chat-list'

function Chats() {
  return (
    <div className='w-[400px] h-full p-3'>
             <ChatsHeader />
                <ChatsList />
    </div>
  )
}

export default Chats