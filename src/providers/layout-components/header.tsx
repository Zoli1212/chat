"use client";
import { UserType } from "@/interfaces";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import { Avatar, message } from "antd";
import React, { useEffect, useState } from "react";
import CurrentUserInfo from "./current-user-info";
import { usePathname } from "next/navigation";
import { SetCurrentUser, UserState } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
function Header() {

  const pathname = usePathname();
  const isPublicRoute =
    pathname.includes("sign-in") || pathname.includes("sign-up");
  if (isPublicRoute) return null;
  const dispatch = useDispatch();
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const [showCurrentUserInfo, setShowCurrentUserInfo] =
    React.useState<boolean>(false);

  const getCurrentUser = async () => {
    try {
      const response = await getCurrentUserFromMongoDB();
      if (response.error) throw new Error(response.error);
      dispatch(SetCurrentUser(response as UserType));
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div className="bg-gray-100 w-full p-5 py-2 flex justify-between items-center order-b border-solid border-gray-300">
      <div className="text-2xl font-bold text-primary uppercase">
        <h1>Chat App</h1>
      </div>
      <div className="gap-5 flex items-center">
        <span className="text-sm">{currentUserData?.name}</span>
        <Avatar
          className="cursor-pointer"
          onClick={() => setShowCurrentUserInfo(true)}
          src={currentUserData?.profilePicture}
        />
      </div>
      {showCurrentUserInfo && (
        <CurrentUserInfo
          showCurrentUserInfo={showCurrentUserInfo}
          setShowCurrentUserInfo={setShowCurrentUserInfo}
        />
      )}
    </div>
  );
}

export default Header;
