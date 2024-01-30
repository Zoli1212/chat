'use server'
import { connectMongoDB } from "@/config/db-config";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs";

connectMongoDB()

export const getCurrentUserFromMongoDB = async () => {

    try{

        const clerkUser = await currentUser()

        const mongoUser = await UserModel.findOne({ clerkUserId: clerkUser?.id })

        if(mongoUser){
            return JSON.parse(JSON.stringify(mongoUser))
        }

        const newuserpayload = {
            clerkUserId : clerkUser?.id,
            name: clerkUser?.firstName + " " + clerkUser?.lastName,
            userName: clerkUser?.username,
            email: clerkUser?.emailAddresses[0]?.emailAddress || '',
            profilePicture: clerkUser?.imageUrl
        }

        const newUser = await UserModel.create(newuserpayload)

        return newUser



    }catch(error){
        return {
            error:  (error as Error).message
        }
    }

}