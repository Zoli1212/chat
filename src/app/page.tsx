// import { getCurrentUserFromMongoDB } from "@/server-actions/users";
// import { UserButton, currentUser } from "@clerk/nextjs";
// import Image from "next/image";

export default async function Home() {

  // const loggedInUserData = await getCurrentUserFromMongoDB()

  // const name = loggedInUserData?.firstName || loggedInUserData.name


  return (
    <main className="p-5">
      {/* <UserButton afterSwitchSessionUrl="/sign-in"/>
      <div className="flex flex-col gap-3">
        <span>Name: { name }</span>
        
        <span>User Name: {loggedInUserData?.userName} </span>
        <span>Email:{ loggedInUserData?.email }</span>
      </div> */}

      <h1>HomePage</h1>
   
    </main>
  );
}
