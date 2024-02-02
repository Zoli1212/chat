// import { getCurrentUserFromMongoDB } from "@/server-actions/users";
// import { UserButton, currentUser } from "@clerk/nextjs";
// import Image from "next/image";
'use client'

import { Divider } from "antd";
import ChatArea from "./_chat-components/chat-area";
import Chats from "./_chat-components/chats";

export default async function Home() {

  // const loggedInUserData = await getCurrentUserFromMongoDB()

  // const name = loggedInUserData?.firstName || loggedInUserData.name


  return (
    <main className="flex h-[85vh]">
    

      <Chats />
      <Divider type='vertical' className="h-full border-gray-300"/>
      <ChatArea />
   
    </main>
  );
}
