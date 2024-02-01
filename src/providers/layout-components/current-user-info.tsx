import { UserType } from "@/interfaces";
import { useClerk } from "@clerk/nextjs";
import { Button, Divider, Drawer, Upload, message } from "antd";
import DrawerPanel from "antd/es/drawer/DrawerPanel";
import dayjs from "dayjs";
import { space } from "postcss/lib/list";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SetCurrentUser, UserState } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageToFirebaseAndReturnUrl } from "@/helpers/image-upload";
import { UpdateUserProfile } from "@/server-actions/users";

function CurrentUserInfo({
  showCurrentUserInfo,
  setShowCurrentUserInfo,
}: {
  showCurrentUserInfo: boolean;
  setShowCurrentUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)

  const dispatch = useDispatch()

  const { signOut } = useClerk();
  const router = useRouter();
  const getProperty = (key: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-700">{key}</span>
        <span className="text-gray-500">{value}</span>
      </div>
    );
  };

  const onLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      setShowCurrentUserInfo(false);
      message.success("Logged out successfully");

      router.push("/sign-in");
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onProfilePictureUpdate = async () => {

    try{

      setLoading(true)

      const url:string = await uploadImageToFirebaseAndReturnUrl(selectedFile!)

      const response = await UpdateUserProfile(currentUserData?._id !, {profilePicture: url})

      if(response.error) throw new Error(response.error)

      dispatch(SetCurrentUser(response))

    }catch(error){
      console.log((error as Error).message)
    }finally{
      setLoading(false)

    }

  }
  return (
    currentUserData && (
      <Drawer
        open={showCurrentUserInfo}
        onClose={() => setShowCurrentUserInfo(false)}
        title="Profile"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 justify-center items-center">
          {!selectedFile && (
              <img
                src={currentUserData?.profilePicture}
                alt="profile"
                className="w-28 h-28 rounded-full"
              />
            )}
            <Upload beforeUpload={(file) => { 
              setSelectedFile(file) 
              return false}}
              listType={selectedFile ? 'picture-circle': 'text'}
              maxCount={1}
              className="cursor-pointer">
              Change Profile Picture

            </Upload>
          </div>
          <Divider className="my-1 border-gray-500" />
          <div className="flex flex-col gap-5">
            {getProperty("Name", currentUserData?.name)}
            {getProperty("Username", currentUserData?.userName)}
            {getProperty(
              "Joined On",
              dayjs(currentUserData?.createdAt).format("DD MM YYYY hh:mm A")
            )}
          </div>
          <div className="mt-5 flex flex-col gap-5">
          <Button
              className="w-full"
              block
              loading={loading}
              onClick={onProfilePictureUpdate}
              disabled={!selectedFile}
            >
              Update Profile Picture
            </Button>
            <Button
              className="w-full"
              block
              loading={loading}
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </Drawer>
    )
  );
}

export default CurrentUserInfo;
