import firebaseApp from '@/config/firebase-config'
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

export const uploadImageToFirebaseAndReturnUrl = async (file: File) => {
    try{

        const storage = getStorage(firebaseApp)

        const storageRef = ref(storage, 'images' + "/" + file.name)


        const uploadedImageResponse = await uploadBytes(storageRef, file)

        const downloadUrl = await getDownloadURL(uploadedImageResponse.ref)

        return downloadUrl

    }catch(error: any){
        throw new Error(error.message)
    }
}